// https://nuxt.com/docs/api/configuration/nuxt-config
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import quietLight from './themes/quiet-light.json'
import quietDark from './themes/quiet-dark.json'

export default defineNuxtConfig({
  modules: ["@nuxt/content", "@unocss/nuxt"],
  ssr: true,

  // Opt into Nuxt 5 behavior while staying on Nuxt 4.x
  // https://nuxt.com/docs/5.x/getting-started/upgrade#testing-nuxt-5
  future: {
    compatibilityVersion: 5,
  },

  components: {
    dirs: [
      { path: "~/components/content", global: true, pathPrefix: false },
      "~/components",
    ],
  },

  content: {
    experimental: {
      sqliteConnector: "better-sqlite3",
    },
    renderer: {
      alias: {
        note: "Note",
      },
    },
    build: {
      markdown: {
        remarkPlugins: {
          "remark-math": {
            instance: remarkMath,
          },
        },
        rehypePlugins: {
          "rehype-katex": {
            instance: rehypeKatex,
            options: {
              output: "html",
              throwOnError: false,
            },
          },
        },
        highlight: {
          theme: {
            // Custom TextMate themes (objects) — quiet reading palette
            // @ts-expect-error Nuxt Content accepts ThemeRegistration objects at runtime
            default: quietLight,
            // @ts-expect-error Nuxt Content accepts ThemeRegistration objects at runtime
            dark: quietDark,
          },
        },
      },
    },
  },

  css: [
    "katex/dist/katex.min.css",
    "~/assets/css/tokens.css",
    "~/assets/css/main.css",
  ],
  app: {
    head: {
      htmlAttrs: { lang: "zh-CN" },
      title: "quiet notes",
      meta: [
        { name: "description", content: "安静的阅读笔记 — 克制、层级与主视觉。" },
        { name: "color-scheme", content: "light dark" },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;1,400&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&display=swap",
        }
      ],
      script: [
        {
          innerHTML:
            '(function(){try{var t=localStorage.getItem("quiet-theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();',
          type: "text/javascript",
          tagPosition: "head",
        },
      ],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
})
