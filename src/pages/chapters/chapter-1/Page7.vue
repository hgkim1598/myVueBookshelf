<script setup>
import ContentPage from '@/pages/ContentPage.vue'
import ExamplePair from '@/components/ExamplePair.vue'
import ExampleGroup from '@/components/ExampleGroup.vue'
import ParentDemo from './examples/ParentDemo.vue'


/** 예제 1번 */
import { ref, onMounted, onUnmounted, nextTick, onUpdated } from 'vue'

const box = ref(null)
const size = ref({ w: 0, h: 0 })
const items = ref([])
const loading = ref(false)

let controller = null
let io = null
let ro = null

function measure () {
  if (!box.value) return
  const rect = box.value.getBoundingClientRect()
  size.value = { w: Math.round(rect.width), h: Math.round(rect.height) }
}

async function fetchItems () {
  controller = new AbortController()
  loading.value = true
  try {
    await new Promise(r => setTimeout(r, 600))
    items.value = Array.from({ length: 5 }, (_, i) => `아이템 ${i + 1}`)
  } catch (err) {

  } finally {
    loading.value = false
  }
}

onMounted(() => {
  measure()
  fetchItems()

  io = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry.isIntersecting) measure()
  })
  if (box.value) io.observe(box.value)
  ro = new ResizeObserver(() => measure())
  if (box.value) ro.observe(box.value)
  window.addEventListener('resize', measure)
})

onUpdated(async () => {
  await nextTick()
  measure()
})

onUnmounted(() => {
  controller?.abort()
  io?.disconnect()
  ro?.disconnect()  
  window.removeEventListener('resize', measure)
})

