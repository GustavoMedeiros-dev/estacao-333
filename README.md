<div align="center">

# 🚉 Estação 3:33

**One detective. One AI. No return in sight.**

A pixel-art point-and-click detective game that runs entirely in the browser.

[![Play now](https://img.shields.io/badge/▶_Play_now-GitHub_Pages-e8b04a?style=for-the-badge)](https://YOUR-USERNAME.github.io/estacao-333/)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![Canvas](https://img.shields.io/badge/Canvas_2D-333333?style=flat-square)
![Web Audio](https://img.shields.io/badge/Web_Audio_API-5a4a8a?style=flat-square)
![No dependencies](https://img.shields.io/badge/dependencies-none-success?style=flat-square)

🇺🇸 English · [🇧🇷 Português](README.pt-BR.md)

</div>

---

## 📖 Table of contents

- [About](#-about)
- [The story](#-the-story)
- [Features](#-features)
- [The cases](#-the-cases)
- [Getting started](#-getting-started)
- [Controls](#-controls)
- [Tech stack](#-tech-stack)
- [Project structure](#-project-structure)
- [Architecture](#-architecture)
- [Feedback](#-feedback)
- [Team](#-team)
- [Acknowledgments](#-acknowledgments)

---

## 🕵️ About

Hi! My name is Gustavo, and this is my first college project at **UFPB (Federal University of Paraíba, Brazil)**. We would love to know what people think of our game, so if you are looking for an interesting game to play, this is the perfect one.

*Estação 3:33* was developed by Computer Science students at UFPB, **entirely with the help of generative AI**. It is a single HTML file: no installation, no server, no downloads. Just open it and play.

> 🇧🇷 The game is in Brazilian Portuguese. It was made for Brazilians, and the characters were written as a portrait of everyday Brazilian people.

## 🌧️ The story

A detective arrives at a train station on a rainy night and notices something strange: the wall clock stopped at **3:33**, at the exact moment he walked in.

He explores the station and talks to the people waiting there, each with a personality of their own, inspired by typical Brazilians in a hurry to get on with their lives. Then he boards one of three trains, and each train leads to a different case, with its own atmosphere and its own mystery.

To solve them, the detective relies on his **AI glasses**, which analyze objects, reveal footprints and point him toward the region where the clues are hidden. Figuring out what they mean is up to him.

## ✨ Features

- 🔍 **Three complete cases** with different moods: mystery, heist and horror
- 🤓 **AI glasses (detective mode)**: footprint trails, one-time area scan and object analysis (clue, ordinary object or person)
- 🧠 **Deduction system**: collected clues become memories that lead to the final conclusion
- 🎭 **Multiple endings** in case 1, plus a final ending with credits and a post-credits scene
- 🔫 **Cover-based shootout**, a ghost that hunts you, hiding spots and timed sections
- 🎵 **Procedural audio**: every song and sound effect is synthesized in real time; there are no audio files
- 🎨 **Hand-coded pixel art**: characters and scenes are drawn by code
- 📱 **Mobile support**: touch controls in console style, fullscreen and responsive layout
- 🗺️ **Free case order**, with progress saved per case and shown on the departure board

## 🚆 The cases

| # | Case | Mood | Summary |
|:-:|---|---|---|
| 1 | **The Vanishing Violinist** | Mystery | A soloist disappears during a blackout on a moving train. Clues across two cars, a sewer tunnel guided by violin music and three different endings. |
| 2 | **The Tear of the Sertão** | Heist | A diamond is stolen after a sleeping gas attack. An improvised mask, a countdown to the next station and a shootout with cover. |
| 3 | **The Ghost of Station 42** | Horror | A haunted train. A jumpscare, escapes, hiding spots, a clue hunt with the ghost on the loose and a chase through a secret corridor. |

After all three cases are solved, the station's clock starts ticking again…

## 🚀 Getting started

### Play online

Open the **[live version on GitHub Pages](https://YOUR-USERNAME.github.io/estacao-333/)**.

### Play locally

```bash
git clone https://github.com/YOUR-USERNAME/estacao-333.git
cd estacao-333
```

Then open `index.html` in any modern browser (Chrome, Edge, Firefox or Safari). No build step, no server and no installation required.

> 💡 Browsers only allow sound after the first interaction, so click anywhere on the title screen to hear the rain.

## 🎮 Controls

| Action | Desktop | Mobile |
|---|---|---|
| Walk | Arrow keys or click on the floor | D-pad ◀ ▶ or tap the floor |
| Interact / advance dialogue | Click or `E` | `A` button or tap |
| Toggle AI glasses (detective mode) | `Q` or the glasses icon | `B` button |
| Crouch / hide (cases 2 and 3) | `Space` or `↓` | `▼` button |
| Reload (case 2 shootout) | `R` | Taking cover reloads |
| Fullscreen | `F` or the ⛶ button | Automatic when you press Play |
| Back to title screen | `Esc` | — |

## 🛠️ Tech stack

| Technology | Usage |
|---|---|
| **HTML5 Canvas 2D** | All rendering, on a 256×144 logical screen drawn at 4× internal resolution |
| **Vanilla JavaScript** | Game logic, organized as ES modules |
| **esbuild** | Bundles every module into a single `index.html` |
| **Web Audio API** | Real-time synthesis of music, rain, thunder, gunshots and effects |
| **CSS** | UI (dialogues, menus, pixel buttons) and part of the post-processing |
| **Playwright** | Automated browser testing during development |

No frameworks, no runtime dependencies and no server.

## 📁 Project structure

```
estacao-333/
├── index.html              # The full game in a single file (this is what runs)
├── README.md               # This file (English)
├── README.pt-BR.md         # Portuguese version
├── docs/
│   └── ARQUITETURA.md      # Architecture, module by module (Portuguese)
└── codigo-por-modulo/      # The same code split by module, for study
    ├── css/styles.css
    └── js/
        ├── core/           # Engine: config, state, canvas, dialogue, audio, input
        ├── game/           # Main loop and scene rendering
        ├── render/         # Detective sprite and post-processing (bloom, grading, vignette)
        ├── sprites/        # Character generator and color palettes
        ├── scenes/         # Title screen, station, station life and final ending
        ├── ui/             # HUD, AI glasses, deduction, title menu, mobile controls
        ├── audio/          # Ambient sound and procedural soundtracks
        └── cases/          # The three cases, case registry and progress
```

> The game is shipped as a single `index.html` so it opens with a double click and deploys anywhere. The `codigo-por-modulo` folder shows the same code split into the modules it came from, for reading and studying the architecture.

## 🏗️ Architecture

The game runs a classic **game loop** (`requestAnimationFrame`, capped at 60 FPS): each frame it reads input, updates the state and draws the scene.

Every case implements the same **contract** (`enterFresh`, `tick`, `draw`, `progress`…), so the engine treats all cases the same way, and a new case is just a new module. Enemies such as the ghost and the gunmen are driven by **finite state machines**.

📄 Full details (in Portuguese): **[docs/ARQUITETURA.md](docs/ARQUITETURA.md)**

## 💬 Feedback

This is our first project, and we would really like to hear what you think!

- 🐛 Found a bug? [Open an issue](https://github.com/YOUR-USERNAME/estacao-333/issues)
- ⭐ Enjoyed the game? Leave a star on the repository

## 👥 Team

| | Developer |
|:-:|---|
| 🎮 | Arthur Henrique |
| 🎮 | Cristiano Asafe |
| 🎮 | Gustavo Medeiros |
| 🎮 | José Otávio |
| 🎮 | Severino Carlos |

## 🙏 Acknowledgments

- **UFPB** – Bachelor's degree in Computer Science
- Inspired by classic pixel-art point-and-click detective games
- Built with the help of generative AI tools

---

<div align="center">

Made with ☕ and 🌧️ in Brazil · 2026

</div>
