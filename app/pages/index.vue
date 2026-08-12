<script setup lang="ts">
useHead({
  title: "quiet notes",
  meta: [
    {
      name: "description",
      content: "安静的阅读笔记 — 克制、层级与主视觉。",
    },
  ],
})

const { data: posts } = await useAsyncData("blog-index", () =>
  queryCollection("blog")
    .where("draft", "=", false)
    .order("date", "DESC")
    .all(),
)

function formatDate(d: string | Date) {
  const date = typeof d === "string" ? new Date(d) : d
  const y = date.getUTCFullYear()
  const m = String(date.getUTCMonth() + 1).padStart(2, "0")
  const day = String(date.getUTCDate()).padStart(2, "0")
  return { label: y + "." + m + "." + day, iso: y + "-" + m + "-" + day }
}
</script>

<template>
  <main class="article">
    <div class="max-w-measure mt-2 mb-2">
      <h1 class="mb-3">quiet notes</h1>
      <p class="text-muted text-base max-w-lg">
        短文索引。语气先于组件，封面先于装饰。
      </p>
    </div>

    <ul class="list-none m-0 mt-8 p-0 max-w-measure flex flex-col">
      <li
        v-for="post in posts || []"
        :key="post.path"
        class="border-t border-hair last:border-b"
      >
        <NuxtLink
          class="group flex flex-wrap items-baseline gap-x-5 gap-y-2 py-4 text-inherit"
          :to="post.path"
        >
          <time
            class="text-sm text-faint tabular-nums shrink-0 min-w-[6.5rem]"
            :datetime="formatDate(post.date).iso"
          >
            {{ formatDate(post.date).label }}
          </time>
          <span
            class="font-serif text-[1.0625rem] font-medium text-ink transition-colors duration-250 group-hover:text-accent"
          >
            {{ post.title }}
          </span>
          <p
            v-if="post.description"
            class="basis-full text-sm text-muted m-0 sm:pl-[calc(6.5rem+1.25rem)]"
          >
            {{ post.description }}
          </p>
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>
