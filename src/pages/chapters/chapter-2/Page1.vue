<script setup>
import ContentPage from '@/pages/ContentPage.vue'
import ExamplePair from '@/components/ExamplePair.vue'
import ExampleGroup from '@/components/ExampleGroup.vue'
import UserListContainer from './examples/UserListContainer.vue'

/** 1번 예제 */
import { ref } from 'vue'

const count = ref(0)
const disabled = ref(false)
const variants = ['primary', 'secondary', 'danger']
const variantIdx = ref(0)

function onClick () {
  if (disabled.value) return 
  count.value++
  if(count.value % 3 === 0) {
    disabled.value = true
  }
}

function toggleDisabled () {
  disabled.value = !disabled.value
}

function cycleVariant () {
  variantIdx.value = (variantIdx.value + 1) % variants.length
}
</script>
<template>
  <ContentPage>
    <template #concept>
      <h3>1. 컴포넌트 분리의 목적</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li><b>유지보수성</b>: 한 파일의 역할이 명확해지고 수정 범위가 좁아집니다.</li>
          <li><b>재사용성</b>: 여러 화면에서 같은 UI를 손쉽게 가져다 쓸 수 있습니다.</li>
          <li><b>테스트 용이성</b>: 상태와 UI를 나누면 단위 테스트와 시각 테스트를 별도로 수행할 수 있습니다.</li>
          <li><b>협업 효율성</b>: 디자이너, 백엔드, 프론트엔드가 역할별로 병렬 작업이 가능합니다.</li>
        </ul>
      </div>

      <div class="space-between-chapter" />

      <h3>2. 분리 기준: UI 단위와 로직 단위</h3>
      <div class="table-scroll">
        <table class="table table--compact table--rowline">
          <caption style="position: absolute; left: -9999px;">UI와 로직 단위의 역할 비교</caption>
          <thead>
            <tr>
              <th class="nowrap">구분</th>
              <th class="nowrap">역할</th>
              <th class="nowrap">Vue 구성 요소</th>
              <th class="nowrap">입출력 규칙</th>
              <th class="nowrap">예시</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="nowrap"><code>UI 컴포넌트 (Presentational)</code></td>
              <td>화면 표시와 단순 상호작용</td>
              <td><code>props</code>, <code>emits</code>, <code>slots</code></td>
              <td>부모에게 받은 데이터를 표시하고 이벤트만 전달</td>
              <td><code>BaseButton</code>, <code>UserCard</code></td>
            </tr>
            <tr>
              <td class="nowrap"><code>로직 컴포넌트 (Container)</code></td>
              <td>데이터 요청, 상태 관리, 비즈니스 규칙</td>
              <td><code>script setup</code>, <code>composables</code>, <code>provide/inject</code></td>
              <td>상태를 소유하고 UI에 전달</td>
              <td><code>UserListContainer</code>, <code>ProductPage</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="practical-tip">
        <span class="practical-tip__title">☝🏻 실무 포인트</span>
        <ul>
          <li>UI 컴포넌트는 <code>props</code>로 값을 받고, <code>$emit()</code>으로만 변경을 요청합니다.</li>
          <li>비즈니스 로직(API, 상태, 계산)은 <code>composable</code> 또는 상위 컴포넌트로 이동합니다.</li>
        </ul>
      </div>

      <div class="space-between-chapter" />

      <h3>3. 재사용성 높은 단위로 쪼개기</h3>
      <div class="table-scroll">
        <table class="table table--compact table--rowline">
          <caption style="position: absolute; left: -9999px;">재사용 기준 판단표</caption>
          <thead>
            <tr>
              <th>판단 질문</th>
              <th>예/아니오</th>
              <th>가이드</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>여러 화면에서 동일한 형태로 사용 가능한가?</td>
              <td>예</td>
              <td><code>Base*</code> 또는 <code>App*</code> 형태로 분리</td>
            </tr>
            <tr>
              <td>텍스트, 색상, 아이콘만 바꾸면 재사용 가능한가?</td>
              <td>예</td>
              <td><code>props</code>로 커스터마이징 포인트 노출</td>
            </tr>
            <tr>
              <td>데이터 요청/API 호출이 포함되어 있는가?</td>
              <td>예</td>
              <td>UI와 분리하고, 컨테이너 또는 <code>use*</code>로 이동</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="practical-tip">
        <span class="practical-tip__title">☝🏻 실무 포인트</span>
        <ul>
          <li><code>props</code>는 명확한 이름으로 최소한만 전달합니다.</li>
          <li>UI만 다른 경우는 <code>variant</code> props로 통일하세요. 예: <code>variant="primary"</code></li>
        </ul>
      </div>

      <div class="space-between-chapter" />

      <h3>4. 지나치게 잘게 쪼개지지 않도록</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li>파일 길이가 아니라 <b>변경 이유(Responsibility)</b>로 분리합니다.</li>
          <li>두세 군데에서만 쓰이는 래퍼는 별도 파일로 분리하지 않아도 됩니다.</li>
          <li>“이 컴포넌트의 이름을 뭐라고 해야 하지?” 싶다면, 아직 분리할 시점이 아닙니다.</li>
          <li>디자인만 다른 경우, 컴포넌트 분리보단 <code>variant</code> props로 해결합니다.</li>
        </ul>
      </div>

      <div class="practical-tip">
        <span class="practical-tip__title">☝🏻 실무 포인트</span>
        <ul>
          <li>파일 수보다 협업과 유지보수의 편의성을 기준으로 판단하세요.</li>
          <li>“이 기능이 어디에 속하나?” 고민된다면, 아직 응집도가 낮다는 신호입니다.</li>
        </ul>
      </div>
    </template>

    <template #code>
      <ExamplePair
        title="Ex1) BaseButton: UI 전용 컴포넌트"
        :note="`UI만 담당하는 기본 버튼 컴포넌트 예시입니다. 상태, API 호출, 로직은 포함하지 않고 props/emits만 정의합니다.`"
      >
        <template #code>
