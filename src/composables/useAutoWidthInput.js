// 사이즈 측정 범용 버전
// src/composables/useAutoWidthInput.js
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

export function useAutoWidthInput(options = {}) {
  const { min = 120, max = 560, extra = 12, observePlaceholder = true } = options

  const inputRef = ref(null)
  const widthPx = ref(min)

  const mirror = document.createElement('span')
  mirror.style.position = 'absolute'
  mirror.style.visibility = 'hidden'
  mirror.style.whiteSpace = 'pre'
  mirror.style.pointerEvents = 'none'
  document.body.appendChild(mirror)

  const syncMirrorStyleFromInput = (el) => {
    const cs = getComputedStyle(el)
    ;[
      'fontFamily','fontSize','fontWeight','fontStyle','letterSpacing',
      'textTransform','textIndent','textRendering','textOverflow',
      'paddingLeft','paddingRight','borderLeftWidth','borderRightWidth',
    ].forEach((p) => { mirror.style[p] = cs[p] })
  }

  const measure = (el) => {
    if (el.value) {
      mirror.textContent = el.value
    } else if (observePlaceholder && el.placeholder) {
      mirror.textContent = el.placeholder
    } else {
      mirror.textContent = ''
    }
    const raw = mirror.getBoundingClientRect().width + extra
    return Math.max(min, Math.min(max, Math.ceil(raw)))
  }

  const recalc = () => {
    const el = inputRef.value
    if (!el) return
    syncMirrorStyleFromInput(el)
    widthPx.value = measure(el)
  }

  const onInput = () => recalc()
  const onResize = () => recalc()

  onMounted(async () => {
    await nextTick()
    recalc()
    window.addEventListener('resize', onResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
    mirror.remove()
  })

  return { inputRef, widthPx, onInput, recalc }
}
