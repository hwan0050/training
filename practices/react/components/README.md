# React 기초 학습

## 📅 학습 날짜
2024-11-18

## 📚 학습 내용

### 1. JSX 문법
- **JSX**: JavaScript XML, JavaScript 안에서 HTML 같은 문법 사용
- **표현식**: `{}`로 JavaScript 표현식 삽입
- **인라인 스타일**: 객체 형태로 스타일 정의
- **조건부 렌더링**: `&&`, 삼항 연산자 사용

### 2. 컴포넌트
- **함수형 컴포넌트**: 가장 기본적인 컴포넌트 형태
- **컴포넌트 재사용**: Props를 통해 동적으로 재사용 가능
- **컴포넌트 구조**: 하나의 파일에 하나의 컴포넌트

### 3. Props (Properties)
- **타입 정의**: TypeScript 인터페이스로 Props 타입 지정
- **Props 전달**: 부모 → 자식으로 데이터 전달
- **Optional Props**: `?`로 선택적 속성 정의
- **구조 분해**: `{ name, age }` 형태로 Props 받기

### 4. useState Hook
- **상태 관리**: 컴포넌트 내부의 동적 데이터 관리
- **문법**: `const [state, setState] = useState(초기값)`
- **상태 업데이트**: `setState(새값)` 또는 `setState(prev => 새값)`
- **여러 상태**: 여러 개의 useState를 독립적으로 사용 가능
- **복잡한 상태**: 객체, 배열도 상태로 관리 가능

### 5. useEffect Hook
- **Side Effect 처리**: API 호출, 이벤트 리스너, 타이머 등
- **문법**: `useEffect(() => { /* 실행 코드 */ }, [의존성 배열])`
- **의존성 배열**:
  - `[]`: 마운트 시 한 번만 실행
  - `[state]`: state 변경 시마다 실행
  - 생략: 매 렌더링마다 실행
- **Cleanup**: `return () => { /* 정리 코드 */ }`로 메모리 누수 방지

## 💻 실습 파일
```
practices/react/components/
├── public/                    # 정적 파일
├── src/
│   ├── App.tsx               # 메인 컴포넌트
│   ├── Greeting.tsx          # Props 실습
│   ├── Counter.tsx           # useState 실습 (카운터)
│   ├── TodoList.tsx          # useState 실습 (배열 상태)
│   ├── Timer.tsx             # useEffect 실습 (타이머)
│   ├── DataFetcher.tsx       # useEffect 실습 (API 호출)
│   ├── WindowSize.tsx        # useEffect 실습 (이벤트 리스너)
│   ├── index.tsx             # 엔트리 포인트
│   └── index.css             # 전역 스타일
├── package.json              # 프로젝트 설정
├── tsconfig.json             # TypeScript 설정
└── README.md                 # 학습 노트
```

## 🔧 환경 설정

### 프로젝트 생성
```bash
npx create-react-app . --template typescript
```

### 실행
```bash
npm start         # 개발 서버 실행 (http://localhost:3000)
npm run build     # 프로덕션 빌드
npm test          # 테스트 실행
```

## 📖 주요 개념

### Props vs State
| Props | State |
|-------|-------|
| 부모로부터 전달받음 | 컴포넌트 내부에서 관리 |
| 읽기 전용 (immutable) | 변경 가능 (mutable) |
| 재사용성 증가 | 동적 데이터 관리 |

### 컴포넌트 라이프사이클 (useEffect)
```typescript
useEffect(() => {
  // 1. 마운트 시 실행 (componentDidMount)
  console.log('컴포넌트 마운트');

  return () => {
    // 3. 언마운트 시 실행 (componentWillUnmount)
    console.log('컴포넌트 언마운트');
  };
}, []); // 빈 배열 = 마운트/언마운트만

useEffect(() => {
  // 2. state 변경 시 실행 (componentDidUpdate)
  console.log('state 변경됨');
}, [state]);
```

