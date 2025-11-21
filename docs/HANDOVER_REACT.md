# 📋 React 기초 학습 인수인계 문서

## 📅 작업 정보
- **작업자**: Hwan Lee
- **작업 기간**: 2024-11-18
- **작업 브랜치**: feature/learn-react-basics
- **PR 번호**: #3 (예상)
- **작업 상태**: ✅ 완료

## 🎯 작업 개요
React 기초 문법 및 Hooks 학습, TypeScript와 함께 실습 완료

## 📂 작업 디렉토리
```
F:\workspace\git-factory\practices\react\components\
```

## 📝 생성된 파일 목록

### 1. 컴포넌트 파일 (7개)
```
src/App.tsx              # 메인 컴포넌트
src/Greeting.tsx         # Props 전달 예제
src/Counter.tsx          # useState 실습 (카운터)
src/TodoList.tsx         # useState 실습 (할 일 목록)
src/Timer.tsx            # useEffect 실습 (타이머)
src/DataFetcher.tsx      # useEffect 실습 (API 호출)
src/WindowSize.tsx       # useEffect 실습 (윈도우 크기)
```

### 2. 엔트리 파일
```
src/index.tsx            # React 앱 엔트리 포인트
src/index.css            # 전역 스타일
```

### 3. 설정 파일
```
package.json             # 프로젝트 의존성
tsconfig.json            # TypeScript 설정
```

### 4. 문서
```
README.md                # 학습 노트 (4.5시간 학습 시간 기록)
```

## 🔧 환경 설정

### 설치된 패키지
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  }
}
```

### 프로젝트 생성 명령어
```bash
npx create-react-app . --template typescript
```

## 📚 학습 내용 요약

### 1. JSX & 컴포넌트 (App.tsx)
- ✅ JSX 문법 이해
- ✅ 인라인 스타일 작성
- ✅ 컴포넌트 임포트 및 사용
- ✅ 조건부 렌더링

### 2. Props (Greeting.tsx)
- ✅ 인터페이스로 Props 타입 정의
- ✅ Props 전달 및 받기
- ✅ Optional Props (`?` 사용)
- ✅ 구조 분해 할당

### 3. useState Hook (Counter.tsx, TodoList.tsx)
- ✅ 숫자 상태 관리 (Counter)
- ✅ 배열 상태 관리 (TodoList)
- ✅ 객체 상태 관리 (Todo 아이템)
- ✅ 불변성 유지 (spread 연산자)
- ✅ 여러 useState 동시 사용

### 4. useEffect Hook (Timer.tsx, DataFetcher.tsx, WindowSize.tsx)
- ✅ setInterval/clearInterval (Timer)
- ✅ fetch API로 데이터 가져오기 (DataFetcher)
- ✅ 이벤트 리스너 등록/해제 (WindowSize)
- ✅ 의존성 배열 이해
- ✅ Cleanup 함수 사용

## 🚀 실행 방법

### 개발 서버 실행
```bash
cd practices/react/components
npm start
```
- 브라우저 자동 오픈: http://localhost:3000
- 핫 리로드 활성화

### 프로덕션 빌드
```bash
npm run build
```
- `build/` 폴더에 최적화된 번들 생성

### 테스트 실행
```bash
npm test
```

## 📊 학습 성과

### 통계
- **학습 시간**: 4.5시간
- **컴포넌트 수**: 7개
- **코드 라인**: 약 500줄
- **개념 학습**: 15+ 개념

### 핵심 성과
1. React 컴포넌트 기반 사고방식 이해
2. TypeScript와 React 조합으로 타입 안전성 확보
3. Hooks를 활용한 상태 및 Side Effect 관리
4. 실제 동작하는 앱 6개 구현

## ⚠️ 주의사항

### 1. useState 불변성 유지
```typescript
// ❌ 잘못된 예: 직접 수정
const [todos, setTodos] = useState([]);
todos.push(newTodo);  // 안됨!

// ✅ 올바른 예: 새 배열 생성
setTodos([...todos, newTodo]);
```

### 2. useEffect 의존성 배열
```typescript
// ❌ 잘못된 예: 의존성 누락
useEffect(() => {
  console.log(count);
}, []); // count가 없음!

// ✅ 올바른 예
useEffect(() => {
  console.log(count);
}, [count]);
```

### 3. Cleanup 함수 필수
```typescript
// ❌ 메모리 누수 발생
useEffect(() => {
  const interval = setInterval(() => {}, 1000);
  // cleanup 없음!
}, []);

// ✅ 올바른 예
useEffect(() => {
  const interval = setInterval(() => {}, 1000);
  return () => clearInterval(interval);
}, []);
```

### 4. API 호출 시 로딩/에러 처리
```typescript
// ✅ 로딩, 에러, 데이터 상태 모두 관리
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [data, setData] = useState([]);
```

## 🎯 다음 단계

### 즉시 진행 가능
1. **Custom Hooks**
   - 재사용 가능한 Hook 작성
   - useLocalStorage, useFetch 등

2. **Context API**
   - 전역 상태 관리
   - Props Drilling 해결

3. **React Router**
   - 페이지 라우팅
   - SPA 구현

### 추후 심화 학습
1. useReducer (복잡한 상태 관리)
2. useMemo, useCallback (성능 최적화)
3. React Query (서버 상태 관리)
4. Next.js (SSR, SSG)

## 🔗 관련 문서

### 프로젝트 내부 문서
- [학습 로드맵](./LEARNING_PATH.md)
- [Git 워크플로우](./GIT_WORKFLOW.md)
- [TypeScript 인수인계](./HANDOVER_TYPESCRIPT.md)
- [React 학습 노트](../practices/react/components/README.md)

### 외부 참고 자료
- [React 공식 문서](https://react.dev)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Hooks API Reference](https://react.dev/reference/react)

## 💡 배운 교훈

### 기술적 교훈
1. **선언형 UI**: 상태를 선언하면 UI가 자동으로 업데이트
2. **컴포넌트 재사용**: Props로 동일한 컴포넌트 다양하게 활용
3. **Hooks의 강력함**: 로직 재사용과 코드 간결성
4. **타입 안전성**: TypeScript로 런타임 에러 사전 방지

### 학습 방법론
1. **작은 단위로**: 각 개념을 독립적인 컴포넌트로 실습
2. **실제 앱 만들기**: Counter, TodoList 등 실용적인 예제
3. **문제 해결**: 버그 수정하며 디버깅 능력 향상

## 🐛 발생했던 이슈

### Issue 1: .gitkeep 파일 충돌
**문제**: Create React App이 빈 폴더에 .gitkeep 파일 때문에 실행 안 됨
**해결**: `del .gitkeep` 후 재실행
**교훈**: 빈 폴더 확인 필요

### Issue 2: useEffect 무한 루프
**문제**: 의존성 배열 없이 useState 호출
**해결**: 의존성 배열 추가
**교훈**: useEffect 의존성 배열의 중요성

### Issue 3: API 호출 시 로딩 상태 미처리
**문제**: 데이터 로딩 중 에러 발생
**해결**: loading, error, data 상태 분리 관리
**교훈**: API 호출은 항상 3가지 상태 관리 필요

## 📞 문의 사항
- 작업자: Hwan Lee
- Email: akma0050@naver.com
- GitHub: [@hwan0050](https://github.com/hwan0050)

---

**문서 작성일**: 2024-11-18
**최종 수정일**: 2024-11-18
**문서 버전**: 1.0