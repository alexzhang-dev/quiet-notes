<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    tone?: "note" | "warn"
  }>(),
  { tone: "note" },
)

const label = computed(() => (props.tone === "warn" ? "注意" : "注"))
</script>

<template>
  <aside class="mdc-note" :data-tone="tone" :aria-label="label">
    <p class="mdc-note-kicker">{{ label }}</p>
    <div class="mdc-note-body">
      <slot />
    </div>
  </aside>
</template>
