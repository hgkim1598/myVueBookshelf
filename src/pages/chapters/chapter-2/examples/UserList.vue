<script setup>
defineProps({
  users: Array,
  loading: Boolean,
  error: String,
})

const emit = defineEmits(['select'])
</script>
<template>
  <div v-if="loading">로딩중 ...</div>
  <div v-else-if="error">{{ error }}</div>
  <ul v-else>
    <li
      v-for="user in users"
      :key="user.id"
      @click="emit('select', user)"
    >
    {{ user.name }}
    </li>
  </ul>
</template>