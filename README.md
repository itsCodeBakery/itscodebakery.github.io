# Syed Shayan Ali Shah — Research Portfolio

A complete static website for GitHub Pages. No installation, build step, API key, paid service, or external font is required.

## Upload to GitHub

1. Extract this ZIP.
2. Open your `itscodebakery.github.io` repository.
3. Upload `index.html`, the full `assets` folder, the full `projects` folder, and `.nojekyll` into the repository root. Replace the corresponding existing files. Keep the folder structure intact.
4. Commit the extracted files. Do not upload the ZIP itself, and do not place everything inside an extra enclosing folder.
5. If needed, select **Settings → Pages → Deploy from a branch → main → /(root)**.
6. After deployment completes, open your site and refresh it.

The `projects` folder is required: each selected publication now links to its own project portfolio. Keep a backup of the previous website before uploading.

Official GitHub Pages instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Included updates

- Your full name is now a separate, high-contrast foreground heading, above the avatar layer. The avatar's position and eye tracking are retained.
- A professional About section includes your research question and your love of anime, travelling, and food.
- News contains only three published works, with full proceedings/publication dates.
- MS education states Gold Medal, first position in a cohort of 60. BS states third position in a cohort of 120.
- Statistics count the six featured projects, three published works, three public code repositories, and one MS Gold Medal.
- All six research entries open dedicated pages with research summaries, approaches, results, figures, and available paper/code links.
- Figures open in a keyboard-accessible native dialog. Escape or Close dismisses it. Without JavaScript, the links open the original images.
- Publication filtering, animated navigation, section transitions, progress indicators, and reduced-motion support are included.

## Edit the content

- `index.html`: landing page, About, news, education, publications, and experience.
- `projects/*.html`: each project's text, results, sources, and figures.
- `assets/css/research.css`: foreground name and updated profile content.
- `assets/css/project.css`: project page design and responsive layouts.
- `assets/js/project.js`: figure viewer and project navigation.
- `assets/css/landing.css`, `assets/js/avatar.js`, and `assets/js/avatar-renderer.js`: accepted landing composition and eye tracking.
- `assets/images/`: all locally bundled images.
- `SOURCES.md` and `ASSET_CREDITS.md`: provenance and metric context.

All paths are relative, including navigation from project pages, so the website also supports a GitHub Pages project subdirectory.

## Local preview

Open `index.html` directly, or run `python -m http.server 8000` in the extracted folder and visit http://localhost:8000. On Windows, `py -m http.server 8000` may be appropriate.

## Evaluation notes

Results retain their dataset, split, and publication/manuscript context. Project summaries paraphrase source materials; they are not verbatim publisher abstracts. Manuscripts are excluded from News. There are no invented citation counts or publication links. The Beyond Labels metrics follow a coauthor announcement, and the Secure WSN outcome is qualitative because the numerical results were not available in the supplied presentation.

## Validation

Static asset/anchor checks, CSS/JavaScript parsing, publication filters, mobile menu behavior, reduced-motion modes, and figure-viewer behavior are checked in a DOM test environment. Avatar placement rules and the original eye-renderer files are preserved. Full live-browser visual and responsive screenshot verification was unavailable because the preview environment blocks local pages.

No analytics, tracking, remote rendering dependencies, or contact-form backend are included.
