// src/data/curriculum.js
// 이 파일은 프로젝트의 모든 학습 콘텐츠를 담고 있는 중앙 데이터 소스입니다.
export const curriculum = [
  // 1주차
  {
    id: 1,
    title: 'Vue 3 핵심 문법',
    path: '/chapter-1',
    totalPages: 6,
//     pages: [
//       {
//         page: 1,
//         title: 'setup 함수와 Composition API',
//         content: '- `setup()`은 Vue 3의 핵심 진입점\n- Options API 대비 가독성과 재사용성 강화\n- `ref`, `reactive` 등과 함께 사용',
//         code: `import { ref } from 'vue';

// export default {
//   setup() {
//     const message = ref('Hello, Composition API!');
//     return { message };
//   }
// };`,
//         result: '컴포넌트 인스턴스에 `message`라는 반응형 데이터가 생성됩니다.'
//       },
//       {
//         page: 2,
//         title: '반응형 상태 관리',
//         content: '- `ref` : 기본 타입의 반응형 데이터\n- `reactive` : 객체/배열의 반응형 데이터\n- 불변성보다 반응형 시스템을 활용하는 방식이 중요',
//         code: `import { ref, reactive } from 'vue';

// const count = ref(0); // .value로 접근
// const state = reactive({ name: 'Vue', version: 3 }); // 직접 접근`,
//         result: 'count와 state 객체의 속성이 변경되면, 이를 사용하는 템플릿이 자동으로 업데이트됩니다.'
//       },
//       {
//         page: 3,
//         title: '템플릿 문법',
//         content: '- `v-bind`, `v-if`, `v-for` 기본 디렉티브\n- 이벤트 바인딩: `@click`, `@input`\n- 실무에서 가장 많이 쓰이는 문법',
//         code: `<template>
//   <p :id="elementId">{{ message }}</p>
//   <button @click="sayHello">Click Me</button>
//   <ul>
//     <li v-for="item in items" :key="item.id">{{ item.name }}</li>
//   </ul>
// </template>`,
//         result: '데이터를 DOM에 바인딩하고, 이벤트를 처리하며, 리스트를 렌더링할 수 있습니다.'
//       },
//       {
//         page: 4,
//         title: '양방향 바인딩 (v-model)',
//         content: '- form 요소와 상태를 동기화\n- 커스텀 컴포넌트에서도 활용 가능\n- `.lazy`, `.trim`, `.number` 같은 수식어 존재',
//         code: `<input v-model="text" />
// <p>Input is: {{ text }}</p>`,
//         result: 'input 창에 텍스트를 입력하면 아래 문단(p 태그)의 내용이 실시간으로 함께 변경됩니다.'
//       },
//       {
//         page: 5,
//         title: 'computed & watch',
//         content: '- `computed` : 종속성 기반 캐싱된 값\n- `watch` : 특정 상태 변경 시 로직 실행\n- 실무에서는 상태 파생값과 비동기 로직에 자주 사용',
//         code: `import { ref, computed, watch } from 'vue';

// const count = ref(0);
// const doubleCount = computed(() => count.value * 2);

// watch(count, (newValue, oldValue) => {
//   console.log(\`count changed from \${oldValue} to \${newValue}\`);
// });`,
//         result: 'count 값이 변경될 때마다 doubleCount는 자동으로 재계산되고, watch 콜백 함수가 실행됩니다.'
//       },
//       {
//         page: 6,
//         title: 'Lifecycle hooks',
//         content: '- `onMounted`, `onUnmounted`, `onUpdated` 등\n- DOM 접근, API 호출 위치 판단에 중요\n- Composition API와 함께 더 직관적으로 사용 가능',
//         code: `import { onMounted } from 'vue';

// onMounted(() => {
//   console.log('Component has been mounted to the DOM.');
//   // API 호출이나 DOM 조작 로직을 여기에 작성
// });`,
//         result: '컴포넌트가 DOM에 마운트된 직후 콘솔에 메시지가 출력됩니다.'
//       }
//     ]
  },
  // 2주차
  {
    id: 2,
    title: '컴포넌트 구조화',
    path: '/chapter-2',
    totalPages: 4,
//     pages: [
//       {
//         page: 1,
//         title: '컴포넌트 분리 기준',
//         content: '- UI 단위와 로직 단위 분리\n- 재사용성 높은 단위로 쪼개기\n- 지나치게 잘게 쪼개지 않는 것도 중요',
//         code: `// <UserProfile>
// //   <UserAvatar />
// //   <UserInfo />
// // </UserProfile>`,
//         result: '기능과 역할에 따라 컴포넌트를 분리하면 코드의 가독성과 유지보수성이 향상됩니다.'
//       },
//       {
//         page: 2,
//         title: 'props와 emits',
//         content: '- 부모 → 자식: `props`\n- 자식 → 부모: `emits`\n- 타입 지정과 기본값 관리 습관화 필요',
//         code: `// Child.vue
// const props = defineProps({ message: String });
// const emit = defineEmits(['response']);

// emit('response', 'Hello from child!');`,
//         result: '부모와 자식 컴포넌트 간에 명확하고 예측 가능한 데이터 흐름을 만듭니다.'
//       },
//       {
//         page: 3,
//         title: 'slot & scoped slot',
//         content: '- 컴포넌트 재사용성을 극대화\n- `scoped slot`으로 자식에서 부모로 데이터 전달\n- UI 라이브러리 구현에서 핵심',
//         code: `<template>
//   <FancyButton>
//     <!-- slot content -->
//     Click Me!
//   </FancyButton>
// </template>`,
//         result: '컴포넌트의 특정 영역을 부모에서 커스터마이징하여 유연한 구조를 만들 수 있습니다.'
//       },
//       {
//         page: 4,
//         title: '컴포넌트 폴더 구조',
//         content: '- pages / components / layouts 구분\n- 재사용 불가능한 경우 pages 안에서 관리\n- 규모 커질수록 구조화가 유지보수의 핵심',
//         code: `/*
// src/
// ├── components/ (재사용 가능한 공통 컴포넌트)
// ├── pages/ (라우터에 매핑되는 페이지 컴포넌트)
// └── layouts/ (페이지의 공통 레이아웃)
// */`,
//         result: '프로젝트의 규모가 커져도 파일을 쉽게 찾고 관리할 수 있는 체계적인 구조를 제공합니다.'
//       }
//     ]
  },
  // 3주차
  {
    id: 3,
    title: '컴포저블 & 로직 분리',
    path: '/chapter-3',
    totalPages: 2,
//     pages: [
//       {
//         page: 1,
//         title: 'Composables 만들기',
//         content: '- `useXXX` 네이밍 규칙\n- `src/composables` 폴더에 저장\n- 재사용 가능한 비즈니스 로직을 컴포넌트와 분리',
//         code: `// src/composables/useCounter.js
// import { ref } from 'vue';
// export function useCounter() {
//   const count = ref(0);
//   const increment = () => count.value++;
//   return { count, increment };
// }`,
//         result: '카운터 관련 로직을 어떤 컴포넌트에서든 쉽게 재사용할 수 있습니다.'
//       },
//       {
//         page: 2,
//         title: '비즈니스 로직과 UI 분리',
//         content: '- API 호출 로직을 컴포넌트에 직접 두지 않음\n- UI는 최대한 단순화\n- 테스트 용이성 확보',
//         code: `// In component
// import { useFetchUserData } from '@/composables/useUserData';
// const { user, isLoading, error } = useFetchUserData();`,
//         result: '컴포넌트는 데이터를 화면에 표시하는 역할에만 집중하게 되어 코드가 깔끔해지고 테스트가 용이해집니다.'
//       }
//     ]
  },
  // 4주차
  {
    id: 4,
    title: '상태 관리 (Pinia)',
    path: '/chapter-4',
    totalPages: 3,
//     pages: [
//       {
//         page: 1,
//         title: 'Pinia 기본',
//         content: '- Vue 3 공식 상태 관리 라이브러리\n- `defineStore`로 store 정의\n- Vue Devtools와 강력하게 연동됨',
//         code: `// src/stores/counter.js
// import { defineStore } from 'pinia';
// export const useCounterStore = defineStore('counter', {
//   state: () => ({ count: 0 }),
// });`,
//         result: '애플리케이션 전역에서 공유할 수 있는 중앙 집중식 상태 저장소(store)를 생성합니다.'
//       },
//       {
//         page: 2,
//         title: 'state, getter, action',
//         content: '- state: 데이터\n- getter: 파생 데이터 (computed와 유사)\n- action: 비동기/동기 로직 (methods와 유사)',
//         code: `// In store definition
// getters: {
//   doubleCount: (state) => state.count * 2,
// },
// actions: {
//   increment() {
//     this.count++;
//   },
// }`,
//         result: '데이터, 파생 데이터, 로직을 명확하게 분리하여 상태 관리를 체계적으로 할 수 있습니다.'
//       },
//       {
//         page: 3,
//         title: '로컬 vs 전역 상태',
//         content: '- 특정 컴포넌트만 쓰는 값은 로컬 상태 (`ref`, `reactive`)\n- 여러 페이지/컴포넌트에서 공유되는 값은 전역 상태 (Pinia)\n- 불필요한 전역화는 피해야 함',
//         code: `// 로컬 상태 (해당 컴포넌트 내에서만 유효)
// const isModalOpen = ref(false);

// // 전역 상태 (Pinia store)
// // const userStore = useUserStore();
// // userStore.isAuthenticated;`,
//         result: '상태의 유효 범위를 명확히 하여 데이터 흐름을 예측 가능하게 만들고 복잡성을 줄입니다.'
//       }
//     ]
  },
  // 5주차
  {
    id: 5,
    title: '비동기 처리 & API 통신',
    path: '/chapter-5',
    totalPages: 3,
//     pages: [
//       {
//         page: 1,
//         title: 'async/await',
//         content: '- 가독성 좋은 비동기 처리 방식\n- try/catch와 함께 에러 처리\n- Promise chaining보다 선호됨',
//         code: `async function fetchData() {
//   try {
//     const response = await fetch('/api/data');
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error('Failed to fetch data:', error);
//   }
// }`,
//         result: '동기 코드처럼 순차적으로 비동기 로직을 작성하여 코드의 가독성을 높입니다.'
//       },
//       {
//         page: 2,
//         title: 'fetch vs axios',
//         content: '- fetch: 내장, 가볍지만 기능 한정적 (JSON 변환 필요, 에러 처리 불편)\n- axios: 기능 풍부, 인터셉터 지원, 자동 JSON 변환 등\n- 실무에서는 axios 선호',
//         code: `// axios 사용 예시
// import axios from 'axios';
// const response = await axios.get('/api/data');
// console.log(response.data); // 자동으로 JSON 파싱됨`,
//         result: 'axios를 사용하면 API 통신 코드를 더 간결하고 강력하게 작성할 수 있습니다.'
//       },
//       {
//         page: 3,
//         title: '로딩 & 에러 상태 관리',
//         content: '- `isLoading`, `errorMessage` 같은 상태 패턴 필수\n- UX를 위해 로딩 스피너, 에러 메시지 제공\n- Pinia나 composable에서 관리하면 일관성↑',
//         code: `<template>
//   <div v-if="isLoading">Loading...</div>
//   <div v-else-if="error">{{ error }}</div>
//   <div v-else>{{ data }}</div>
// </template>`,
//         result: '사용자에게 현재 데이터 상태(로딩 중, 성공, 실패)를 명확하게 알려주어 UX를 개선합니다.'
//       }
//     ]
  },
  // 6주차
  {
    id: 6,
    title: '라우터 & 페이지 구조화',
    path: '/chapter-6',
    totalPages: 3,
//     pages: [
//       {
//         page: 1,
//         title: 'Vue Router 기본',
//         content: '- `createRouter`, `createWebHistory`\n- path와 component 매핑\n- Single Page Application의 핵심',
//         code: `const routes = [
//   { path: '/', component: Home },
//   { path: '/about', component: About },
// ];`,
//         result: '브라우저의 페이지 이동 없이 URL 경로에 따라 다른 컴포넌트를 보여주는 SPA를 구현합니다.'
//       },
//       {
//         page: 2,
//         title: '중첩 & 동적 라우트',
//         content: '- `children` 속성으로 중첩 라우트 구현\n- `:id` 같은 파라미터 활용\n- 게시글/상품 상세 페이지에 자주 쓰임',
//         code: `{ 
//   path: '/user/:id', 
//   component: User,
//   children: [
//     { path: 'profile', component: UserProfile } // /user/:id/profile
//   ]
// }`,
//         result: '사용자 ID와 같은 동적인 값에 따라 특정 페이지를 보여주거나, 부모-자식 구조의 페이지를 만들 수 있습니다.'
//       },
//       {
//         page: 3,
//         title: '라우터 가드',
//         content: '- `beforeEach`, `beforeEnter` 등\n- 인증 여부 체크\n- 실무 보안/UX에서 매우 중요',
//         code: `router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !isLoggedIn()) {
//     next('/login');
//   } else {
//     next();
//   }
// });`,
//         result: '페이지 이동 전 특정 조건(예: 로그인 여부)을 확인하여 접근을 제어할 수 있습니다.'
//       }
//     ]
  },
  // 7주차
  {
    id: 7,
    title: '실무 알고리즘',
    path: '/chapter-7',
    totalPages: 3,
//     pages: [
//       {
//         page: 1,
//         title: '데이터 필터링 & 정렬',
//         content: '- `filter`, `sort` 활용\n- 다중 조건 처리\n- 리스트 UI에서 필수',
//         code: `const filteredUsers = computed(() => {
//   return users.value
//     .filter(user => user.isActive)
//     .sort((a, b) => a.name.localeCompare(b.name));
// });`,
//         result: '원본 데이터는 유지하면서, 사용자의 요구에 맞는 데이터만 필터링하고 정렬하여 보여줄 수 있습니다.'
//       },
//       {
//         page: 2,
//         title: '검색 기능',
//         content: '- input 이벤트 + debounce\n- 대소문자 무시, 부분 일치\n- 실무에서 성능 고려 중요',
//         code: `const searchResults = computed(() => {
//   const term = searchTerm.value.toLowerCase();
//   return items.value.filter(item => 
//     item.name.toLowerCase().includes(term)
//   );
// });`,
//         result: '사용자가 입력하는 검색어에 따라 실시간으로 관련 항목을 찾아 보여주는 기능을 구현합니다.'
//       },
//       {
//         page: 3,
//         title: 'Pagination 로직',
//         content: '- slice, offset 기반 구현\n- API와 프론트에서 나누어 처리\n- UX에 직접적 영향',
//         code: `const paginatedItems = computed(() => {
//   const start = (currentPage.value - 1) * itemsPerPage;
//   const end = start + itemsPerPage;
//   return allItems.value.slice(start, end);
// });`,
//         result: '대량의 데이터를 여러 페이지로 나누어 보여줌으로써 성능을 개선하고 사용자 경험을 향상시킵니다.'
//       }
//     ]
  },
  // 8주차
  {
    id: 8,
    title: 'UI/UX 개선 + 테스트 기초',
    path: '/chapter-8',
    totalPages: 2,
//     pages: [
//       {
//         page: 1,
//         title: 'UX 개선 기법',
//         content: '- debounce/throttle: 이벤트 최적화 (검색, 스크롤)\n- Skeleton UI: 로딩 경험 개선\n- Shimmer 효과로 고급스러운 UX',
//         code: `// debounce/throttle은 lodash 같은 라이브러리를 사용하거나 직접 구현합니다.
// // Skeleton UI는 데이터가 로드되기 전에 보여주는 회색 레이아웃 컴포넌트입니다.`,
//         result: '사용자가 서비스를 더 쾌적하고 부드럽게 느낄 수 있도록 하는 다양한 UI/UX 개선 기법들입니다.'
//       },
//       {
//         page: 2,
//         title: '테스트 기초',
//         content: '- Jest/Vitest 기본 문법\n- Vue Test Utils로 컴포넌트 단위 테스트\n- “꼭 필요한 만큼만” 테스트가 실무 전략',
//         code: `import { mount } from '@vue/test-utils';
// import MyComponent from '../MyComponent.vue';

// test('renders a message', () => {
//   const wrapper = mount(MyComponent, {
//     props: { msg: 'Hello world' }
//   });
//   expect(wrapper.text()).toContain('Hello world');
// });`,
//         result: '컴포넌트가 예상대로 동작하는지 자동으로 검증하여 코드의 안정성과 신뢰성을 높입니다.'
//       }
//     ]
  }
];
