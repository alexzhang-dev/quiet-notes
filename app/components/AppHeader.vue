<template>
  <header
    class="page-col flex items-baseline justify-between pt-5 pb-2 sm:pt-7 sm:pb-3 lg:pt-8 lg:pb-4"
  >
    <NuxtLink class="text-sm font-medium tracking-wide text-faint" to="/">
      quiet<em class="not-italic text-muted"> · notes</em>
    </NuxtLink>
    <nav class="flex items-center gap-3">
      <NuxtLink class="text-sm font-medium text-faint" to="/">索引</NuxtLink>
      <ThemeToggle />
    </nav>
  </header>
</template>
