<script setup>
import ContentPage from '@/pages/ContentPage.vue'
import ExamplePair from '@/components/ExamplePair.vue'

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
    </template>
  </ContentPage>

</template>