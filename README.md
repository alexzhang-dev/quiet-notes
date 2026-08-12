# quiet notes (Nuxt SSG)

安静阅读博客模板 — **Nuxt 4 + @nuxt/content + UnoCSS**，静态生成（`nuxt generate`），不是 SPA。

## Nuxt 5 compatibility

`nuxt.config.ts` sets:

```ts
future: { compatibilityVersion: 5 }
```

This opts into Nuxt 5 behavior on Nuxt 4.x ([upgrade guide](https://nuxt.com/docs/5.x/getting-started/upgrade#testing-nuxt-5)). Use **Composition API only** (`<script setup>`); Options API is off under compat 5.

## Stack

- Nuxt 4 + `future.compatibilityVersion: 5` (`ssr: true` + `nuxt generate`)
- `@nuxt/content` v3 collections
- **UnoCSS** via `@unocss/nuxt` — chrome/layout utilities; article prose stays curated CSS
- `content.experimental.sqliteConnector: "better-sqlite3"`
- CSS variables light/dark (`data-theme` + `prefers-color-scheme`) in `app/assets/css/tokens.css`
- Shiki custom themes `quiet-light` / `quiet-dark` (`themes/*.json`) bridged to `[data-theme]`
- Fonts: LXGW WenKai (titles/serif; self-hosted `lxgw-wenkai-webfont` Regular+Bold) + system CJK sans + JetBrains Mono (code, Google Fonts)
- Package manager: **pnpm@11.21.0** (`packageManager` field)

## UnoCSS

- Module: `@unocss/nuxt` in `nuxt.config.ts`
- Config: `uno.config.ts` — `presetWind3` + optional `presetAttributify`
- Theme colors/fonts map to CSS vars (`bg`, `ink`, `muted`, `faint`, `accent`, `serif`, …)
- `dark:` variant uses `[data-theme="dark"]` (not `.dark` class)
- Chrome (header / footer / theme toggle / index list) uses utilities; `.prose` remains hand-tuned

## Setup

```bash
corepack enable && corepack prepare pnpm@latest --activate
# or install pnpm 11.x another way, then:
pnpm install
```

`better-sqlite3` needs a native binding matching your Node ABI. pnpm 11 may ask you to approve build scripts (`better-sqlite3`, `esbuild`) — already listed under `allowBuilds` in `pnpm-workspace.yaml`.

## Scripts

```bash
pnpm install
pnpm dev
pnpm generate   # SSG → .output/public
pnpm preview
pnpm build
```

Output: `.output/public`

## Content

Add posts under `content/blog/*.md` with frontmatter:

```yaml
title: ...
description: ...
date: 2026-08-12
author: alexz
location: 上海
minutes: 6
series: 安静界面
cover: false   # optional; omit for default /cover.png
```

## Theme

- Tokens: `app/assets/css/tokens.css`
- Prose / cover / ritual: `app/assets/css/main.css`
- FOUC boot script in `nuxt.config.ts` `app.head.script`
- Toggle: `ThemeToggle.vue` → `localStorage["quiet-theme"]`
- Code blocks: Shiki dual theme follows `[data-theme="light"|"dark"]`

### Shiki themes (quiet-light / quiet-dark)

Custom TextMate themes live in `themes/`:

- `themes/quiet-light.json` — editor bg `#eef0f2` (soft inset on page `#f7f8f9`), ink `#141414`, keywords in accent rose `#d4146a`, muted gray hierarchy for strings/types/comments
- `themes/quiet-dark.json` — editor bg `#16181a`, ink `#f2f2f2`, keywords `#f98dbe`, low-chroma grays elsewhere

Wired in `nuxt.config.ts` via JSON imports into `content.build.markdown.highlight.theme` (`default` / `dark`). Not github-light / github-dark.
