<script setup>
import ContentPage from '@/pages/ContentPage.vue'
import ExamplePair from '@/components/ExamplePair.vue'
import ExampleGroup from '@/components/ExampleGroup.vue'
import ExampleDebounceParentWithWatch from './examples/ExampleDebounceParentWithWatch.vue'
import { resizeInput } from '../../../utils/resizeinput'

// input width 관련 util
const inputEl = ref(null)
const inputWidth = ref(0)

const updateWidth = () =>{
  resizeInput(inputEl.value)
  inputWidth.value = inputEl.value.scrollWidth + 10
}

/** 1번 예제 */
import { reactive, ref, computed, watch, onBeforeUnmount, onMounted } from 'vue'
const cart = reactive([
  { id: 1, name: '노트북', price: 1500000, qty: 1 },
  { id: 2, name: '마우스', price: 25000, qty: 2 },
])
const couponCode = ref('')
const coupon = reactive({ type: null, amount: 0, valid: false })
const subtotal = computed(() =>
  cart.reduce((sum, i) => sum + i.price * i.qty, 0)
)
const discount = computed(() => {
  if (!coupon.valid) return 0
  if (coupon.type === 'percent') return Math.floor(subtotal.value * (cupon.amount / 100))
  if (coupon.type === 'fixed') return cupon.amount
  return 0
})
const shipping = computed(() => (subtotal.value - discount.value) >= 50000 ? 0: 3000)
const total = computed(() => Math.max(0, subtotal.value - discount.value + shipping.value ))
const canCheckout = computed(() => cart.length > 0 && total.value > 0)

watch(cart, (v) => {
  localStorage.setItem('cart', JSON.stringify(v))
}, { deep: true })

let timer = null
watch(couponCode, (v) => {
  if (timer) clearTimeout(timer)
  timer = setTimeout(async () => {
    if (v === 'SAVE10') {
      coupon.type = 'percent'
      coupon.amount = 10
      coupon.valid = true
    } else if (v === 'MINUS5000') {
      coupon.type = 'fixed'
      coupon.amount = 5000
      coupon.valid = true
    } else {
      coupon.type = null
      coupon.amount = 0
      coupon.valid = false
    }
  }, 400)
})
onBeforeUnmount(() => { if (timer) clearTimeout(timer) })
function inc(id) {
  const item = cart.find(i => i.id === id)
  if (item) item.qty++
}
function dec(id) {
  const item = cart.find(i => i.id === id)
  if (item && item.qty > 1) item.qty --
}
function removeItem(id) {
  const idx = cart.findIndex(i => i.id === id)
  if (idx > -1) cart.splice(idx, 1)
}



onMounted(() =>{
  updateWidth()
})
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
        <template #code>
          <pre v-pre><code>
&lt;script setup&gt;
import { reactive, ref, computed, watch, onBeforeUnmount } from 'vue'

// --- 상태 ---
const cart = reactive([
  { id: 1, name: '노트북', price: 1500000, qty: 1 },
  { id: 2, name: '마우스',  price:   25000, qty: 2 },
])

const couponCode = ref('')
const coupon = reactive({ type: null, amount: 0, valid: false }) // { type: 'percent'|'fixed', ... }

// --- 파생값(computed) ---
const subtotal = computed(() =&gt;
  cart.reduce((sum, i) =&gt; sum + i.price * i.qty, 0)
)

const discount = computed(() =&gt; {
  if (!coupon.valid) return 0
  if (coupon.type === 'percent') return Math.floor(subtotal.value * (coupon.amount / 100))
  if (coupon.type === 'fixed')   return coupon.amount
  return 0
})

const shipping = computed(() =&gt; (subtotal.value - discount.value) &gt;= 50000 ? 0 : 3000)

const total = computed(() =&gt; Math.max(0, subtotal.value - discount.value + shipping.value))

const canCheckout = computed(() =&gt; cart.length &gt; 0 &amp;&amp; total.value &gt; 0)

