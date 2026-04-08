# GitHub Copilot instructions for this workspace

This repository is a small React + TypeScript learning-diagnostic web app.

## What matters

- Primary app entry: `app.tsx`
- Static site shell: `index.html`
- UI primitives: `components/ui/*`
- Research/content source: `estudio.md`
- TypeScript config with alias: `@/*` maps to project root (`tsconfig.json`)

## How to run / validate

- There is no dedicated dev server script in `package.json`.
- Validation command:
  - `npm run typecheck`
- The app is intended to be run as a static front-end, e.g. via Live Server on `index.html`.

## Useful file references

- `README.md` — product overview, usage, and project intent.
- `package.json` — scripts and dependencies.
- `tsconfig.json` — compiler options and path alias.
- `estudio.md` — source research and study habit content.

## Agent guidance

- Preserve the minimal component structure and keep UI changes lightweight.
- Prefer updating `app.tsx` and `components/ui/*` for behavior and styling.
- Avoid adding build-system assumptions; this repo currently has only typecheck support.
- Link to `README.md` or `estudio.md` when explaining app purpose or content, rather than duplicating it.

## When editing

- If asked to change content or flows, review `estudio.md` first for learning-habit guidance.
- If asked to improve UX, consider the onboarding/questionnaire/result flow implied by the README.
- If asked to add tests, note the repository does not currently include a test harness.

## Example prompts

- `Help me refactor the questionnaire logic in app.tsx to use smaller hooks and components.`
- `Improve accessibility and keyboard navigation for the quiz interface.`
- `Update the recommendations section based on new study habit data in estudio.md.`
