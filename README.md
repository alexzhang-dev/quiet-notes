# quiet notes (Nuxt SSG)

安静阅读博客模板 — **Nuxt 4 + @nuxt/content**，静态生成（`nuxt generate`），不是 SPA。

## Nuxt 5 compatibility

`nuxt.config.ts` sets:

```ts
future: { compatibilityVersion: 5 }
```

This opts into Nuxt 5 behavior on Nuxt 4.x ([upgrade guide](https://nuxt.com/docs/5.x/getting-started/upgrade#testing-nuxt-5)). Use **Composition API only** (`<script setup>`); Options API is off under compat 5.

## Stack

- Nuxt 4 + `future.compatibilityVersion: 5` (`ssr: true` + `nuxt generate`)
- `@nuxt/content` v3 collections
- `content.experimental.sqliteConnector: "better-sqlite3"`
- CSS variables light/dark (`data-theme` + `prefers-color-scheme`)
- Noto Serif SC
- Package manager: **pnpm@11.21.0** (`packageManager` field)

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

- Tokens in `app/assets/css/main.css`
- FOUC boot script in `nuxt.config.ts` `app.head.script`
- Toggle: `ThemeToggle.vue` → `localStorage["quiet-theme"]`
