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
[![Database: Supabase](https://img.shields.io/badge/DATABASE-SUPABASE%20POSTGRES-3ecf8e?style=for-the-badge&logo=supabase&logoColor=white)](https://github.com/namanacharya17197-ui/LVLUP)
[![Audio: WebAudio API](https://img.shields.io/badge/AUDIO-PROCEDURAL%20SYNTH-dfb7ff?style=for-the-badge&logo=soundcharts&logoColor=black)](https://github.com/namanacharya17197-ui/LVLUP)
[![UI: Tailwind CSS](https://img.shields.io/badge/STACK-TAILWIND%20%2B%20VANILLA%20JS-ffba20?style=for-the-badge&logo=tailwindcss&logoColor=black)](https://github.com/namanacharya17197-ui/LVLUP)

</div>

---

## ⚡ Overview

**NEO-RUNNER // PROTOCOL** is a dark cyberpunk, terminal-grade productivity web application engineered for operators who treat daily habits, deep work sprints, and self-optimization as high-stakes tactical contracts.

Designed with an authentic cyberdeck aesthetic—featuring retro CRT scanline shaders, procedural sound synthesis, holographic gauges, dynamic clearance tiering, a black-market wetware loadout, and **production-grade Supabase cloud persistence**.

---

## 🗄️ Database Architecture (Supabase PostgreSQL)

The application features a relational database model in [`supabase/schema.sql`](supabase/schema.sql) supporting **full CRUD operations** with real-time cloud synchronization and offline fallback:

```
┌────────────────────────────────┐       ┌────────────────────────────────┐
│             users              │       │      character_attributes      │
├────────────────────────────────┤       ├────────────────────────────────┤
│ id (UUID, PK)                  │───┐   │ id (UUID, PK)                  │
│ callsign (TEXT)                │   └───│ user_id (UUID, FK)             │
│ tier (INT 1-5)                 │       │ int_mod (INT)                  │
│ creds (INT)                    │       │ str_buffer (INT)               │
│ xp (INT)                       │       │ overclock_pct (NUMERIC)        │
│ streak (INT)                   │       │ equipped_deck (TEXT)           │
│ overload_sync (NUMERIC)        │       │ equipped_cortex (TEXT)         │
│ bio_temp (NUMERIC)             │       │ equipped_biometric (TEXT)      │
│ created_at / updated_at        │       │ inventory (JSONB)              │
└────────────────────────────────┘       └────────────────────────────────┘
                 │
                 │ 1:N
                 ▼
┌────────────────────────────────┐
│             tasks              │
├────────────────────────────────┤
│ id (UUID, PK)                  │
│ user_id (UUID, FK)             │
│ title (TEXT)                   │
│ subthread (TEXT)               │
│ type ('focus'|'bio'|'neural')  │
│ reward_creds (INT)             │
│ reward_xp (INT)                │
│ completed (BOOLEAN)            │
│ completed_at (TIMESTAMPTZ)     │
│ created_at / updated_at        │
└────────────────────────────────┘
```

### Key Schema Features
- **Users Table**: Central identity holding clearance tier, accumulated Creds (₡), XP Telemetry (KB), and daily streak counts.
- **Character Attributes Table**: Normalized attributes linked to each user—calculating dynamic Intelligence, Strength buffer, and Overclock bonuses based on active gear slots.
- **Tasks Table (Protocol Contracts)**: Full Task specification supporting **C**reate, **R**ead, **U**pdate, and **D**elete actions with constraint validation and automatic timestamp triggers.
- **Row Level Security (RLS)**: Pre-configured access control policies.

---

## 🚀 Key Modules & Capabilities

### 1. 🌐 Portal // Intro
- **Holographic Wetware Status Preview**: Real-time overload sync gauge (88%), bio-core thermal monitoring (36.7°C), and active telemetry telemetry hex codes.
- **Protocol Pipeline**: Visual three-stage doctrine: *Stage 01: Log Bounties*, *Stage 02: Burn Subroutines*, and *Stage 03: Harvest & Tier Up*.
- **Tactical Uplink Buttons**: Rapid routing to Operations HUD and instantaneous shell access.

### 2. 🎛️ Operations // HUD & Task CRUD
- **Create**: Click **INJECT BOUNTY** to add custom contracts with sub-thread categories, bounty yields (Creds & XP), and category tags.
- **Read**: Live contract list with quick filtering (`ALL`, `PENDING`, `SYNCED`) and completion metrics.
- **Update**:
  - Check off directives to harvest rewards (awards Creds/XP and updates clearance tier in Supabase).
  - Click the **Edit button (pencil icon)** on any contract to reconfigure its title, subthread, category, or reward payouts.
- **Delete**: Click the **Purge button (trash icon)** to cleanly remove tasks from the database.
- **Cognitive Sprint Engine**:
  - Pomodoro focus presets (25M Focus, 50M Deep, 90M Sprint).
  - SVG circular countdown progress gauge with procedural alarms.
  - Built-in **65Hz Neural Focus Drone** generator for auditory isolation.

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
- **Data Portability**: Full JSON export and import routines.

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
├── sync.bat                 # One-click Windows Git sync utility
├── sync.ps1                 # PowerShell Git sync script
├── supabase/
│   └── schema.sql           # PostgreSQL DDL schema for Users, Tasks, and Attributes
├── css/
│   └── cyber-effects.css    # CRT scanlines, neon bloom, cyber-panel borders
└── js/
    ├── app.js               # Master application controller & modal handlers
    ├── audio.js             # Web Audio API procedural sound synthesizer
    ├── store.js             # Central reactive state manager & Supabase bridge
    ├── supabase.js          # Supabase client service & task CRUD controller
    ├── terminal.js          # Interactive command-line terminal emulator
    └── views/
        ├── portal.js        # PORTAL // INTRO view renderer
        ├── hud.js           # OPERATIONS // HUD view renderer (timer + bounties)
        ├── bazaar.js        # BLACK MARKET // BAZAAR view renderer (shop + loadout)
        └── dossier.js       # DOSSIER // RECORDS view renderer (profile + logs)
```

---

## ⚡ Quick Start

### 1. Launch Application
Run a lightweight HTTP server in the repository directory:

```bash
# Python 3
python -m http.server 8080

# Or Node.js
npx serve .
```

Navigate to: `http://localhost:8080/index.html`

### 2. Connect Supabase (Optional Cloud Sync)
1. In your [Supabase Dashboard](https://supabase.com), create a new project.
2. Go to the **SQL Editor**, paste the contents of [`supabase/schema.sql`](supabase/schema.sql), and click **Run**.
3. In the application header, click **DB: LOCAL CACHE** (or **SUPABASE UPLINK** on the Operations HUD).
4. Enter your `Project URL` and `Anon / Public Key`, then click **CONNECT & SYNC**.

*Note: If no Supabase credentials are provided, the application runs automatically on high-performance local cache mode (`localStorage`).*

---

## ⛩️ ThreeUI Component: `<KageLandingPage />`

The authored **Kage temple experience** from ThreeUI is integrated byte-for-byte with its original navigation, scroll scenes, vermilion lanterns, and local Three.js world.

### Configured Usage

```tsx
import { KageLandingPage } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <KageLandingPage
        headingFont="onest"
        bodyFont="onest"
        headingWeight="400"
        bodyWeight="300"
        primaryColor="#e0231c"
        headingSize={46}
        bodySize={17}
        headingLetterSpacing={-0.012}
      />
    </div>
  );
}
```

### Verified Assets & Source Revision (`SHA-256 c8e06b90397a`)
- **Component**: [`src/shaders/landing-pages/LandingPages.tsx`](src/shaders/landing-pages/LandingPages.tsx) (SHA-256 `4d379461ad00...`)
- **Frame Controller**: [`src/shaders/landing-pages/LandingPageFrame.tsx`](src/shaders/landing-pages/LandingPageFrame.tsx) (SHA-256 `61de2cc508...`)
- **Typography Recipe**: [`src/shaders/landing-pages/pageRecipes.ts`](src/shaders/landing-pages/pageRecipes.ts) (SHA-256 `c9d9849cc2...`)
- **Canonical HTML**: [`public/landing-pages/kage.html`](public/landing-pages/kage.html) (SHA-256 `c8e06b90397a...`)
- **Runtime & Fonts**: `three.min.js` (SHA-256 `8a5f7249...`) & `fonts.css` (SHA-256 `985f85a9...`)
- **14 High-Res WebP Assets**: Sanmon gate, approach, lantern court, moonwater, pine trees, sakura branches, and basalt stones byte-verified.
- **Interactive Live Preview**: [`http://localhost:8088/kage-preview.html`](kage-preview.html) (or click **⛩️ KAGE // TEMPLE** in the header).

---

## 📄 License & Credits

Built for rogue operators. All cognitive rights reserved. Released under the [MIT License](LICENSE).
