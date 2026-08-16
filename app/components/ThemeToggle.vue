<script setup lang="ts">
type Theme = "light" | "dark" | "system"

const root = () => document.documentElement
const order: Theme[] = ["system", "light", "dark"]

const labels: Record<Theme, string> = {
  system: "跟随系统，点击切换到浅色",
  light: "浅色，点击切换到深色",
  dark: "深色，点击切换到跟随系统",
}

function stored(): Theme {
  try {
    const t = localStorage.getItem("quiet-theme")
    if (t === "light" || t === "dark" || t === "system") return t
  } catch {
    /* ignore */
  }
  const attr = root().getAttribute("data-theme")
  if (attr === "light" || attr === "dark") return attr
  return "system"
}

function apply(next: Theme) {
  if (next === "system") root().removeAttribute("data-theme")
  else root().setAttribute("data-theme", next)
  try {
    localStorage.setItem("quiet-theme", next)
  } catch {
    /* ignore */
  }
  mode.value = next
  label.value = labels[next]
}

const mode = ref<Theme>("system")
const label = ref(labels.system)

onMounted(() => {
  apply(stored())
})

function toggle() {
  const i = order.indexOf(mode.value)
  apply(order[(i + 1) % order.length]!)
}
</script>

<template>
  <button
    type="button"
    class="theme-toggle inline-flex items-center justify-center w-8 h-8 border-0 rounded-full bg-transparent text-faint cursor-pointer transition-colors duration-250 hover:text-ink hover:bg-avatar-bg"
    :aria-label="label"
    title="浅色 / 深色 / 跟随系统"
    @click="toggle"
  >
    <svg
      class="icon-system w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="13" rx="1.75" />
      <path d="M8 20h8M12 17v3" stroke-linecap="round" />
    </svg>
    <svg
      class="icon-moon w-4 h-4"
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
      class="icon-sun w-4 h-4"
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
