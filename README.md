<div align="center">

# ✦ Debashree Mal — Portfolio OS

**A macOS-inspired, interactive developer portfolio built with React, Three.js & Framer Motion.**

[![Live Demo](https://img.shields.io/badge/▶_LIVE_DEMO-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://debashree-portfolio.vercel.app)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)

<br/>

> *Not just a portfolio — an operating system experience.*
> 
> Every section is a window. Every interaction is intentional. Explore it the way you'd explore a desktop.

<br/>

</div>

---

## 🖥️ Concept

Portfolio OS reimagines the traditional developer portfolio as a **desktop operating system**. Instead of scrolling through a static page, visitors interact with a fully animated macOS-style interface — complete with a **dock**, **draggable panels**, a **custom cursor**, **ambient lighting**, and a **3D robot mascot** rendered in real-time.

<br/>

## ⚡ Key Features

| Feature | Description |
|---|---|
| **🤖 3D Robot Mascot** | GLB model rendered via React Three Fiber with idle animations and an intro sequence |
| **🖱️ macOS-Style Dock** | Animated dock bar with Lord Icon hover effects and panel switching |
| **🪟 Windowed Panels** | Six panels (About, Projects, Skills, Terminal, Resume, Contact) with traffic-light close buttons |
| **🎨 Cursor Glow** | A mouse-tracking ambient glow effect applied across the entire viewport |
| **🌀 Skills Orbit** | Canvas-rendered orbital skill visualization with hover tooltips and particle effects |
| **🎠 Circular Gallery** | 3D perspective-scrolling project showcase with auto-playing screenshot carousels |
| **⌨️ Hacker Terminal** | Typewriter-animated terminal panel with neofetch-style personal info |
| **📜 Scrambled Text** | Text reveal animations with character scrambling and rotating text effects |
| **🔮 ChromaGrid** | Interactive contact card grid with radial gradient hover tracking |
| **🧈 Smooth Scroll** | Lenis-powered buttery smooth scrolling throughout the experience |

<br/>

## 🛠️ Tech Stack

<div align="center">

| Layer | Technologies |
|---|---|
| **Framework** | React 19 · TypeScript · Vite |
| **3D & Animation** | Three.js · React Three Fiber · React Three Drei |
| **Motion** | Framer Motion · GSAP |
| **Smooth Scroll** | Lenis |
| **Icons** | React Icons · Lord Icon |
| **Styling** | Vanilla CSS with CSS Variables & Glassmorphism |
| **Fonts** | Inter · JetBrains Mono · Syne (Google Fonts) |

</div>

<br/>

## 📂 Project Structure

```
├── public/
│   ├── robot.glb              # 3D robot model
│   ├── icons/                 # Lord Icon JSON files
│   ├── Pluto/                 # Project screenshots
│   ├── Zwiggy/
│   └── Flowmind/
├── src/
│   ├── App.tsx                # Root — layout, panel state, Lenis init
│   ├── main.tsx               # Entry point
│   ├── index.css              # Global styles, design tokens, animations
│   ├── types.ts               # Shared TypeScript types
│   ├── components/
│   │   ├── Robot.tsx           # Three.js 3D robot with intro sequence
│   │   ├── Dock.tsx            # macOS-style animated dock bar
│   │   ├── MenuBar.tsx         # Top menu bar
│   │   ├── CustomCursor.tsx    # Custom cursor component
│   │   ├── SkillsOrbit.tsx     # Canvas orbital skill visualization
│   │   ├── RotatingText.tsx    # Rotating text animation
│   │   └── TextType.tsx        # Typewriter text effect
│   └── components/panels/
│       ├── AboutPanel.tsx      # Profile card with tilted avatar
│       ├── ProjectsPanel.tsx   # Circular gallery + card swap showcase
│       ├── SkillsPanel.tsx     # Skills orbit wrapper
│       ├── TerminalPanel.tsx   # Hacker-style terminal with neofetch
│       ├── ResumePanel.tsx     # Resume / CV viewer
│       └── ContactPanel.tsx    # ChromaGrid contact cards
├── index.html                 # HTML shell with preloaded assets
├── vite.config.ts
├── tsconfig.json
└── package.json
```

<br/>

## 🚀 Featured Projects

### PLUTO — Student Growth Ecosystem
> **Live · Production** &nbsp;|&nbsp; React · Next.js · Node.js · Supabase · Groq · Firebase  
> More than event discovery — a complete student growth ecosystem with campus opportunities, auto-built portfolios, and cross-college collaboration.

### ZWIGGY — Disguised Safety App
> **App** &nbsp;|&nbsp; React · Vite · Twilio · Leaflet  
> Looks like a food app. Works like a safety net. AI detects distress and auto-alerts trusted contacts via a hidden 3-tap + PIN trigger.

### FLOWMIND — AI Project Manager
> **Hackathon** &nbsp;|&nbsp; React · Hindsight · Groq AI · Supabase  
> An AI project manager that learns your team and predicts failures before they happen.

<br/>

## 🏁 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/Dovieee30/Debashree-PORTFOLIO.git
cd Debashree-PORTFOLIO

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

<br/>

## 📬 Get in Touch

<div align="center">

[![Email](https://img.shields.io/badge/Email-debashreee87@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:debashreee87@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Debashree_Mal-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/debashree-mal-4a6214370)
[![GitHub](https://img.shields.io/badge/GitHub-Dovieee30-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Dovieee30)

</div>

<br/>

---

<div align="center">

**Computer Engineering · 2nd Year · SGPA 9.72**

Built with ☕ and a relentless drive to create what's missing.

<sub>© 2026 Debashree Mal. All rights reserved.</sub>

</div>

