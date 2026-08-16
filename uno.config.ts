import {
  defineConfig,
  presetAttributify,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss"

/**
 * Quiet notes — UnoCSS theme bridges to CSS variables in tokens.css.
 * Light/dark values live on :root / [data-theme]; utilities only reference vars.
 */
export default defineConfig({
  presets: [
    presetWind3({
      // Match site theme attribute (not .dark class)
      dark: '[data-theme="dark"]',
    }),
    presetAttributify(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      bg: "var(--bg)",
      ink: "var(--ink)",
      muted: "var(--muted)",
      faint: "var(--faint)",
      hair: "var(--hair)",
      accent: "var(--accent)",
      surface: "var(--surface)",
      "surface-border": "var(--surface-border)",
      cta: "var(--cta)",
      "cta-ink": "var(--cta-ink)",
      "avatar-bg": "var(--avatar-bg)",
      "cover-border": "var(--cover-border)",
    },
    fontFamily: {
      sans: "var(--sans)",
      serif: "var(--serif)",
      mono: "var(--mono)",
    },
    maxWidth: {
      measure: "var(--measure)",
      page: "var(--page)",
    },
    borderRadius: {
      pill: "999px",
    },
    transitionTimingFunction: {
      quiet: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    breakpoints: {
      sm: "720px",
    },
  },
  shortcuts: {
    "page-x": "px-5",
    "page-col": "max-w-page mx-auto page-x",
  },
})
