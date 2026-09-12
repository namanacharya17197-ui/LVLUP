/**
 * NEO-RUNNER // VIEW: PORTAL // INTRO
 * Landing screen, high-level wetware telemetry, protocol pipeline, and initialization triggers.
 */

function renderPortalView() {
  const s = window.cyberStore.state;
  const equippedDeck = s.bazaarItems.find(i => i.id === s.equipped.deck) || s.bazaarItems[0];
  const syncedCount = s.contracts.filter(c => c.completed).length;
  const totalCount = s.contracts.length;

  return `
    <div class="flex flex-col w-full animate-fadeIn">
      <!-- Hero Section -->
      <section class="relative w-full overflow-hidden pt-12 pb-24">
        <div class="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_20%,#00f0ff_0%,transparent_60%)]"></div>
        <div class="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.8)_51%),linear-gradient(to_right,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[length:100%_4px,32px_100%]"></div>
        <div class="relative max-w-[1280px] mx-auto flex flex-col items-center text-center">
          <div class="inline-flex items-center gap-space-sm px-space-md py-space-xs bg-surface-container-low rounded-DEFAULT mb-space-lg shadow-sm border border-outline-variant/30">
            <span class="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
            <span class="font-code-sm text-code-sm text-primary-fixed-dim uppercase tracking-widest">SYS.VER 4.09.2 // WETWARE AUGMENTATION SUITE</span>
            <span class="text-on-surface-variant font-code-sm text-code-sm">|</span>
            <span class="font-code-sm text-code-sm text-tertiary-fixed-dim">NET_LATENCY: 4.8MS</span>
          </div>
          
          <h1 class="font-display-lg text-display-lg text-primary uppercase max-w-4xl tracking-tight transition-all duration-300 hover:tracking-wide select-none drop-shadow-[0_0_24px_rgba(0,240,255,0.35)]">
            UPGRADE YOUR WETWARE.<br>
            <span class="text-primary-container">EXECUTE LIFE OPERATIONS.</span>
          </h1>
          
          <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-space-md mb-space-xl">
            Gamify daily habits, deploy cognitive subroutines, and harvest high-yield Creds in an immersive cyberdeck operating environment engineered for rogue operators.
          </p>

          <div class="flex flex-wrap items-center justify-center gap-space-md mb-20">
            <button onclick="window.cyberApp.navigate('operations-hud')" class="group relative px-space-xl py-space-md bg-primary-container text-on-primary-container font-headline-sm text-headline-sm uppercase rounded-DEFAULT transition-all duration-200 hover:shadow-[0_0_24px_rgba(0,240,255,0.7)] hover:bg-primary-fixed flex items-center gap-space-sm active:scale-95" type="button">
              <span class="material-symbols-outlined text-[20px]">bolt</span>
              INITIALIZE RUNNER
              <span class="text-xs opacity-75 font-code-sm text-code-sm">// 0xACT</span>
            </button>
            <button onclick="window.cyberTerminal.open()" class="group px-space-xl py-space-md bg-surface-container-high text-primary font-headline-sm text-headline-sm uppercase rounded-DEFAULT transition-all duration-200 hover:bg-surface-bright flex items-center gap-space-sm active:scale-95 border border-outline-variant/30" type="button">
              <span class="material-symbols-outlined text-[20px] text-primary-fixed-dim">terminal</span>
              ACCESS TERMINAL
              <span class="inline-block w-2 h-4 bg-primary-container animate-pulse"></span>
            </button>
          </div>

          <!-- 3D Holographic Deck Preview -->
          <div class="relative w-full max-w-5xl [perspective:1200px]">
            <div class="relative bg-surface-container-low p-space-md md:p-space-lg rounded-xl shadow-2xl transition-transform duration-500 hover:[transform:rotateX(2deg)_scale(1.01)] [transform:rotateX(5deg)] border border-primary/20">
              <div class="flex items-center justify-between pb-space-sm mb-space-md bg-surface-container-lowest px-space-md py-space-xs rounded-DEFAULT border-b border-outline-variant/20">
                <div class="flex items-center gap-space-sm">
                  <span class="w-2.5 h-2.5 rounded-full bg-error"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                  <span class="font-code-sm text-code-sm text-on-surface-variant uppercase ml-space-xs">// PROTOCOL_TELEMETRY // DECK_OS_V9.2.1</span>
                </div>
                <div class="flex items-center gap-space-md font-code-sm text-code-sm">
                  <span class="text-primary-fixed-dim">CORE_LOAD: 34.2%</span>
                  <span class="text-on-surface-variant">NODE_HEX: #07F89B</span>
                </div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-md text-left">
                <!-- Neural Overcharge Gauge -->
                <div class="lg:col-span-4 bg-surface-container p-space-md rounded-lg flex flex-col justify-between border border-outline-variant/20">
                  <div>
                    <div class="flex items-center justify-between mb-space-sm">
                      <span class="font-label-lg text-label-lg text-on-surface uppercase tracking-wider">NEURAL OVERCHARGE</span>
                      <span class="font-code-sm text-code-sm text-primary-container">TIER 0${s.tier}</span>
                    </div>
                    <div class="relative flex items-center justify-center py-space-sm">
                      <svg class="w-40 h-40 transform -rotate-90" viewBox="0 0 120 120">
                        <circle class="text-surface-variant" cx="60" cy="60" fill="transparent" r="50" stroke="currentColor" stroke-width="8"></circle>
                        <circle class="text-primary-container" cx="60" cy="60" fill="transparent" r="50" stroke="currentColor" stroke-dasharray="314.159" stroke-dashoffset="37.69" stroke-linecap="round" stroke-width="8"></circle>
                        <circle class="text-secondary-container opacity-40" cx="60" cy="60" fill="transparent" r="38" stroke="currentColor" stroke-dasharray="238.76" stroke-dashoffset="71.6" stroke-linecap="round" stroke-width="3"></circle>
                      </svg>
                      <div class="absolute flex flex-col items-center justify-center text-center">
                        <span class="font-display-lg text-headline-lg text-primary tracking-tighter">${s.overloadSync}%</span>
                        <span class="font-code-sm text-code-sm text-tertiary-fixed-dim uppercase tracking-widest">OVERLOAD SYNC</span>
                      </div>
                    </div>
                  </div>
                  <div class="bg-surface-container-lowest p-space-sm rounded-DEFAULT space-y-space-xs mt-space-sm">
                    <div class="flex justify-between font-code-sm text-code-sm">
                      <span class="text-on-surface-variant">BIO-CORE TEMPERATURE</span>
                      <span class="text-primary">${s.bioTemp}°C OPTIMAL</span>
                    </div>
                    <div class="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                      <div class="bg-primary-fixed-dim h-full w-3/4 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <!-- Contracts Teaser List -->
                <div class="lg:col-span-5 flex flex-col gap-space-sm">
                  <div class="flex items-center justify-between px-space-xs">
                    <span class="font-label-lg text-label-lg text-on-surface uppercase tracking-wider">ACTIVE PROTOCOL CONTRACTS</span>
                    <span class="font-code-sm text-code-sm text-primary-fixed-dim">${syncedCount} OF ${totalCount} SYNCED</span>
                  </div>

                  ${s.contracts.slice(0, 3).map(c => `
                    <div onclick="window.cyberStore.toggleContract('${c.id}')" class="cursor-pointer bg-surface-container p-space-md rounded-lg flex items-center justify-between group hover:bg-surface-container-high transition-colors border border-outline-variant/10">
                      <div class="flex items-center gap-space-md">
                        <span class="material-symbols-outlined ${c.completed ? 'text-primary-container' : 'text-on-surface-variant group-hover:text-primary'} text-[20px] transition-colors">
                          ${c.completed ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        <div class="flex flex-col">
                          <span class="font-label-lg text-label-lg ${c.completed ? 'text-primary-fixed-dim line-through opacity-80' : 'text-primary'} uppercase">${c.title}</span>
                          <span class="font-code-sm text-code-sm text-on-surface-variant tracking-wider">${c.subthread}</span>
                        </div>
                      </div>
                      <span class="px-space-sm py-space-xs rounded-DEFAULT bg-surface-container-lowest ${c.completed ? 'text-primary-container' : 'text-tertiary-fixed-dim'} font-code-sm text-code-sm uppercase">
                        ${c.completed ? 'SYNCED' : `+${c.rewardCreds} ₡`}
                      </span>
                    </div>
                  `).join('')}
                </div>

                <!-- Runner Arsenal Teaser -->
                <div class="lg:col-span-3 bg-surface-container p-space-md rounded-lg flex flex-col justify-between border border-outline-variant/20">
                  <div class="space-y-space-sm">
                    <div class="flex items-center justify-between">
                      <span class="font-label-lg text-label-lg text-on-surface uppercase tracking-wider">RUNNER ARSENAL</span>
                      <span class="font-code-sm text-code-sm text-tertiary-fixed-dim">EQUIPPED</span>
                    </div>
                    <div class="relative w-full h-28 rounded-lg overflow-hidden bg-surface-container-lowest border border-outline-variant/30">
                      <img class="w-full h-full object-cover" src="${equippedDeck.img || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEqZvLgGMGiW1nW6bHPmwvi-h4CeYckGskhZjssHyCBCwQ4sjORAWmIFhLpmhl7hZMw9QDwMGt45WNX68H-I4dAgZoCcpAciroPwu2VvbXFdxqTiAB2HTotXS88R4tlkSzFwj2UMHzVKIS01--YJpLkPIoabGPTP6uiMjaVAD1GxmyPYoEc5kFYLdkz2XuYkLiIvnBcYHC_BYlbMh_hrvt7Kw_zLIiif-cq02IBKTk_DluQMEO9Hbk'}">
                      <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
                      <div class="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                        <span class="font-code-sm text-code-sm text-primary font-bold">${equippedDeck.name}</span>
                        <span class="font-code-sm text-code-sm text-primary-container uppercase">SLOT-01</span>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-space-xs pt-space-xs">
                      <div class="bg-surface-container-lowest p-space-xs rounded text-center border border-outline-variant/20">
                        <span class="font-code-sm text-code-sm text-on-surface-variant uppercase block">INT MOD</span>
                        <span class="font-label-lg text-label-lg text-primary-fixed-dim">${equippedDeck.intMod || '+15 PTS'}</span>
                      </div>
                      <div class="bg-surface-container-lowest p-space-xs rounded text-center border border-outline-variant/20">
                        <span class="font-code-sm text-code-sm text-on-surface-variant uppercase block">STR BUFFER</span>
                        <span class="font-label-lg text-label-lg text-tertiary-fixed-dim">${equippedDeck.strBuffer || '+8 PTS'}</span>
                      </div>
                    </div>
                  </div>
                  <div class="mt-space-sm pt-space-sm bg-surface-container-high p-space-sm rounded-DEFAULT flex items-center justify-between border border-primary/20">
                    <span class="font-code-sm text-code-sm text-on-surface-variant uppercase">DECK OVERCLOCK</span>
                    <span class="font-code-sm text-code-sm text-primary-container font-bold">${equippedDeck.overclock || '+24.5% XP'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tactical Workflow Section -->
      <section class="relative w-full py-20 bg-surface-container-lowest/50 border-t border-b border-outline-variant/20">
        <div class="max-w-[1280px] mx-auto">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-space-md">
            <div>
              <div class="flex items-center gap-space-sm mb-space-xs">
                <span class="w-1.5 h-3 bg-primary-container"></span>
                <span class="font-code-sm text-code-sm text-primary-fixed-dim uppercase tracking-widest">TACTICAL WORKFLOW</span>
              </div>
              <h2 class="font-headline-lg text-headline-lg text-primary uppercase tracking-tight">THE PROTOCOL PIPELINE</h2>
            </div>
            <div class="font-code-sm text-code-sm text-on-surface-variant uppercase tracking-wider">
              PHASE TRANSITION METRICS // AUTONOMOUS REINFORCEMENT
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-space-lg relative">
            <div class="bg-surface-container p-space-lg rounded-xl flex flex-col justify-between relative group hover:bg-surface-container-high transition-all border border-outline-variant/20 hover:border-primary/40">
              <div class="space-y-space-md">
                <div class="flex items-center justify-between">
                  <span class="font-code-sm text-code-sm text-primary-container px-space-sm py-space-xs bg-surface-container-lowest rounded-DEFAULT font-bold">STAGE 01</span>
                  <span class="material-symbols-outlined text-primary text-[28px]">assignment_add</span>
                </div>
                <h3 class="font-headline-md text-headline-md text-primary uppercase">LOG BOUNTIES</h3>
                <p class="font-body-md text-body-md text-on-surface-variant">
                  Convert chaotic real-world daily tasks, high-impact career micro-goals, and fitness regimes into executable tactical contracts loaded with dynamic bounty yields.
                </p>
              </div>
              <div class="mt-space-lg pt-space-md bg-surface-container-lowest p-space-sm rounded-DEFAULT flex items-center justify-between">
                <span class="font-code-sm text-code-sm text-on-surface-variant uppercase">TELEMETRY TAG</span>
                <span class="font-code-sm text-code-sm text-primary-fixed-dim font-bold">DATA_INGEST_OK</span>
              </div>
            </div>

            <div class="bg-surface-container p-space-lg rounded-xl flex flex-col justify-between relative group hover:bg-surface-container-high transition-all border border-outline-variant/20 hover:border-tertiary-fixed-dim/40">
              <div class="space-y-space-md">
                <div class="flex items-center justify-between">
                  <span class="font-code-sm text-code-sm text-tertiary-fixed-dim px-space-sm py-space-xs bg-surface-container-lowest rounded-DEFAULT font-bold">STAGE 02</span>
                  <span class="material-symbols-outlined text-tertiary-fixed-dim text-[28px]">electric_bolt</span>
                </div>
                <h3 class="font-headline-md text-headline-md text-tertiary uppercase">BURN SUBROUTINES</h3>
                <p class="font-body-md text-body-md text-on-surface-variant">
                  Engage focus sprints using audio neuro-drives, lock down physical streaks, and systematically annihilate cognitive burnout nodes before your mental buffer collapses.
                </p>
              </div>
              <div class="mt-space-lg pt-space-md bg-surface-container-lowest p-space-sm rounded-DEFAULT flex items-center justify-between">
                <span class="font-code-sm text-code-sm text-on-surface-variant uppercase">EXECUTION RATE</span>
                <span class="font-code-sm text-code-sm text-tertiary-fixed-dim font-bold">98.4% RETENTION</span>
              </div>
            </div>

            <div class="bg-surface-container p-space-lg rounded-xl flex flex-col justify-between relative group hover:bg-surface-container-high transition-all border border-outline-variant/20 hover:border-secondary/40">
              <div class="space-y-space-md">
                <div class="flex items-center justify-between">
                  <span class="font-code-sm text-code-sm text-secondary px-space-sm py-space-xs bg-surface-container-lowest rounded-DEFAULT font-bold">STAGE 03</span>
                  <span class="material-symbols-outlined text-secondary text-[28px]">workspace_premium</span>
                </div>
                <h3 class="font-headline-md text-headline-md text-secondary uppercase">HARVEST & TIER UP</h3>
                <p class="font-body-md text-body-md text-on-surface-variant">
                  Accumulate encrypted cyber Creds to unlock illicit wetware cosmetics, specialized cyberdeck terminal shaders, and elevate to revered Level 04 Shadowrunner clearance.
                </p>
              </div>
              <div class="mt-space-lg pt-space-md bg-surface-container-lowest p-space-sm rounded-DEFAULT flex items-center justify-between">
                <span class="font-code-sm text-code-sm text-on-surface-variant uppercase">NET PAYOUT</span>
                <span class="font-code-sm text-code-sm text-secondary font-bold">CRED_TRANSFER_RDY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Direct Uplink CTA -->
      <section class="w-full py-20">
        <div class="max-w-[1280px] mx-auto bg-surface-container-low p-space-lg md:p-space-xl rounded-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-space-lg border border-primary/30 shadow-[0_0_30px_rgba(0,240,255,0.15)]">
          <div class="absolute -right-16 -top-16 w-80 h-80 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="flex flex-col max-w-xl text-left">
            <div class="flex items-center gap-space-xs font-code-sm text-code-sm text-primary-fixed-dim mb-space-xs">
              <span class="w-2 h-2 bg-primary-container rounded-full animate-pulse"></span>
              DIRECT TERMINAL UPLINK AVAILABLE
            </div>
            <h3 class="font-headline-lg text-headline-lg text-primary uppercase tracking-tight">READY TO DEPLOY YOUR OPERATING ENVIRONMENT?</h3>
            <p class="font-body-md text-body-md text-on-surface-variant mt-space-xs">Connect your cognitive stack to NEO-RUNNER and take supreme mastery over your habits and focus.</p>
          </div>
          <div class="flex items-center gap-space-md w-full md:w-auto">
            <button onclick="window.cyberApp.navigate('operations-hud')" class="w-full md:w-auto px-space-xl py-space-md bg-primary-container text-on-primary-container font-headline-sm text-headline-sm uppercase rounded-DEFAULT transition-all duration-200 hover:shadow-[0_0_24px_rgba(0,240,255,0.7)] flex items-center justify-center gap-space-sm active:scale-95" type="button">
              <span class="material-symbols-outlined text-[20px]">login</span>
              INITIALIZE NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  `;
}
