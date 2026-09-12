/**
 * NEO-RUNNER // VIEW: DOSSIER // RECORDS
 * Operator clearance identity, telemetry audit timeline, achievement badges, and data backup.
 */

function renderDossierView() {
  const s = window.cyberStore.state;

  // XP Tier Progress calculation
  const tierThresholds = [0, 2000, 5000, 8000, 12000, 20000];
  const currentTierBase = tierThresholds[s.tier - 1] || 0;
  const nextTierTarget = tierThresholds[s.tier] || 25000;
  const xpInTier = Math.max(0, s.xp - currentTierBase);
  const xpNeeded = nextTierTarget - currentTierBase;
  const tierPercent = Math.min(100, Math.round((xpInTier / xpNeeded) * 100));

  const badges = [
    { name: 'FIRST SYNC', desc: 'Complete your initial contract directive', unlocked: true, icon: 'military_tech' },
    { name: 'NEURAL DRIFT', desc: 'Surpass 10+ consecutive daily streaks', unlocked: s.streak >= 10, icon: 'bolt' },
    { name: 'SHADOW BROKER', desc: 'Procure 2+ black market wetware upgrades', unlocked: s.inventory.length >= 2, icon: 'storefront' },
    { name: 'DEEP RUNNER', desc: 'Accumulate over 8,000 KB wetware telemetry', unlocked: s.xp >= 8000, icon: 'psychology' },
    { name: 'TIER 05 OVERLORD', desc: 'Attain ultimate Shadowrunner clearance', unlocked: s.tier >= 5, icon: 'diamond' }
  ];

  return `
    <div class="flex flex-col w-full py-8 gap-space-lg animate-fadeIn">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-space-md border-b border-outline-variant/20 pb-space-md">
        <div>
          <div class="flex items-center gap-space-xs font-code-sm text-code-sm text-secondary uppercase tracking-widest mb-1">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            CONFIDENTIAL // OPERATOR CLEARANCE ARCHIVE
          </div>
          <h1 class="font-headline-lg text-headline-lg text-primary uppercase tracking-tight">DOSSIER & SYSTEM RECORDS</h1>
        </div>

        <div class="flex items-center gap-space-sm">
          <button onclick="window.cyberApp.exportData()" class="px-space-md py-space-xs bg-surface-container-high hover:bg-surface-bright text-primary font-code-sm text-code-sm uppercase rounded border border-outline-variant/30 flex items-center gap-1 transition-colors">
            <span class="material-symbols-outlined text-[16px]">file_download</span>
            EXPORT TELEMETRY
          </button>
          <button onclick="window.cyberApp.importData()" class="px-space-md py-space-xs bg-surface-container-high hover:bg-surface-bright text-primary font-code-sm text-code-sm uppercase rounded border border-outline-variant/30 flex items-center gap-1 transition-colors">
            <span class="material-symbols-outlined text-[16px]">file_upload</span>
            IMPORT
          </button>
        </div>
      </div>

      <!-- Operator ID Card & Level Progress -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <!-- Identity Card -->
        <div class="lg:col-span-4 bg-surface-container p-space-md rounded-xl border border-secondary/30 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div class="absolute -right-12 -top-12 w-40 h-40 bg-secondary/10 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div class="flex items-center justify-between mb-space-md border-b border-outline-variant/20 pb-space-xs">
              <span class="font-code-sm text-code-sm text-secondary uppercase tracking-wider">NEO-RUNNER ID // #0094-8X</span>
              <span class="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
            </div>

            <div class="flex items-center gap-space-md mb-space-md">
              <img alt="Profile" class="w-16 h-16 rounded-lg object-cover ring-2 ring-primary/50 shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD183awqQ_GCZtP5O8NMYZ3y_QQPNgJlks74_JjLIVTXp-qBKHnRQgvZlcaU41KlMiBfNHj9IzMLap-mcPtaoOrisLoGeSdk1RD-kXrRfXqa2pIllAIdAC6s5fQS-fbDF2X8W3GcO-ZpF-OZwcRLkiLaQpQsyGK1MVNFLjzVf93w6TYKRsndMIjMcr_8dU5jVfqe1_fvS4uXA_G_g3SA7XwS0wmobsJwcNUT6tv4t8wOLPhkT2FfW_C">
              <div class="flex flex-col">
                <span class="font-headline-md text-headline-md text-primary font-bold uppercase">${s.callsign}</span>
                <span class="font-code-sm text-code-sm text-tertiary-fixed-dim uppercase tracking-widest font-bold">CLEARANCE TIER 0${s.tier}</span>
                <span class="font-code-sm text-code-sm text-on-surface-variant">NODE: 0x88F-SEC // 12ms</span>
              </div>
            </div>

            <!-- Tier Level Progress -->
            <div class="space-y-space-xs bg-surface-container-lowest p-space-sm rounded-DEFAULT mb-space-md">
              <div class="flex justify-between font-code-sm text-code-sm">
                <span class="text-on-surface-variant uppercase">TIER 0${s.tier} -> TIER 0${s.tier + 1} PROGRESS</span>
                <span class="text-secondary font-mono">${tierPercent}%</span>
              </div>
              <div class="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                <div class="bg-secondary h-full rounded-full transition-all duration-500" style="width: ${tierPercent}%"></div>
              </div>
              <div class="flex justify-between font-code-sm text-code-sm text-on-surface-variant pt-1 text-xs">
                <span>CURRENT: ${s.xp.toLocaleString()} KB</span>
                <span>TARGET: ${nextTierTarget.toLocaleString()} KB</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-space-xs pt-space-xs border-t border-outline-variant/10 text-center font-code-sm text-code-sm">
            <div class="bg-surface-container-lowest p-space-xs rounded">
              <span class="text-on-surface-variant uppercase block text-xs">ACTIVE STREAK</span>
              <span class="text-primary-fixed font-bold text-sm">${s.streak} CONSECUTIVE DAYS</span>
            </div>
            <div class="bg-surface-container-lowest p-space-xs rounded">
              <span class="text-on-surface-variant uppercase block text-xs">TOTAL CREDS</span>
              <span class="text-tertiary-fixed-dim font-bold text-sm">${s.creds.toLocaleString()} ₡</span>
            </div>
          </div>
        </div>

        <!-- Right 8 cols: Badges & Telemetry Logs -->
        <div class="lg:col-span-8 flex flex-col gap-space-md">
          <!-- Protocol Badges -->
          <div class="bg-surface-container p-space-md rounded-xl border border-outline-variant/20">
            <div class="flex items-center justify-between mb-space-sm border-b border-outline-variant/20 pb-space-xs">
              <span class="font-label-lg text-label-lg text-on-surface uppercase tracking-wider">PROTOCOL CLEARANCE BADGES</span>
              <span class="font-code-sm text-code-sm text-primary-fixed-dim">${badges.filter(b => b.unlocked).length} OF ${badges.length} UNLOCKED</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-sm">
              ${badges.map(b => `
                <div class="p-space-sm rounded-lg border ${b.unlocked ? 'border-primary-container/30 bg-surface-container-low' : 'border-outline-variant/10 bg-surface-container-lowest opacity-40'} flex items-center gap-space-sm">
                  <span class="material-symbols-outlined text-[24px] ${b.unlocked ? 'text-primary-container' : 'text-on-surface-variant'}">${b.icon}</span>
                  <div class="flex flex-col">
                    <span class="font-code-sm text-code-sm ${b.unlocked ? 'text-primary font-bold' : 'text-on-surface-variant'} uppercase">${b.name}</span>
                    <span class="text-xs font-code-sm text-on-surface-variant leading-tight">${b.desc}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Real-Time Telemetry Event Log -->
          <div class="bg-surface-container p-space-md rounded-xl border border-outline-variant/20 flex flex-col flex-1">
            <div class="flex items-center justify-between mb-space-sm border-b border-outline-variant/20 pb-space-xs">
              <span class="font-label-lg text-label-lg text-on-surface uppercase tracking-wider">TELEMETRY AUDIT TRAIL</span>
              <button onclick="window.cyberStore.state.logs = []; window.cyberStore.save();" class="text-xs font-code-sm text-on-surface-variant hover:text-error uppercase">
                CLEAR LOGS
              </button>
            </div>

            <div class="space-y-1.5 font-code-sm text-code-sm overflow-y-auto max-h-60 pr-1">
              ${s.logs.length === 0 ? `
                <div class="text-on-surface-variant italic py-4 text-center">NO RECENT TELEMETRY EVENTS RECORDED.</div>
              ` : s.logs.map(log => `
                <div class="flex items-start gap-space-sm text-xs bg-surface-container-lowest/60 p-space-xs rounded border-l-2 border-primary-container">
                  <span class="text-primary-fixed-dim font-mono font-bold flex-shrink-0">[${log.time}]</span>
                  <span class="text-on-surface">${log.event}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
