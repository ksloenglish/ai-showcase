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
- [x] Run targeted and full tests, `pnpm check`, `pnpm verify:assets`, `VITE_BASE_PATH=/ai-showcase/ pnpm build`, then commit and push `main` with the GitHub release command; wait for successful Pages deployment and live browser verification before reporting completion.
- [x] Mark this release complete, record its commit/deployment evidence, and re-read this task list. Do not use retired Manus checkpoints, private backups, Drive import or `/admin` workflows.

### Local validation

Ten Vitest tests, TypeScript, 50 catalogue assets plus four site assets, the production build, and the expanded browser suite all passed. Source-guide hashes match the supplied files; both original YouTube thumbnails are stored unchanged at 1280 × 720. The new entries use an optional 16:9 preview ratio so their text is not cropped; other resource previews retain their previous layout. Screenshots were captured outside the repository and inspected at desktop/mobile sizes. Local preview uses `VITE_BASE_PATH=/ai-showcase/` as well as the build. A Unicode-decoding issue in the test transport was corrected using native browser fetch; the actual displayed/copied prompt and source guide were already intact.

### Public release evidence

Content commit `a11a9b531d5c9f5565b2c8f947ee74ffce672748` was pushed to `main` with message `feat: add illustrated vocabulary and DSE Paper 3 revision videos`. GitHub Pages deployment [39192742049](https://github.com/ksloenglish/ai-showcase/actions/runs/39192742049) succeeded. The expanded browser regression suite then passed against the live Pages site, including the new full prompts, canonical YouTube actions, uncropped previews, filter/page-top restoration and desktop/tablet/mobile accessibility checks. Live screenshots were saved outside the repository under `/home/ubuntu/ai-showcase-validation/live`.

- S19: https://ksloenglish.github.io/ai-showcase/resources/illustrated-vocabulary-revision-video
- S20: https://ksloenglish.github.io/ai-showcase/resources/essential-dse-paper-3-tips-revision-video

The completed task record is being committed as documentation only; the public content and tested application source remain the verified content release above.

## 20 October 2026 — Add the supplied grammar explainer video

- [x] Add S21, ‘Grammar Explainer Video: Script, Scene Plan and Captions’, to the Video archive with the supplied video `https://www.youtube.com/watch?v=i1YILiniGcw` and its source Markdown guide preserved unchanged.
- [x] Verify the video metadata, store its authentic thumbnail as a versioned static asset, and provide an accurate summary, useful alt text, an uncropped top-aligned 16:9 preview and a ‘Watch video’ action on its permanent detail page.
- [x] Extend catalogue, manifest, Vitest and browser regression coverage for 21 total resources and six videos; verify the new detail page and copyable prompt on desktop/mobile plus existing filters, links, anchors, accessibility, keyboard focus, reduced motion and overflow checks.
- [x] Run unit/type/asset/build and browser checks, commit and push `main` through `pnpm release:github`, wait for successful Pages deployment and live regression verification, then mark complete and re-read this task list. Use the GitHub-only workflow; do not touch retired Manus projects, checkpoints, backup branches, Drive import or administration.

### Local validation

Twelve Vitest tests, TypeScript, 52 catalogue assets plus four site assets, the production build and the expanded browser suite all passed. Desktop/mobile S21 screenshots were inspected; the original 1280 × 720 thumbnail is uncropped and top-aligned. The guide was copied byte-for-byte from the supplied file, with SHA-256 `7028c8cad6503743f8703b31f2c5d6ac42bd9235290a523ff02484b14c434225`. Public YouTube metadata confirms the sample as ‘The present and the past | Kayla’s Grammar Lab | K S Lo English’. The reusable guide describes the output plan; its caption/script requirements are not asserted as independently verified features of the finished sample. No existing resource content or design was changed.

### Public release evidence

Content commit `16040d9205f7b22e5ed3e77b6d8f6fcf23a622a4` was pushed to `main` with message `feat: add grammar explainer video resource S21`. GitHub Pages deployment [39403848492](https://github.com/ksloenglish/ai-showcase/actions/runs/39403848492) succeeded. The live browser suite passed for 21 total resources and six videos, including S21’s exact complete prompt, copying, static uncropped preview, canonical YouTube action and desktop/mobile detail layout. Existing navigation, archive filters, anchors, reduced motion, keyboard focus, accessibility and overflow checks also passed. The completed task record is a documentation-only follow-up; the tested public content remains this release.

S21: https://ksloenglish.github.io/ai-showcase/resources/grammar-explainer-video-script-scene-plan-and-captions

## 29 October 2026 — Add Oxbridge News Reader as a new entry

- [x] Add S22, ‘Oxbridge News Reader’, as a new Interactive & Web-Based Materials entry, preserving all existing resources and linking to `https://ksloenglish.github.io/oxbridge-news-reader/` with ‘Open live website’.
- [x] Store the supplied Markdown guide and an authentic top-of-page live-site screenshot as versioned assets; provide an accurate summary, useful alt text, top-aligned preview and complete line-wrapped copyable prompt. Treat the final showcase-import note as import instructions rather than classroom explanation.
- [x] Update catalogue, manifest and regression coverage for 22 resources, six interactive resources and six videos. Verify new desktop/mobile detail pages, source fidelity, prompt copying, live-site/guide links, filters, page-top navigation, anchors, keyboard focus, reduced motion, accessibility and no horizontal overflow as applicable.
- [x] Run relevant/full tests, `pnpm check`, `pnpm verify:assets`, `VITE_BASE_PATH=/ai-showcase/ pnpm build`, commit and push `main` using `pnpm release:github`, wait for successful Pages deployment and live browser regression checks, then mark complete and re-read this task list. Keep the GitHub-only source of truth; do not use retired Manus projects, checkpoints, backups, importers or `/admin`.

### Local validation

Fifteen Vitest tests across three files, TypeScript, 54 catalogue assets plus four site assets, the production build and the complete browser suite passed. Desktop/mobile S22 views were captured and inspected. The screenshot is a 1280 × 720 capture of the live News Desk at page top, encoded losslessly as WebP with identical pixels. The guide remains byte-for-byte identical to the supplied file, SHA-256 `d9c195ba4cec07218277e258ee60df5996da8f05c20a761112ff66d5f62aa7c7`. The parser omits only the exact showcase-import note from visible explanation and retains other classroom guidance and the full prompt. Test-only fixes distinguish raw-guide/public headings, scope homepage counts to the category tile, and release prompt focus before screenshot capture. No existing resources, public navigation or visual design were changed.

### Public release evidence

Content commit `834f4c6fde628281fba9e8307f68300053fcac7d` was pushed to `main` with message `feat: add Oxbridge News Reader resource S22`. GitHub Pages deployment [40791104489](https://github.com/ksloenglish/ai-showcase/actions/runs/40791104489) succeeded. The complete live regression suite then passed, including S22’s exact copied prompt, canonical live-site action, static top-aligned preview, import-note display boundary, six-resource Interactive filter and page-top restoration. Existing Video, download, navigation, anchor, keyboard, reduced-motion, desktop/tablet/mobile accessibility and overflow checks passed. Live screenshots were captured outside the repository. The completed task record is a documentation-only follow-up; public application content remains this verified release.

S22: https://ksloenglish.github.io/ai-showcase/resources/oxbridge-news-reader
