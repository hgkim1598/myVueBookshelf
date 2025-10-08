<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const model = defineModel({ dlefault: '' })
const props = defineProps({
  modelModifiers: {
    type: Object,
    default: ()=>({})
  },
  delay: {
    type: Number,
    default: 300
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const inner = ref(model.value)
let timer = null
let isComposing = false

function applyModifiers(v) {
  if (props.modelModifiers?.trim) v = v.trim()
  return v
}

watch(inner, (v) => {
  if (isComposing) return
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    model.value = applyModifiers(v)
  }, props.delay)
})

watch(model, (v) => {
  if (v !== inner.value) inner.value = v
})

function flushNow() {
  if (timer) { clearTimeout(timer); timer = null}
  model.value = applyModifiers(inner.value)
}

onBeforeUnmount(() => { if (timer) clearTimeout(timer) })
</script>
<template>
  <input
    class="example-input"
    :value="inner"
    :placeholder="placeholder"
    @compositionstart="isComposing = true"
    @compositionend="(e) => { isComposing = false; inner = e.target.value; flushNow() }"
    @input="inner = $event.target.value"
    @keydown.enter.prevent="flushNow()"
    @blur="flushNow()"
  />
</template>