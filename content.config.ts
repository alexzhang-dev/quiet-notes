import { defineContentConfig, defineCollection, z } from "@nuxt/content"

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.date(),
        author: z.string().default("alexz"),
        location: z.string().optional(),
        minutes: z.number().optional(),
        series: z.string().optional(),
        cover: z.string().optional(),
        draft: z.boolean().default(false),
      }),
    }),
  },
})
