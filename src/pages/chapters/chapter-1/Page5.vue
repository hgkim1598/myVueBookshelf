<script setup>
import ContentPage from '@/pages/ContentPage.vue'
import ExamplePair from '@/components/ExamplePair.vue'
/** 예제 2번 */
import { ref } from 'vue'
import ExampleGroup from '@/components/ExampleGroup.vue'
import DebouncedInput from '@/pages/chapters/chapter-1/examples/DebouncedInput.vue'
import ExampleDebounceParent from '@/pages/chapters/chapter-1/examples/ExampleDebounceParent.vue'


/** 예제 1번 */
import { reactive, computed, watch } from 'vue'

const form = reactive({
  name: '',
  age: null,       // 숫자 또는 null
  memo: ''
})
// 실시간 검증(간단 예)
const errors = reactive({ name: '', age: '' })
watch(() => form.name, (v) => {
  errors.name = v ? '' : '이름은 필수입니다.'
})
watch(() => form.age, (v) => {
  errors.age = (v === null || Number.isNaN(v)) ? '나이는 숫자여야 합니다.' : ''
})
// 서버 전송용 페이로드(트림된 이름, 숫자 age, 빈 메모 허용)
const payload = computed(() => ({
  name: form.name,
  age: form.age,         // null 허용. 서버 스키마에 맞춰 처리
  memo: form.memo
}))

/** 예제 2번 */
const keyword = ref('')