// --- watch 1: 장바구니 변경 시 로컬스토리지 저장 ---
watch(cart, (v) =&gt; {
  localStorage.setItem('cart', JSON.stringify(v))
}, { deep: true })

// --- watch 2: 쿠폰 코드 디바운스 검증(비동기 흉내) ---
let timer = null
watch(couponCode, (v) =&gt; {
  // 디바운스
  if (timer) clearTimeout(timer)
  timer = setTimeout(async () =&gt; {
    // 가짜 API 호출 흉내: 코드 'SAVE10'은 10% 할인, 'MINUS5000'은 5천원 할인
    if (v === 'SAVE10') {
      coupon.type = 'percent'
      coupon.amount = 10
      coupon.valid = true
    } else if (v === 'MINUS5000') {
      coupon.type = 'fixed'
      coupon.amount = 5000
      coupon.valid = true
    } else {
      coupon.type = null
      coupon.amount = 0
      coupon.valid = false
    }
  }, 400)
})

onBeforeUnmount(() =&gt; { if (timer) clearTimeout(timer) })

// --- 편의 메서드 ---
function inc(id) {
  const item = cart.find(i =&gt; i.id === id)
  if (item) item.qty++
}
function dec(id) {
  const item = cart.find(i =&gt; i.id === id)
  if (item &amp;&amp; item.qty &gt; 1) item.qty--
}
function removeItem(id) {
  const idx = cart.findIndex(i =&gt; i.id === id)
  if (idx &gt; -1) cart.splice(idx, 1)
}
&lt;/script&gt;

&lt;template&gt;
  &lt;section class="cart"&gt;
    &lt;h3&gt;🛒 장바구니&lt;/h3&gt;
    &lt;ul&gt;
      &lt;li v-for="item in cart" :key="item.id"&gt;
        {{ item.name }} - {{ item.price.toLocaleString() }}원 × {{ item.qty }}
        &lt;button @click="dec(item.id)"&gt;-&lt;/button&gt;
        &lt;button @click="inc(item.id)"&gt;+&lt;/button&gt;
        &lt;button @click="removeItem(item.id)"&gt;삭제&lt;/button&gt;
      &lt;/li&gt;
    &lt;/ul&gt;

    &lt;hr&gt;

    &lt;div&gt;소계: {{ subtotal.toLocaleString() }}원&lt;/div&gt;
    &lt;div&gt;할인: -{{ discount.toLocaleString() }}원&lt;/div&gt;
    &lt;div&gt;배송비: {{ shipping.toLocaleString() }}원&lt;/div&gt;
    &lt;div&gt;&lt;b&gt;합계: {{ total.toLocaleString() }}원&lt;/b&gt;&lt;/div&gt;

    &lt;hr&gt;

    &lt;input v-model="couponCode" placeholder="쿠폰 코드 입력 (SAVE10, MINUS5000)" /&gt;

    &lt;button :disabled="!canCheckout"&gt;결제하기&lt;/button&gt;
  &lt;/section&gt;
&lt;/template&gt;
          </code></pre>
        </template>

        <template #result>
          <section class="cart">
            <h3>🛒 장바구니</h3>
            <ul>
              <li v-for="item in cart" :key="item.id">
                {{ item.name }} - {{ item.price.toLocaleString() }}원 × {{ item.qty }}
                <button class="example-btn" @click="dec(item.id)">-</button>
                <button class="example-btn" @click="inc(item.id)">+</button>
                <button class="example-btn" @click="removeItem(item.id)">삭제</button>
              </li>
            </ul>
            <hr/>

            <div>소계: {{ subtotal.toLocaleString() }}원</div>
            <div>할인: -{{ discount.toLocaleString() }}원</div>
            <div>배송비: {{ shipping.toLocaleString() }}원</div>
            <div><b>합계: {{ total.toLocaleString() }}</b></div>
            <hr/>

            <input
              ref="inputEl"
              class="example-input" 
              v-model="couponCode" 
              placeholder="쿠폰 코드를 입력하세요 (SAVE10, MINUS5000)"
              @input="updateWidth"
              :style="{ width: inputWidth + 'px' }"
            />
            <button class="example-btn" :disabled="!canCheckout">결제하기</button>
          </section>
        </template>
      </ExamplePair>

      <ExampleGroup
        title="Ex2) 커스텀 입력(디바운스 + IME 케어) + defineModel + 서버 검색 (watch)"
        note=""
        >
        <template #code-parent>
