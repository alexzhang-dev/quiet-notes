<script setup lang="ts">
const props = defineProps<{
  date: string | Date
  minutes?: number
}>()

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
    <time :datetime="dateObj.iso">{{ dateObj.label }}</time>
    <template v-if="typeof minutes === 'number'">
      <span class="dot" aria-hidden="true" />
      <span>约 {{ minutes }} 分钟</span>
    </template>
  </div>
</template>
