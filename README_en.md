<div align="center">
  <h1>⚛️ Future Style Periodic Table</h1>
  <h3>Interactive Future-Style Periodic Table · Immersive Chemistry Education · Bilingual Support</h3>

  <p>
    118 elements, 5% of the universe, blooming at your fingertips.
  </p>

  <p>
    <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  </p>

  <h3>
    👉 <a href="https://88lin.github.io/Periodic-table-web">Click to Enter: Immersive Experience (Live Demo)</a> 👈
  </h3>

</div>

---

## 📖 Introduction

**Future Style Periodic Table** is an interactive periodic table of chemical elements that runs in modern browsers. Unlike traditional static charts, this project adopts a dark cyberpunk style, combining neon effects, glassmorphism, and smooth interactive animations to redefine the visual presentation of chemical elements.

The project covers all **118 chemical elements**, including detailed data such as atomic numbers, relative atomic masses, electron configurations, isotopes, and oxidation states. It supports multi-dimensional heatmap visualization and 3D atomic structure simulation, making it an excellent practice for learning chemistry and exploring front-end technologies.

> **🌟 Highlights:** Click on any element to enter an immersive detail page, drag to rotate the 3D atomic model, and feel the beauty of electron cloud orbits. Supports Chinese/English bilingual switching to meet global user needs.

---

## ✨ Core Features

### 🎨 Immersive Visual Experience
- **Cyberpunk Aesthetics**: Dark background with dynamic grid particles, creating a tech-filled immersive atmosphere.
- **Neon Category Highlights**: 10 major element categories with unique colors, glowing borders on hover.
- **Fully Responsive**: Elegant layouts from 4K desktops to mobile devices (with landscape prompts).
- **Bilingual Support**: One-click toggle between Chinese/English interface to meet different language users' needs.

### 📊 Multi-dimensional Data Visualization
- **Heatmap Mode**: One-click switching of spectral distributions for atomic radius, electronegativity, ionization energy, melting point, and boiling point.
- **Category Filtering**: Click on legends to highlight specific categories (alkali metals, noble gases, lanthanides/actinides, etc.).
- **Real-time Search**: Support for quick location via element symbols, Chinese/English names, or atomic numbers.

### 🔬 3D Atomic Structure Simulation
- **CSS 3D Orbital Model**: Real-time rendering of electron shells and rotating electrons based on electron configuration algorithms.
- **Gesture Interaction**: Support for mouse drag/touch swipe, 360° rotation to observe atomic structure.
- **Expanded View**: Click the icon on the atomic model to enter a standalone full-screen view, supporting **scroll-to-zoom** for detailed electron shell observation.
- **Detailed Data Cards**: Display electron configuration formulas, layered electron counts, isotope stability, common oxidation states, etc.

---

## 📸 Screenshots

**Periodic Table Overview**
![Overview](images/overview.png)

**Heatmap Mode**
![Heatmap](images/heatmap.png)

<table>
  <tr>
    <th width="54%">Element Detail Card</th>
    <th width="46%">3D Atomic Model</th>
  </tr>
  <tr>
    <td valign="top"><img src="images/detail.png" alt="Element Card" width="100%"></td>
    <td valign="top"><img src="images/atom3d.png" alt="3D Atom" width="100%"></td>
  </tr>
</table>

---

## 🛠️ Tech Stack

This project is developed with **Vanilla JavaScript (ES6+)**, zero build dependencies, ready to use out of the box.

| Technology | Purpose |
|:---|:---|
| **HTML5** | Semantic structure and DOM containers |
| **CSS3** | Grid/Flexbox layout, 3D Transforms, CSS Variables, Media Queries |
| **JavaScript** | Data-driven rendering, electron configuration algorithms, event interaction, animation control |

### Technical Highlights

