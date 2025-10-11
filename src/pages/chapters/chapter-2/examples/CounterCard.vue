<script setup>
const props = defineProps({
  title: {
    tyep: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 'idle',
    validator: (v) => ['idle', 'loading'].includes(v)
  }
})

const emit = defineEmits({
  'update:count': (val) => typeof val === 'number',
  'submit': (payload) => payload && typeof payload.id === 'string'
})

function inc() {
  if (props.status === 'loading') return
  emit('update:count', props.count + 1)
}

function dec () {
  if(props.status === 'loading') return
  emit('update:count', Math.max(0, props.count - 1))
}

function submit () {
  if (props.status === 'loading') return
  emit('submit', { id: crypto.randomUUID(), at: Date.now() })
}
</script>
<template>
  <article class="card">
    <header class="card__head">
      <h4>{{ props.title }}</h4>
      <small>Status: {{ props.status }}</small>
    </header>

    <div class="card__body">
      <p class="count">Count: <b>{{ props.count }}</b></p>
      <div class="actions">
        <button
          class="example-btn"
          @click="dec" 
          :disabled="props.status === 'loading'"
          >
          -1
        </button>
        <button 
          class="example-btn" 
          @click="inc" 
          :disabled="props.status === 'loading'"
          >
          +1
        </button>
        <button 
          class="example-btn" 
          @click="submit" 
          :disabled="props.status === 'loading'"
          >
          submit
        </button>
      </div>
    </div>
  </article>

</template>
<style scoped>
.card { border:1px solid #e5e7eb; border-radius:10px; padding:12px; }
.card__head { display:flex; justify-content:space-between; align-items:center; }
.card__body { display:grid; gap:8px; }
.actions { display:flex; gap:8px; }
</style>