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

const { data: allPosts } = await useAsyncData("blog-index", () =>
  queryCollection("blog")
    .where("draft", "=", false)
    .order("date", "DESC")
    .all(),
)

const neighbors = computed(() => {
  const list = allPosts.value || []
  const idx = list.findIndex((x) => x.path === post.value?.path)
  if (idx < 0) return { prev: null, next: null }
  return {
    prev: list[idx - 1] ?? null,
    next: list[idx + 1] ?? null,
  }
})

const coverSrc = computed(() => {
  const c = post.value?.cover
  return typeof c === "string" && c ? c : null
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
    <div v-if="coverSrc" class="cover">
      <img :src="coverSrc" width="400" height="400" alt="" />
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

    <footer class="end">
      <NuxtLink v-if="neighbors.prev" class="more" :to="neighbors.prev.path">
        ‹ 上一篇
      </NuxtLink>
      <span v-else />
      <NuxtLink v-if="neighbors.next" class="more" :to="neighbors.next.path">
        下一篇 ›
      </NuxtLink>
    </footer>
  </article>
</template>
