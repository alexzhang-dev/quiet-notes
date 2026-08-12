<script setup lang="ts">
withDefaults(
  defineProps<{ text?: string }>(),
  {
    text: "quiet notes",
  },
)
</script>

<template>
  <p class="page-col pb-12 text-[0.8125rem] text-faint sm:pb-14">
    {{ text }}
  </p>
</template>
