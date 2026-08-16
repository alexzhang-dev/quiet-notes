<script setup lang="ts">
export type TocLink = {
  id: string
  depth: number
  text: string
  children?: TocLink[]
}

const props = defineProps<{
  links: TocLink[]
}>()

const items = computed(() => {
  const flat: { id: string; depth: number; text: string }[] = []
  const walk = (nodes: TocLink[]) => {
    for (const node of nodes) {
      if (node.id && node.text) {
        flat.push({ id: node.id, depth: node.depth, text: node.text })
      }
      if (node.children?.length) walk(node.children)
    }
  }
  walk(props.links)
  return flat
})

const dialog = ref<HTMLDialogElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const activeId = ref("")
const open = ref(false)
const useRail = ref(false)

function canHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches
}

function gutterLeft() {
  const article = document.querySelector(".article")
  if (!(article instanceof HTMLElement)) return 0
  return article.getBoundingClientRect().left
}

function refreshMode() {
  useRail.value = canHover() && gutterLeft() >= 72
  if (!useRail.value) open.value = false
}

function onPointerMove(event: PointerEvent) {
  if (!useRail.value) {
    open.value = false
    return
  }
  open.value = event.clientX < gutterLeft()
}

function onPointerLeaveWindow(event: PointerEvent) {
  if (!event.relatedTarget) open.value = false
}

function modifiedClick(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0
}

function go(id: string) {
  activeId.value = id
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const offset = 108
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" })
  history.replaceState(null, "", `#${id}`)
}

function onRowClick(event: MouseEvent, id: string) {
  if (modifiedClick(event)) return
  event.preventDefault()
  go(id)
  closeDialog()
}

function openDialog() {
  dialog.value?.showModal()
  const first = dialog.value?.querySelector<HTMLAnchorElement>("a[href]")
  first?.focus()
}

function closeDialog() {
  dialog.value?.close()
}

function onDialogClick(event: MouseEvent) {
  if (event.target === dialog.value) closeDialog()
}

let io: IntersectionObserver | undefined

onMounted(() => {
  refreshMode()
  window.addEventListener("pointermove", onPointerMove, { passive: true })
  window.addEventListener("resize", refreshMode, { passive: true })
  document.documentElement.addEventListener("pointerleave", onPointerLeaveWindow)

  const headings = items.value
    .map((item) => document.getElementById(item.id))
    .filter((el): el is HTMLElement => !!el)

  if (!headings.length) return

  io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      const id = visible[0]?.target.id
      if (id) activeId.value = id
    },
    { rootMargin: "-18% 0px -68% 0px", threshold: 0 },
  )

  for (const heading of headings) io.observe(heading)
})

onUnmounted(() => {
  window.removeEventListener("pointermove", onPointerMove)
  window.removeEventListener("resize", refreshMode)
  document.documentElement.removeEventListener("pointerleave", onPointerLeaveWindow)
  io?.disconnect()
})
</script>

<template>
  <nav
    v-if="items.length"
    class="toc-rail"
    :class="{ 'is-rail': useRail, 'is-open': open }"
    aria-label="章节"
  >
    <ol class="toc-rows">
      <li v-for="item in items" :key="item.id" :data-depth="item.depth">
        <a
          class="toc-row"
          :class="{ 'is-active': activeId === item.id }"
          :href="'#' + item.id"
          :aria-current="activeId === item.id ? 'location' : undefined"
          @click="onRowClick($event, item.id)"
        >
          <span class="toc-tick" aria-hidden="true" />
          <span class="toc-label">{{ item.text }}</span>
        </a>
      </li>
    </ol>
  </nav>

  <ClientOnly>
    <Teleport to="#toc-slot">
      <button
        v-if="items.length"
        ref="trigger"
        type="button"
        class="toc-trigger"
        :class="{ 'is-hidden': useRail }"
        aria-haspopup="dialog"
        aria-controls="toc-dialog"
        aria-label="章节"
        @click="openDialog"
      >
        <span class="toc-trigger-marks" aria-hidden="true" />
      </button>
    </Teleport>
  </ClientOnly>

  <dialog
    v-if="items.length"
    id="toc-dialog"
    ref="dialog"
    class="toc-dialog"
    aria-label="章节"
    @click="onDialogClick"
    @close="trigger?.focus()"
  >
    <nav class="toc-dialog-panel" aria-label="章节">
      <ol class="toc-rows">
        <li v-for="item in items" :key="'dialog-' + item.id" :data-depth="item.depth">
          <a
            class="toc-row"
            :class="{ 'is-active': activeId === item.id }"
            :href="'#' + item.id"
            :aria-current="activeId === item.id ? 'location' : undefined"
            @click="onRowClick($event, item.id)"
          >
            <span class="toc-label">{{ item.text }}</span>
          </a>
        </li>
      </ol>
    </nav>
  </dialog>
</template>
