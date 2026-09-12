/**
 * NEO-RUNNER // MASTER APPLICATION CONTROLLER
 * Handles view routing, navigation bindings, state subscriptions, and modals.
 */

class CyberApp {
  constructor() {
    this.currentView = 'portal-intro';
    this.mainContainer = null;
  }

  async init() {
    this.mainContainer = document.getElementById('view-container');
    
    // Initialize Supabase service if credentials exist
    if (window.cyberSupabase) {
      await window.cyberSupabase.init();
      await window.cyberStore.syncWithSupabase();
    }

    // Subscribe to store updates to keep UI synchronized
    window.cyberStore.subscribe(() => {
      this.updateHeaderTelemetry();
      this.renderCurrentView();
    });

    // Handle audio engine toggle
    const audioBtn = document.getElementById('audio-toggle-btn');
    if (audioBtn) {
      this.updateAudioButtonUI(audioBtn);
      audioBtn.addEventListener('click', () => {
        const unmuted = window.cyberAudio.toggleMute();
        this.updateAudioButtonUI(audioBtn);
      });
    }

    // Handle glitch / CRT toggle
    const shaderBtn = document.getElementById('shader-toggle-btn');
    if (shaderBtn) {
      shaderBtn.addEventListener('click', () => {
        document.body.classList.toggle('crt-active');
        if (window.cyberAudio) window.cyberAudio.playGlitch();
      });
    }

    // Bind navigation tabs
    document.querySelectorAll('nav a[data-path]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const path = link.getAttribute('data-path');
        this.navigate(path);
      });
    });

    // Check URL hash if present
    const hash = window.location.hash.replace('#', '');
    if (hash && ['portal-intro', 'operations-hud', 'black-market-bazaar', 'dossier-records'].includes(hash)) {
      this.navigate(hash);
    } else {
      this.renderCurrentView();
    }

    this.updateHeaderTelemetry();
    if (window.cyberTerminal) window.cyberTerminal.init();
  }

  updateAudioButtonUI(btn) {
    const isMuted = window.cyberAudio.muted;
    btn.innerHTML = `<span class="material-symbols-outlined text-[18px]">${isMuted ? 'volume_off' : 'volume_up'}</span>`;
    btn.title = isMuted ? 'Audio Synthesizer: MUTED' : 'Audio Synthesizer: ONLINE';
    btn.className = `p-space-xs ${isMuted ? 'text-error' : 'text-primary-container'} hover:bg-surface-container transition-colors`;
  }

  navigate(viewName) {
    this.currentView = viewName;
    window.location.hash = viewName;
    if (window.cyberAudio) window.cyberAudio.playClick();

    // Update nav active classes
    document.querySelectorAll('nav a[data-path]').forEach(link => {
      const path = link.getAttribute('data-path');
      if (path === viewName) {
        link.className = 'px-space-md py-space-xs transition-all tracking-wider uppercase bg-primary-container text-on-primary-container font-headline-sm rounded-DEFAULT shadow-sm';
        link.setAttribute('aria-current', 'page');
      } else {
        link.className = 'px-space-md py-space-xs text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all font-label-lg text-label-lg tracking-wider uppercase';
        link.removeAttribute('aria-current');
      }
    });

    this.renderCurrentView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderCurrentView() {
    if (!this.mainContainer) return;

    switch (this.currentView) {
      case 'portal-intro':
        this.mainContainer.innerHTML = renderPortalView();
        break;
      case 'operations-hud':
        this.mainContainer.innerHTML = renderHudView();
        window.sprintTimer.updateUI();
        break;
      case 'black-market-bazaar':
        this.mainContainer.innerHTML = renderBazaarView();
        break;
      case 'dossier-records':
        this.mainContainer.innerHTML = renderDossierView();
        break;
      default:
        this.mainContainer.innerHTML = renderPortalView();
    }

    if (window.cyberSupabase) {
      window.cyberSupabase.updateStatusBadge();
    }
  }

  updateHeaderTelemetry() {
    const s = window.cyberStore.state;
    const credsEl = document.getElementById('header-creds');
    const streakEl = document.getElementById('header-streak');
    const xpEl = document.getElementById('header-xp');
    const tierEl = document.getElementById('header-tier');

    if (credsEl) credsEl.innerText = `${s.creds.toLocaleString()} ₡`;
    if (streakEl) streakEl.innerText = `${s.streak} DAYS`;
    if (xpEl) xpEl.innerText = `${s.xp.toLocaleString()} KB`;
    if (tierEl) tierEl.innerText = `TIER 0${s.tier}`;

    if (window.cyberSupabase) {
      window.cyberSupabase.updateStatusBadge();
    }
  }

  // ======================================================================
  // CONTRACT MODALS: CREATE & UPDATE
  // ======================================================================

  openNewContractModal() {
    const modal = document.getElementById('contract-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      if (window.cyberAudio) window.cyberAudio.playChirp();
      const input = document.getElementById('contract-title-input');
      if (input) setTimeout(() => input.focus(), 50);
    }
  }

  closeNewContractModal() {
    const modal = document.getElementById('contract-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      if (window.cyberAudio) window.cyberAudio.playClick();
    }
  }

  async submitNewContract(e) {
    e.preventDefault();
    const title = document.getElementById('contract-title-input').value;
    const subthread = document.getElementById('contract-thread-input').value;
    const type = document.getElementById('contract-type-select').value;
    const creds = document.getElementById('contract-creds-input').value;
    const xp = document.getElementById('contract-xp-input').value;

    await window.cyberStore.addContract({
      title,
      subthread,
      type,
      rewardCreds: creds,
      rewardXp: xp
    });

    this.closeNewContractModal();
    document.getElementById('contract-form').reset();
    this.renderCurrentView();
  }

  openEditContractModal(id) {
    const contract = window.cyberStore.state.contracts.find(c => c.id === id);
    if (!contract) return;

    const modal = document.getElementById('edit-contract-modal');
    if (!modal) return;

    document.getElementById('edit-contract-id').value = contract.id;
    document.getElementById('edit-contract-title-input').value = contract.title;
    document.getElementById('edit-contract-thread-input').value = contract.subthread;
    document.getElementById('edit-contract-type-select').value = contract.type;
    document.getElementById('edit-contract-creds-input').value = contract.rewardCreds;
    document.getElementById('edit-contract-xp-input').value = contract.rewardXp;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.cyberAudio) window.cyberAudio.playChirp();
  }

  closeEditContractModal() {
    const modal = document.getElementById('edit-contract-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      if (window.cyberAudio) window.cyberAudio.playClick();
    }
  }

  async submitEditContract(e) {
    e.preventDefault();
    const id = document.getElementById('edit-contract-id').value;
    const title = document.getElementById('edit-contract-title-input').value;
    const subthread = document.getElementById('edit-contract-thread-input').value;
    const type = document.getElementById('edit-contract-type-select').value;
    const creds = document.getElementById('edit-contract-creds-input').value;
    const xp = document.getElementById('edit-contract-xp-input').value;

    await window.cyberStore.updateContract(id, {
      title,
      subthread,
      type,
      rewardCreds: creds,
      rewardXp: xp
    });

    this.closeEditContractModal();
    this.renderCurrentView();
  }

  // ======================================================================
  // SUPABASE CONFIG MODAL
  // ======================================================================

  openSupabaseModal() {
    const modal = document.getElementById('supabase-modal');
    if (!modal) return;

    const urlInput = document.getElementById('supabase-url-input');
    const keyInput = document.getElementById('supabase-key-input');
    if (urlInput) urlInput.value = window.cyberSupabase.url;
    if (keyInput) keyInput.value = window.cyberSupabase.anonKey;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.cyberAudio) window.cyberAudio.playChirp();
  }

  closeSupabaseModal() {
    const modal = document.getElementById('supabase-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      if (window.cyberAudio) window.cyberAudio.playClick();
    }
  }

  async submitSupabaseConfig(e) {
    e.preventDefault();
    const url = document.getElementById('supabase-url-input').value.trim();
    const key = document.getElementById('supabase-key-input').value.trim();

    const statusEl = document.getElementById('supabase-modal-status');
    if (statusEl) {
      statusEl.innerText = '// Testing cloud uplink...';
      statusEl.className = 'font-code-sm text-xs text-primary-fixed-dim';
    }

    const res = await window.cyberSupabase.configure(url, key);
    if (res.success) {
      if (statusEl) {
        statusEl.innerText = '// SUPABASE CLOUD UPLINK ONLINE!';
        statusEl.className = 'font-code-sm text-xs text-primary-container font-bold';
      }
      await window.cyberStore.syncWithSupabase();
      setTimeout(() => {
        this.closeSupabaseModal();
        this.renderCurrentView();
      }, 700);
    } else {
      if (statusEl) {
        statusEl.innerText = `// UPLINK FAILED: ${res.error}`;
        statusEl.className = 'font-code-sm text-xs text-error font-bold';
      }
      if (window.cyberAudio) window.cyberAudio.playGlitch();
    }
  }

  disconnectSupabase() {
    if (confirm('Disconnect from Supabase cloud database and revert to local storage?')) {
      window.cyberSupabase.disconnect();
      this.closeSupabaseModal();
      this.renderCurrentView();
    }
  }

  // ======================================================================
  // ARSENAL & DATA OPERATIONS
  // ======================================================================

  purchaseItem(itemId) {
    const res = window.cyberStore.buyItem(itemId);
    if (!res.success) {
      alert(`// TRANSACTION REJECTED: ${res.msg}`);
    } else {
      this.renderCurrentView();
    }
  }

  exportData() {
    const jsonStr = JSON.stringify(window.cyberStore.state, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neo-runner-telemetry-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    if (window.cyberAudio) window.cyberAudio.playChirp();
  }

  importData() {
    const input = prompt('Paste telemetry JSON payload here:');
    if (!input) return;
    try {
      const parsed = JSON.parse(input);
      window.cyberStore.state = { ...window.cyberStore.state, ...parsed };
      window.cyberStore.save();
      alert('// TELEMETRY IMPORT SUCCESSFUL.');
      if (window.cyberAudio) window.cyberAudio.playBountyClaim();
    } catch (e) {
      alert('// ERROR: Corrupted telemetry JSON string.');
    }
  }
}

window.cyberApp = new CyberApp();

document.addEventListener('DOMContentLoaded', () => {
  window.cyberApp.init();
});
