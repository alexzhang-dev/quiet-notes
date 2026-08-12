<script setup lang="ts">
withDefaults(
  defineProps<{ text?: string }>(),
  {
    text: "quiet notes",
  },
)
</script>

<template>
  <p class="foot">{{ text }}</p>
</template>
