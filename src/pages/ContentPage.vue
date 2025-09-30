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
          <h3>💻 예제</h3>
          <slot name="code">
            <pre v-if="code"><code class="language-javascript">{{ code }}</code></pre>
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

</style>
