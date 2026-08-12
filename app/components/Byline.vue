<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    author: string
    date: string | Date
    location?: string
    minutes?: number
    authorHref?: string
    initials?: string
  }>(),
  {
    authorHref: "#",
  },
)

const initialsResolved = computed(() => {
  if (props.initials) return props.initials
  return props.author
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
})

const dateObj = computed(() => {
  const d = typeof props.date === "string" ? new Date(props.date) : props.date
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, "0")
  const day = String(d.getUTCDate()).padStart(2, "0")
  return { label: `${y}.${m}.${day}`, iso: `${y}-${m}-${day}` }
})
</script>

<template>
  <div class="byline">
    <a class="author" :href="authorHref">
      <span class="avatar" aria-hidden="true">{{ initialsResolved }}</span>
      {{ author }}
    </a>
    <span class="dot" aria-hidden="true" />
    <time :datetime="dateObj.iso">{{ dateObj.label }}</time>
    <template v-if="location">
      <span class="dot" aria-hidden="true" />
      <span>{{ location }}</span>
    </template>
    <template v-if="typeof minutes === 'number'">
      <span class="dot" aria-hidden="true" />
      <span>约 {{ minutes }} 分钟</span>
    </template>
  </div>
</template>
