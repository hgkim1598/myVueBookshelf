<script setup>
defineProps({
  title: { type: String, required: true },
  note: { type: String, default: '' },
  compact: { type: Boolean, default: false }
})
</script>

<template>
  <section class="example-pair" :class="{ compact }">
    <header class="ex-header">
      <h4>{{ title }}</h4>
      <p v-if="note" class="ex-note">{{ note }}</p>
    </header>

    <div class="ex-body">
      <div class="ex-code">
        <slot name="code" />
      </div>
      <div class="ex-result">
        <slot name="result" />
      </div>
    </div>

    <hr class="ex-divider" />
  </section>
</template>

<style scoped>
.example-pair { padding: 12px 0; }
.ex-header { margin-bottom: 8px; }
.ex-header h4 { margin: 0 0 6px; font-size: 16px; }
.ex-note { margin: 0; color: #666; font-size: 13px; }
.ex-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
.ex-code {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  background: #fafafa;
  overflow: auto;
  text-align: start;
}
.ex-result {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  background: #fff;
}
.ex-divider {
  margin: 16px 0;
  border: none;
  border-top: 1px dashed #ddd;
}
@media (max-width: 980px) {
  .ex-body { grid-template-columns: 1fr; }
}
.compact .ex-body { gap: 8px; }
</style>
