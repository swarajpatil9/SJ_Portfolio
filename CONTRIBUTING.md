# Contributing Guide

Thanks for contributing to this project.

## Prerequisites

- Node.js 20+
- npm 10+

## Local Setup

1. Install dependencies:
   `npm install`
2. Start development server:
   `npm run dev`
3. Run quality checks before opening a PR:
   `npm run lint && npm run typecheck && npm run format:check && npm run build`

## Development Conventions

- Do not commit generated files from `dist/`.
- Keep changes focused and small.
- Follow existing folder boundaries (`components`, `windows`, `store`, `config`).
- Prefer reusable constants over hard-coded values.
- Keep UI/behavior changes separate from tooling or documentation changes.

## Formatting and Linting

- Use Prettier for formatting: `npm run format`
- Use ESLint for code quality: `npm run lint`

## Pull Request Checklist

- [ ] Branch is up to date with target branch
- [ ] Lint passes
- [ ] Typecheck passes
- [ ] Build passes
- [ ] README/Docs updated when behavior or setup changes
- [ ] PR description explains what changed and why

## Commit Message Style

Use concise, descriptive commit messages. Example:

- `chore(dx): add prettier and editorconfig`
- `docs: rewrite README onboarding section`
