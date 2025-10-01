<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { curriculum } from '@/data/curriculum.js'
import ContentPage from '@/pages/ContentPage.vue'
import ExamplePair from '@/components/ExamplePair.vue'

// Ex1: 기본 반응형
const count1 = ref(0)
const doubled1 = computed(() => count1.value * 2)

// Ex2: 라이프사이클 + watch
const form2 = reactive({ keyword: '' })
const log2 = ref([])
onMounted(() => {
  log2.value.push('onMounted: 초기화 로직 실행')
})
watch(() => form2.keyword, (nv, ov) => {
  log2.value.push(`watch: ${ov ?? '(init)'} → ${nv}`)
})

// Ex3: props/emit 데모용 (간단히 부모-자식 통신)
const childValue3 = ref('')
function handleChildSubmit3(payload) {
  childValue3.value = payload
}

// 네비게이션
const route = useRoute()
const chapterPath = route.path.split('/page')[0]
const currentChapter = curriculum.find(c => c.path === chapterPath)
const currentPage = Number(route.params.pageId ?? 1)
const isFirst = currentPage <= 1
const isLast  = currentPage >= (currentChapter?.totalPages ?? 1)
const prevPath = `${currentChapter?.path}/page/${currentPage - 1}`
const nextPath = `${currentChapter?.path}/page/${currentPage + 1}`
</script>

<template>
  <ContentPage>
    <template #title>
      <h2>📘 1-1: <code>setup()</code>와 &lt;script setup&gt;</h2>
    </template>

    <!-- 좌측 설명 -->
    <template #concept>
      <h3>왜 setup()인가?</h3>
      <div class="list-center">
        <ul class="list--inside">
          <li><b>관심사 기준</b>으로 로직을 묶을 수 있음</li>
          <li>재사용 가능한 <em>composable</em> 추출이 쉬움</li>
          <li>TS와 결합하면 IDE 도움 강화</li>
        </ul>
      </div>

      <h4>&lt;script setup&gt; 특징</h4>

      <!-- ② HANGING 버전 (간격만 줄인 기본형) -->
      <div class="list-center">
        <ul class="list--hang">
          <li>템플릿에 자동으로 노출됨 → <code>return</code> 불필요</li>
          <li>간결한 문법, 최신 Vue 3 권장 방식</li>
        </ul>
      </div>
    </template>

    <!-- 우측 예제들 -->
    <template #code>
      <!-- Ex1 -->
      <ExamplePair
        title="Ex1) ref/computed"
        note="원시값은 ref, 객체/배열은 reactive"
      >
        <template #code>
<pre v-pre><code>import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() =&gt; count.value * 2)</code></pre>
        </template>
        <template #result>
          <div style="display:flex; gap:12px; align-items:center;">
            <button @click="count1++">+1</button>
            <span>count: {{ count1 }}</span>
            <span>/ doubled: {{ doubled1 }}</span>
          </div>
        </template>
      </ExamplePair>

      <!-- Ex2 -->
      <ExamplePair
        title="Ex2) onMounted + watch"
        note="DOM 접근은 onMounted, 특정 상태 추적은 watch"
      >
        <template #code>
<pre v-pre><code>import { reactive, ref, watch, onMounted } from 'vue'

const form = reactive({ keyword: '' })
const log = ref([])

onMounted(() =&gt; {
  log.value.push('onMounted: 초기화 로직 실행')
})

watch(() =&gt; form.keyword, (nv, ov) =&gt; {
  log.value.push(`watch: ${ov ?? '(init)'} → ${nv}`)
})</code></pre>
        </template>
        <template #result>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <input
              v-model="form2.keyword"
              placeholder="키워드 입력"
              style="padding:6px 8px; border:1px solid #ddd; border-radius:6px; width: 240px;"
            />
            <ul style="margin:0; padding-left: 18px;">
              <li v-for="(line, i) in log2" :key="i">{{ line }}</li>
            </ul>
          </div>
        </template>
      </ExamplePair>

      <!-- Ex3 -->
      <ExamplePair
        title="Ex3) props + emit"
        note="자식 → 부모 통신"
      >
        <template #code>
<pre v-pre><code>// ChildInput.vue
&lt;script setup&gt;
const props = defineProps({ modelValue: String })
const emit  = defineEmits(['update:modelValue','submit'])

function onSubmit() {
  emit('submit', props.modelValue)
}
&lt;/script&gt;

&lt;template&gt;
  &lt;input
    :value="modelValue"
    @input="e =&gt; emit('update:modelValue', e.target.value)"
  /&gt;
  &lt;button @click="onSubmit"&gt;Submit&lt;/button&gt;
&lt;/template&gt;</code></pre>
        </template>
        <template #result>
          <div style="display:flex; gap:8px; align-items:center;">
            <input
              :value="childValue3"
              @input="e => childValue3 = e.target.value"
              placeholder="자식 입력"
              style="padding:6px 8px; border:1px solid #ddd; border-radius:6px;"
            />
            <button @click="handleChildSubmit3(childValue3)">Submit</button>
            <span style="margin-left:8px;">부모가 받은 값: <b>{{ childValue3 }}</b></span>
          </div>
        </template>
      </ExamplePair>
    </template>

    <!-- 네비 -->
    <!-- <template #pager>
      <RouterLink v-if="!isFirst" :to="prevPath">← 이전</RouterLink>
      <div style="flex:1"></div>
      <RouterLink v-if="!isLast" :to="nextPath">다음 →</RouterLink>
    </template> -->
  </ContentPage>
</template>

<style scoped>
button {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: #fafafa;
  cursor: pointer;
  color: #333;
}
button:active { transform: translateY(1px); }
</style>
