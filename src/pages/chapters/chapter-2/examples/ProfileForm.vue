<script setup>
const props = defineProps({
  maxLength: {
    type: Number,
    default: 50
  }
})

const name = defineModel()
const agreed = defineModel('agreed')

const emit = defineEmits({
  submit: (payload) => payload && typeof payload.name === 'string'
})

function onInput (e) {
  const v = String(e.target.value ?? '')
  name.value = v.slice(0, props.maxLength)
}

function toggleAgree () {
  agreed.value = !agreed.value
}

function onSubmitClick () {
  if (!name.value || !name.value.trim()) return
  emit('submit', { name: name.value, agreed: agreed.value, at: Date.now() })
}

</script>
<template>
<form
  class="form"
  @submit.prevent="onSubmitClick"
>
  <label class="row">
    <span class="lbl">Name</span>
    <input
      class="ipt"
      :vlaue="name"
      @input="onInput"
      :placeholder="`최대 ${props.maxLength}자`"
    />
  </label>

  <label class="row">
    <input type="checkbox" :checked="agreed" @change="toggleAgree" />
    <span>개인정보 처리 방침에 동의합니다</span>
  </label>

  <div class="actions">
    <button type="submit" :disabled="!name || !agreed">Submit</button>
  </div>
</form>
</template>

<style scoped>
.form { display: grid; gap: 10px; border: 1px solid #e5e7eb; padding: 12px; border-radius: 10px; }
.row { display: grid; grid-template-columns: 80px 1fr; align-items: center; gap: 8px; }
.lbl { font-size: 12px; color: #6b7280; }
.ipt { border: 1px solid #d1d5db; border-radius: 6px; padding: 6px 8px; }
.actions { display: flex; justify-content: flex-end; }
</style>