<script setup>
import ContentPage from '@/pages/ContentPage.vue'
import ExamplePair from '@/components/ExamplePair.vue'
import ExampleGroup from '@/components/ExampleGroup.vue'

</script>
<template>
  <ContentPage>
    <template #concept>
      <h3>1) 기본 슬롯/이름 있는 슬롯/스코프드 슬롯 개요</h3>
      <div class="table-scroll">
        <table class="table table--compact table--rowline">
          <caption style="position: absolute; left: -9999px;">슬롯 종류와 특징 요약</caption>
          <thead>
            <tr>
              <th class="nowrap">종류</th>
              <th class="nowrap">작성 위치</th>
              <th class="nowrap">문법</th>
              <th class="nowrap">주요 용도</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="nowrap"><code>기본 슬롯</code></td>
              <td>자식(슬롯 제공자)</td>
              <td><code>&lt;slot /&gt;</code></td>
              <td>컴포넌트 “틀” 안에서 사용자 콘텐츠를 삽입</td>
            </tr>
            <tr>
              <td class="nowrap"><code>이름 있는 슬롯</code></td>
              <td>자식 / 부모(슬롯 소비자)</td>
              <td>
                자식: <code>&lt;slot name="header" /&gt;</code><br />
                부모: <code>&lt;template #header&gt;...&lt;/template&gt;</code>
              </td>
              <td>레이아웃의 여러 영역(header/footer/sidebar 등) 분리 커스터마이즈</td>
            </tr>
            <tr>
              <td class="nowrap"><code>스코프드 슬롯</code></td>
              <td>자식 → 부모로 데이터 전달</td>
              <td>
                자식: <code>&lt;slot :row="row" :index="i" /&gt;</code><br />
                부모: <code>&lt;template #default="{ row, index }"&gt;...&lt;/template&gt;</code>
              </td>
              <td>자식이 가진 상태/계산값을 부모가 받아 렌더링 제어(렌더리스 패턴)</td>
            </tr>
            <tr>
              <td class="nowrap"><code>폴백 콘텐츠</code></td>
              <td>자식</td>
              <td><code>&lt;slot&gt;비어있을 때 표시&lt;/slot&gt;</code></td>
              <td>부모가 슬롯을 제공하지 않아도 안전한 기본 UI 제공</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="practical-tip">
        <span class="practical-tip__title">☝🏻 실무 포인트</span>
        <ul>
          <li>“슬롯 제공자(Child)”는 <code>&lt;slot /&gt;</code>을 배치하는 컴포넌트이고, “슬롯 소비자(Parent)”는 <code>#</code> 구문으로 채워 넣습니다.</li>
          <li>스코프드 슬롯은 “자식 → 부모” 단방향 데이터 전달입니다(상태 변경은 보통 이벤트/콜백으로 처리).</li>
          <li>이름 규칙: 부모에서 <code>#default</code>, <code>#header</code> 같은 짧은 표기(<code>v-slot:</code> 축약)를 일관되게 사용하세요.</li>
          <li>디자인 시스템/테이블/리스트/카드 같은 “틀 컴포넌트”에 슬롯을 설계하면 재사용성이 극대화됩니다.</li>
        </ul>
      </div>

      <div class="space-between-chapter" />

      <h3>2) v-slot 사용 패턴 요약</h3>
      <div class="table-scroll">
        <table class="table table--compact table--rowline">
          <caption style="position: absolute; left: -9999px;">v-slot 문법과 주의점</caption>
          <thead>
            <tr>
              <th class="nowrap">패턴</th>
              <th class="nowrap">예시</th>
              <th class="nowrap">의미/주의점</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="nowrap">기본 슬롯 수신</td>
              <td><code>&lt;Child&gt;컨텐츠&lt;/Child&gt;</code></td>
              <td>자식의 <code>&lt;slot /&gt;</code> 위치에 들어갑니다.</td>
            </tr>
            <tr>
              <td class="nowrap">이름 슬롯 수신</td>
              <td><code>&lt;template #footer&gt;...&lt;/template&gt;</code></td>
              <td><code>&lt;slot name="footer"&gt;</code> 자리에 삽입됩니다.</td>
            </tr>
            <tr>
              <td class="nowrap">스코프드 슬롯 수신</td>
              <td><code>&lt;template #default="{ item, toggle }"&gt;...&lt;/template&gt;</code></td>
              <td>자식이 노출한 슬롯 props를 구조분해 할당으로 받습니다.</td>
            </tr>
            <tr>
              <td class="nowrap">단축 표기</td>
              <td><code>&lt;Child #header&gt;...&lt;/Child&gt;</code></td>
              <td><code>&lt;template v-slot:header&gt;</code>의 축약형입니다.</td>
            </tr>
            <tr>
              <td class="nowrap">단일 기본 슬롯 축약</td>
              <td><code>&lt;Child v-slot="{ row }"&gt;...&lt;/Child&gt;</code></td>
              <td>이 경우 <code>#default</code> 생략 가능합니다.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="space-between-chapter" />

      <h3>3) 설계 가이드(실무 체크리스트)</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li><b>역할 분리</b>: 자식은 “데이터 소유/흐름 제어”, 부모는 “표현/마크업”을 담당(렌더리스 패턴).</li>
          <li><b>슬롯 props 최소화</b>: 꼭 필요한 값만 노출(예: <code>item</code>, <code>index</code>, <code>select()</code>).</li>
          <li><b>접근성</b>: 슬롯으로 버튼/링크를 꾸밀 때 <code>role</code>, <code>aria-*</code>, 키보드 포커스 흐름을 부모에서 보완.</li>
          <li><b>폴백 작성</b>: 데이터 없음/로딩 상태에 대한 <code>&lt;slot&gt;</code> 폴백/별도 <code>empty</code> 슬롯 제공.</li>
          <li><b>성능</b>: 대량 리스트는 자식에서 페이지네이션/가상 스크롤 훅 제공 → 부모는 <code>#row</code> 슬롯으로 행만 커스텀.</li>
          <li><b>테스팅</b>: 자식은 슬롯 유무/슬롯 props 스냅샷, 부모는 슬롯 렌더 결과 단위 테스트로 분리.</li>
        </ul>
      </div>
      </template>
      <template #code>
