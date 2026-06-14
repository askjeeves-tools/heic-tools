# Standalone heic-tools

This is a **self-contained** repository exported from the [Ask Jeeves Modules](https://github.com/montana-digital/askjeeves-modules) monorepo. Shared packages are vendored under `vendor/@askjeeves/`.

## Requirements

- Node.js ≥ 22.12
- pnpm 10.27+ (`corepack enable pnpm` if needed)

## First-time setup

```bash
pnpm install
pnpm build
pnpm preview
```

Open [http://localhost:4321](http://localhost:4321).

## Do not

- Copy `tools/heic-tools/` from the monorepo — it uses `workspace:*` deps that only work inside the monorepo
- Run `npm install` on an unexported copy — it produces a broken `node_modules` tree
- Commit `node_modules/`, `dist/`, `.astro/`, or `.wrangler/`

## Re-export after shared package changes

From the monorepo root:

```bash
node scripts/export-standalone-tool.mjs heic-tools ./export/heic-tools
```

See [docs/sub-projects.md](https://github.com/montana-digital/askjeeves-modules/blob/main/docs/sub-projects.md) in the upstream repo.
