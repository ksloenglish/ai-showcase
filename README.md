# K S Lo English: AI Resource Showcase

This repository contains the **public static website** for the K S Lo English AI Resource Showcase. It is designed for GitHub Pages at `https://ksloenglish.github.io/ai-showcase/`.

## Publishing

Every push to `main` runs the GitHub Pages deployment workflow. The repository uses only static HTML, CSS, JavaScript and versioned local assets; it has no database, login, server-side importer or `/admin` route.

## Future update workflow

The editorial workflow is intentionally simple. When a resource is ready, upload the following materials in a Manus chat and say whether the item is new or an update:

| File or detail | Required use |
|---|---|
| Markdown guide | Explains the resource and contains the reusable prompt |
| Sample PDF or live URL | Provides the downloadable output or external action |
| Preview image | Required for a new live site, video or AI tool; preferred for every resource |
| Brief note | Give the title, category and any replacement instructions |

The site is then updated, checked for structure, links, responsive behaviour and accessibility, and prepared for a new GitHub Pages release. No Google Drive scan, Manus sign-in or in-site management task is required.

## Local checks

```bash
pnpm install
pnpm test
pnpm check
pnpm verify:assets
VITE_BASE_PATH=/ai-showcase/ pnpm build
pnpm preview --host 0.0.0.0
STATIC_BASE_URL=http://localhost:4173/ai-showcase pnpm verify:browser
```

## Asset policy

All resource guides, downloadable samples, previews, logo and editorial imagery are stored in `public/assets/`. The `scripts/export-manus-assets.mjs` script documents the one-time export from the former Manus-managed storage. Future assets are committed to this repository as part of each reviewed update.
