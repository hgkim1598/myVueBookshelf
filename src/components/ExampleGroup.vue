<!-- src/components/ExampleGroup.vue -->
<script setup>
defineProps({
  title: { type: String, required: true },
  note: { type: String, default: '' },
  compact: { type: Boolean, default: false }
})
</script>

<template>
  <section class="example-group" :class="{ compact }">
    <header class="ex-header">
      <h4>{{ title }}</h4>
      <p v-if="note" class="ex-note">{{ note }}</p>
    </header>

    <div class="ex-body">
      <!-- 코드 영역 -->
      <div class="ex-code-group">
        <div class="ex-code">
          <div class="ex-label">Parent.vue</div>
          <slot name="code-parent" />
        </div>
        <div class="ex-code">
          <div class="ex-label">Child.vue</div>
          <slot name="code-child" />
        </div>
      </div>

      <!-- 결과 영역 -->
      <div class="ex-result-group">
        <div class="ex-result">
          <div class="ex-label">Parent Result</div>
          <slot name="result-parent" />
        </div>
        <div class="ex-result">
          <div class="ex-label">Child Result</div>
          <slot name="result-child" />
        </div>
      </div>
    </div>

    <hr class="ex-divider" />
  </section>
</template>

<style scoped>
/* === ExamplePair와 동일한 기본 구조 유지 === */
.example-group { padding: 12px 0; }
.ex-header { margin-bottom: 8px; }
.ex-header h4 { margin: 0 0 6px; font-size: 16px; }
.ex-note { margin: 0; color: #666; font-size: 13px; white-space: pre-line; }

/* === 그룹 구조 === */
.ex-body {
  display: flex;             /* grid → flex */
  flex-direction: column;    /* 위아래로 쌓이게 */
  gap: 16px;                 /* 그룹 간 간격 */
}

/* 코드 그룹 / 결과 그룹 각각 세로 배치 */
.ex-code-group,
.ex-result-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 코드/결과 박스 공통 */
.ex-code,
.ex-result {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  background: #fafafa;
  overflow: auto;
  text-align: start;
  position: relative;
}

/* 결과는 배경색만 다르게 */
.ex-result { background: #fff; }

/* 파일명/라벨 표시 */
.ex-label {
  position: absolute;
  top: 4px;
  right: 8px;
  font-size: 11px;
  font-weight: 600;
  color: #999;
  background: rgba(255,255,255,0.7);
  padding: 2px 6px;
  border-radius: 4px;
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
