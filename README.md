# 📋 Engineering Whiteboard — Academic Portfolio

> A hand-drawn, Excalidraw-inspired academic portfolio for **Dr. Rahul Mishra**, Assistant Professor & Head of Computer Center, Department of CSE, IIT Patna.  
> Built as a **DeployIITP** submission by **NJACK**.

<p align="center">
  <img src="public/whiteboard.svg" alt="Whiteboard Logo" width="64" />
</p>

---

## ✨ Highlights

| Feature | Description |
|---|---|
| **Whiteboard Aesthetic** | Dot-grid canvas, wobbly SVG ink borders, pushpin markers, and sticky-note cards — the entire UI feels like a hand-drawn Excalidraw board. |
| **Data-Driven** | All content lives in a single JSON file (`profileData.json`). Swap the file to generate a portfolio for any faculty member — zero code changes needed. |
| **Accessible** | Skip-to-content link, proper ARIA landmarks, `prefers-reduced-motion` support, and keyboard-visible focus rings. |
| **Responsive** | Two-pane desktop layout (sticky identity sidebar + scrollable content) collapses to a single column on mobile. |
| **Lightweight** | React 18 + Vite — no heavy UI framework. Production bundle is fast and lean. |

---

## 🛠️ Tech Stack

- **Framework** — [React 18](https://react.dev/) (JSX, functional components, hooks)
- **Build Tool** — [Vite 5](https://vitejs.dev/)
- **Styling** — [Tailwind CSS 3](https://tailwindcss.com/) + custom CSS layers
- **Icons** — [Lucide React](https://lucide.dev/)
- **Fonts** — [Kalam](https://fonts.google.com/specimen/Kalam) (pen body), [Caveat](https://fonts.google.com/specimen/Caveat) (marker display), [Inter](https://fonts.google.com/specimen/Inter) (fallback sans)

---

## 📁 Project Structure

```
rahul-mishra-portfolio/
├── index.html                  # Entry HTML with Google Fonts & meta tags
├── package.json                # Scripts & dependencies
├── vite.config.js              # Vite + React plugin
├── tailwind.config.js          # Custom font families, marker colors, card shadows
├── postcss.config.js           # PostCSS → Tailwind + Autoprefixer
│
├── public/
│   ├── whiteboard.svg          # Favicon / logo
│   └── img/
│       └── rahul-mishra.jpg    # Faculty profile photo
│
└── src/
    ├── main.jsx                # React DOM entry point
    ├── index.css               # Tailwind directives, dot-grid background,
    │                           #   hand-drawn typography & utility classes
    ├── App.jsx                 # Root layout — reads profileData.json,
    │                           #   assembles sidebar + content sections
    │
    ├── data/
    │   └── profileData.json    # ★ All portfolio content in one place
    │
    └── components/
        ├── RoughBox.jsx        # Core hand-drawn card: wobbly SVG border,
        │                       #   tilt, drop shadow, crisp children
        ├── RoughFilters.jsx    # Inline SVG displacement filters (#rough-sm,
        │                       #   #rough-md, #rough-line)
        ├── SectionHeading.jsx  # Marker-style section label + title
        ├── IdentityPanel.jsx   # Sticky sidebar: avatar, name, contact,
        │                       #   metrics, external links, section nav
        ├── Biography.jsx       # Short biographical paragraph
        ├── ResearchInterests.jsx # Sticky-note grid of focus areas
        ├── ExperienceTimeline.jsx # Vertical flowchart with wavy SVG arrows
        ├── Publications.jsx    # Categorised publication list (Journals,
        │                       #   Conferences, Books, Patents) with
        │                       #   expand/collapse per group
        └── TeachingAndHonors.jsx # Two-up cards for courses + awards
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** (ships with Node)

### Install & Run

```bash
# 1. Clone the repository
git clone https://github.com/iamkartik0704/rahul_mishra1.git
cd rahul_mishra1

# 2. Install dependencies
npm install

# 3. Start the dev server (hot-reload at http://localhost:5173)
npm run dev
```

### Build for Production

```bash
npm run build      # outputs to dist/
npm run preview    # serves the production build locally
```

---

## 🎨 Design System

### Hand-Drawn Ink Effect

The whiteboard look is achieved with **SVG `<feTurbulence>` + `<feDisplacementMap>` filters** defined in [`RoughFilters.jsx`](src/components/RoughFilters.jsx). These are applied to borders and badges via inline `filter: url(#rough-sm)` — the content inside stays crisp while only the "ink" outline wobbles.

### Marker Color Palette

Defined in [`tailwind.config.js`](tailwind.config.js) under `theme.extend.colors.marker`:

| Token | Hex | Usage |
|---|---|---|
| `marker-blue` | `#1d4ed8` | Federated Learning, active links |
| `marker-teal` | `#0f766e` | Edge Computation, teaching |
| `marker-amber` | `#b45309` | Sensor Data, patents |
| `marker-violet` | `#6d28d9` | Applied AI, books |
| `marker-rose` | `#be123c` | IoD, pushpins |
| `marker-green` | `#15803d` | System Deployment |

### Typography

| Class | Font | Role |
|---|---|---|
| `.font-marker` | Caveat | Display headings, badges, year labels |
| `.font-pen` | Kalam | Body text, contact info, navigation |
| `font-sans` | Inter | System fallback |

---

## 🔧 Customisation

### Swap Faculty Data

Edit **[`src/data/profileData.json`](src/data/profileData.json)** — the JSON schema covers:

| Key | Content |
|---|---|
| `identity` | Name, designation, department, email, phone, photo path, tagline, external links |
| `metrics` | Citation count, publication count, research area count |
| `biography` | Free-text bio paragraph |
| `researchInterests` | Array of `{ label, accent }` sticky notes |
| `experience` | Array of `{ role, institution, duration }` timeline nodes |
| `publications` | Array of papers with `type` = `Journal` / `Conference` / `Book` / `Patent` |
| `teaching` | Course codes + names |
| `honors` | Awards and media recognition |

Replace the photo at **`public/img/`** and update the `identity.photo` path accordingly.

### Add a New Section

1. Create a component in `src/components/`.
2. Use `<SectionHeading>` for the title and `<RoughBox>` for cards.
3. Import it in [`App.jsx`](src/App.jsx) and wire it to the relevant JSON key.

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.3.1 | UI library |
| `react-dom` | ^18.3.1 | DOM renderer |
| `lucide-react` | ^0.456.0 | Icon set |
| `vite` | ^5.4.11 | Dev server & bundler |
| `@vitejs/plugin-react` | ^4.3.4 | JSX / Fast Refresh |
| `tailwindcss` | ^3.4.15 | Utility-first CSS |
| `autoprefixer` | ^10.4.20 | Vendor prefix PostCSS plugin |

---

## 🌐 Deployment

The `dist/` folder produced by `npm run build` is a **static site** — deploy it anywhere:

- **GitHub Pages** — push `dist/` or use the `gh-pages` branch
- **Vercel / Netlify** — connect the repo; set build command to `npm run build` and output directory to `dist`
- **IIT Patna infra** — copy `dist/` to the web server's document root

---

## 📄 License

This project was built for the **DeployIITP** initiative. Please contact the authors for licensing and reuse information.

---

<p align="center">
  <em>Made with 💛 by <strong>π</strong></em>
</p>