<pre v-pre><code>
&lt;!-- StandaloneButton.vue --&gt;
&lt;script setup&gt;
import { ref } from 'vue'

const count = ref(0)
const disabled = ref(false)
const variants = ['primary', 'secondary', 'danger']
const variantIdx = ref(0)

function onClick () {
  if (disabled.value) return
  count.value++
  // 3회마다 비활성화 &amp; 스타일 순환
  if (count.value % 3 === 0) {
    disabled.value = true
  }
}

function toggleDisabled () {
  disabled.value = !disabled.value
}

function cycleVariant () {
  variantIdx.value = (variantIdx.value + 1) % variants.length
}
&lt;/script&gt;

&lt;template&gt;
  &lt;div class=&quot;demo-wrap&quot;&gt;
    &lt;button
      class=&quot;btn&quot;
      :class=&quot;variants[variantIdx]&quot;
      :disabled=&quot;disabled&quot;
      @click=&quot;onClick&quot;
      aria-live=&quot;polite&quot;
    &gt;
      클릭: {{ count }}회 (variant: {{ variants[variantIdx] }})
    &lt;/button&gt;

    &lt;div class=&quot;controls&quot;&gt;
      &lt;button class=&quot;btn ghost&quot; @click=&quot;cycleVariant&quot;&gt;스타일 바꾸기&lt;/button&gt;
      &lt;button class=&quot;btn ghost&quot; @click=&quot;toggleDisabled&quot;&gt;
        {{ disabled ? '활성화' : '비활성화' }}
      &lt;/button&gt;
    &lt;/div&gt;

    &lt;p class=&quot;hint&quot;&gt;버튼을 3회 누르면 자동으로 비활성화됩니다.&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;style scoped&gt;
