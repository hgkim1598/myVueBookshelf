# Vue 3 학습 커리큘럼 (2개월)

## 1주차: Vue 3 핵심 문법

### setup 함수와 Composition API
- `setup()`은 Vue 3의 핵심 진입점
- Options API 대비 가독성과 재사용성 강화
- `ref`, `reactive` 등과 함께 사용

### 반응형 상태 관리
- `ref` : 기본 타입의 반응형 데이터
- `reactive` : 객체/배열의 반응형 데이터
- 불변성보다 반응형 시스템을 활용하는 방식이 중요

### 템플릿 문법
- `v-bind`, `v-if`, `v-for` 기본 디렉티브
- 이벤트 바인딩: `@click`, `@input`
- 실무에서 가장 많이 쓰이는 문법

### 양방향 바인딩 (v-model)
- form 요소와 상태를 동기화
- 커스텀 컴포넌트에서도 활용 가능
- `.lazy`, `.trim`, `.number` 같은 수식어 존재

### computed & watch
- `computed` : 종속성 기반 캐싱된 값
- `watch` : 특정 상태 변경 시 로직 실행
- 실무에서는 상태 파생값과 비동기 로직에 자주 사용

### Lifecycle hooks
- `onMounted`, `onUnmounted`, `onUpdated` 등
- DOM 접근, API 호출 위치 판단에 중요
- Composition API와 함께 더 직관적으로 사용 가능

---

## 2주차: 컴포넌트 구조화

### 컴포넌트 분리 기준
- UI 단위와 로직 단위 분리
- 재사용성 높은 단위로 쪼개기
- 지나치게 잘게 쪼개지 않는 것도 중요

### props와 emits
- 부모 → 자식: `props`
- 자식 → 부모: `emits`
- 타입 지정과 기본값 관리 습관화 필요

### slot & scoped slot
- 컴포넌트 재사용성을 극대화
- `scoped slot`으로 자식에서 부모로 데이터 전달
- UI 라이브러리 구현에서 핵심

### 컴포넌트 폴더 구조
- pages / components / layouts 구분
- 재사용 불가능한 경우 pages 안에서 관리
- 규모 커질수록 구조화가 유지보수의 핵심

---

## 3주차: 컴포저블 & 로직 분리

### Composables 만들기
- `useXXX` 네이밍 규칙
- `src/composables` 폴더에 저장
- 재사용 가능한 비즈니스 로직을 컴포넌트와 분리

### 비즈니스 로직과 UI 분리
- API 호출 로직을 컴포넌트에 직접 두지 않음
- UI는 최대한 단순화
- 테스트 용이성 확보

---

## 4주차: 상태 관리 (Pinia)

### Pinia 기본
- Vue 3 공식 상태 관리 라이브러리
- `defineStore`로 store 정의
- Vue Devtools와 강력하게 연동됨

### state, getter, action
- state: 데이터
- getter: 파생 데이터
- action: 비동기/동기 로직
- 명확한 역할 구분이 유지보수에 도움

### 로컬 vs 전역 상태
- 특정 컴포넌트만 쓰는 값은 로컬 상태
- 여러 페이지/컴포넌트에서 공유되는 값은 전역 상태
- 불필요한 전역화는 피해야 함

---

## 5주차: 비동기 처리 & API 통신

### async/await
- 가독성 좋은 비동기 처리 방식
- try/catch와 함께 에러 처리
- Promise chaining보다 선호됨

### fetch vs axios
- fetch: 내장, 가볍지만 기능 한정적
- axios: 기능 풍부, 인터셉터 지원
- 실무에서는 axios 선호

### 로딩 & 에러 상태 관리
- `isLoading`, `errorMessage` 같은 상태 패턴 필수
- UX를 위해 로딩 스피너, 에러 메시지 제공
- Pinia나 composable에서 관리하면 일관성↑

---

## 6주차: 라우터 & 페이지 구조화

### Vue Router 기본
- `createRouter`, `createWebHistory`
- path와 component 매핑
- Single Page Application의 핵심

### 중첩 & 동적 라우트
- children 속성으로 중첩 라우트 구현
- `:id` 같은 파라미터 활용
- 게시글/상품 상세 페이지에 자주 쓰임

### 라우터 가드
- `beforeEach`, `beforeEnter` 등
- 인증 여부 체크
- 실무 보안/UX에서 매우 중요

---

## 7주차: 실무 알고리즘

### 데이터 필터링 & 정렬
- `filter`, `sort` 활용
- 다중 조건 처리
- 리스트 UI에서 필수

### 검색 기능
- input 이벤트 + debounce
- 대소문자 무시, 부분 일치
- 실무에서 성능 고려 중요

### Pagination 로직
- slice, offset 기반 구현
- API와 프론트에서 나누어 처리
- UX에 직접적 영향

---

## 8주차: UI/UX 개선 + 테스트 기초

### UX 개선 기법
- debounce/throttle: 이벤트 최적화
- Skeleton UI: 로딩 경험 개선
- Shimmer 효과로 고급스러운 UX

### 테스트 기초
- Jest/Vitest 기본 문법
- Vue Test Utils로 컴포넌트 단위 테스트
- “꼭 필요한 만큼만” 테스트가 실무 전략

