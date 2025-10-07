<script setup>
import ContentPage from '@/pages/ContentPage.vue'
import ExamplePair from '@/components/ExamplePair.vue'

</script>
<template>
  <ContentPage>
    <template #title>
      <h2>📘 1-6: computed와 watch</h2>
    </template>

    <template #concept>
      <h3>1. <code>computed</code> = 상태로부터 파생되는 값을 만드는 도구</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li>
            입력(state)이 같으면 출력도 항상 같다
            <span class="hang-line">→ 캐싱 덕분에 불필요한 연산/렌더링 줄어든다</span>
          </li>
          <li>쓰임새: 합계/필터링/포맷팅/버튼 활성화 여부 같은 표현용 값</li>
          <li>
            형태: <code>computed(getter)</code> 또는 <code>computed({ get, set })</code>로 양방향도 가능
            <span class="hang-line">(예: 포맷된 입력)</span>
          </li>
        </ul>
      </div>

      <h3>2. <code>watch</code> = 특정 상태가 바뀌는 순가에 "부수효과(side-effect)"를 수행한다</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li>예: API 호출, 로컬스토리지 저장, 디바운스 검색, 라우터 이동, 토스트 띄우기 등</li>
          <li>
            시그니처: <code>watch(srouce, callback, options)</code>
            <ul>
              <li><code>source</code>: ref / computed / 함수 / 배열  가능</li>
              <li>
                <code>options</code>:
                <ul>
                  <li><code>immediate: true</code>: 초기 1회 실행</li>
                  <li><code>deep: true</code>: 객체 내부 속성까지 추적</li>
                  <li><code>flush: 'post'</code>: DOM 업데이트 후 콜백 (레이아웃 / 크기 계산 시 유용)</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <h3>3. 언제 무엇을 쓰나?</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li>보여줄 값을 만들 때: <code>computed</code></li>
          <li>무언가 행동(저장/요청/로그 등)이 필요할 때: <code>watch</code></li>
          <li>
            (참고) <code>watchEffet</code>는 의존성 자동 수집
            <span class="hang-line">실험용 / 간단한 경우에 좋지만, 실무에서는 <b>대상/타이밍을 명확히 제어하는 watch가 버그가 적다</b></span>
          </li>
        </ul>
      </div>
    </template>

    <template #code>
      <ExamplePair
        title="Ex1) 장바구니 요약(computed) + 로컬스토리지 동기화(watch)"
        :note="`1. 가격 합계 / 할인 / 배송비 / 최종 금액 → 모두 computed (파생값 캐싱)
        \n 2. 장바구니가 바뀌면 로컬 스토리지 저장 → watch + deep:true
        \n 3. 쿠폰 코드를 바꾸면 디바운스 검증(비동기 흉내) → watch + 타이머 정리`"
        >
        
      </ExamplePair>
    </template>
  </ContentPage>
</template>