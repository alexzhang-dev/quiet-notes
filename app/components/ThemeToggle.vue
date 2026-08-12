<script setup lang="ts">
const root = () => document.documentElement

function current(): "light" | "dark" {
  const attr = root().getAttribute("data-theme")
  if (attr === "light" || attr === "dark") return attr
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function apply(next: "light" | "dark") {
  root().setAttribute("data-theme", next)
  try {
    localStorage.setItem("quiet-theme", next)
  } catch {
    /* ignore */
  }
  label.value = next === "dark" ? "切换到浅色" : "切换到深色"
}

const label = ref("切换浅色 / 深色")

onMounted(() => {
  const c = current()
  if (root().getAttribute("data-theme")) apply(c)
  else label.value = c === "dark" ? "切换到浅色" : "切换到深色"
})

function toggle() {
  apply(current() === "dark" ? "light" : "dark")
}
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="label"
    title="切换浅色 / 深色"
    @click="toggle"
  >
    <svg
      class="icon-moon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      aria-hidden="true"
    >
      <path
        d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5z"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <svg
      class="icon-sun"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        stroke-linecap="round"
      />
    </svg>
  </button>
</template>