<ExamplePair
  title="Ex1) 기본/이름 슬롯 + 폴백 설계 (단일 컴포넌트)"
  :note="`슬롯 제공자 입장에서 어떻게 슬롯과 폴백을 배치하는지 보여줍니다.`"
>

  <template #code>
    <pre v-pre><code>&lt;!-- ShellBox.vue --&gt;
&lt;script setup&gt;
/**
 * 단일 컴포넌트(슬롯 제공자)에서 기본 슬롯/이름 슬롯/폴백을 설계하는 예제입니다.
 * - 기본 슬롯: 본문 영역
 * - 이름 슬롯: header, footer
 * - 폴백: 부모가 채우지 않으면 기본 UI 노출
 */
&lt;/script&gt;

&lt;template&gt;
  &lt;section class=&quot;shell&quot;&gt;
    &lt;!-- header 슬롯: 제목 없을 때 기본 제목 사용 --&gt;
    &lt;header class=&quot;shell__header&quot;&gt;
      &lt;slot name=&quot;header&quot;&gt;
        &lt;h4 class=&quot;shell__title&quot;&gt;기본 제목&lt;/h4&gt;
      &lt;/slot&gt;
    &lt;/header&gt;

    &lt;!-- 기본 슬롯: 내용이 없으면 안내문 노출 --&gt;
    &lt;main class=&quot;shell__body&quot;&gt;
      &lt;slot&gt;
        &lt;p class=&quot;shell__empty&quot;&gt;
          내용이 없습니다. 
          &lt;code&gt;#default&lt;/code&gt; 슬롯을 채워주세요.
        &lt;/p&gt;
      &lt;/slot&gt;
    &lt;/main&gt;

    &lt;!-- footer 슬롯: 버튼 없으면 폴백 버튼 --&gt;
    &lt;footer class=&quot;shell__footer&quot;&gt;
      &lt;slot name=&quot;footer&quot;&gt;
        &lt;button type=&quot;button&quot;&gt;확인&lt;/button&gt;
      &lt;/slot&gt;
    &lt;/footer&gt;
  &lt;/section&gt;
&lt;/template&gt;

