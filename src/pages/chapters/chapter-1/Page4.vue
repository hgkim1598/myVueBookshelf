<script setup>
import ContentPage from '@/pages/ContentPage.vue'
import ExamplePair from '@/components/ExamplePair.vue'
import { ref, reactive } from 'vue'

/** 예제 */
// 상품 리스트 (실무에서 API로 받는 데이터라 가정)
const products = reactive([
  { id: 1, name: '노트북', price: 1500000, stock: 3 },
  { id: 2, name: '마우스', price: 25000, stock: 0 },
  { id: 3, name: '키보드', price: 80000, stock: 10 },
])

const cart = ref([])

// 카트에 추가
const addToCart = (product) => {
  if (product.stock > 0) {
    cart.value.push(product)
    product.stock--
  }
}

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
          <li>
            <b>여러 속성 한 번에:</b> <code>v-bind="objectProps"</code>
            <span class="hang-line">→ 실무에서 컴포넌트를 props를 그대로 전달하거나, 여러 속성을 동적으로 제어할 때 많이 씀</span>
          </li>
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
          <li><code>v-for="(item, index) in items" :key="item.id"</code></li>
          <li>
            반드시 <code>key</code>를 줘야함 → Diff 알고리즘 최적화를 위해
            <span class="hang-line">실무에서는 <code>id</code> 같은 고유 식별자 사용을 권장</span>
          </li>
          <li><b>중첩 사용:</b> <code>v-for</code>안에서 또 <code>v-for</code>사용이 가능하지만, 성능 이슈와 가독성 때문에 계산된 배열(computed)로 미리 가공하는 편이 실무적임</li>
        </ul>
      </div>

      <h3>4. 이벤트 바인딩 (<code>@click</code>, <code>@input</code>등)</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li><code>@click="handleClick"</code> 처럼 직접 함수 연결</li>
          <li>
            <code>@clic.stop</code>, <code>@click.prevent</code>, <code>@keydown.enter</code> 같은 수식어(modifier) 자주 활용
            <span class="hang-line"> →DOM 이벤트 버빌링 제어, form submit 방지 등</span>
          </li>
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

      <h3>5. 고급 조합 (실무에서 많이 쓰는 패턴)</h3>
      <div class="list-center">
        <ul class="list--hang">
          <li>
            동적 Props + 조건부 렌더링 + 이벤트 바인딩 조합
            <ul>
              <li>API에서 받은 데이터에 따라 컴포넌트 속성이 바뀌는 경우</li>
              <li>폼 컴포넌트에서 <code>v-model</code> + <code>@input</code> 동시 사용</li>
              <li>리스트 항목마다 동적으로 이벤트 연결 (<code>v-for</code> + <code>@click</code>)</li>
            </ul>
          </li>
        </ul>
      </div>
    </template>

    <template #code>
      <ExamplePair
        title="Ex) v-for, v-if, v-bind를 활용한 상품 목록 예제"
        note="상품의 재고 상태에 따라 스타일과 버튼을 동적으로 제어하고 장바구니에 담기는 동작까지"
      >
      <template #code>
        <pre v-pre>
          <code>
            &lt;script setup&gt;
            import { ref, reactive } from 'vue'

            // 상품 리스트 (실무에서 API로 받는 데이터라 가정)
            const products = reactive([
              { id: 1, name: '노트북', price: 1500000, stock: 3 },
              { id: 2, name: '마우스', price: 25000, stock: 0 },
              { id: 3, name: '키보드', price: 80000, stock: 10 },
            ])

            const cart = ref([])

            // 카트에 추가
            const addToCart = (product) =&gt; {
              if (product.stock &gt; 0) {
                cart.value.push(product)
                product.stock--
              }
            }
            &lt;/script&gt;

            &lt;template&gt;
              &lt;section&gt;
                &lt;h2&gt;🛒 상품 목록&lt;/h2&gt;
                &lt;!-- v-for + v-bind + 조건부 렌더링 --&gt;
                &lt;ul&gt;
                  &lt;li v-for=&quot;item in products&quot; :key=&quot;item.id&quot;&gt;
                    &lt;!-- 동적 class 바인딩 --&gt;
                    &lt;span :class=&quot;{ soldout: item.stock === 0 }&quot;&gt;
                      {{ item.name }} ({{ item.price.toLocaleString() }}원)
                    &lt;/span&gt;

                    &lt;!-- 조건부 버튼 (v-if vs v-show 차이) --&gt;
                    &lt;button
                      v-if=&quot;item.stock &gt; 0&quot;
                      @click=&quot;addToCart(item)&quot;
                    &gt;
                      장바구니 추가
                    &lt;/button&gt;
                    &lt;span v-else class=&quot;text-gray&quot;&gt;품절&lt;/span&gt;
                  &lt;/li&gt;
                &lt;/ul&gt;

                &lt;h2&gt;🛍 내 카트&lt;/h2&gt;
                &lt;!-- v-for + key --&gt;
                &lt;ol&gt;
                  &lt;li v-for=&quot;(c, i) in cart&quot; :key=&quot;i&quot;&gt;
                    {{ c.name }} - {{ c.price.toLocaleString() }}원
                  &lt;/li&gt;
                &lt;/ol&gt;
              &lt;/section&gt;
            &lt;/template&gt;

            &lt;style scoped&gt;
            .soldout {
              color: #aaa;
              text-decoration: line-through;
            }
            .text-gray {
              color: #aaa;
            }
            &lt;/style&gt;
          </code>
        </pre>
      </template>
      <template #result>
          <section>
            <h2>🛒 상품 목록</h2>
            <!-- v-for + v-bind + 조건부 렌더링 -->
            <ul>
              <li v-for="item in products" :key="item.id">
                <!-- 동적 class 바인딩 -->
                <span :class="{ soldout: item.stock === 0 }">
                  {{ item.name }} ({{ item.price.toLocaleString() }}원)
                </span>

                <!-- 조건부 버튼 (v-if vs v-show 차이) -->
                <button
                  v-if="item.stock > 0"
                  @click="addToCart(item)"
                >
                  장바구니 추가
                </button>
                <span v-else class="text-gray">품절</span>
              </li>
            </ul>

            <h2>🛍 내 카트</h2>
            <!-- v-for + key -->
            <ol>
              <li v-for="(c, i) in cart" :key="i">
                {{ c.name }} - {{ c.price.toLocaleString() }}원
              </li>
            </ol>
          </section>
      </template>
      </ExamplePair>
    </template>
  </ContentPage>

</template>

<style scoped>
.soldout {
  color: #aaa;
  text-decoration: line-through;
}
.text-gray {
  color: #aaa;
}
</style>