</script>
<template>
  <ContentPage>
    <template #title>
      <h2>📘 1-7: 라이프 사이클 훅</h2>
    </template>

    <template #concept>
      <h3>1. 무엇을 언제 해야하나?</h3>
      <div class="table-scroll">
        <table class="table table--compact table--rowline">
          <caption style="position: absolute; left: -9999px;">Vue3 라이프 사이클 훅: 시점과 실무 용도</caption>
          <thead>
            <tr>
              <th class="nowrap">훅</th>
              <th class="nowrap">시점</th>
              <th class="nowrap">용도</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="nowrap">
                <code>onMounted</code>
              </td>
              <td>컴포넌트가 DOM에 붙은 직후 (초기 렌더 완료)</td>
              <td>DOM 접근(ref), 이벤트 리스너 등록, Interval/Observer 시작, 초기 데이터 로드(API 호출)</td>
            </tr>
            <tr>
              <td><code>onUnmounted</code></td>
              <td>컴포넌트가 DOM에서 제거된 직후</td>
              <td>정리(clean-up): 이벤트 리스너 제거, interval/Timeout/Oberver 해제, 요청 취소(AbortController)</td>
            </tr>
            <tr>
              <td><code>onUpdate</code></td>
              <td>반응형 상태가 변경되어 DOM이 실제로 다시 그려진 뒤</td>
              <td>DOM 크기/위치 재 측정, 외부 위젯 재레이아웃, <code>nextTick</code>과 함께 뷰 갱신 이후 작업</td>
            </tr>
            <tr>
              <td><code>onBeforemount / Update / Unmount</code></td>
              <td>각 단계 직전</td>
              <td>디버깅/로깅, 정말 필요한 경우에만 사용 (대부분은 Mounted / Updated / Unmounted로 충분)</td>
            </tr>
            <tr>
              <td><code>onActivated / onDeactivated</code></td>
              <td><code>&lt;KeepAlive&gt;</code>로 캐시된 컴포넌트 재활성/비활성</td>
              <td>탭/페이지 캐시 전략: 타이머 재개 / 일시정지, 뷰어 재초기화 없이 상태 유지</td>
            </tr>
            <tr>
              <td><code>onErrorCaptured</code></td>
              <td>하위 트리 에러 잡기</td>
              <td>위젯/서드파티 삽입 시 안전망, 사용자 공지/복구 로직</td>
            </tr>
            <tr>
              <td><code>onRenderTracked / onRenderTriggered</code></td>
              <td>랜더 추적(디버깅 전용)</td>
              <td>불필요 렌더 원인 찾기(개발모드에서만)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="practical-tip">
        <span class="practical-tip__title">☝🏻 실무 포인트</span>
        <ul>
          <li>데이터 변화에 반응하는 작업은 보통 <code>watch / watchEffet</code>가 더 적합하다</li>
          <li><b>DOM이 실제로 바뀐 뒤</b> 측정 / 레이아웃이 필요하면 <code>onUpdate</code>(+<code>nextTick</code>)이 맞다</li>
          <li>트림은 DB나 검색 인덱스에 불필요한 공백 저장을 막는다</li>
        </ul>
      </div>
      <div class="space-between-chapter" />
      <h3>2. API 호출은 어디에서?</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li>클라이언트 렌더링 기준: <code>onMounted</code>에서 호출 (초기 렌더 후 UX 부하 ↓, DOM도 준비됨)</li>
          <li>호출이 오래 걸리거나 취소가 필요하면 <code>AbortController</code>를 써서 <code>onUnmounted</code>에서 <code>abort()</code>로 정리</li>
          <li>라우팅 전/후에 미리 가져오고 싶다면 라우터 가드(예: <code>beforeRouteEnter</code>)나 상위 레벨에서 미리 fetch</li>
        </ul>
      </div>
      <div class="space-between-chapter" />
      <h3>3. 정리(청소)가 생명</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li>
            <code>addEventListener</code>/<code>setInterval</code>/<code>newResizeOberver</code>/<code>new IntersectionObserver</code>/서드파티 위젯
            <span class="hang-line">→ 반드시 <code>onUnmounted</code>에서 해제</span>
          </li>
          <li>누수 방지 체크리스트: 리스너 / 타이머 / 옵저버 / 웹소켓 / 미디어 스트림 / 지도·차트 인스턴스 / 요청 취소</li>
        </ul>
      </div>
      <div class="space-between-chapter" />
      <h3>4. <code>onUpdated</code> 사용 시 주의점</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li>상태가 여러 번 바뀌면 배치로 묶여 한 번에 렌더, 이후 <code>onUpdated</code>가 호출된다</li>
          <li>DOM값 읽기 직전엔 <code>await nextTick()</code>으로 확실히 그려진 뒤를 보장</li>
        </ul>
      </div>
      <div class="space-between-chapter" />
      <h3>5. 훅은 현재 컴포넌트 컨텍스트에서만 동작</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li>컴포저블 안에서 훅을 호출해도, 그 컴포저블을 사용한 컴포넌트의 라이프사이클에 연결된다 (아주 유용한 패턴)</li>
        </ul>
      </div>
    </template>

    <template #code>
      <ExamplePair
        title="Ex1) onMounted/onUpdated/onUnmounted - DOM 측정·API(취소)·intersectionObserver"
        :note="`초기 mount 후 DOM 측정
          → API 호출(AbortController로 취소)
          → resize/IO 등록, updated+nextTick 뒤 재측정, unmounted에서 모든 리소스 정리`"
        >
        <template #code>
<pre v-pre><code>
&lt;script setup&gt;
import { ref, onMounted, onUnmounted, onUpdated, nextTick } from 'vue'

const box = ref(null)
const size = ref({ w: 0, h: 0 })
const items = ref([])
const loading = ref(false)

let controller = null // AbortController (API 취소)
let io = null        // IntersectionObserver

function measure () {
  if (!box.value) return
  const rect = box.value.getBoundingClientRect()
  size.value = { w: Math.round(rect.width), h: Math.round(rect.height) }
}

async function fetchItems () {
  controller = new AbortController()
  loading.value = true
  try {
    // 데모 지연. 실제로는 fetch(url, { signal: controller.signal })
    await new Promise(r =&gt; setTimeout(r, 600))
    items.value = Array.from({ length: 5 }, (_, i) =&gt; `아이템 ${i + 1}`)
  } catch (err) {
    // 취소(AbortError) 등
  } finally {
    loading.value = false
  }
}

onMounted(() =&gt; {
  measure()      // DOM 접근 가능
  fetchItems()   // 초기 로드

  io = new IntersectionObserver((entries) =&gt; {
    const entry = entries[0]
    if (entry.isIntersecting) measure()
  })
  if (box.value) io.observe(box.value)

  window.addEventListener('resize', measure)
})

onUpdated(async () =&gt; {
  await nextTick() // 실제 DOM 패치 완료 보장
  measure()
})

onUnmounted(() =&gt; {
  controller?.abort()
  io?.disconnect()
  window.removeEventListener('resize', measure)
})
&lt;/script&gt;

&lt;template&gt;
  &lt;section&gt;
    &lt;div ref="box" style="border:1px solid #ddd; padding:12px; border-radius:8px;"&gt;
      &lt;p&gt;&lt;b&gt;박스 크기:&lt;/b&gt; {{ size.w }} × {{ size.h }} px&lt;/p&gt;

      &lt;button @click="items.push('추가됨')"&gt;아이템 추가&lt;/button&gt;

      &lt;div v-if="loading" style="margin-top:8px;"&gt;로딩 중…&lt;/div&gt;
      &lt;ul v-else style="margin-top:8px;"&gt;
        &lt;li v-for="(it, i) in items" :key="i"&gt;{{ it }}&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
  &lt;/section&gt;
&lt;/template&gt;
</code></pre>

        </template>
        <template #result>
          <section>
            <div
              ref="box"
              style="border: 1px solid #ddd; padding: 12px; border-radius: 8px;;"
              >
              <p><b>박스 크기:</b> {{ size.w }} × {{ size.h }} px</p>

              <button
                @click="items.push('추가됨')"
                >
                아이템 추가
              </button>

              <div 
                v-if="loading"
                style="margin-top: 8px;"
                >
                로딩...
              </div>
              <ul
                v-else
                style="margin-top: 8px;"
                >
                <li
                  v-for="(it, i) in items"
                  :key="i"
                >
                  {{ it }}
                </li>
              </ul>
            </div>
          </section>
        </template>
      </ExamplePair>

      <ExampleGroup
        title="Ex2) 부모 → 자식 prop 변경 + onUpdated(nextTick) - Canvas 리렌더 / 마운트·언마운트 정리"
        :note="`부모가 color 변경 시 자식은 onUpdated에서 nextTick 후 redraw.
        keydown·setInterval 등록, onUnmounted에서 해제.
        show 토글로 라이프사이클 흐름 확인`"
        >
        <template #code-parent>
<pre v-pre><code>&lt;!-- ParentDemo.vue --&gt;
&lt;script setup&gt;
import { ref } from 'vue'
import ChildCanvas from './ChildCanvas.vue'

const show = ref(true)
const color = ref('#4f46e5')

const colors = ['#4f46e5', '#16a34a', '#dc2626', '#f59e0b']
let i = 0
function cycle () {
  i = (i + 1) % colors.length
  color.value = colors[i]
}
&lt;/script&gt;

&lt;template&gt;
  &lt;section style="display:grid; gap:12px;"&gt;
    &lt;div style="display:flex; gap:8px;"&gt;
      &lt;button @click="show = !show"&gt;{{ show ? '자식 제거' : '자식 추가' }}&lt;/button&gt;
      &lt;button @click="cycle"&gt;색상 변경&lt;/button&gt;
    &lt;/div&gt;

    &lt;ChildCanvas v-if="show" :color="color" /&gt;
    &lt;div v-else style="color:#888;"&gt;(자식이 언마운트됨)&lt;/div&gt;
  &lt;/section&gt;
&lt;/template&gt;
</code></pre>

        </template>

        <template #code-child>
<pre v-pre><code>&lt;!-- ChildCanvas.vue --&gt;
&lt;script setup&gt;
import { ref, onMounted, onUnmounted, onUpdated, nextTick } from 'vue'

const props = defineProps({
  color: { type: String, default: '#4f46e5' },
})

const canvas = ref(null)
let ctx = null
let timer = null

function draw () {
  if (!ctx) return
  ctx.clearRect(0, 0, 300, 100)
  ctx.fillStyle = props.color
  ctx.fillRect(10, 10, 280, 80)
}

function handleKey (e) {
  if (e.key === 'r') draw() // R 키로 재그리기
}

onMounted(() =&gt; {
  ctx = canvas.value.getContext('2d')
  draw()
  window.addEventListener('keydown', handleKey)
  timer = setInterval(draw, 2000) // 데모용
})

onUpdated(async () =&gt; {
  await nextTick() // prop 반영 완료 후
  draw()
})

onUnmounted(() =&gt; {
  window.removeEventListener('keydown', handleKey)
  clearInterval(timer)
})
&lt;/script&gt;

&lt;template&gt;
  &lt;canvas
    ref="canvas"
    width="300"
    height="100"
    style="border:1px solid #ddd; border-radius:8px;"
  &gt;&lt;/canvas&gt;
&lt;/template&gt;
</code></pre>
        </template>

        <template #result-parent>
          <ParentDemo />
        </template>

      </ExampleGroup>
    </template>
  </ContentPage>
</template>