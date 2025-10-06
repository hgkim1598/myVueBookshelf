<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

// 부모로부터 v-model 값과 수식어(modifiers), 지연시간(delay)을 받음
const model = defineModel({ default: '' })
const props = defineProps({
  modelModifiers: {
    type: Object,
    default: () => ({})
  },
  delay: {
    type: Number,
    default: 300
  }
})

// 내부 입력 상태 (즉시 반영용)
const inner = ref(model.value)
let timer = null

// 수식어 처리 (예: .trim)
function applyModifiers(v) {
  if (props.modelModifiers?.trim) v = v.trim()
  // 필요하면 number 등 확장 가능
  return v
}

// 사용자가 입력할 때마다 디바운스 적용
watch(inner, (v) => {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    model.value = applyModifiers(v)
  }, props.delay)
})

// 부모에서 값이 바뀌면 내부에도 반영
watch(model, (v) => {
  if (v !== inner.value) inner.value = v
})

// 컴포넌트 언마운트 시 타이머 정리
onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <div class="debounced-input">
    <input
      :value="inner"
      @input="inner = $event.target.value"
      placeholder="검색어를 입력하세요"
    />
  </div>
</template>

<style scoped>
.debounced-input input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}
.debounced-input input:focus {
  outline: none;
  border-color: #666;
}
</style>
