<script setup lang="ts">
import { withoutTrailingSlash } from "ufo"

const route = useRoute()
// Static hosts serve /blog/foo/index.html as /blog/foo/, while prerender
// payload keys use /blog/foo — normalize so hydration reuses SSR data.
const contentPath = withoutTrailingSlash(route.path)

const { data: post } = await useAsyncData("blog-" + contentPath, () =>
  queryCollection("blog").path(contentPath).first(),
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Post not found",
    fatal: true,
  })
}

const { data: allPosts } = await useAsyncData("blog-all-for-next", () =>
  queryCollection("blog")
    .where("draft", "=", false)
    .order("date", "ASC")
    .all(),
)

const next = computed(() => {
  const list = allPosts.value || []
  const idx = list.findIndex((x) => x.path === post.value?.path)
  if (idx < 0) return null
  return list[idx + 1] ?? null
})

const hideCover = computed(() => post.value?.cover === false)
const customCover = computed(() => {
  const c = post.value?.cover
  return typeof c === "string" ? c : null
})

useHead({
  title: () => post.value?.title || "quiet notes",
  meta: [
    {
      name: "description",
      content: () => post.value?.description || "",
    },
  ],
})
</script>

<template>
  <article v-if="post" class="article">
    <div v-if="!hideCover" class="cover">
      <img
        :src="customCover || '/cover.png'"
        width="400"
        height="400"
        alt=""
      />
    </div>

    <h1>{{ post.title }}</h1>

    <Byline
      :author="post.author"
      :date="post.date"
      :location="post.location"
      :minutes="post.minutes"
      initials="AZ"
    />

    <!-- class on ContentRenderer so prose owns the renderer root -->
    <ContentRenderer class="prose" :value="post" />

    <footer v-if="post.series || next" class="end">
      <span v-if="post.series" class="series">系列 · {{ post.series }}</span>
      <span v-else />
      <NuxtLink v-if="next" class="more" :to="next.path">下一篇 ›</NuxtLink>
      <NuxtLink v-else class="more" to="/">索引 ›</NuxtLink>
    </footer>

    <aside class="ritual" aria-label="订阅">
      <p>若你也想收这类短文，留下邮箱即可。不吵，低频。</p>
      <form action="#" method="post" @submit.prevent>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          autocomplete="email"
        />
        <button type="submit">订阅</button>
      </form>
    </aside>
  </article>
</template>
