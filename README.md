# Portfolio · José Antonio Gimeno San Martín

Personal website to showcase my profile and projects.

🌐 **Live at [joseagim.dev](https://joseagim.dev)**

**Stack:** React · Vite · Tailwind CSS · React Router · lucide-react

## What it includes

### Sections
- **Home:** introduction in a terminal-style window, photo, availability, CV download and links to GitHub, LinkedIn and email.
- **About me:** short bio, quick facts (education, location, languages, availability), soft skills and technologies grouped by category.
- **Experience:** vertical timeline with my education (2021 – 2027), a game development course and the internship I'm looking for.
- **Projects:** cards with a cover image, technologies and status badges (in progress, deployed, award).
- **Contact:** email with a copy button, LinkedIn, GitHub, location and a message form.

### Project pages
TFG (chess platform), TrainTracker, SmartCook and Band Souls, each with:
- Screenshot carousel with a full-size viewer.
- Overview, personal contribution, highlights and a details sidebar.
- Links to the repository and live demo when available.
- Project-specific content: phases, features, architecture diagrams, Scrum methodology, story or recognition.
- Previous / next project navigation.

### Features
- **Bilingual (ES / EN):** detects the browser language and remembers the choice. Covers UI text, projects and meta tags.
- **Dark and light mode:** dark by default, with a toggle and no flash on load.
- **Downloadable CV** in Spanish and English from a menu.
- **Contact form** with custom validation, sent through Formspree.
- **Basic SEO:** dynamic title and description, Open Graph, favicon and an up-to-date `lang` attribute.
- **TrainTracker API warm-up:** when the portfolio opens, its API is woken up in the background so the demo is ready by the time someone reaches it.
- **Accessible and responsive:** semantic HTML, keyboard navigation, images with alt text and a mobile-first layout.

## Run locally

```bash
npm install
npm run dev
```

## Structure

```
src/
  components/   layout, sections, projects and UI elements
  data/         content: profile, projects and experience
  i18n/         Spanish and English texts
  hooks/        theme, meta tags, clipboard and API warm-up
  pages/        home, project detail and 404
public/         photo, CVs and each project's images
```
