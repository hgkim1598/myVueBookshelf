<script setup>
import ContentPage from '@/pages/ContentPage.vue'
import ExampleGroup from '@/components/ExampleGroup.vue'
import ParentCounterDemo from './examples/ParentCounterDemo.vue';
import ParentProfileDemo from './examples/ParentProfileDemo.vue';

</script>
<template>
  <ContentPage>
    <template #concept>
      <h3>1. props & emits 한눈에 보기</h3>
      <div class="table-scroll">
        <table class="table table--compact table--rowline">
          <caption style="position: absolute; left: -9999px;">props와 emits 핵심 개념 표</caption>
          <thead>
            <tr>
              <th class="nowrap">항목</th>
              <th class="nowrap">설명</th>
              <th class="nowrap">실무 예</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="nowrap"><code>props</code></td>
              <td>부모 ➜ 자식으로 내려보내는 읽기 전용 데이터. 자식에서 직접 변경 금지(불변).</td>
              <td><code>&lt;Child :user="user" :disabled="isBusy" /&gt;</code></td>
            </tr>
            <tr>
              <td class="nowrap"><code>emits</code></td>
              <td>자식 ➜ 부모로 올려보내는 이벤트(신호). 페이로드 스키마를 명시해 검증 가능.</td>
              <td><code>&lt;Child @submit="onSubmit" /&gt;</code>, <code>emit('submit', payload)</code></td>
            </tr>
            <tr>
              <td class="nowrap"><code>defineProps()</code></td>
              <td>자식 컴포넌트에서 받을 프로퍼티들의 스펙을 선언.</td>
              <td><code>const props = defineProps({ size: { type: String, default: 'md' } })</code></td>
            </tr>
            <tr>
              <td class="nowrap"><code>withDefaults()</code></td>
              <td>타입 기반(props 인터페이스) 사용 시 기본값을 선언하는 도우미.</td>
              <td><code>withDefaults(defineProps&lt;Props&gt;(), { size: 'md' })</code></td>
            </tr>
            <tr>
              <td class="nowrap"><code>defineEmits()</code></td>
              <td>자식이 내보낼 이벤트 이름과 페이로드 검증(선택)을 선언.</td>
              <td><code>const emit = defineEmits({ submit: (p) =&gt; !!p.id })</code></td>
            </tr>
            <tr>
              <td class="nowrap"><code>v-model</code></td>
              <td>부모-자식 양방향 패턴. Vue 3.4+에서는 <code>defineModel()</code>로 간결하게.</td>
              <td><code>&lt;Child v-model="value" /&gt;</code> 또는 <code>&lt;Child :modelValue="x" @update:modelValue="x = $event" /&gt;</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="practical-tip">
        <span class="practical-tip__title">☝🏻 실무 포인트</span>
        <ul>
          <li><b>단방향 데이터 흐름</b>: <code>props</code>는 읽기 전용 → 변경이 필요하면 <code>emit</code>으로 부모에 요청.</li>
          <li><b>타입·검증 습관화</b>: <code>defineProps</code>/<code>defineEmits</code>에 타입(또는 유효성 함수)을 꼭 선언.</li>
          <li><b>이벤트 이름 컨벤션</b>: 사용자 동작은 <code>submit</code>/<code>change</code>, 모델 업데이트는 <code>update:xxx</code>.</li>
          <li><b>v-model 확장</b>: 다중 모델은 <code>v-model:title</code>, <code>v-model:checked</code>처럼 키를 붙여 사용.</li>
          <li><b>속성 전파 이해</b>: 선언되지 않은 속성은 기본적으로 루트 엘리먼트로 전달(<code>$attrs</code>). 불필요한 전파는 <code>inheritAttrs: false</code>.</li>
          <li><b>성능</b>: 큰 객체를 <code>props</code>로 내릴 때는 필요한 필드만 분해 전달하거나 얕은 변경 최소화.</li>
        </ul>
      </div>

      <div class="space-between-chapter" />

      <h3>2. 흔한 실수와 베스트 프랙티스</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li><b>❌ 자식에서 props 직접 변경</b> → <b>✅ emit</b>으로 부모에 변경 요청(상태 소유권은 부모).</li>
          <li><b>❌ 이벤트 이름 임의 혼용</b> → <b>✅ 표준화</b>: 값 변경 <code>update:field</code>, 액션 <code>submit</code>/<code>cancel</code>.</li>
          <li><b>❌ any/암묵적 타입</b> → <b>✅ 스키마 명시</b>(리터럴 유니온, 객체 Shape, 검증 함수).</li>
          <li><b>❌ 자식에서 비즈니스 로직 과다</b> → <b>✅ 프레젠테이션(자식) vs 상태/로직(부모) 분리.</b></li>
          <li><b>❌ <code>v-model</code>만 남발</b> → <b>✅ 명령형 이벤트</b>(<code>apply</code>, <code>reset</code>)와 혼용하여 의도 구분.</li>
          <li><b>❌ <code>$attrs</code> 무지</b> → <b>✅ 컴포넌트 루트/내부 어디에 바인딩되는지 확인</b>(디버그 때 <code>console.log($attrs)</code> 유용).</li>
        </ul>
      </div>

      <div class="space-between-chapter" />

      <h3>3. 패턴 모음 (바로 써먹는 레시피)</h3>
      <div class="table-scroll">
        <table class="table table--compact table--rowline">
          <caption style="position: absolute; left: -9999px;">props/emits 활용 패턴</caption>
          <thead>
            <tr>
              <th class="nowrap">패턴</th>
              <th class="nowrap">요점</th>
              <th class="nowrap">스니펫</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="nowrap">읽기 전용 + 변경 요청</td>
              <td>값은 <code>props</code>, 변경은 <code>emit('update:...')</code></td>
              <td><code>emit('update:count', props.count + 1)</code></td>
            </tr>
            <tr>
              <td class="nowrap">다중 v-model</td>
              <td>필드별 모델 바인딩</td>
              <td><code>&lt;Child v-model:title="t" v-model:checked="c" /&gt;</code></td>
            </tr>
            <tr>
              <td class="nowrap">defineModel (Vue 3.4+)</td>
              <td>모델 선언 간소화</td>
              <td><code>const model = defineModel&lt;string&gt;()</code></td>
            </tr>
            <tr>
              <td class="nowrap">이벤트 페이로드 검증</td>
              <td>런타임 안전망</td>
              <td><code>defineEmits({ submit: (p) =&gt; typeof p.id === 'string' })</code></td>
            </tr>
            <tr>
              <td class="nowrap">withDefaults</td>
              <td>타입 기반 기본값</td>
              <td><code>withDefaults(defineProps&lt;Props&gt;(), { size: 'md' })</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    
