/**
 * NEO-RUNNER // VIEW: BLACK MARKET // BAZAAR
 * Illicit wetware store, equipment slots, stat modifiers, and cosmetic shaders.
 */

function renderBazaarView() {
  const s = window.cyberStore.state;

  // Calculate equipped stats
  let totalInt = 0;
  let totalStr = 0;
  let totalOverclock = 0;

  Object.values(s.equipped).forEach(itemId => {
    if (!itemId) return;
    const item = s.bazaarItems.find(i => i.id === itemId);
    if (!item) return;

    const intVal = parseInt(item.intMod) || 0;
    const strVal = parseInt(item.strBuffer) || 0;
    const ocVal = parseFloat(item.overclock) || 0;

    totalInt += intVal;
    totalStr += strVal;
    totalOverclock += ocVal;
  });

  return `
    <div class="flex flex-col w-full py-8 gap-space-lg animate-fadeIn">
      <!-- Top Title & Balance Bar -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-space-md border-b border-outline-variant/20 pb-space-md">
        <div>
          <div class="flex items-center gap-space-xs font-code-sm text-code-sm text-tertiary-fixed-dim uppercase tracking-widest mb-1">
            <span class="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
            SHADOW MARKET PROTOCOL // ENCRYPTED NODE
          </div>
          <h1 class="font-headline-lg text-headline-lg text-primary uppercase tracking-tight">BLACK MARKET WETWARE BAZAAR</h1>
        </div>

        <div class="flex items-center gap-space-md bg-surface-container-low px-space-md py-space-xs rounded-DEFAULT border border-tertiary-fixed-dim/30">
          <div class="flex flex-col">
            <span class="font-code-sm text-code-sm text-on-surface-variant uppercase">HARVESTED BALANCE</span>
            <span class="font-headline-sm text-headline-sm text-tertiary-fixed-dim font-bold">${s.creds.toLocaleString()} ₡</span>
          </div>
          <div class="w-px h-8 bg-surface-variant"></div>
          <div class="flex flex-col">
            <span class="font-code-sm text-code-sm text-on-surface-variant uppercase">DECK XP BONUS</span>
            <span class="font-headline-sm text-headline-sm text-primary-container font-bold">+${totalOverclock.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      <!-- Equipped Arsenal Summary Row -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        <!-- Slot: Deck -->
        <div class="bg-surface-container p-space-md rounded-xl border border-primary/20 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-space-xs">
            <span class="font-code-sm text-code-sm text-on-surface-variant uppercase">SLOT 01 // CYBERDECK</span>
            <span class="text-xs px-1.5 py-0.5 rounded font-code-sm badge-focus">ACTIVE</span>
          </div>
          <div class="flex items-center gap-space-sm my-space-xs">
            <span class="material-symbols-outlined text-primary-container text-[24px]">terminal</span>
            <div>
              <span class="font-label-lg text-label-lg text-primary uppercase block">
                ${s.bazaarItems.find(i => i.id === s.equipped.deck)?.name || 'NONE EQUIPPED'}
              </span>
              <span class="font-code-sm text-code-sm text-on-surface-variant">Liquid Optical Bus</span>
            </div>
          </div>
          <div class="flex justify-between font-code-sm text-code-sm pt-space-xs border-t border-outline-variant/10 text-primary-fixed-dim">
            <span>INT: +15</span>
            <span>STR: +8</span>
            <span>XP: +24.5%</span>
          </div>
        </div>

        <!-- Slot: Cortex -->
        <div class="bg-surface-container p-space-md rounded-xl border border-secondary/20 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-space-xs">
            <span class="font-code-sm text-code-sm text-on-surface-variant uppercase">SLOT 02 // CORTEX SHUNT</span>
            <span class="text-xs px-1.5 py-0.5 rounded font-code-sm badge-neural">
              ${s.equipped.cortex ? 'ACTIVE' : 'EMPTY'}
            </span>
          </div>
          <div class="flex items-center gap-space-sm my-space-xs">
            <span class="material-symbols-outlined text-secondary text-[24px]">psychology</span>
            <div>
              <span class="font-label-lg text-label-lg text-secondary uppercase block">
                ${s.bazaarItems.find(i => i.id === s.equipped.cortex)?.name || 'SOCKET UNPOPULATED'}
              </span>
              <span class="font-code-sm text-code-sm text-on-surface-variant">Neural Synapse Mod</span>
            </div>
          </div>
          <div class="flex justify-between font-code-sm text-code-sm pt-space-xs border-t border-outline-variant/10 text-secondary">
            <span>${s.equipped.cortex ? 'ACTIVE MODIFIER LOADED' : 'AWAITING HARDWARE'}</span>
          </div>
        </div>

        <!-- Slot: Biometric -->
        <div class="bg-surface-container p-space-md rounded-xl border border-tertiary/20 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-space-xs">
            <span class="font-code-sm text-code-sm text-on-surface-variant uppercase">SLOT 03 // BIOMETRIC PATCH</span>
            <span class="text-xs px-1.5 py-0.5 rounded font-code-sm badge-bio">
              ${s.equipped.biometric ? 'ACTIVE' : 'EMPTY'}
            </span>
          </div>
          <div class="flex items-center gap-space-sm my-space-xs">
            <span class="material-symbols-outlined text-tertiary-fixed-dim text-[24px]">monitor_heart</span>
            <div>
              <span class="font-label-lg text-label-lg text-tertiary uppercase block">
                ${s.bazaarItems.find(i => i.id === s.equipped.biometric)?.name || 'SOCKET UNPOPULATED'}
              </span>
              <span class="font-code-sm text-code-sm text-on-surface-variant">Dermal Telemetry</span>
            </div>
          </div>
          <div class="flex justify-between font-code-sm text-code-sm pt-space-xs border-t border-outline-variant/10 text-tertiary-fixed-dim">
            <span>${s.equipped.biometric ? 'BIOMETRIC BUFFER ACTIVE' : 'AWAITING HARDWARE'}</span>
          </div>
        </div>
      </div>

      <!-- Wetware Item Catalog Grid -->
      <div class="flex flex-col gap-space-md">
        <div class="flex items-center justify-between">
          <span class="font-headline-sm text-headline-sm text-primary uppercase">ILLICIT WETWARE CATALOG</span>
          <span class="font-code-sm text-code-sm text-on-surface-variant uppercase">CRED TRANSACTION CONFIRMATION REQUIRED</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          ${s.bazaarItems.map(item => {
            const isOwned = s.inventory.includes(item.id);
            const isEquipped = Object.values(s.equipped).includes(item.id);
            const canAfford = s.creds >= item.price;

            return `
              <div class="bg-surface-container hover:bg-surface-container-high transition-all p-space-md rounded-xl border ${isEquipped ? 'border-primary-container shadow-[0_0_15px_rgba(0,240,255,0.2)]' : 'border-outline-variant/20'} flex flex-col justify-between gap-space-md">
                <div>
                  <div class="flex items-center justify-between mb-space-sm">
                    <span class="text-xs font-code-sm uppercase px-space-xs py-0.5 rounded bg-surface-container-lowest text-primary-fixed-dim">
                      SLOT: ${item.slot.toUpperCase()}
                    </span>
                    <span class="font-headline-sm text-headline-sm text-tertiary-fixed-dim font-bold">
                      ${item.price.toLocaleString()} ₡
                    </span>
                  </div>

                  <div class="flex items-center gap-space-sm mb-space-sm">
                    <span class="material-symbols-outlined text-[28px] text-primary-container">${item.icon || 'memory'}</span>
                    <h3 class="font-headline-sm text-headline-sm text-primary uppercase">${item.name}</h3>
                  </div>

                  <p class="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
                    ${item.desc}
                  </p>

                  <div class="grid grid-cols-3 gap-space-xs bg-surface-container-lowest p-space-xs rounded-DEFAULT font-code-sm text-code-sm text-center">
                    <div>
                      <span class="text-on-surface-variant block text-xs">INT</span>
                      <span class="text-primary-fixed-dim font-bold">${item.intMod}</span>
                    </div>
                    <div>
                      <span class="text-on-surface-variant block text-xs">STR</span>
                      <span class="text-tertiary-fixed-dim font-bold">${item.strBuffer}</span>
                    </div>
                    <div>
                      <span class="text-on-surface-variant block text-xs">OVERCLOCK</span>
                      <span class="text-primary-container font-bold">${item.overclock}</span>
                    </div>
                  </div>
                </div>

                <!-- Action Button -->
                <div class="pt-space-xs">
                  ${isEquipped ? `
                    <button disabled class="w-full py-space-xs bg-surface-container-lowest text-primary-container font-code-sm text-code-sm uppercase rounded border border-primary-container/40 flex items-center justify-center gap-1 cursor-default">
                      <span class="material-symbols-outlined text-[16px]">verified</span>
                      EQUIPPED IN ARSENAL
                    </button>
                  ` : isOwned ? `
                    <button onclick="window.cyberStore.equipItem('${item.id}')" class="w-full py-space-xs bg-surface-container-high hover:bg-surface-bright text-primary font-code-sm text-code-sm uppercase rounded border border-primary/30 flex items-center justify-center gap-1 transition-colors active:scale-95">
                      <span class="material-symbols-outlined text-[16px]">tune</span>
                      EQUIP HARDWARE
                    </button>
                  ` : `
                    <button onclick="window.cyberApp.purchaseItem('${item.id}')" ${!canAfford ? 'disabled' : ''} class="w-full py-space-xs ${canAfford ? 'bg-primary-container hover:bg-primary-fixed text-on-primary-container active:scale-95' : 'bg-surface-container-lowest text-on-surface-variant opacity-50 cursor-not-allowed'} font-headline-sm text-headline-sm uppercase rounded transition-all flex items-center justify-center gap-1">
                      <span class="material-symbols-outlined text-[18px]">shopping_cart</span>
                      ${canAfford ? `PROCURE // ${item.price} ₡` : `NEED ${item.price - s.creds} ₡ MORE`}
                    </button>
                  `}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}
