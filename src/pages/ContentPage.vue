<template>
  <div class="content-book">
    <!-- Left Page -->
    <section class="page left">
      <header class="page-title">
        <slot name="title"><h2>{{ title }}</h2></slot>
      </header>

      <div class="page-body">
        <div class="section">
          <h3>📖 개념</h3>
          <div class="concept">
            <slot name="concept">
              <div v-if="concept" v-html="concept"></div>
            </slot>
          </div>
        </div>
      </div>
    </section>

    <div class="gutter" aria-hidden="true"></div>

    <!-- Right Page -->
    <section class="page right">
      <div class="page-body">
        <div class="section code">
          <h3>💻 코드</h3>
          <slot name="code">
            <pre v-if="code"><code class="language-javascript">{{ code }}</code></pre>
          </slot>
        </div>

        <div class="section result">
          <h3>✨ 실행 결과</h3>
          <slot name="result">
            <p v-if="result">{{ result }}</p>
          </slot>
        </div>
      </div>

      <footer class="pager">
        <slot name="pager"></slot>
      </footer>
    </section>
  </div>
</template>


<script setup>
const props = defineProps({
  title: { type: String, default: '' },
  concept: { type: String, default: '' }, 
  code: { type: String, default: '' },
  result: { type: String, default: '' },
  stickyRight: { type: Boolean, default: true },
})
</script>

<style scoped>
.content-book {
  --page-gap: 24px;
  --page-padding: 24px;
  display: grid;
  grid-template-columns: 1fr 2px 1fr; /* left | gutter | right */
  gap: var(--page-gap);
  --text-color: #333;
  --muted-color: #555;
  /* ✅ 화면 꽉 채우기: 상위 레이아웃(헤더 등)이 있으면 변수로 여백 보정 */
  /* 필요시 BookLayout에서 .book-root 같은 상위에 height:100vh 주고 여긴 height:100%로 써도 OK */
  min-height: calc(90vh - var(--book-offset, 0px));
  /* 높이를 강제하고 싶으면 height 사용: height: calc(100vh - var(--book-offset, 0px)); */
  max-width: 1000px;
  margin: 0 auto;
}

.page {
  background: #fff;
  border-radius: 10px;
  padding: var(--page-padding);
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  color: var(--text-color);

  display: flex;
  flex-direction: column;
  min-height: 0;
}

.page-title h2 {
  margin: 0 0 12px;
}

.page-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
}

.section { margin-bottom: 24px; }
.section h3 { margin: 0 0 12px; color: #333; }
.concept { line-height: 1.6; color: #555; }

.code pre {
  background: #f8f8f8;
  border-radius: 6px;
  padding: 14px;
  overflow-x: auto;
}

.result p {
  background: #e8f5e8;
  padding: 14px;
  border-radius: 6px;
  border-left: 4px solid #4caf50;
}

.gutter {
  background: linear-gradient(#ddd, #ddd) no-repeat center/2px 100%;
}

.right.sticky {
  position: sticky;
  top: 16px;
  align-self: start;
  height: fit-content;
}

.pager {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 8px;
}

@media (max-width: 960px) {
  .content-book {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .gutter { display: none; }
  .right.sticky { position: static; }
}
</style>