&lt;style scoped&gt;
.shell { border: 1px solid #ddd; border-radius: 8px; padding: 12px; }
.shell__header { margin-bottom: 8px; }
.shell__title { margin: 0; font-size: 14px; }
.shell__empty { color: #888; font-size: 13px; }
.shell__footer { margin-top: 8px; text-align: right; }
&lt;/style&gt;
</code></pre>
  </template>

  <template #result>
    <section class="shell">
      <header class="shell__header">
        
      </header>
    </section>
  </template>
</ExamplePair>

<ExampleGroup
  title="Ex2) 스코프드 슬롯으로 렌더리스 리스트 구성 (부모-자식)"
  :note="`자식은 데이터와 동작을 제공하고, 부모는 슬롯으로 렌더링을 커스텀합니다.`"
>

  <template #code-parent>
    <pre v-pre><code>&lt;!-- ParentDemo.vue --&gt;
&lt;script setup&gt;
import { ref } from 'vue'
import UserList from './UserList.vue'

const users = ref([
  { id: 1, name: 'Ava', role: 'Admin' },
  { id: 2, name: 'Ben', role: 'Editor' },
  { id: 3, name: 'Choi', role: 'Viewer' },
])

const selected = ref(new Set())

function toggleSelect (id) {
  if (selected.value.has(id)) selected.value.delete(id)
  else selected.value.add(id)
  selected.value = new Set(selected.value)
}
&lt;/script&gt;

&lt;template&gt;
  &lt;section&gt;
    &lt;UserList
      :items=&quot;users&quot;
      :is-selected=&quot;id =&gt; selected.has(id)&quot;
      :on-toggle=&quot;toggleSelect&quot;
    &gt;
      &lt;template #header&gt;
        &lt;h4 style=&quot;margin:0&quot;&gt;사용자 목록&lt;/h4&gt;
      &lt;/template&gt;

      &lt;template #empty&gt;
        &lt;p style=&quot;color:#888&quot;&gt;사용자가 없습니다.&lt;/p&gt;
      &lt;/template&gt;

      &lt;template #row=&quot;{ item, index, isSelected, toggle }&quot;&gt;
        &lt;div
          :style=&quot;{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px',
            borderRadius: '6px',
            background: isSelected ? '#f5faff' : 'transparent'
          }&quot;
        &gt;
          &lt;span style=&quot;width: 20px; text-align:right&quot;&gt;{{ index + 1 }}.&lt;/span&gt;
          &lt;strong&gt;{{ item.name }}&lt;/strong&gt;
          &lt;span style=&quot;color:#888&quot;&gt;/ {{ item.role }}&lt;/span&gt;

          &lt;button
            style=&quot;margin-left:auto&quot;
            type=&quot;button&quot;
            @click=&quot;toggle(item.id)&quot;
          &gt;
            {{ isSelected ? '해제' : '선택' }}
          &lt;/button&gt;
        &lt;/div&gt;
      &lt;/template&gt;

      &lt;template #footer&gt;
        &lt;small style=&quot;color:#888&quot;&gt;총 {{ users.length }}명&lt;/small&gt;
      &lt;/template&gt;
    &lt;/UserList&gt;
  &lt;/section&gt;
&lt;/template&gt;
</code></pre>
  </template>

  <template #code-child>
    <pre v-pre><code>&lt;!-- UserList.vue --&gt;
&lt;script setup&gt;
import { computed } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  isSelected: { type: Function, default: () =&gt; false },
  onToggle: { type: Function, default: () =&gt; {} },
})

const hasItems = computed(() =&gt; Array.isArray(props.items) &amp;&amp; props.items.length &gt; 0)

function toggle (id) {
  props.onToggle?.(id)
}
&lt;/script&gt;

&lt;template&gt;
  &lt;section class=&quot;list&quot;&gt;
    &lt;header class=&quot;list__header&quot;&gt;
      &lt;slot name=&quot;header&quot;&gt;
        &lt;h4 class=&quot;list__title&quot;&gt;목록&lt;/h4&gt;
      &lt;/slot&gt;
    &lt;/header&gt;

    &lt;main class=&quot;list__body&quot;&gt;
      &lt;template v-if=&quot;hasItems&quot;&gt;
        &lt;ul class=&quot;list__ul&quot;&gt;
          &lt;li
            v-for=&quot;(item, i) in items&quot;
            :key=&quot;item.id ?? i&quot;
            class=&quot;list__row&quot;
          &gt;
            &lt;slot
              name=&quot;row&quot;
              :item=&quot;item&quot;
              :index=&quot;i&quot;
              :isSelected=&quot;isSelected(item.id)&quot;
              :toggle=&quot;toggle&quot;
            &gt;
              &lt;div class=&quot;list__row-fallback&quot;&gt;
                &lt;span&gt;{{ i + 1 }}.&lt;/span&gt;
                &lt;pre style=&quot;margin:0&quot;&gt;{{ item }}&lt;/pre&gt;
                &lt;button type=&quot;button&quot; @click=&quot;toggle(item.id)&quot;&gt;토글&lt;/button&gt;
              &lt;/div&gt;
            &lt;/slot&gt;
          &lt;/li&gt;
        &lt;/ul&gt;
      &lt;/template&gt;
      &lt;template v-else&gt;
        &lt;slot name=&quot;empty&quot;&gt;
          &lt;p class=&quot;list__empty&quot;&gt;데이터가 없습니다.&lt;/p&gt;
        &lt;/slot&gt;
      &lt;/template&gt;
    &lt;/main&gt;

    &lt;footer class=&quot;list__footer&quot;&gt;
      &lt;slot name=&quot;footer&quot; /&gt;
    &lt;/footer&gt;
  &lt;/section&gt;
&lt;/template&gt;

&lt;style scoped&gt;
.list { border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px; }
.list__header { margin-bottom: 8px; }
.list__title { margin: 0; font-size: 14px; }
.list__ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; }
.list__row { border: 1px dashed #e5e7eb; padding: 8px; border-radius: 8px; background: #fff; }
.list__row-fallback { display: flex; align-items: center; gap: 8px; }
.list__empty { color: #888; font-size: 13px; }
.list__footer { margin-top: 8px; text-align: right; }
&lt;/style&gt;
</code></pre>
  </template>

  <template #result-parent>
    <!-- 결과는 직접 구현 필요 -->
  </template>
</ExampleGroup>

      </template>

  </ContentPage>

</template>