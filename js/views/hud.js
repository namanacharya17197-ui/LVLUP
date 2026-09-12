/**
 * NEO-RUNNER // VIEW: OPERATIONS // HUD
 * Gamified daily command center, live cognitive sprint timer, and contract management.
 */

// Focus Sprint Timer Controller
window.sprintTimer = {
  totalSeconds: 25 * 60,
  secondsLeft: 25 * 60,
  isRunning: false,
  timerInterval: null,

  setDuration(minutes) {
    this.pause();
    this.totalSeconds = minutes * 60;
    this.secondsLeft = this.totalSeconds;
    this.updateUI();
    if (window.cyberAudio) window.cyberAudio.playClick();
  },

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    if (window.cyberAudio) window.cyberAudio.playChirp();
    this.timerInterval = setInterval(() => {
      this.secondsLeft--;
      this.updateUI();
      if (this.secondsLeft <= 0) {
        this.finish();
      }
    }, 1000);
    this.updateUI();
  },

  pause() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.updateUI();
    if (window.cyberAudio) window.cyberAudio.playClick();
  },

  reset() {
    this.pause();
    this.secondsLeft = this.totalSeconds;
    this.updateUI();
    if (window.cyberAudio) window.cyberAudio.playClick();
  },

  finish() {
    this.pause();
    if (window.cyberAudio) {
      window.cyberAudio.playTimerAlarm();
    }
    const store = window.cyberStore;
    store.state.creds += 150;
    store.state.xp += 250;
    store.updateTier();
    store.addLog('COGNITIVE SPRINT COMPLETED: Full Focus Cycle Synced (+150 ₡, +250 KB)');
    store.save();
    alert('// COGNITIVE SPRINT COMPLETED! Wetware buffer refreshed. +150 ₡ / +250 KB harvested.');
  },

  updateUI() {
    const timeEl = document.getElementById('sprint-time-display');
    const circleEl = document.getElementById('sprint-circle-progress');
    const btnEl = document.getElementById('sprint-toggle-btn');
    if (!timeEl) return;

    const mins = Math.floor(this.secondsLeft / 60);
    const secs = this.secondsLeft % 60;
    timeEl.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    if (btnEl) {
      btnEl.innerHTML = this.isRunning
        ? `<span class="material-symbols-outlined text-[18px]">pause</span> PAUSE SPRINT`
        : `<span class="material-symbols-outlined text-[18px]">play_arrow</span> ENGAGE SPRINT`;
    }

    if (circleEl) {
      const radius = 50;
      const circumference = 2 * Math.PI * radius; // ~314.16
      const fraction = (this.totalSeconds - this.secondsLeft) / this.totalSeconds;
      const offset = circumference * (1 - fraction);
      circleEl.style.strokeDashoffset = offset;
    }
  }
};

window.hudFilter = 'all';

function setHudFilter(filter) {
  window.hudFilter = filter;
  window.cyberApp.renderCurrentView();
  if (window.cyberAudio) window.cyberAudio.playClick();
}

