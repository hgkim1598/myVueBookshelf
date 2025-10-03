<script setup>
import ContentPage from '@/pages/ContentPage.vue'
import ExamplePair from '@/components/ExamplePair.vue'


</script>
<template>
  <ContentPage>
    <template #title>
      <h2>📘 1-4: 템플릿 문법</h2>
    </template>

    <template #concept>
      <h3>1. <code>v-bind</code> (<code>:</code> 축약형)</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li><b>속성에 동적 값 바인딩:</b> 단순히 <code>:src="imgUrl"</code>정도가 아니라
            <code>class</code>, <code>style</code>, <code>attribute</code>를 동적으로 제어할 때 매우 자주 쓰임 </li>
          <li><b>객체 바인딩:</b> <code>:class="{ active: isActive, 'text-danger': hasError}"</code></li>
          <li><b>여러 속성 한 번에:</b> <code>v-bind="objectProps"</code> → 실무에서 컴포넌트를 props를 그대로 전달하거나, 여러 속성을 동적으로 제어할 때 많이 씀</li>
        </ul>
      </div>

      <h3>2. <code>v-if</code>, <code>v-show</code> (조건부 렌더링)</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li><code>v-if</code>: DOM 자체를 추가/제거. 무거운 컴포넌트일 수록 성능 절약 가능</li>
          <li><code>v-show</code>: CSS(<code>display: none</code>)로 단순히 숨김 처리. 토글이 잦은 UI(탭, 드롭다운)에서 더 유리</li>
          <li><b>실무 팁</b>: <code>v-if</code> vs <code>v-show</code> 구분 기준은 렌더링 비용 + 토글 빈도</li>
        </ul>
      </div>

      <h3>3. <code>v-for</code> (리스트 렌더링)</h3>
      <div class="list-center">
        <ul class="list--hang">

        </ul>
      </div>

      <h3>4. 이벤트 바인딩 (<code>@click</code>, <code>@input</code>등)</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li><code>@click="handleClick"</code> 처럼 직접 함수 연결</li>
          <li><code>@clic.stop</code>, <code>@click.prevent</code>, <code>@keydown.enter</code> 같은 수식어(modifier) 자주 활용</li>
          <li>
            <b>실무에서 자주 쓰는 패턴</b>
            <ul>
              <li><code>@click.stop</code> (모달 닫힘 방지)</li>
              <li><code>@submit.prevent=onSubmit</code></li>
              <li><code>@keyup.enter="sendMessage"</code></li>
            </ul>
          </li>
        </ul>
      </div>
    </template>
  </ContentPage>

</template>