</script>
<template>
  <ContentPage>
    <template #title>
      <h2>📘 1-5: 양방향 바인딩</h2>
    </template>

    <template #concept>
      <h3>1. <b>v-mode</b>은 사실 '문법 설탕(sugar)'</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li>
            기본 동작(단일 모델)
            <span class="hang-line">부모 템플릿에서</span>
            <span class="hang-line">
              <pre v-pre><code>
    &lt;MyInput v-model="value" /&gt;
              </code></pre>
            </span>
            <span class="hang-line">를 쓰면, 자식 컴포넌트는 자동으로</span>
            <ul>
              <li><code>modelValue</code>prop을 받고</li>
              <li>
                <code>update:modelValue</code>emit을 기대한다
                <span class="hang-line">즉, 아래와 완전히 동일하다</span>
                <span class="hang-line">
                  <pre v-pre><code>
    &lt;MyInput :modelValue="value" @update:modelValue="value = $event" /&gt;
                  </code></pre>
                </span>
              </li>

            </ul>
          </li>
          <li>
            여러 모델(명명된 v-model)
            <span class="hang-line">하나의 컴포넌트가 둘 이상의 값을 양방향 바인딩할 때:</span>
            <span class="hang-line">
              <pre v-pre><code>
    &lt;DateRangePicker
      v-model:start="filters.startDate"
      v-model:end="filters.endDate"
    /&gt;
              </code></pre>
            </span>
            <span class="hang-line">
              → 자식은 <code>start</code>/<code>end</code> props와 <code>update:start</code>/<code>update:end</code> emits를 갖는다
            </span>
          </li>
          <li>
            수식어(modifiers): <code>.lazy</code>, <code>.trim</code>, <code>.number</code>
            <ul>
              <li>
                <code>lazy</code>: <code>input</code> 이벤트가 아니라 <code>change</code> 시점(blur 또는 엔터)에서만 동기화 한다
                <span class="hang-line"><b>IME(한글/일어 등 조합 입력)</b>에서 중간 값으로 검증 / API 호출이 난사되는 걸 막을 때 유용</span>
              </li>
              <li><code>.trim</code>: 앞뒤 공백 제거 후 동기화. 폼 검증에서 흔히 사용</li>
              <li>
                <code>.number</code>: 숫자로 변환 후 동기화
                <ul>
                  <li>변환 실패하면 원문 문자열을 유지한다</li>
                  <li><pre v-pre><code>&lt;input type="number"&gt;</code></pre>와 같이 쓰면 <b>빈 값은 <code>null</code></b>이 된다 (실무에서 <code>null</code> 체크 잊기 쉬움)</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="practical-tip">
        <span class="practical-tip__title">☝🏻 실무 포인트</span>
        <ul>
          <li>한글 입력 처럼 조합 중간 값이 많은 환경에서는 <code>.lazy</code> 또는 디바운스 컴포넌트가 안전하다</li>
          <li><code>.number</code>를 쓰면 <code>0</code>, <code>null</code>, <code>''</code>의 구분이 중요하다. 특히 필수값 검증이나 서버 스키마(Number vs Nullabel)에서 버그가 자주 난다</li>
          <li>트림은 DB나 검색 인덱스에 불필요한 공백 저장을 막는다</li>
        </ul>
      </div>


      <h3>2. 커스텀 컴포넌트에서 v-model 구현 (두 가지 방식)</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li>
            <b>A. <code>script setup</code>에서 <code>defineModel()</code>(Vue 3.3+)</b>
            <span class="hang-line">가장 간단하고 최신. 기본/명명 모델 모두 지원</span>
            <div class="hang-line">
              <pre v-pre><code>
    &lt;script setup&gt;
      const model = defineModel()  // 기본 v-model
      const title = defineModel('title')  // v-model:title
    &lt;/script&gt;
                </code></pre>
            </div>
            <span class="hang-line">내부에서 <code>model.value = ...</code>처럼 쓰면 자동으로 <code>update:modelValue</code>가 emit된다</span>
          </li>
          <li>
            <b>B. 전통방식: <code>defineProps</code> + <code>defineEmits</code></b>
            <span class="hang-line">Vue3.3 이전 프로젝트나 매크로 사용을 원치 않을 때</span>
            <div class="hang-line">
              <pre v-pre><code>
    &lt;script setup&gt;
      const props = defineProps({modelValue: String})
      const emit = defineEmits(['update:modelVaule'])
      const onInput = (v) => emit('update:modelValue', v)
    &lt;/script&gt;
                </code></pre>
            </div>
          </li>
        </ul>
      </div>
      <div class="practical-tip">
        <span class="practical-tip__title">☝🏻 실무 포인트</span>
        <ul>
          <li>새 프로젝트/신규 컴포넌트라면 <code>defineModel()</code>권장</li>
          <li>디자인 시스템/공유 컴포넌트는 명명모델(<code>v-model:foo</code>)로 의도를 드러내면 유지보수성이 좋다</li>
        </ul>
      </div>


      <h3>3. 수식어가 커스텀 컴포넌트에 올 때는?</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li>부모가
            <pre v-pre><code>
    &lt;MyInput v-model.trim="name" /&gt;
            </code></pre>라고 쓰면 자식은 추가 prop인 <code>modelModifiers</code>를 받는다
            <div class="hang-line">
              <pre v-pre><code>
  const props = defineProps({
    modelValue: String,
    modelModifiers: {
      type: Object,
      default: () => ({})
    }
  })

  let next = raw
  if (props.modelModifiers?.trim) {
    next = next.trim()
  }
              </code></pre>
            </div>
          </li>
          <li>
            자식이 이 힌트를 읽어 직접 처리해야한다. (기본 입력 요소와 달리 자동 트림되지 않는다)
            <div class="hang-line">
              <code>
                let next = raw
                if (props.modelModifiers?.trim) next = next.trim()
              </code>
            </div>
          </li>
        </ul>
      </div>
      <div class="practical-tip">
        <span class="practical-tip__title">☝🏻 실무 포인트</span>
        <ul>
          <li>공용 입력 컴포넌트는 <code>modelModifiers</code>를 지원해두면 재사용성이 급상승한다</li>
          <li>프로젝트 전반에 동일한 트림/넘버 정책을 적용하려면 컴포넌트 내부에서 일관 처리해야한다</li>
        </ul>
      </div>

      <h3>4. v-model과 이벤트(@input/@change) 함께 쓰기 주의</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li>
            <pre v-pre><code>
  &lt;input v-model="x" @input="doSomething"&gt;
            </code></pre>를 동시에 쓰면 동일 이벤트 흐름에서 두 번 반응하거나 업데이트 순서가 꼬이는 문제 발생
          </li>
          <li>
            대안:
            <ul>
              <li>
                값 변경 후 로직이 필요하면 watch를 사용
                <div class="hang-line">
                  <code>watch(x, (val, old) => { /** 사이드 이펙트 */ })</code>
                </div>
              </li>
              <li>
                커스텀 컴포넌트에서는 <code>@update:modelValue="..."</code>를 구독
                <div class="hang-line">
                  <pre v-pre><code>
  &lt;MyInput v-model="x" @update:modelValue="log($event)" /&gt;
                  </code></pre>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="practical-tip">
        <span class="practical-tip__title">☝🏻 실무 포인트</span>
        <ul>
          <li>폼 입력에서 API 호출/검증/정규화 같은 사이드 이펙트는 watch + 디바운스가 안전하다</li>
          <li>원시 <code>&lt;input&gt;</code>에선 <code>@input</code>보다 <code>@change</code>(확정 시점)sk <code>.lazy</code>가 안정적일 때가 많다</li>
        </ul>
      </div>


      <h3>5. 스토어/중첩 객체와 v-model 연결: computed get/set</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li>
            v-model의 대상이 단순 변수일 필요는 없다. <code>computed</code>의 getter/setter로 중첩값/스토어값을 자연스럽게 연결한다
            <div class="hang-line">
              <pre v-pre><code>
    const form = reactie({ filters: { min: 0, max: 100 } })
    const minPrice = computed({
      get: () => form.filters.min 
      set: v => form.filters.min = v ?? 0
    })
              </code></pre>
            </div>
          </li>
          <li>이렇게 만든 <code>minPrice</code>를 v-model에 바로 바인딩하면 양방향으로 동작한다</li>
        </ul>
      </div>
      <div class="practical-tip">
        <span class="practical-tip__title">☝🏻 실무 포인트</span>
        <ul>
          <li>URL 쿼리 동기화, Pinia 상태, 서버 그리드 필터 등과 바인딩 경계를 깔끔히 유지할 수 있는 베스트 패턴이다</li>
        </ul>
      </div>

      <h3>6. 체크박스/라디오/멀티셀렉트 실무 팁</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li>체크박스 그룹: <code>v-model</code> 타깃이 배열이면 선택/해제가 자동으로 푸시/제거된다</li>
          <li>라디오: 단일값 선택. 문자열 변환 주의(<code>.number</code>로 숫자화 가능)</li>
          <li><code>&lt;select multiple&gt;</code>: 배열 바인딩. 서버 전송시 ID 리스트로 변환하는 헬퍼를 둔다</li>
        </ul>
      </div>

      <h3>7. v-model 말고 다른 방법 (대안들)</h3>
      <div class="list-center">
        <ol class="list--hang list--hang-ol">
          <li>
            명시적 props + emits (v-model의 풀폼)
            <ul>
              <li>부모: <code>:modelValue="x" @update:modelValue="x = $event"</code></li>
              <li>자식: <code>props.modelValue</code>읽고 <code>emit('update:modelVaue', v)</code>로 갱신</li>
              <li>장점: 흐름이 더 명확, 리팩토링/디버깅이 쉽다</li>
            </ul>
          </li>
          <li>
            값/이벤트 분리(<code>:value</code> + <code>@input</code> 또는 <code>@change</code>)
            <ul>
              <li>원시 입력 제어처럼 다룰 때</li>
              <li>단, 실무에서는 v-model이 더 일관적이고 팀 합의가 잘 된다</li>
            </ul>
          </li>
          <li>
            computed get/set로 수동 브라우징
            <ul>
              <li>스토어/쿼리스트링/다른 데이터 소스와 중간 계층을 둔다</li>
            </ul>
          </li>
          <li>
            디바운스/쓰로틀 래퍼 컴포넌트
            <ul>v-model 대신 <code>:value</code> + <code>@update</code> 확정값만 올려보내기</ul>
          </li>
        </ol>
      </div>

      <div class="practical-tip">
        <span class="practical-tip__title">📌 정리</span>
        v-model을 쓰지 말자가 아니라, 상황에 맞춰
        <ul>
          <li>명확성(풀폼)</li>
          <li>입력 제어 세밀함(<code>:value</code> + 이벤트)</li>
          <li>경계 레이어(computed)를 선택하는 것이 핵심</li>
        </ul>
      </div>
    </template>

    <template #code>
      <ExamplePair
        title="Ex1) 기본 폼 + 수식어 + IME/검증 전략"
        note="사용자 프로필 폼. 이름은 공백 제고, 나이는 숫자, 메모는 조합식 입력(한글)이라 blur시점에만 반영"
      >
      <template #code>
        <pre v-pre><code>
  &lt;script setup&gt;
  import { reactive, computed, watch } from 'vue'
  
  const form = reactive({
    name: '',
    age: null,
    memo: ''
  })

  // 실시간 검증(간단 예)
  const errors = reactive({ name: '', age: '' })
  watch(() =&gt; form.name, (v) =&gt; {
    errors.name = v ? '' : '이름은 필수입니다'
  })
  watch(() =&gt; form.age, (v) =&gt; {
    errors.age = (v === null || Number.isNaN(v)) ? '나이는 숫자여야 합니다' : ''
  })

  const payload = computed(() =&gt; ({
    name: form.name,
    age: form.age,
    memo: form.memeo,
  }))
  &lt;/script&gt;

  &lt;template&gt;
    &lt;form @submit.prevent="$emit('submit', payload)"&gt;
      &lt;label&gt;
        이름
        &lt;input v-model.trim="form.name" placeholder="홍길동" /&gt;
        &lt;small v-if="errors.name"&gt;{{ errors.name }}&lt;/small&gt;
      &lt;/label&gt;

      &lt;label&gt;
        나이
        &lt;input type="number" v-model.number="form.age" min="0" /&gt;
        &lt;small v-if="errors.age"&gt;{{ errors.age }}&lt;/small&gt;
      &lt;/label&gt;

      &lt;label&gt;
        메모
        &lt;textarea v-model.lazy="form.memo" placeholder="자유롭게 작성해주세요"&gt; &lt;/textarea&gt;
      &lt;/label&gt;

      &lt;button type="submit"&gt;저장&lt;/button&gt;
    &lt;/form&gt;
  &lt;/template&gt;
        </code></pre>
      </template>

      <template #result>
        <form @submit.prevent="$emit('submit', payload)">
          <label>
            이름
            <!-- 공백 제거 -->
            <input v-model.trim="form.name" placeholder="홍길동" />
            <small v-if="errors.name">{{ errors.name }}</small>
          </label>

          <label>
            나이
            <!-- 숫자 변환 (빈값은 null) -->
            <input type="number" v-model.number="form.age" min="0" />
            <small v-if="errors.age">{{ errors.age }}</small>
          </label>

          <label>
            메모
            <!-- 조합 입력 안정화: blur/enter에서만 반영 -->
            <textarea v-model.lazy="form.memo" placeholder="자유롭게 적어주세요"></textarea>
          </label>

          <button type="submit">저장</button>
        </form>
      </template>
      </ExamplePair>

      <ExampleGroup
        title="Ex2) 커스텀 입력(디바운스) + defineModel"
        note="부모의 .trim이 modelModifiers로 전달되어 자식에서 직접 처리"
      >
        <template #code-parent>
          <pre v-pre><code>
    &lt;!-- Parent.vue --&gt;
    &lt;script setup&gt;
    import { ref } from 'vue'
    import DebouncedInput from './DebouncedInput.vue'
    const keyword = ref('')
    &lt;/script&gt;
    &lt;template&gt;
      &lt;DebouncedInput v-model.trim="keyword" :delay="300" /&gt;
      &lt;p&gt;검색어: {{ keyword }}&lt;/p&gt;
    &lt;/template&gt;
          </code></pre>
        </template>

        <template #code-child>
          <pre v-pre><code>
    &lt;!-- DebouncedInput.vue --&gt;
    &lt;script setup&gt;
    import { ref, watch, onBeforeUnmount } from 'vue'
    const model = defineModel({ default: '' })
    const props = defineProps({ modelModifiers: {type: Object, default: () =&gt; ({})}, delay: {type: Number, default: 300} })
    const inner = ref(model.value)
    let timer = null
    function applyModifiers(v){ if (props.modelModifiers?.trim) v = v.trim(); return v }
    watch(inner, (v) =&gt; { if (timer) clearTimeout(timer); timer = setTimeout(() =&gt; { model.value = applyModifiers(v) }, props.delay) })
    watch(model, (v) =&gt; { if (v !== inner.value) inner.value = v })
    onBeforeUnmount(() =&gt; { if (timer) clearTimeout(timer) })
    &lt;/script&gt;
    &lt;template&gt;
      &lt;input :value="inner" @input="inner = $event.target.value" placeholder="검색어를 입력하세요" /&gt;
    &lt;/template&gt;
          </code></pre>
        </template>

        <template #result-parent>
          <ExampleDebounceParent />
        </template>
      </ExampleGroup>
    </template>
  </ContentPage>

</template>