<script setup>
import ContentPage from '@/pages/ContentPage.vue'
import ExamplePair from '@/components/ExamplePair.vue'
</script>

<template>
  <ContentPage>
    <!-- 제목 -->
    <template #title>
      <h2>📘 1-2: Options API 이해하기</h2>
    </template>

    <!-- 좌측 개념 -->
    <template #concept>
      <h3>📖 Options API란?</h3>

      <div class="list-center">
        <ul class="list--hang">
          <li><b>data / computed / methods / watch</b> 같은 옵션으로 구성</li>
          <li>구조가 명확해서 초심자나 레거시 코드 이해에 유리</li>
          <li>하지만 로직이 흩어져서 응집도가 낮아질 수 있음</li>
        </ul>
      </div>

      <h4>실무 포인트</h4>
      <div class="list-center">
        <ul class="list--hang">
          <li>기존 프로젝트 유지보수 시 여전히 많이 마주침</li>
          <li>새 기능 추가는 Composition API 권장</li>
          <li>점진적으로 Composition API로 마이그레이션</li>
        </ul>
      </div>
    </template>


    <!-- 우측 예제 -->
    <template #code>
      <!-- Ex1 -->
      <ExamplePair
        title="Ex1) count + doubled (Options API)"
        note="Page1에서 했던 ref/computed을 Options API로"
      >
        <template #code>
<pre v-pre><code>&lt;script&gt;
export default {
  data() {
    return { count: 0 }
  },
  computed: {
    doubled() { return this.count * 2 }
  },
  methods: {
    inc() { this.count++ }
  }
}
&lt;/script&gt;

&lt;template&gt;
  &lt;button @click="inc"&gt;+1&lt;/button&gt;
  &lt;span&gt;count: {{ count }} / doubled: {{ doubled }}&lt;/span&gt;
&lt;/template&gt;
</code></pre>
        </template>
        <template #result>
          <p>여기서는 단순히 코드만 보여주고, 실행은 Page1 예제와 동일합니다.</p>
        </template>
      </ExamplePair>

      <!-- Ex2 -->
      <ExamplePair
        title="Ex2) watch + mounted"
        note="Options API에서의 라이프사이클과 watch"
      >
        <template #code>
<pre v-pre><code>&lt;script&gt;
export default {
  data() {
    return { keyword: '', log: [] }
  },
  mounted() {
    this.log.push('mounted: 초기화 실행')
  },
  watch: {
    keyword(nv, ov) {
      this.log.push(`watch: ${ov ?? '(init)'} → ${nv}`)
    }
  }
}
&lt;/script&gt;

&lt;template&gt;
  &lt;input v-model="keyword" placeholder="키워드 입력" /&gt;
  &lt;ul&gt;
    &lt;li v-for="(line,i) in log" :key="i"&gt;{{ line }}&lt;/li&gt;
  &lt;/ul&gt;
&lt;/template&gt;
</code></pre>
        </template>
        <template #result>
          <p>Page1의 Ex2와 기능은 동일합니다. Options API 스타일만 다릅니다.</p>
        </template>
      </ExamplePair>
    </template>
  </ContentPage>
</template>