- 📐 **CSS Grid**: Precise drawing of irregular periodic table grid layouts.
- 🎭 **CSS 3D Transforms**: `transform-style: preserve-3d` to achieve electron orbital rotation.
- 🎨 **CSS Variables**: Unified theme color management for easy customization.
- 📱 **Responsive Design**: Multi-breakpoint media queries to adapt to various screen sizes.
- ⚡ **Performance Optimization**: DOM element caching mechanism reduces 90% of redundant queries, improving interaction responsiveness.
- 🔧 **Code Quality**: Modular design with extracted utility functions for easy maintenance and extension.

---

## 📂 Project Structure

The project adopts a clear modular structure, with all data embedded through JS variables, **no backend environment required**.

```text
Future-Style-Periodic-Table/
├── images/                  # Preview screenshots
│   ├── overview.png         # Periodic table overview
│   ├── heatmap.png          # Heatmap mode
│   ├── detail.png           # Element detail card
│   └── atom3d.png           # 3D atomic model
├── src/                     # Source code
│   ├── css/
│   │   └── styles.css       # Styles (1075 lines)
│   ├── js/
│   │   ├── config.js        # Configuration and data processing
│   │   ├── i18n.js          # Internationalization + utility functions
│   │   └── main.js          # Main logic (943 lines, optimized)
│   └── data/
│       └── elements-full-data.js  # Complete data for 118 elements
├── index.html               # Entry file
├── .editorconfig            # Editor configuration
├── .gitignore               # Git ignore rules
├── README.md                # Chinese documentation
├── README_en.md             # English documentation
└── LICENSE                  # MIT License
```

### Code Organization

- **config.js**: Element categories, electron configuration, data processing functions
- **i18n.js**: Chinese/English translation dictionaries, language switching, batch update utilities
- **main.js**: Core business logic including rendering, interaction, 3D models, etc.
- **elements-full-data.js**: Detailed data for 118 elements (atomic mass, electron configuration, isotopes, etc.)

---

## 🚀 Quick Start

Thanks to the pure static webpage design, this project has excellent portability:

### Method 1: Direct Open (Recommended)
1. **Download**: Clone or download the project archive
   ```bash
   git clone https://github.com/SeanWong17/Future-Style-Periodic-Table.git
   ```
2. **Run**: Open `index.html` directly in a browser
3. **Note**: No need to install Node.js, no need to configure a local server, ready to use out of the box

### Method 2: Local Server (Optional)
If you want to run through a local server (e.g., for testing or development):

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (requires http-server to be installed first)
npx http-server -p 8000
```

Then visit `http://localhost:8000`

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## ⚠️ Scientific Disclaimer

The **3D atomic models in this project are simplified Bohr model visualizations** for educational demonstration purposes only. They **do not represent actual electron cloud probability distributions**. Real electron behavior follows quantum mechanical principles, with electrons existing as probability clouds in atomic orbitals.

---

## 🤝 Credits

The improvement of this project is inseparable from the support of the community. Special thanks to:

- **Code Contribution**: Thanks to [Melody Young (@keepwow)](https://github.com/keepwow) for providing the English localization and internationalization support.

- **Data Sources**:
  - Primary element data from [Bowserinator/Periodic-Table-JSON](https://github.com/Bowserinator/Periodic-Table-JSON), licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)
  - Oxidation states and isotope data compiled from public sources

- **Original Inspiration**: [Douyin Video Link](https://www.douyin.com/video/7575067444734622385)
>  - *If you wish to contribute or modify the attribution, please feel free to submit a Pull Request or Issue.*

---

## 📄 License

This project uses the [MIT License](LICENSE) open source license.

- ✅ You can freely use, copy, modify, and distribute this project.
- 📝 Please retain the original author's copyright notice in derivative works.

---

## 📈 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=SeanWong17/Future-Style-Periodic-Table&type=Date)](https://star-history.com/#SeanWong17/Future-Style-Periodic-Table&Date)

---
<div align="center">
  <sub>Designed with ❤️ by Sean Wong</sub>
</div>
