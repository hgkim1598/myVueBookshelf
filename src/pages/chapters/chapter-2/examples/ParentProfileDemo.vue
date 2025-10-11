<script setup>
import { ref } from 'vue'
import ProfileForm from './ProfileForm.vue';

const name = ref('Kim')
const agree = ref(false)

function handleSubmit (payload){
  alert(`제출됨: ${JSON.stringify(payload, null, 2)}`)
}
</script>
<template>
  <section
    style="display: grid; gap: 12px"
  >
  <ProfileForm
    v-model="name"
    v-moddel:agreed="agree"
    :max-length="20"
    @submit="handleSubmit"
  />

  <div
    style="border-top: 1px dashed #ddd; padding-top: 8px">
    <p><b>부모 상태</b></p>
    <p>name: {{ name }}</p>
    <p>agreed: {{ agreed }}</p>
  </div>
  </section>
</template>