.demo-wrap { display: grid; gap: 8px; align-items: start; }
.controls { display: flex; gap: 8px; }
.btn { padding: 8px 12px; border-radius: 8px; border: 1px solid #ddd; cursor: pointer; }
.btn:disabled { opacity: .6; cursor: not-allowed; }
.btn.primary { background: #2d6cdf; color: #fff; border-color: #2d6cdf; }
.btn.secondary { background: #e8eefc; color: #2d6cdf; border-color: #bcd1ff; }
.btn.danger { background: #ffe9e9; color: #d12d2d; border-color: #ffc5c5; }
.btn.ghost { background: transparent; }
.hint { font-size: 12px; color: #666; }
&lt;/style&gt;
</code></pre>
        </template>

        <template #result>
          <div class="demo-wrap">
            <button
              type="button"
              class="btn"
              :class="variants[variantIdx]"
              :disabled="disabled"
              @click="onClick"
              aria-live="polite"
            >
            클릭: {{ count }} 회 (variant: {{ variants[variantIdx] }})
            </button>
          </div>

          <div class="controls">
            <button class="example-btn" @click="cycleVariant">스타일 바꾸기</button>
            <button class="example-btn" @click="toggleDisabled">
              {{ disabled ? '활성화' : '비활성화' }}
            </button>
          </div>

          <p class="hint">버튼을 3회 누르면 자동으로 비활성화 됩니다.</p>
        </template>
      </ExamplePair>
      <ExampleGroup
        title="Ex2) UserListContainer + UserList: 로직과 UI 분리"
        :note="`컨테이너는 데이터 요청/상태 관리, 자식은 표시 전용입니다. 서로의 역할이 겹치지 않도록 설계합니다.`"
      >
        <template #code-parent>
  <pre v-pre><code>&lt;!-- UserListContainer.vue --&gt;
  &lt;script setup&gt;
  import { ref, onMounted } from 'vue'
  import UserList from './UserList.vue'

  const users = ref([])
  const loading = ref(false)
  const error = ref('')

  onMounted(async () =&gt; {
    try {
      loading.value = true
      // 실제 API 요청 대신 가상 데이터로 표시
      users.value = [{ id: 1, name: '홍길동' }, { id: 2, name: '김민수' }]
    } catch (e) {
      error.value = '데이터를 불러오지 못했습니다.'
    } finally {
      loading.value = false
    }
  })

  function onSelect(user) {
    console.log('선택한 사용자:', user)
  }
  &lt;/script&gt;

  &lt;template&gt;
    &lt;UserList
      :users=&quot;users&quot;
      :loading=&quot;loading&quot;
      :error=&quot;error&quot;
      @select=&quot;onSelect&quot;
    /&gt;
  &lt;/template&gt;
  </code></pre>
        </template>

        <template #code-child>
  <pre v-pre><code>&lt;!-- UserList.vue --&gt;
  &lt;script setup&gt;
  defineProps({
    users: Array,
    loading: Boolean,
    error: String
  })
  const emit = defineEmits(['select'])
  &lt;/script&gt;

  &lt;template&gt;
    &lt;div v-if=&quot;loading&quot;&gt;로딩 중...&lt;/div&gt;
    &lt;div v-else-if=&quot;error&quot;&gt;{{ error }}&lt;/div&gt;
    &lt;ul v-else&gt;
      &lt;li
        v-for=&quot;user in users&quot;
        :key=&quot;user.id&quot;
        @click=&quot;emit('select', user)&quot;
      &gt;
        {{ user.name }}
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/template&gt;
  </code></pre>
        </template>

        <template #result-parent>
          <UserListContainer />
        </template>
      </ExampleGroup>

    </template>

  </ContentPage>

</template>

<style scoped>
.demo-wrap { display: grid; gap: 8px; align-items: start; }
.controls { display: flex; gap: 8px; }
.btn { padding: 8px 12px; border-radius: 8px; border: 1px solid #ddd; cursor: pointer; }
.btn:disabled { opacity: .6; cursor: not-allowed; }
.btn.primary { background: #2d6cdf; color: #fff; border-color: #2d6cdf; }
.btn.secondary { background: #e8eefc; color: #2d6cdf; border-color: #bcd1ff; }
.btn.danger { background: #ffe9e9; color: #d12d2d; border-color: #ffc5c5; }
.btn.ghost { background: transparent; }
.hint { font-size: 12px; color: #666; }
</style>