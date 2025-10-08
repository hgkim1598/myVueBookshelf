// src/utils/resizeInput.js
export function resizeInput(el, extra = 10) {
  if (!el) return

  const cs = getComputedStyle(el)
  const isBorderBox = cs.boxSizing === 'border-box'
  const padding =
    parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)
  const border =
    parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth)

  const prevValue = el.value
  const usePlaceholder = !el.value && el.placeholder

  // placeholder 길이로도 정확히 재기
  if (usePlaceholder) el.value = el.placeholder

  // 측정을 위해 폭 최소화
  el.style.width = '0px'
  const contentWidth = el.scrollWidth // 내용 영역 기준
  if (usePlaceholder) el.value = prevValue

  // box-sizing에 맞춰 보정
  let target = contentWidth + extra
  if (isBorderBox) target += padding + border

  el.style.width = Math.ceil(target) + 'px'
}
