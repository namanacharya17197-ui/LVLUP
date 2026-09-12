# NEO-RUNNER // PROTOCOL [LVLUP]

<div align="center">

```
  _  _ ___ ___     ___ _   _ _  _ _  _ ___ ___ 
 | \| | __/ _ \___| _ \ | | | \| | \| | __| _ \
 | .` | _| (_) |___|   / |_| | .` | .` | _||   /
 |_|\_|___\___/   |_|_\\___/|_|\_|_|\_|___|_|_\
```

**Wetware Augmentation & Gamified Cyberdeck Operating Environment**

[![Status: Operational](https://img.shields.io/badge/SYS-OPERATIONAL-00f0ff?style=for-the-badge&logo=codeforces&logoColor=black)](https://github.com/namanacharya17197-ui/LVLUP)
[![Audio: WebAudio API](https://img.shields.io/badge/AUDIO-PROCEDURAL%20SYNTH-dfb7ff?style=for-the-badge&logo=soundcharts&logoColor=black)](https://github.com/namanacharya17197-ui/LVLUP)
[![UI: Tailwind CSS](https://img.shields.io/badge/STACK-TAILWIND%20%2B%20VANILLA%20JS-ffba20?style=for-the-badge&logo=tailwindcss&logoColor=black)](https://github.com/namanacharya17197-ui/LVLUP)
[![Clearance: Tier 04](https://img.shields.io/badge/CLEARANCE-TIER%2004-00dbe9?style=for-the-badge&logo=shield&logoColor=black)](https://github.com/namanacharya17197-ui/LVLUP)

</div>

---

## ⚡ Overview

**NEO-RUNNER // PROTOCOL** is a dark cyberpunk, terminal-grade productivity web application engineered for operators who treat daily habits, deep work sprints, and self-optimization as high-stakes tactical contracts.

Designed with an authentic cyberdeck aesthetic—featuring retro CRT scanline shaders, procedural sound synthesis, holographic gauges, dynamic clearance tiering, and a black-market wetware loadout.

---

## 🚀 Key Modules & Capabilities

### 1. 🌐 Portal // Intro
- **Holographic Wetware Status Preview**: Real-time overload sync gauge (88%), bio-core thermal monitoring (36.7°C), and active telemetry telemetry hex codes.
- **Protocol Pipeline**: Visual three-stage doctrine: *Stage 01: Log Bounties*, *Stage 02: Burn Subroutines*, and *Stage 03: Harvest & Tier Up*.
- **Tactical Uplink Buttons**: Rapid routing to Operations HUD and instantaneous shell access.

### 2. 🎛️ Operations // HUD
- **Daily Protocol Directives**: Filter bounties by `ALL`, `PENDING`, and `SYNCED`. Check off completed objectives to immediately harvest Creds (₡) and XP telemetry (KB).
- **Directive Injector**: Custom modal form to forge new contracts with tailored sub-threads, categories (Focus, Bio, Neural), and bounty rewards.
- **Cognitive Sprint Engine**:
  - Pomodoro/Sprint focus presets (25M Focus, 50M Deep, 90M Sprint).
  - SVG circular countdown progress gauge.
  - Procedural completion alarms and bounty payout bonuses upon sprint victory.
  - Built-in **65Hz Neural Focus Drone** generator for auditory isolation.
- **Biometrics Telemetry Buffer**: Live cerebral load status and one-click memory cache flush.

### 3. 🛍️ Black Market // Bazaar
- **Three Equipment Sockets**:
  - `SLOT 01 // CYBERDECK` (e.g. *MK-VII Wetdeck*, *Optic Shifter HUD*)
  - `SLOT 02 // CORTEX SHUNT` (e.g. *Neural Cryo-Buffer*, *Exo-Synapse V9*)
  - `SLOT 03 // BIOMETRIC PATCH` (e.g. *Nano-Transducer Patch*)
- **Live Stat Modifiers**: Calculates dynamic buffs (+INT Mod, +STR Buffer, and +% XP Overclock).
- **Transaction Engine**: Validate balances in Creds (₡) before procurement, updating operator inventory and equipping items in real time.

### 4. 🪪 Dossier // Records
- **Operator Identity Card**: Displaying callsign `CYBER_NOMAD`, node ID, ping telemetry, and clearance tier progression (Tier 01 through Tier 05).
- **Protocol Clearance Badges**: Milestone achievements (*First Sync*, *Neural Drift*, *Shadow Broker*, *Deep Runner*, *Tier 05 Overlord*).
- **Telemetry Audit Trail**: Live timestamped event logging.
- **Data Portability**: Full JSON export and import routines for local backup and restore.

### 5. 🎧 Procedural Web Audio Engine
Zero external audio files or MP3 dependencies. Sounds are procedurally synthesized on the fly via the browser's native **Web Audio API**:
- High-tech clicks & chirps
- Multi-tone bounty harvest harmonic fanfare
- Bandpass-filtered glitch static bursts
- Heavy sawtooth tactical sprint alarm
- Continuous 65Hz low-frequency neural drone

### 6. 📟 Cyberdeck Terminal CLI
Interactive UNIX-style terminal shell accessible with `ACCESS TERMINAL` or the header terminal icon:
```bash
> status          # Display operator stats, creds, and equipped hardware
> contracts       # List active protocol directives
> claim cnt-02    # Fulfill a contract by ID directly from CLI
> bazaar          # View black-market wetware inventory
> buy cortex-cryo # Procure wetware upgrades
> audio           # Toggle procedural audio synthesizer
> matrix          # Stream quantum cyber deck feed
> clear           # Flush terminal buffer
> exit            # Exit shell
```

---

## 📂 Project Architecture

```
neo-runner/
├── index.html               # Main single-page application shell & modal dialogs
├── README.md                # Project documentation and architecture guide
├── css/
│   └── cyber-effects.css    # CRT scanlines, neon bloom, cyber-panel borders
└── js/
    ├── app.js               # Master application controller & navigation routing
    ├── audio.js             # Web Audio API procedural sound synthesizer
    ├── store.js             # Central reactive state manager & LocalStorage sync
    ├── terminal.js          # Interactive command-line terminal emulator
    └── views/
        ├── portal.js        # PORTAL // INTRO view renderer
        ├── hud.js           # OPERATIONS // HUD view renderer (timer + bounties)
        ├── bazaar.js        # BLACK MARKET // BAZAAR view renderer (shop + loadout)
        └── dossier.js       # DOSSIER // RECORDS view renderer (profile + logs)
```

---

## ⚡ Quick Start

The application has **zero build steps** and **zero runtime dependencies**.

### Option 1: Live Static Server
Run a lightweight HTTP server in the repository directory:

```bash
# Python 3
python -m http.server 8080

# Or Node.js (npx)
npx serve .
```

Open your browser and navigate to:
```
http://localhost:8080/index.html
```

### Option 2: Direct Browser Execution
Simply double-click `index.html` or open it in any modern Chromium, Firefox, or Safari browser.

---

## 🎨 Design System & Visuals

- **Typography**: 
  - Headlines & Titles: `Space Grotesk`
  - Data & Code Telemetry: `JetBrains Mono`
- **Color Palette**:
  - Primary Cyan: `#00f0ff` (Active state, neon glow)
  - Secondary Purple: `#dfb7ff` (Neural sub-threads, deep stats)
  - Tertiary Gold: `#ffba20` (Cred currency, alerts)
  - Void Surface: `#10131a` (Deep cyberdeck background)

---

## 📄 License & Credits

Built for rogue operators. All cognitive rights reserved. Released under the [MIT License](LICENSE).