<template #code>
  <ExampleGroup
    title="EG1) props + emits: update:count 와 submit"
    :note="`부모가 상태를 소유하고, 자식은 읽기 전용(props) + emit으로 변경을 요청합니다.`"
  >
    <template #code-parent>
      <pre v-pre><code><!-- ParentCounterDemo.vue -->
&lt;script setup&gt;
import { ref } from 'vue'
import CounterCard from './CounterCard.vue'

const count = ref(0)
const status = ref('idle')

function onSubmit(payload) {
  console.log('submitted:', payload)
  alert(`제출됨: ${JSON.stringify(payload)}`)
}
&lt;/script&gt;

&lt;template&gt;
  &lt;section style="display:grid;gap:12px"&gt;
    &lt;CounterCard
      title="카운터"
      :count="count"
      :status="status"
      @update:count="count = $event"
      @submit="onSubmit"
    /&gt;

    &lt;div style="border-top:1px dashed #ddd; padding-top:8px"&gt;
      &lt;p&gt;&lt;b&gt;부모 상태&lt;/b&gt;&lt;/p&gt;
      &lt;p&gt;count: {{ count }}&lt;/p&gt;
      &lt;p&gt;status: {{ status }}&lt;/p&gt;
    &lt;/div&gt;
  &lt;/section&gt;
&lt;/template&gt;
</code></pre>
    </template>

    <template #code-child>
      <pre v-pre><code><!-- CounterCard.vue -->
&lt;script setup&gt;
const props = defineProps({
  title: { type: String, required: true },
  count: { type: Number, default: 0 },
  status: { type: String, default: 'idle', validator: (v) =&gt; ['idle','loading'].includes(v) }
})

const emit = defineEmits({
  'update:count': (val) =&gt; typeof val === 'number',
  'submit': (payload) =&gt; payload &amp;&amp; typeof payload.id === 'string'
})

function inc () {
  if (props.status === 'loading') return
  emit('update:count', props.count + 1)
}

function dec () {
  if (props.status === 'loading') return
  emit('update:count', Math.max(0, props.count - 1))
}

function submit () {
  if (props.status === 'loading') return
  emit('submit', { id: crypto.randomUUID(), at: Date.now(), count: props.count })
}
&lt;/script&gt;

&lt;template&gt;
  &lt;article class="card"&gt;
    &lt;header class="card__head"&gt;
      &lt;h4&gt;{{ props.title }}&lt;/h4&gt;
      &lt;small&gt;Status: {{ props.status }}&lt;/small&gt;
    &lt;/header&gt;

    &lt;div class="card__body"&gt;
      &lt;p class="count"&gt;Count: &lt;b&gt;{{ props.count }}&lt;/b&gt;&lt;/p&gt;
      &lt;div class="actions"&gt;
        &lt;button @click="dec" :disabled="props.status === 'loading'"&gt;-1&lt;/button&gt;
        &lt;button @click="inc" :disabled="props.status === 'loading'"&gt;+1&lt;/button&gt;
        &lt;button @click="submit" :disabled="props.status === 'loading'"&gt;Submit&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/article&gt;
&lt;/template&gt;

