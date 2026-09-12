/**
 * NEO-RUNNER // MASTER APPLICATION CONTROLLER
 * Handles view routing, navigation bindings, state subscriptions, and modals.
 */

class CyberApp {
  constructor() {
    this.currentView = 'portal-intro';
    this.mainContainer = null;
  }

  init() {
    this.mainContainer = document.getElementById('view-container');
    
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
    window.cyberTerminal.init();
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
  }

  // Contract Injection Modal
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

  submitNewContract(e) {
    e.preventDefault();
    const title = document.getElementById('contract-title-input').value;
    const subthread = document.getElementById('contract-thread-input').value;
    const type = document.getElementById('contract-type-select').value;
    const creds = document.getElementById('contract-creds-input').value;
    const xp = document.getElementById('contract-xp-input').value;

    window.cyberStore.addContract({
      title,
      subthread,
      type,
      rewardCreds: creds,
      rewardXp: xp
    });

    this.closeNewContractModal();
    document.getElementById('contract-form').reset();
  }

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
