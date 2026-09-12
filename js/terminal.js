/**
 * NEO-RUNNER // CYBER TERMINAL CLI CONTROLLER
 * Full command-line parser & simulated interactive shell.
 */
class CyberTerminal {
  constructor() {
    this.modal = null;
    this.outputEl = null;
    this.inputEl = null;
    this.history = [];
    this.historyIndex = -1;
  }

  init() {
    this.modal = document.getElementById('terminal-modal');
    this.outputEl = document.getElementById('terminal-output');
    this.inputEl = document.getElementById('terminal-input');

    if (!this.inputEl) return;

    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = this.inputEl.value.trim();
        if (cmd) {
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.execute(cmd);
        }
        this.inputEl.value = '';
      } else if (e.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.inputEl.value = this.history[this.historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.inputEl.value = this.history[this.historyIndex] || '';
        } else {
          this.historyIndex = this.history.length;
          this.inputEl.value = '';
        }
      }
    });

    // Close on escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
        this.close();
      }
    });
  }

  open() {
    if (!this.modal) this.init();
    this.modal.classList.remove('hidden');
    this.modal.classList.add('flex');
    if (this.inputEl) {
      setTimeout(() => this.inputEl.focus(), 50);
    }
    if (window.cyberAudio) window.cyberAudio.playChirp();
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.add('hidden');
    this.modal.classList.remove('flex');
    if (window.cyberAudio) window.cyberAudio.playClick();
  }

  print(text, type = 'normal') {
    if (!this.outputEl) return;
    const p = document.createElement('div');
    p.className = 'font-code-sm text-code-sm leading-relaxed mb-1';

    if (type === 'error') p.className += ' text-error';
    else if (type === 'success') p.className += ' text-primary-container';
    else if (type === 'warn') p.className += ' text-tertiary-fixed-dim';
    else if (type === 'dim') p.className += ' text-on-surface-variant';
    else p.className += ' text-primary';

    p.innerHTML = text;
    this.outputEl.appendChild(p);
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  }

  execute(cmdLine) {
    this.print(`<span class="text-primary-fixed-dim">> ${cmdLine}</span>`);
    const parts = cmdLine.split(' ');
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').trim();

    const store = window.cyberStore;
    const s = store ? store.state : {};

    switch (command) {
      case 'help':
        this.print(`AVAILABLE PROTOCOL COMMANDS:`);
        this.print(`  <span class="text-primary-container">status</span>       - Display Runner wetware status & stats`);
        this.print(`  <span class="text-primary-container">contracts</span>    - List active protocol bounties (or 'ls')`);
        this.print(`  <span class="text-primary-container">claim &lt;id&gt;</span>    - Fulfill contract by ID (e.g. claim cnt-02)`);
        this.print(`  <span class="text-primary-container">bazaar</span>       - View black-market catalog`);
        this.print(`  <span class="text-primary-container">buy &lt;id&gt;</span>      - Purchase wetware item by ID`);
        this.print(`  <span class="text-primary-container">audio</span>        - Toggle procedural audio engine`);
        this.print(`  <span class="text-primary-container">matrix</span>       - Stream quantum cyber deck feed`);
        this.print(`  <span class="text-primary-container">clear</span>        - Flush terminal buffer`);
        this.print(`  <span class="text-primary-container">exit</span>         - Close terminal session`);
        break;

      case 'status':
      case 'stats':
        this.print(`[ OPERATOR PROFILE ]`);
        this.print(`CALLSIGN: <span class="text-primary-container font-bold">${s.callsign}</span> // CLEARANCE: <span class="text-tertiary-fixed-dim">TIER 0${s.tier}</span>`);
        this.print(`CREDS: <span class="text-tertiary-fixed-dim">${s.creds.toLocaleString()} ₡</span> | XP: <span class="text-secondary">${s.xp.toLocaleString()} KB</span> | STREAK: <span class="text-primary-fixed">${s.streak} DAYS</span>`);
        this.print(`OVERLOAD SYNC: ${s.overloadSync}% | CORE TEMP: ${s.bioTemp}°C OPTIMAL`);
        this.print(`EQUIPPED DECK: <span class="text-primary">${(s.equipped && s.equipped.deck) || 'NONE'}</span>`);
        break;

      case 'contracts':
      case 'ls':
        this.print(`[ ACTIVE CONTRACT DIRECTIVES ]`);
        (s.contracts || []).forEach(c => {
          const status = c.completed ? '<span class="text-primary-container">[SYNCED]</span>' : '<span class="text-tertiary-fixed-dim">[PENDING]</span>';
          this.print(`  ${c.id} : ${status} ${c.title} (+${c.rewardCreds} ₡)`);
        });
        break;

      case 'claim':
      case 'fulfill':
        if (!arg) {
          this.print(`Usage: claim &lt;contract-id&gt; (e.g. claim cnt-02)`, 'warn');
          return;
        }
        const contract = (s.contracts || []).find(c => c.id.toLowerCase() === arg.toLowerCase());
        if (!contract) {
          this.print(`Contract '${arg}' not found in telemetry registers.`, 'error');
        } else {
          store.toggleContract(contract.id);
          this.print(`Contract '${contract.title}' updated. Telemetry harvested!`, 'success');
        }
        break;

      case 'bazaar':
      case 'shop':
        this.print(`[ BLACK MARKET WETWARE CATALOG ]`);
        (s.bazaarItems || []).forEach(item => {
          const owned = s.inventory.includes(item.id) ? '<span class="text-primary-container">[ACQUIRED]</span>' : `<span class="text-tertiary-fixed-dim">${item.price} ₡</span>`;
          this.print(`  ${item.id} - ${item.name} (${item.slot}) : ${owned}`);
        });
        break;

      case 'buy':
        if (!arg) {
          this.print(`Usage: buy &lt;item-id&gt; (e.g. buy cortex-cryo)`, 'warn');
          return;
        }
        const res = store.buyItem(arg);
        if (res.success) {
          this.print(`Successfully procured: ${res.item.name}!`, 'success');
        } else {
          this.print(`Procurement rejected: ${res.msg}`, 'error');
        }
        break;

      case 'audio':
        if (window.cyberAudio) {
          const unmuted = window.cyberAudio.toggleMute();
          this.print(`AUDIO SYNTHESIZER: ${unmuted ? 'ONLINE' : 'MUTED'}`, 'warn');
        }
        break;

      case 'matrix':
        this.print(`INITIALIZING QUANTUM FEED STREAM...`, 'dim');
        let count = 0;
        const interval = setInterval(() => {
          let hex = '0x';
          for (let i = 0; i < 16; i++) {
            hex += Math.floor(Math.random() * 16).toString(16);
          }
          this.print(`<span class="text-primary-container font-mono">${hex} // NEURAL_TRACE_OK</span>`);
          count++;
          if (count > 6) clearInterval(interval);
        }, 80);
        break;

      case 'clear':
        this.outputEl.innerHTML = '';
        break;

      case 'exit':
      case 'quit':
        this.close();
        break;

      default:
        this.print(`Unknown protocol command: '${command}'. Type 'help' for command directory.`, 'error');
        break;
    }
  }
}

window.cyberTerminal = new CyberTerminal();