&lt;style scoped&gt;
.card { border:1px solid #e5e7eb; border-radius:10px; padding:12px; }
.card__head { display:flex; justify-content:space-between; align-items:center; }
.card__body { display:grid; gap:8px; }
.actions { display:flex; gap:8px; }
&lt;/style&gt;
</code></pre>
    </template>

    <template #result-parent>
      <ParentCounterDemo />
    </template>
  </ExampleGroup>

  <ExampleGroup
    title="Ex2) v-model(defineModel) + 명령형 emits (부모-자식)"
    :note="`Vue 3.4+의 defineModel로 양방향 바인딩을 간결하게 만들고, 별도 액션은 emits로 구분합니다.`"
  >

    <template #code-parent>
      <pre v-pre><code><!-- ParentDemo.vue -->
&lt;script setup&gt;
import { ref } from 'vue'
import ProfileForm from './ProfileForm.vue'

// 부모가 상태 소유
const name = ref('Kim')
const agreed = ref(false)

// 명령형 이벤트 핸들러
function handleSubmit (payload) {
  // 서버 호출/검증/라우팅 등 비즈니스 로직은 부모에서
  console.log('submit payload:', payload)
  alert(`제출됨: ${JSON.stringify(payload, null, 2)}`)
}
&lt;/script&gt;

&lt;template&gt;
  &lt;section style="display: grid; gap: 12px;"&gt;
    &lt;!-- v-model (기본 모델) --&gt;
    &lt;ProfileForm
      v-model="name"
      v-model:agreed="agreed"
      :max-length="20"
      @submit="handleSubmit"
    /&gt;

    &lt;div style="border-top: 1px dashed #ddd; padding-top: 8px;"&gt;
      &lt;p&gt;&lt;b&gt;부모 상태 미러링&lt;/b&gt;&lt;/p&gt;
      &lt;p&gt;name: {{ name }}&lt;/p&gt;
      &lt;p&gt;agreed: {{ agreed }}&lt;/p&gt;
    &lt;/div&gt;
  &lt;/section&gt;
&lt;/template&gt;
</code></pre>
    </template>

    <template #code-child>
      <pre v-pre><code><!-- ProfileForm.vue -->
&lt;script setup&gt;
const props = defineProps({
  maxLength: { type: Number, default: 50 }
})

// ✅ 기본 v-model (부모: &lt;ProfileForm v-model="name" /&gt;)
const name = defineModel()

// ✅ 명명된 v-model (부모: &lt;ProfileForm v-model:agreed="agreed" /&gt;)
const agreed = defineModel('agreed')

// ✅ 명령형 이벤트 (제출)
const emit = defineEmits({
  submit: (payload) =&gt; payload &amp;&amp; typeof payload.name === 'string'
})

function onInput (e) {
  const v = String(e.target.value ?? '')
  name.value = v.slice(0, props.maxLength)
}

function toggleAgree () {
  agreed.value = !agreed.value
}

function onSubmitClick () {
  if (!name.value || !name.value.trim()) return
  emit('submit', { name: name.value, agreed: agreed.value, at: Date.now() })
}

/*
  // (참고) defineModel 미사용 고전 패턴(JS)
  // const props = defineProps({ modelValue: String, agreed: Boolean })
  // const emit  = defineEmits(['update:modelValue', 'update:agreed', 'submit'])
  // 입력 시: emit('update:modelValue', e.target.value)
  // 체크 시: emit('update:agreed', !props.agreed)
*/
&lt;/script&gt;

&lt;template&gt;
  &lt;form class="form" @submit.prevent="onSubmitClick"&gt;
    &lt;label class="row"&gt;
      &lt;span class="lbl"&gt;Name&lt;/span&gt;
      &lt;input
        class="ipt"
        :value="name"
        @input="onInput"
        :placeholder="`최대 ${props.maxLength}자`"
      /&gt;
    &lt;/label&gt;

    &lt;label class="row"&gt;
      &lt;input type="checkbox" :checked="agreed" @change="toggleAgree" /&gt;
      &lt;span&gt;개인정보 처리방침에 동의합니다&lt;/span&gt;
    &lt;/label&gt;

    &lt;div class="actions"&gt;
      &lt;button type="submit" :disabled="!name || !agreed"&gt;Submit&lt;/button&gt;
    &lt;/div&gt;
  &lt;/form&gt;
&lt;/template&gt;

&lt;style scoped&gt;
.form { display: grid; gap: 10px; border: 1px solid #e5e7eb; padding: 12px; border-radius: 10px; }
.row { display: grid; grid-template-columns: 80px 1fr; align-items: center; gap: 8px; }
.lbl { font-size: 12px; color: #6b7280; }
.ipt { border: 1px solid #d1d5db; border-radius: 6px; padding: 6px 8px; }
.actions { display: flex; justify-content: flex-end; }
&lt;/style&gt;
</code></pre>
    </template>

    <template #result-parent>
      <ParentProfileDemo />
    </template>
  </ExampleGroup>
</template>


  </ContentPage>

</template>

<style scopded>
.card { border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px; }
.card__head { display: flex; justify-content: space-between; align-items: center; }
.actions { display: flex; gap: 8px; margin-top: 8px; }
.count { font-size: 14px; }
</style>