<pre v-pre><code>
&lt;!-- Parent.vue --&gt;
&lt;script setup&gt;
import { ref, watch, computed, onBeforeUnmount } from 'vue'
import DebouncedInput from './DebouncedInput.vue'

const keyword = ref('')
const category = ref('all')
const controller = { current: null }
const loading = ref(false)
const products = ref([])
const error = ref('')

// 쿼리스트링(파생값)
const qs = computed(() =&gt; new URLSearchParams({
  q: keyword.value,
  category: category.value
}).toString())

async function fetchProducts() {
  if (controller.current) controller.current.abort()
  controller.current = new AbortController()
  loading.value = true
  error.value = ''

  try {
    await new Promise((res) =&gt; setTimeout(res, 400))
    products.value = [
      { id: 1, name: `Result for "${keyword.value}" in ${category.value}` }
    ]
  } catch (e) {
    if (e.name !== 'AbortError') error.value = '요청 중 오류가 발생했어요'
  } finally {
    loading.value = false
  }
}

watch([keyword, category], fetchProducts, { immediate: true })

onBeforeUnmount(() =&gt; {
  if (controller.current) controller.current.abort()
})
&lt;/script&gt;

&lt;template&gt;
  &lt;section&gt;
    &lt;DebouncedInput v-model.trim="keyword" :delay="300" placeholder="검색어" /&gt;

    &lt;select v-model="category"&gt;
      &lt;option value="all"&gt;전체&lt;/option&gt;
      &lt;option value="book"&gt;도서&lt;/option&gt;
      &lt;option value="device"&gt;기기&lt;/option&gt;
    &lt;/select&gt;

    &lt;div v-if="loading"&gt;검색 중...⏳&lt;/div&gt;
    &lt;div v-else-if="error"&gt;{{ error }}&lt;/div&gt;
    &lt;ul v-else&gt;
      &lt;li v-for="p in products" :key="p.id"&gt;{{ p.name }}&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/section&gt;
&lt;/template&gt;
</code></pre>
        </template>
        <template #code-child>
<pre v-pre><code>
&lt;!-- DebouncedInput.vue --&gt;
&lt;script setup&gt;
import { ref, watch, onBeforeUnmount } from 'vue'

const model = defineModel({ default: '' })
const props = defineProps({
  modelModifiers: { type: Object, default: () =&gt; ({}) },
  delay: { type: Number, default: 300 },
  placeholder: { type: String, default: '' }
})

const inner = ref(model.value)
let timer = null
let isComposing = false

function applyModifiers(v) {
  if (props.modelModifiers?.trim) v = v.trim()
  return v
}

watch(inner, (v) =&gt; {
  if (isComposing) return
  if (timer) clearTimeout(timer)
  timer = setTimeout(() =&gt; {
    model.value = applyModifiers(v)
  }, props.delay)
})

watch(model, (v) =&gt; {
  if (v !== inner.value) inner.value = v
})

function flushNow() {
  if (timer) { clearTimeout(timer); timer = null }
  model.value = applyModifiers(inner.value)
}

onBeforeUnmount(() =&gt; { if (timer) clearTimeout(timer) })
&lt;/script&gt;

&lt;template&gt;
  &lt;input
    :value="inner"
    :placeholder="placeholder"
    @compositionstart="isComposing = true"
    @compositionend="(e) =&gt; { isComposing = false; inner = e.target.value; flushNow() }"
    @input="inner = $event.target.value"
    @keydown.enter.prevent="flushNow()"
    @blur="flushNow()"
  /&gt;
&lt;/template&gt;
</code></pre>
        </template>
        <template #result-parent>
          <ExampleDebounceParentWithWatch />
        </template>
      </ExampleGroup>
    </template>
  </ContentPage>
</template>