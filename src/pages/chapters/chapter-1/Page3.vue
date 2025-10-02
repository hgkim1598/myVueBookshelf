<script setup>
import ContentPage from '@/pages/ContentPage.vue'
import ExamplePair from '@/components/ExamplePair.vue'

</script>
<template>
  <ContentPage>
    <template #title>
      <h2>📘 1-3: 반응형 상태관리 이해하기</h2>
    </template>

    <template #concept>
      <h3>반응형 상태관리란?</h3>

      <div class="list-center">
        <ul class="list--hang">
          <li>Vue의 핵심은 <b>데이터가 바뀌면 화면도 자동으로 업데이트</b>되는 반응형 시스템</li>
          <li>Composition API에서 상태는 크게 두 가지 방식으로 선언: 
            <ul>
              <li><b>ref</b>: 숫자, 문자열 같은 원시 타입 관리</li>
              <li><b>reactive</b>: 객체/배열 같은 복합 타입 관리</li>
            </ul>
          </li>
          <li>둘 다 Vue의 반응형 시스템(Proxy)을 기반으로 동작하지만 ,사용법과 주의점이 다름</li>
        </ul>
      </div>

      <h3><b>ref</b></h3>

      <div class="list-center">
        <ul class="list--hang">
          <li>단일값(숫자, 문자열, 불리언 등)에 적합</li>
          <li><code>.value</code> 프로퍼티를 통해 접근 (JSX나 로직 내부에서 필요)</li>
          <li>템플릿 안에서는 <code>.value</code> 없이 자동 언래핑됨</li>
        </ul>
      </div>


      <h3><b>reactive</b></h3>

      <div class="list-cneter">
        <ul class="list--hang">
          <li>객체/배열을 반응형으로 감쌈</li>
          <li>구조 분히 시 반응성을 잃을 수 있으므로 주의 필요</li>
          <li>상태를 여러 속성으로 묶어서 관리할 때 유리</li>
        </ul>
      </div>

      <h4>💡 실무 포인트</h4>
      <div class="list-center">
        <ol class="list--hang list--hang-ol">
          <li>상태를 언제 <code>ref</code>로, 언제<code>reactive</code>로 쓸까?
            <ul>
              <li>단일값 → <code>ref</code></li>
              <li>여러 값이 묶여 하나의 의미 있는 상태를 표현할 때 → <code>reactive</code></li>
              <li>API 응답 객체, form 데이터 같은 건 대부분 <code>reactive</code></li>
            </ul>
          </li>
          <li>구조 분해 주의
            <ul>
              <li><code>reactive</code>객체에서 <code>const { name } = state</code>처럼 빼오면 반응성 깨짐</li>
              <li>해결책: 
                <ul>
                  <li><code>toRefs()</code>로 풀어서 쓰기</li>
                  <li>아예 <code>ref</code> 여러 개로 분리</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            성능과 가독성
            <ul>
              <li>너무 많은 <code>ref</code>를 쓰면 관리 포인트가 늘어나서 코드가 장황해짐</li>
              <li>반대로 모든 걸 <code>reactive</code>하나에 몰아 넣으면 어디가 바뀌는지 추적하기 어려움</li>
              <li>👉🏻 그래서 <b>데이터 성격에 맞게 혼합</b>하는 것이 베스트</li>
            </ul>
          </li>
          <li>
            실무에서 자주 겪는 케이스
            <ul>
              <li><b>폼(Form) 데이터:</b> <code>reactive</code>로 묶어두고 검증 시 <code>toRefs</code>로 꺼내 쓰는 경우 많음</li>
              <li><b>API 응답 데이터:</b> <code>reactive</code>로 전체 응답을 담아 관리</li>
              <li><b>카운터, 토글 상태:</b> 그냥 <code>ref</code>로</li>
            </ul>
          </li>
          <li>
            테스트 및 디버깅
            <ul>
              <li><code>console.log(refData)</code>하면 <code>{ value: ... }</code> 형태라 의도와 달라보일 수 있다</li>
              <li><code>reactive</code>는 proxy라 <code>console.log</code> 결과와 실제 접근 값이 다를 수 있음 → <code>toRaw()</code>로 원본 확인 가능</li>
            </ul>
          </li>
        </ol>
      </div>
    </template>

    <template #code>
      <ExamplePair
        title=""
        note=""
      >
      <template #code>
        <pre v-pre>
          <code>
            &lt;script&gt;
              import { ref, computed } from 'vue'

              const count = ref(0)
              const doubled = computed(() =&gt; count.value * 2)
              const inc = () =&gt; { count.value++ }
            &lt;/script&gt;

            &lt;template&gt;
              &lt;button @click="inc"&gt;+1&lt;/button&gt;
              &lt;span&gt; count: {{ count }} / doubled: {{ doubled }} &lt;/span&gt;
            &lt;/template&gt;
          </code>
        </pre>
      </template>
      <template #result>

      </template>
      </ExamplePair>
    </template>
  </ContentPage>
</template>