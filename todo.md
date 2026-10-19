# Showcase update tasks

## 19 October 2026 — Prepare the GitHub Pages working files

- [x] Prepare `/home/ubuntu/ai-showcase` from `ksloenglish/ai-showcase`, branch `main`, including all versioned source files, Markdown guides, samples, previews, branding assets and deployment scripts.
- [x] Install the repository's pinned toolchain and dependencies; inspect the catalogue, affected-file map and release checks so the next website update can be made directly in this repository.
- [x] Verify the baseline using `pnpm test`, `pnpm check`, `pnpm verify:assets`, `VITE_BASE_PATH=/ai-showcase/ pnpm build` and the existing browser regression suite.
- [x] Record readiness and re-read this task list. This request is preparation only: do not change public resource content, design or routes, and do not push a website release without a requested public change.

## Current project authority

The public static repository on `main` is the sole source of truth. The installed `ai-resource-showcase-webapp` skill and the repository README contain older paired-release instructions; the user's current GitHub-only project instructions supersede those clauses. Do not require or modify a former Manus project, checkpoint, `github-backup`, Drive importer or `/admin` workflow. Do not edit or republish the downloaded skill during this preparation.

## Verified preparation

- Working copy: `/home/ubuntu/ai-showcase`, tracking `origin/main` at `2c7dbd054cbea70d74795c9149688617bd38834f`.
- Repository: https://github.com/ksloenglish/ai-showcase
- Current live site: https://ksloenglish.github.io/ai-showcase/
- Latest existing `deploy-pages.yml` run: successful, https://github.com/ksloenglish/ai-showcase/actions/runs/37815005975
- Toolchain: Node.js 22.13.0, repository-pinned pnpm 10.15.1; Chromium is available at `/usr/bin/chromium`.
- Dependencies installed with the frozen lockfile. Explicit local `pnpm-workspace.yaml` permits esbuild lifecycle scripts; `pnpm ignored-builds` reported none. The dependency lockfile was not changed.
- Catalogue: 18 resources across four categories — seven text-based, three visual, three video and five interactive.
- Assets: 46 catalogue assets plus four site assets verified, with no missing referenced files.
- `pnpm test`: passed, six tests across two files.
- `pnpm check`: passed.
- `pnpm verify:assets`: passed.
- `VITE_BASE_PATH=/ai-showcase/ pnpm build`: passed. Existing large-chunk warnings are non-blocking; no bundle optimisation was attempted.
- `STATIC_BASE_URL=https://ksloenglish.github.io/ai-showcase pnpm verify:browser`: passed. Existing suite verified route fallback, no administration links, static asset URLs, filter persistence, video actions, desktop/mobile axe accessibility audits and horizontal overflow on its audited pages.
- No tracked website source, public assets or routes were modified. No commit, push or new deployment was made. Only `todo.md` and `pnpm-workspace.yaml` are new local repository files; dependencies and build output remain ignored.

## Files for the next update

| Change | Main files |
|---|---|
| Add or revise a resource | `src/resourceCatalogue.ts`, its files in `public/assets/`, `public/assets/manifest.json` |
| Resource counts and integrity expectations | `src/resourceCatalogue.test.ts`, `scripts/verify-static-assets.mjs`, `scripts/verify-static-site.mjs` |
| Guide headings and prompt display | `src/lib/resourceMarkdown.ts`, `src/pages/ResourceDetail.tsx`, `src/components/PromptPanel.tsx` |
| Archive, filters and resource cards | `src/pages/Resources.tsx`, `src/lib/resourceFilters.ts`, `src/lib/resourceFilters.test.ts`, `src/components/ResourceCard.tsx` |
| Homepage and About | `src/pages/Home.tsx`, `src/pages/About.tsx` |
| Design, branding and navigation | `src/index.css`, `src/components/BrandMark.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx`, `SiteLayout.tsx` |
| Routes and Pages deployment | `src/App.tsx`, `public/404.html`, `vite.config.ts`, `.github/workflows/deploy-pages.yml` |

The existing guide parser recognises `## Copy-and-paste prompt`; inspect an existing guide before adding a new one rather than relying on the older generic skill heading examples. Preserve supplied screenshots and the current Signal & Paper design.

## Next public release

First add the requested change to this task list, inspect affected source and assets, implement the change, and update applicable regression coverage. Review all local changes before using the release script because it stages everything. Include the preparation files only after reviewing them with the actual update.

```bash
GITHUB_RELEASE_MESSAGE="feat: describe the requested showcase update" pnpm release:github
```

The command runs local checks, commits and pushes `main`, waits for `deploy-pages.yml`, then verifies the live Pages site. Its older “paired” output wording does not require a Manus checkpoint. Do not run the legacy asset-export or catalogue-preparation migration scripts.

## 19 October 2026 — Add two supplied revision-video resources

- [x] Add the illustrated vocabulary revision video and Essential DSE Paper 3 Tips revision video to the Video archive, matching the supplied YouTube links to their Markdown guides and assigning the next continuous labels S19 and S20.
- [x] Preserve the supplied guides as versioned public assets; add real video previews, accurate summaries and alt text, canonical YouTube actions labelled ‘Watch video’, and permanent detail pages with top-aligned previews and line-wrapped copyable prompts.
- [x] Update catalogue, asset manifest and Vitest/browser regression expectations for twenty resources and five video resources. Verify the new desktop/mobile detail pages, video/guide links, downloads, filters, prompt copying, anchors, keyboard focus, reduced motion, accessibility and horizontal overflow as applicable.
- [ ] Run targeted and full tests, `pnpm check`, `pnpm verify:assets`, `VITE_BASE_PATH=/ai-showcase/ pnpm build`, then commit and push `main` with the GitHub release command; wait for successful Pages deployment and live browser verification before reporting completion.
- [ ] Mark this release complete, record its commit/deployment evidence, and re-read this task list. Do not use retired Manus checkpoints, private backups, Drive import or `/admin` workflows.

### Local validation

Ten Vitest tests, TypeScript, 50 catalogue assets plus four site assets, the production build, and the expanded browser suite all passed. Source-guide hashes match the supplied files; both original YouTube thumbnails are stored unchanged at 1280 × 720. The new entries use an optional 16:9 preview ratio so their text is not cropped; other resource previews retain their previous layout. Screenshots were captured outside the repository and inspected at desktop/mobile sizes. Local preview uses `VITE_BASE_PATH=/ai-showcase/` as well as the build. A Unicode-decoding issue in the test transport was corrected using native browser fetch; the actual displayed/copied prompt and source guide were already intact.
