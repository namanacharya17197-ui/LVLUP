/**
 * NEO-RUNNER // STATE STORE
 * Reactive state management with local persistence and subscriber updates.
 */

const DEFAULT_STATE = {
  creds: 2450,
  xp: 8420,
  streak: 14,
  callsign: 'CYBER_NOMAD',
  tier: 4,
  overloadSync: 88,
  bioTemp: 36.7,
  contracts: [
    {
      id: 'cnt-01',
      title: 'EXECUTE DEEP FOCUS 90M',
      subthread: 'COGNITIVE SPRINT // SUB-THREAD A4',
      type: 'focus',
      rewardCreds: 350,
      rewardXp: 450,
      completed: true,
      completedAt: '09:42:15'
    },
    {
      id: 'cnt-02',
      title: 'NEURAL RUN 5.0 KM',
      subthread: 'BIOMETRIC SYNC // GPS ANCHOR L2',
      type: 'bio',
      rewardCreds: 280,
      rewardXp: 350,
      completed: false,
      completedAt: null
    },
    {
      id: 'cnt-03',
      title: 'METABOLIC HYDRATION 2.5L',
      subthread: 'CELLULAR OSMOSIS PROTOCOL',
      type: 'neural',
      rewardCreds: 150,
      rewardXp: 200,
      completed: false,
      completedAt: null
    },
    {
      id: 'cnt-04',
      title: 'SYSTEM CALIBRATION // FLUSH',
      subthread: 'TERMINAL MEMORY SCRUB',
      type: 'focus',
      rewardCreds: 120,
      rewardXp: 180,
      completed: false,
      completedAt: null
    }
  ],
  equipped: {
    deck: 'mk-vii',
    cortex: null,
    biometric: 'nano-patch'
  },
  inventory: ['mk-vii', 'nano-patch'],
  bazaarItems: [
    {
      id: 'mk-vii',
      name: 'MK-VII WETDECK',
      slot: 'deck',
      price: 1800,
      intMod: '+15 PTS',
      strBuffer: '+8 PTS',
      overclock: '+24.5% XP',
      desc: 'High-contrast illuminated mechanical deck with liquid-cooled optical bus relays.',
      icon: 'terminal',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEqZvLgGMGiW1nW6bHPmwvi-h4CeYckGskhZjssHyCBCwQ4sjORAWmIFhLpmhl7hZMw9QDwMGt45WNX68H-I4dAgZoCcpAciroPwu2VvbXFdxqTiAB2HTotXS88R4tlkSzFwj2UMHzVKIS01--YJpLkPIoabGPTP6uiMjaVAD1GxmyPYoEc5kFYLdkz2XuYkLiIvnBcYHC_BYlbMh_hrvt7Kw_zLIiif-cq02IBKTk_DluQMEO9Hbk'
    },
    {
      id: 'cortex-cryo',
      name: 'NEURAL CRYO-BUFFER',
      slot: 'cortex',
      price: 1250,
      intMod: '+28 PTS',
      strBuffer: '+0 PTS',
      overclock: '+15.0% XP',
      desc: 'Sub-zero cerebral shunt preventing synaptic heat dissipation during long deep focus sessions.',
      icon: 'ac_unit'
    },
    {
      id: 'nano-patch',
      name: 'NANO-TRANSDUCER PATCH',
      slot: 'biometric',
      price: 850,
      intMod: '+5 PTS',
      strBuffer: '+18 PTS',
      overclock: '+8.0% XP',
      desc: 'Direct dermal electrode cluster monitoring cellular lactate and mitochondrial fatigue.',
      icon: 'monitor_heart'
    },
    {
      id: 'glitch-visor',
      name: 'OPTIC SHIFTER HUD',
      slot: 'deck',
      price: 2400,
      intMod: '+35 PTS',
      strBuffer: '+12 PTS',
      overclock: '+30.0% XP',
      desc: 'Retinal HUD displaying real-time bounty markers and high-frequency quantum feeds.',
      icon: 'visibility'
    },
    {
      id: 'quantum-core',
      name: 'EXO-SYNAPSE V9',
      slot: 'cortex',
      price: 3500,
      intMod: '+50 PTS',
      strBuffer: '+25 PTS',
      overclock: '+50.0% XP',
      desc: 'Restricted black-market neuro-chip bypassing standard wetware safety thresholds.',
      icon: 'psychology'
    }
  ],
  logs: [
    { time: '11:45:02', event: 'UPLINK ESTABLISHED WITH DECK_OS_V9.2.1' },
    { time: '10:14:28', event: 'BOUNTY CLAIMED: EXECUTE DEEP FOCUS 90M (+350 ₡)' },
    { time: '08:00:10', event: 'DAILY COGNITIVE STREAK VERIFIED // DAY 14' }
  ]
};

