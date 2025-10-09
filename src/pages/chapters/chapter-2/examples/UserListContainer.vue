<script setup>
import { ref, onMounted } from 'vue'
import UserList from './UserList.vue';

const users = ref([])
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  try{
    loading.value = true
    users.value = [
      { id: 1, name: '홍길동' },
      { id: 2, name: '김민수' }
    ]
  } catch (e) {
    error.value = '데이터를 불러오지 못했습니다'
  } finally {
    loading.value = false
  }
})

function onSelect(user) {
  console.log('선택한 사용자:', user)
}
</script>
<template>
  <UserList
    :users="users"
    :error="error"
    :loading="loading"
    @select="onSelect"
  />
</template>