function renderHudView() {
  const s = window.cyberStore.state;
  const currentFilter = window.hudFilter || 'all';

  let filtered = s.contracts;
  if (currentFilter === 'pending') filtered = s.contracts.filter(c => !c.completed);
  if (currentFilter === 'synced') filtered = s.contracts.filter(c => c.completed);

  const syncedCount = s.contracts.filter(c => c.completed).length;

  return `
    <div class="flex flex-col w-full py-8 gap-space-lg animate-fadeIn">
      <!-- Section Breadcrumb & Title -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-space-md border-b border-outline-variant/20 pb-space-md">
        <div>
          <div class="flex items-center gap-space-xs font-code-sm text-code-sm text-primary-fixed-dim uppercase tracking-widest mb-1">
            <span class="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
            OPERATIONS DECK // LEVEL 04 DIRECTIVES
          </div>
          <h1 class="font-headline-lg text-headline-lg text-primary uppercase tracking-tight">TACTICAL OPERATIONS & HABIT PROTOCOLS</h1>
        </div>

        <div class="flex items-center gap-space-sm">
          <button onclick="window.cyberApp.openNewContractModal()" class="px-space-md py-space-xs bg-primary-container text-on-primary-container font-headline-sm text-headline-sm uppercase rounded-DEFAULT transition-all hover:bg-primary-fixed flex items-center gap-space-xs active:scale-95 shadow-md">
            <span class="material-symbols-outlined text-[18px]">add_task</span>
            INJECT BOUNTY
          </button>
        </div>
      </div>

      <!-- Main Command Grid: Left Contracts, Right Focus Engine & Biometrics -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <!-- Left 7 cols: Protocol Contracts -->
        <div class="lg:col-span-7 flex flex-col gap-space-md">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-low p-space-sm rounded-lg border border-outline-variant/20">
            <div class="flex items-center gap-space-xs">
              <button onclick="setHudFilter('all')" class="px-space-sm py-space-xs font-code-sm text-code-sm uppercase rounded ${currentFilter === 'all' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:text-primary'}">
                ALL (${s.contracts.length})
              </button>
              <button onclick="setHudFilter('pending')" class="px-space-sm py-space-xs font-code-sm text-code-sm uppercase rounded ${currentFilter === 'pending' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:text-primary'}">
                PENDING (${s.contracts.length - syncedCount})
              </button>
              <button onclick="setHudFilter('synced')" class="px-space-sm py-space-xs font-code-sm text-code-sm uppercase rounded ${currentFilter === 'synced' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:text-primary'}">
                SYNCED (${syncedCount})
              </button>
            </div>
            <span class="font-code-sm text-code-sm text-primary-fixed-dim">COMPLETION: ${Math.round((syncedCount / (s.contracts.length || 1)) * 100)}%</span>
          </div>

          <!-- Contracts Stack -->
          <div class="flex flex-col gap-space-sm">
            ${filtered.length === 0 ? `
              <div class="p-space-xl bg-surface-container rounded-lg text-center text-on-surface-variant border border-outline-variant/20">
                <span class="material-symbols-outlined text-[36px] text-primary-fixed-dim mb-2">task_alt</span>
                <p class="font-headline-sm uppercase">NO PROTOCOLS MATCH FILTER</p>
                <p class="font-code-sm mt-1">Inject a new custom bounty or adjust your active telemetry filter.</p>
              </div>
            ` : filtered.map(c => `
              <div class="group bg-surface-container hover:bg-surface-container-high transition-all p-space-md rounded-lg border ${c.completed ? 'border-primary-container/30 bg-surface-container-lowest/70' : 'border-outline-variant/20'} flex flex-col sm:flex-row sm:items-center justify-between gap-space-md relative overflow-hidden">
                <div class="flex items-start sm:items-center gap-space-md cursor-pointer flex-1" onclick="window.cyberStore.toggleContract('${c.id}')">
                  <div class="mt-1 sm:mt-0 flex-shrink-0">
                    <span class="material-symbols-outlined text-[24px] ${c.completed ? 'text-primary-container' : 'text-on-surface-variant group-hover:text-primary'} transition-colors">
                      ${c.completed ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                  </div>
                  <div class="flex flex-col">
                    <div class="flex items-center gap-space-xs flex-wrap">
                      <span class="font-label-lg text-label-lg ${c.completed ? 'text-primary-fixed-dim line-through opacity-70' : 'text-primary font-bold'} uppercase">
                        ${c.title}
                      </span>
                      <span class="text-xs px-1.5 py-0.5 rounded font-code-sm ${c.type === 'focus' ? 'badge-focus' : c.type === 'bio' ? 'badge-bio' : 'badge-neural'}">
                        ${c.type.toUpperCase()}
                      </span>
                    </div>
                    <span class="font-code-sm text-code-sm text-on-surface-variant mt-0.5">
                      ${c.subthread} ${c.completedAt ? `// FULFILLED AT ${c.completedAt}` : ''}
                    </span>
                  </div>
                </div>

                <div class="flex items-center justify-between sm:justify-end gap-space-sm self-stretch sm:self-center">
                  <span class="px-space-sm py-space-xs rounded bg-surface-container-lowest font-code-sm text-code-sm ${c.completed ? 'text-primary-container' : 'text-tertiary-fixed-dim font-bold'}">
                    ${c.completed ? 'HARVESTED' : `+${c.rewardCreds} ₡`}
                  </span>
                  <button onclick="window.cyberStore.deleteContract('${c.id}')" title="Purge directive" class="p-space-xs text-on-surface-variant hover:text-error transition-colors rounded">
                    <span class="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right 5 cols: Cognitive Sprint & Biometrics -->
        <div class="lg:col-span-5 flex flex-col gap-space-md">
          <!-- Cognitive Sprint Engine -->
          <div class="bg-surface-container p-space-md md:p-space-lg rounded-xl border border-primary/20 flex flex-col items-center text-center relative overflow-hidden shadow-lg">
            <div class="w-full flex items-center justify-between mb-space-md border-b border-outline-variant/20 pb-space-xs">
              <span class="font-label-lg text-label-lg text-on-surface uppercase tracking-wider flex items-center gap-1">
                <span class="material-symbols-outlined text-primary text-[18px]">timer</span>
                COGNITIVE SPRINT ENGINE
              </span>
              <span class="font-code-sm text-code-sm text-primary-container font-mono">POMODORO // A4</span>
            </div>

            <!-- Timer Presets -->
            <div class="flex items-center gap-space-xs mb-space-md">
              <button onclick="window.sprintTimer.setDuration(25)" class="px-space-sm py-space-xs bg-surface-container-low hover:bg-surface-container-high rounded font-code-sm text-code-sm text-primary border border-outline-variant/30">
                25M FOCUS
              </button>
              <button onclick="window.sprintTimer.setDuration(50)" class="px-space-sm py-space-xs bg-surface-container-low hover:bg-surface-container-high rounded font-code-sm text-code-sm text-primary border border-outline-variant/30">
                50M DEEP
              </button>
              <button onclick="window.sprintTimer.setDuration(90)" class="px-space-sm py-space-xs bg-surface-container-low hover:bg-surface-container-high rounded font-code-sm text-code-sm text-primary border border-outline-variant/30">
                90M SPRINT
              </button>
            </div>

            <!-- Circular Gauge -->
            <div class="relative flex items-center justify-center my-space-sm">
              <svg class="w-48 h-48 transform -rotate-90" viewBox="0 0 120 120">
                <circle class="text-surface-variant" cx="60" cy="60" fill="transparent" r="50" stroke="currentColor" stroke-width="8"></circle>
                <circle id="sprint-circle-progress" class="text-primary-container transition-all duration-1000" cx="60" cy="60" fill="transparent" r="50" stroke="currentColor" stroke-dasharray="314.159" stroke-dashoffset="0" stroke-linecap="round" stroke-width="8"></circle>
              </svg>
              <div class="absolute flex flex-col items-center justify-center text-center">
                <span id="sprint-time-display" class="font-display-lg text-display-lg text-primary tracking-wider font-mono">
                  ${Math.floor(window.sprintTimer.secondsLeft / 60).toString().padStart(2, '0')}:${(window.sprintTimer.secondsLeft % 60).toString().padStart(2, '0')}
                </span>
                <span class="font-code-sm text-code-sm text-tertiary-fixed-dim uppercase tracking-widest mt-1">NEURAL FOCUS</span>
              </div>
            </div>

            <!-- Control Buttons -->
            <div class="flex items-center gap-space-sm mt-space-md w-full justify-center">
              <button id="sprint-toggle-btn" onclick="window.sprintTimer.isRunning ? window.sprintTimer.pause() : window.sprintTimer.start()" class="px-space-lg py-space-xs bg-primary-container text-on-primary-container font-headline-sm text-headline-sm uppercase rounded transition-all hover:bg-primary-fixed flex items-center gap-1 active:scale-95">
                <span class="material-symbols-outlined text-[18px]">${window.sprintTimer.isRunning ? 'pause' : 'play_arrow'}</span>
                ${window.sprintTimer.isRunning ? 'PAUSE SPRINT' : 'ENGAGE SPRINT'}
              </button>
              <button onclick="window.sprintTimer.reset()" title="Reset Timer" class="p-space-xs bg-surface-container-high text-on-surface hover:text-primary rounded border border-outline-variant/30">
                <span class="material-symbols-outlined text-[18px]">restart_alt</span>
              </button>
            </div>

            <!-- Audio Neuro-Drone Toggle -->
            <div class="w-full mt-space-md pt-space-sm border-t border-outline-variant/20 flex items-center justify-between text-left">
              <div class="flex items-center gap-space-xs font-code-sm text-code-sm text-on-surface-variant">
                <span class="material-symbols-outlined text-[18px] text-secondary">graphic_eq</span>
                <span>NEURAL FOCUS DRONE (65Hz)</span>
              </div>
              <button onclick="const active = window.cyberAudio.toggleFocusDrone(); this.innerText = active ? 'DRONE: ON' : 'DRONE: OFF'; this.className = active ? 'font-code-sm text-code-sm px-space-xs py-0.5 rounded bg-primary-container text-on-primary-container font-bold' : 'font-code-sm text-code-sm px-space-xs py-0.5 rounded bg-surface-container-lowest text-on-surface-variant';" class="font-code-sm text-code-sm px-space-xs py-0.5 rounded bg-surface-container-lowest text-on-surface-variant">
                DRONE: ${window.cyberAudio.isDroneActive ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <!-- Biometrics Status Panel -->
          <div class="bg-surface-container p-space-md rounded-xl border border-outline-variant/20 flex flex-col gap-space-sm">
            <div class="flex items-center justify-between">
              <span class="font-label-lg text-label-lg text-on-surface uppercase tracking-wider">BIOMETRIC BUFFER</span>
              <span class="font-code-sm text-code-sm text-primary-fixed-dim">OPTIMAL</span>
            </div>
            
            <div class="space-y-space-xs">
              <div class="flex justify-between font-code-sm text-code-sm">
                <span class="text-on-surface-variant">CEREBRAL LOAD</span>
                <span class="text-primary font-mono">${s.overloadSync}%</span>
              </div>
              <div class="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                <div class="bg-primary-container h-full rounded-full" style="width: ${s.overloadSync}%"></div>
              </div>
            </div>

            <div class="space-y-space-xs">
              <div class="flex justify-between font-code-sm text-code-sm">
                <span class="text-on-surface-variant">BIO-CORE TEMPERATURE</span>
                <span class="text-tertiary-fixed-dim font-mono">${s.bioTemp}°C</span>
              </div>
              <div class="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                <div class="bg-tertiary-fixed-dim h-full rounded-full" style="width: 73%"></div>
              </div>
            </div>

            <button onclick="window.cyberStore.addLog('BUFFER PURGED: Thermal & memory dump successful.'); alert('Wetware cache purged. Thermal baseline normalized.');" class="w-full mt-2 py-space-xs bg-surface-container-high hover:bg-surface-bright text-primary font-code-sm text-code-sm uppercase rounded border border-outline-variant/30 flex items-center justify-center gap-1">
              <span class="material-symbols-outlined text-[16px]">cleaning_services</span>
              PURGE WETWARE CACHE
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