class Store {
  constructor() {
    this.state = this.load();
    this.listeners = [];
  }

  load() {
    try {
      const saved = localStorage.getItem('neo_runner_state');
      if (saved) {
        return { ...DEFAULT_STATE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to parse saved state:', e);
    }
    return { ...DEFAULT_STATE };
  }

  save() {
    try {
      localStorage.setItem('neo_runner_state', JSON.stringify(this.state));
    } catch (e) {}
    this.notify();
  }

  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  // State actions
  toggleContract(id) {
    const contract = this.state.contracts.find(c => c.id === id);
    if (!contract) return null;

    contract.completed = !contract.completed;
    if (contract.completed) {
      const now = new Date();
      contract.completedAt = now.toTimeString().split(' ')[0];
      this.state.creds += contract.rewardCreds;
      this.state.xp += contract.rewardXp;
      this.updateTier();
      this.addLog(`CONTRACT FULFILLED: ${contract.title} (+${contract.rewardCreds} ₡, +${contract.rewardXp} KB)`);
      if (window.cyberAudio) window.cyberAudio.playBountyClaim();
    } else {
      this.state.creds = Math.max(0, this.state.creds - contract.rewardCreds);
      this.state.xp = Math.max(0, this.state.xp - contract.rewardXp);
      this.updateTier();
      this.addLog(`CONTRACT REOPENED: ${contract.title}`);
      if (window.cyberAudio) window.cyberAudio.playClick();
    }
    this.save();
    return contract;
  }

  addContract({ title, subthread, type, rewardCreds, rewardXp }) {
    const newContract = {
      id: 'cnt-' + Date.now().toString(36),
      title: (title || 'CUSTOM PROTOCOL').toUpperCase(),
      subthread: (subthread || 'USER DIRECTIVE // THREAD-X').toUpperCase(),
      type: type || 'focus',
      rewardCreds: Number(rewardCreds) || 150,
      rewardXp: Number(rewardXp) || 200,
      completed: false,
      completedAt: null
    };
    this.state.contracts.unshift(newContract);
    this.addLog(`NEW DIRECTIVE INJECTED: ${newContract.title}`);
    this.save();
    if (window.cyberAudio) window.cyberAudio.playChirp();
    return newContract;
  }

  deleteContract(id) {
    this.state.contracts = this.state.contracts.filter(c => c.id !== id);
    this.addLog(`CONTRACT PURGED: ${id}`);
    this.save();
  }

  buyItem(itemId) {
    const item = this.state.bazaarItems.find(i => i.id === itemId);
    if (!item) return { success: false, msg: 'Item not found' };
    if (this.state.inventory.includes(itemId)) {
      return { success: false, msg: 'Item already acquired' };
    }
    if (this.state.creds < item.price) {
      if (window.cyberAudio) window.cyberAudio.playGlitch();
      return { success: false, msg: 'Insufficient Creds (₡)' };
    }

    this.state.creds -= item.price;
    this.state.inventory.push(itemId);
    this.equipItem(itemId);
    this.addLog(`BLACK MARKET TRANSACTION: Purchased ${item.name} (-${item.price} ₡)`);
    this.save();
    if (window.cyberAudio) window.cyberAudio.playPurchase();
    return { success: true, item };
  }

  equipItem(itemId) {
    const item = this.state.bazaarItems.find(i => i.id === itemId);
    if (!item) return;
    this.state.equipped[item.slot] = itemId;
    this.addLog(`ARSENAL RECONFIGURED: Equipped ${item.name} in slot [${item.slot.toUpperCase()}]`);
    this.save();
    if (window.cyberAudio) window.cyberAudio.playClick();
  }

  updateTier() {
    // 0 - 2000: Tier 1
    // 2001 - 5000: Tier 2
    // 5001 - 8000: Tier 3
    // 8001 - 12000: Tier 4
    // 12001+: Tier 5
    let newTier = 1;
    if (this.state.xp >= 12000) newTier = 5;
    else if (this.state.xp >= 8000) newTier = 4;
    else if (this.state.xp >= 5000) newTier = 3;
    else if (this.state.xp >= 2000) newTier = 2;

    if (newTier !== this.state.tier) {
      const prev = this.state.tier;
      this.state.tier = newTier;
      this.addLog(`PROMOTION: ELEVATED TO CLEARANCE TIER 0${newTier}`);
      if (window.cyberAudio) window.cyberAudio.playBountyClaim();
    }
  }

  addLog(event) {
    const time = new Date().toTimeString().split(' ')[0];
    this.state.logs.unshift({ time, event });
    if (this.state.logs.length > 30) this.state.logs.pop();
  }

  resetAll() {
    this.state = { ...DEFAULT_STATE };
    this.save();
  }
}

window.cyberStore = new Store();
