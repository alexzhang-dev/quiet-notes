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
    <div class="index-intro">
      <h1>quiet notes</h1>
      <p>短文索引。语气先于组件，封面先于装饰。</p>
    </div>

    <ul class="post-list">
      <li v-for="post in posts || []" :key="post.path">
        <NuxtLink :to="post.path">
          <time :datetime="formatDate(post.date).iso">
            {{ formatDate(post.date).label }}
          </time>
          <span class="title">{{ post.title }}</span>
          <p v-if="post.description" class="desc">{{ post.description }}</p>
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>
