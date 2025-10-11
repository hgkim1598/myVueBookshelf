<script setup>
import {ref} from 'vue'
import CounterCard from './CounterCard.vue';
import AppToast from '../../../../components/AppToast.vue';

const count = ref(0)
const status = ref('idel')

const toastRef = ref(null)

function handleSubmit (payload) {
  toastRef.value?.show(`제출됨: ${payload.name}`, 'success')
  alert(`제출됨: ${JSON.stringify(payload)}`)
}
</script>
<template>
  <section style="display: grid; gap: 12px;">
    <CounterCard
      title="카운터"
      :count="count"
      :status="status"
      @update:count="count = $event"
      @submit="handleSubmit"
    />
    <div
      style="border-top: 1px dashed #ddd; padding-top: 8px">
      <p><b>부모 상태</b></p>
      <p>Count: {{ count }}</p>
      <p>Status: {{ status }}</p>
    </div>
  </section>

<AppToast ref="toastRef" />
</template>