### React 렌더링 최적화
- **불변성**: State는 직접 수정하지 말고 새로운 값으로 교체
- **의존성 배열**: useEffect 의존성 배열을 정확히 지정
- **key prop**: 리스트 렌더링 시 고유한 key 사용

## ✅ 실습 완료

### Props 실습
- [x] 인터페이스로 Props 타입 정의
- [x] Props로 데이터 전달
- [x] Optional Props 사용

### useState 실습
- [x] 숫자 상태 관리 (Counter)
- [x] 배열 상태 관리 (TodoList)
- [x] 객체 상태 관리 (Todo 아이템)
- [x] 여러 useState 동시 사용

### useEffect 실습
- [x] setInterval로 타이머 구현
- [x] API 호출 (fetch)
- [x] 이벤트 리스너 등록/해제
- [x] Cleanup 함수 사용

## 💡 배운 점

### 기술적 배운 점
- **선언형 프로그래밍**: React는 "무엇을" 보여줄지 선언
- **컴포넌트 기반**: 재사용 가능한 독립적인 UI 조각
- **단방향 데이터 흐름**: Props는 부모 → 자식으로만 전달
- **Hooks의 규칙**: 최상위에서만 호출, 조건문 안에서 호출 금지
- **불변성**: 상태를 직접 수정하지 않고 새로운 값 생성

### React vs 바닐라 JS
- React: 상태가 변경되면 자동으로 UI 업데이트
- 바닐라 JS: DOM을 직접 조작해야 함
- React가 훨씬 더 간결하고 유지보수 쉬움!

## 🚨 주의사항

### useState 주의점
```typescript
// ❌ 잘못된 예: 직접 수정
const [arr, setArr] = useState([1, 2, 3]);
arr.push(4);  // 안됨!

// ✅ 올바른 예: 새 배열 생성
setArr([...arr, 4]);
```

### useEffect 주의점
```typescript
// ❌ 잘못된 예: 의존성 누락
useEffect(() => {
  console.log(count);
}, []); // count가 의존성 배열에 없음!

// ✅ 올바른 예
useEffect(() => {
  console.log(count);
}, [count]);
```

### 무한 루프 방지
```typescript
// ❌ 무한 루프 발생!
useEffect(() => {
  setCount(count + 1); // 매번 재렌더링 → 다시 useEffect 실행
}); // 의존성 배열 없음

// ✅ 올바른 예
useEffect(() => {
  // 특정 조건에서만 실행
}, [dependency]);
```

## 🎯 다음 학습 목표
- Custom Hooks 만들기
- useContext로 전역 상태 관리
- useReducer로 복잡한 상태 관리
- useMemo, useCallback으로 성능 최적화
- React Router로 페이지 라우팅
- React Query로 서버 상태 관리

## 🔗 참고 자료
- [React 공식 문서](https://react.dev)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Hooks API Reference](https://react.dev/reference/react)
- [Learning Path](../../../docs/LEARNING_PATH.md)

## 📊 학습 시간
- 환경 설정: 30분
- Props 학습: 30분
- useState 학습: 1시간
- useEffect 학습: 1.5시간
- 실습 및 디버깅: 1시간
- **총 학습 시간: 약 4.5시간**

## 🎨 완성된 기능
1. **Greeting**: Props 전달 예제
2. **Counter**: 증가/감소/리셋 카운터
3. **TodoList**: 할 일 추가/완료/삭제
4. **Timer**: 시작/정지/리셋 타이머
5. **DataFetcher**: JSONPlaceholder API에서 사용자 목록 가져오기
6. **WindowSize**: 실시간 윈도우 크기 추적

## 💬 느낀 점
- React는 컴포넌트 재사용성이 뛰어나다
- TypeScript와 함께 사용하니 타입 안전성 확보
- Hooks 덕분에 클래스 컴포넌트보다 훨씬 간결
- useEffect의 의존성 배열 관리가 중요
- 실제로 동작하는 앱을 만들어보니 재미있다!