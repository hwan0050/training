# 📚 학습 로드맵 (Learning Path)

> Git Factory 개발자를 위한 체계적인 학습 로드맵

## 🎯 학습 목표

이 로드맵은 **풀스택 개발자**이자 **MSA 아키텍트**로 성장하기 위한 단계별 가이드입니다.

```
Junior Developer
       ↓
Intermediate Developer (3-6개월)
       ↓
Senior Developer (6-12개월)
       ↓
MSA Architect (12-18개월)
```

## 📋 목차

- [Phase 1: 기초 다지기](#phase-1-기초-다지기-완료) ✅
- [Phase 2: 중급 개발](#phase-2-중급-개발-예정)
- [Phase 3: MSA 아키텍처](#phase-3-msa-아키텍처-예정)
- [Phase 4: 실전 프로젝트](#phase-4-실전-프로젝트-예정)

---

## Phase 1: 기초 다지기 ✅ (완료!)

**학습 기간**: 2024-11-18 ~ 2024-11-22 (5일)  
**총 학습 시간**: 약 15시간  
**완성 코드**: ~4,000줄  
**완료 PR**: 4개

### 🎓 학습 목표
- ✅ Git을 자유자재로 사용
- ✅ TypeScript로 타입 안전한 코드 작성
- ✅ React 핵심 개념 이해 및 활용
- ✅ 실전 CRUD 애플리케이션 개발

---

### Week 1-2: Git & 협업 도구 ✅

#### 학습 내용
- [x] Git 기본 명령어 (add, commit, push, pull)
- [x] 브랜치 생성 및 병합
- [x] Conflict 해결
- [x] GitHub 사용법
- [x] Pull Request 작성

#### 실습 과제
```bash
# 실습 1: Git 워크플로우 연습
cd workflows/git-practice

# Feature 브랜치 생성
git checkout -b feature/git-workflow-practice

# Conflict 실습
# - 두 브랜치에서 같은 파일 수정
# - Merge 시도 및 Conflict 해결

# PR 생성 및 Merge
```

#### 학습 자료
- [Git 공식 문서](https://git-scm.com/doc)
- [Git 워크플로우 가이드](../workflows/git-practice/GIT_WORKFLOW_GUIDE.md)
- [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials)

#### 체크포인트
- [x] Git 기본 명령어 숙달
- [x] 브랜치 전략 이해 (Feature, Bugfix, Hotfix)
- [x] Conflict 해결 경험 (실습 완료)
- [x] Pull Request 작성 및 Merge
- [x] Merge vs Rebase 차이점 이해
- [x] Cherry-pick, Reset, Revert 활용

#### 완료 결과물
- ✅ **PR #10**: Git 워크플로우 가이드 및 실습
- 📄 **문서**: GIT_WORKFLOW_GUIDE.md (~600줄)
- 🎯 **실습**: Conflict 해결, Merge, Rebase

**✅ Week 1-2 완료! (2024-11-22)**

---

### Week 3-4: TypeScript 기초 ✅

#### 학습 내용
- [x] TypeScript 설치 및 설정
- [x] 기본 타입 (string, number, boolean, array)
- [x] 인터페이스 (Interface)
- [x] 타입 별칭 (Type Alias)
- [x] 유니온과 인터섹션 타입
- [x] 제네릭 기초
- [x] **Type Guards** (20개 구현)
- [x] **Utility Types** (11개 활용)
- [x] **유틸리티 함수** (45개 작성)

#### 실습 과제
```typescript
// practices/typescript/utilities/

// Task 1: Type Guards 구현
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

// Task 2: Utility Types 활용
type User = {
  id: number;
  name: string;
  email: string;
  age?: number;
};

type CreateUserRequest = Omit<User, 'id'>;
type UpdateUserRequest = Partial<User>;
type UserSummary = Pick<User, 'id' | 'name'>;

// Task 3: 유틸리티 함수
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
```

#### 체크포인트
- [x] TypeScript 컴파일 오류 없이 코드 작성 가능
- [x] 인터페이스와 타입 차이점 설명 가능
- [x] 제네릭의 필요성 이해
- [x] Utility Types (Partial, Pick, Omit, Record, etc.) 활용
- [x] Type Guard로 타입 안전성 보장
- [x] 실전 유틸리티 함수 구현

#### 완료 결과물
- ✅ **PR #9**: TypeScript 개념 강화
- 📄 **파일**: type-guards.ts (20개 Type Guard)
- 📄 **파일**: utility-types.ts (11개 Utility Type 예제)
- 📄 **파일**: utility-functions.ts (45개 함수)
- 📊 **코드량**: ~1,400줄

**✅ Week 3-4 완료! (2024-11-22)**

---

### Week 5-6: React 기초 ✅

#### 학습 내용
- [x] React 설치 및 프로젝트 생성
- [x] JSX 문법
- [x] 컴포넌트 (함수형)
- [x] Props와 State
- [x] useState Hook
- [x] useEffect Hook
- [x] **Custom Hook** (useLocalStorage 구현)
- [x] 이벤트 핸들링
- [x] 조건부 렌더링
- [x] 리스트 렌더링
- [x] **LocalStorage 연동**
- [x] **필터링 & 검색 구현**

#### 실습 과제
```typescript
// practices/react/components/

// Task 1: Custom Hook 구현
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue] as const;
}

// Task 2: Enhanced TodoList
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

function TodoListEnhanced() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // 필터링
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // CRUD 구현
  const addTodo = (text: string) => { /* ... */ };
  const updateTodo = (id: string, text: string) => { /* ... */ };
  const deleteTodo = (id: string) => { /* ... */ };
  const toggleTodo = (id: string) => { /* ... */ };

  return (/* ... */);
}
```

#### 체크포인트
- [x] 함수형 컴포넌트 작성 가능
- [x] useState Hook 사용 가능
- [x] useEffect Hook 활용 (타이머, 이벤트 리스너)
- [x] Custom Hook 구현 및 재사용
- [x] Props 전달 및 사용 이해
- [x] 이벤트 핸들러 작성 가능
- [x] 조건부 렌더링 구현
- [x] LocalStorage 연동
- [x] 필터링 & 검색 기능

#### 완료 결과물
- ✅ **PR #8**: React 실전 연습 보강
- 📄 **컴포넌트**: Counter.tsx, Timer.tsx, TodoList.tsx, TodoListEnhanced.tsx
- 🔧 **Custom Hook**: useLocalStorage.ts
- 📊 **코드량**: ~500줄

**✅ Week 5-6 완료! (2024-11-22)**

---

### Phase 1 통합 프로젝트 ✅

**프로젝트: 북마크 관리 앱** 🔖

#### 기술 스택
```
Frontend: React 18 + TypeScript
상태 관리: useState + Custom Hook (useLocalStorage)
저장소: LocalStorage
스타일링: CSS-in-JS (inline styles)
```

#### 주요 기능
- ✅ **CRUD 완전 구현**
  - 북마크 추가 (URL, 제목, 설명, 카테고리, 태그)
  - 북마크 조회 (리스트, 통계)
  - 북마크 수정 (모달 폼)
  - 북마크 삭제 (확인 대화상자)

- ✅ **카테고리 시스템**
  - 6개 카테고리 (Development, Design, Productivity, Learning, Entertainment, Other)
  - 카테고리별 필터링
  - 카테고리별 통계

- ✅ **즐겨찾기**
  - 즐겨찾기 토글
  - 즐겨찾기 필터
  - 즐겨찾기 개수 통계

- ✅ **태그 시스템**
  - 다중 태그 지원
  - 태그 표시
  - 태그 검색

- ✅ **검색 & 필터링**
  - 제목, URL, 설명, 태그 통합 검색
  - 카테고리 필터
  - 즐겨찾기 필터
  - 검색 결과 개수 표시

- ✅ **정렬**
  - 최신순 (기본)
  - 오래된순
  - 제목순

- ✅ **영구 저장**
  - LocalStorage 자동 저장
  - useLocalStorage Hook 재사용

- ✅ **통계 대시보드**
  - 전체 북마크 수
  - 즐겨찾기 수
  - 카테고리별 개수

- ✅ **사용자 경험**
  - 모달 폼 (추가/수정)
  - 폼 Validation
  - 빈 상태 UI
  - 검색 결과 없음 메시지
  - 클릭으로 URL 열기 (새 탭)

#### 프로젝트 구조
```
projects/bookmark-manager/
├── src/
│   ├── types/
│   │   └── bookmark.ts              # 타입 정의 8개
│   ├── hooks/
│   │   └── useLocalStorage.ts       # Custom Hook (재사용!)
│   ├── utils/
│   │   └── validators.ts            # 유효성 검사 7개
│   ├── components/
│   │   ├── BookmarkItem.tsx         # 북마크 카드 (~150줄)
│   │   ├── BookmarkForm.tsx         # 추가/수정 폼 (~250줄)
│   │   └── FilterBar.tsx            # 필터/검색 (~150줄)
│   ├── App.tsx                      # 메인 앱 (~250줄)
│   └── index.tsx
└── package.json
```

#### 코드 통계
- **총 코드**: ~800줄
- **컴포넌트**: 4개
- **Custom Hook**: 1개 (재사용)
- **타입 정의**: 8개
- **유틸리티 함수**: 7개
- **상태 관리**: 6개

#### 학습 통합
```
✅ Git 워크플로우
   - Feature 브랜치 전략
   - Conventional Commits
   - PR 프로세스

✅ TypeScript
   - Interface (Bookmark, BookmarkStats, Props)
   - Type Alias (BookmarkCategory, FilterType, SortType)
   - Utility Types (Omit, Partial, Record)
   - Type Guard (isValidUrl, isValidCategory)
   - 제네릭 (useLocalStorage<T>)

✅ React
   - 함수형 컴포넌트 4개
   - useState Hook (6개 상태)
   - Custom Hook 재사용
   - Props & 타입 정의
   - 이벤트 핸들링
   - 조건부 렌더링
   - 리스트 렌더링
   - 폼 처리 & Validation
```

#### 평가 기준
- [x] Git 브랜치 전략 사용 ✅
- [x] TypeScript 타입 정의 ✅
- [x] React 컴포넌트 구조화 ✅
- [x] Custom Hook 재사용 ✅
- [x] CRUD 구현 ✅
- [x] 에러 핸들링 ✅
- [x] 사용자 경험 고려 ✅

#### 완료 결과물
- ✅ **PR #11**: 북마크 관리 앱 - Phase 1 통합 프로젝트
- 🎯 **실행 가능**: npm start로 즉시 실행
- 📱 **실사용 가능**: 개발 학습용 북마크 관리

**✅ 통합 프로젝트 완료! (2024-11-22)**

---

### 📊 Phase 1 최종 성과

#### 완료 항목
```
✅ Git 워크플로우 마스터
   - 브랜치 전략, Conflict 해결, Merge/Rebase
   - ~600줄 가이드 문서

✅ TypeScript 완벽 정복
   - Type Guards 20개
   - Utility Types 11개
   - 유틸리티 함수 45개
   - ~1,400줄 코드

✅ React 핵심 마스터
   - Custom Hook 구현
   - Enhanced TodoList
   - ~500줄 코드

✅ 통합 프로젝트 완성
   - 북마크 관리 앱
   - 완전한 CRUD
   - ~800줄 코드
```

#### 총 통계
- **학습 기간**: 5일 (2024-11-18 ~ 2024-11-22)
- **학습 시간**: 약 15시간
- **총 코드량**: ~4,000줄
- **완료 PR**: 4개 (모두 Merged)
- **완성 프로젝트**: 1개 (실사용 가능)
- **문서**: 5개

#### 핵심 역량
- ✅ Git 워크플로우 능숙하게 사용
- ✅ TypeScript 타입 시스템 완벽 이해
- ✅ React Hooks 자유자재로 활용
- ✅ Custom Hook 구현 및 재사용
- ✅ 실전 CRUD 애플리케이션 개발

---

## Phase 2: 중급 개발 (예정)

**예상 기간**: 2개월

### 🎓 학습 목표
- Next.js로 SSR/SSG 구현
- Spring Boot 심화 (JPA, Security)
- 데이터베이스 설계 및 최적화
- 테스트 주도 개발 (TDD)
- Docker 컨테이너화

### Week 11-13: Next.js App Router

#### 학습 내용
- [ ] Next.js 13+ App Router
- [ ] Server Components vs Client Components
- [ ] Data Fetching (Server-side)
- [ ] Dynamic Routes
- [ ] Metadata API
- [ ] API Routes

#### 실습 과제
```typescript
// practices/nextjs/app-router/app/users/page.tsx

// Server Component (기본)
export default async function UsersPage() {
  // 서버에서 데이터 페칭
  const users = await fetch('https://api.example.com/users', {
    cache: 'no-store' // 항상 최신 데이터
  }).then(res => res.json());

  return (
    <div>
      <h1>Users</h1>
      <UserList users={users} />
    </div>
  );
}

// practices/nextjs/app-router/app/users/[id]/page.tsx

// Dynamic Route
export default async function UserDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const user = await fetch(`https://api.example.com/users/${params.id}`)
    .then(res => res.json());

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Metadata
export async function generateMetadata({ params }: { params: { id: string } }) {
  const user = await fetch(`https://api.example.com/users/${params.id}`)
    .then(res => res.json());
  
  return {
    title: user.name,
    description: `Profile of ${user.name}`
  };
}
```

#### 체크포인트
- [ ] Next.js 프로젝트 생성 및 실행
- [ ] Server Component와 Client Component 구분
- [ ] SSR/SSG 구현
- [ ] Dynamic Routes 생성

---

### Week 14-16: Spring Boot & JPA

#### 학습 내용
- [ ] Spring Boot 프로젝트 생성
- [ ] JPA Entity 설계
- [ ] Repository 패턴
- [ ] Service Layer 구현
- [ ] 연관 관계 매핑 (1:N, N:M)

#### 체크포인트
- [ ] JPA로 CRUD 구현
- [ ] 연관 관계 이해
- [ ] 쿼리 메서드 작성

---

### Week 17-19: Spring Security & JWT

#### 학습 내용
- [ ] Spring Security 설정
- [ ] JWT 토큰 생성 및 검증
- [ ] 인증/인가 구현
- [ ] Role 기반 접근 제어

#### 체크포인트
- [ ] JWT 인증 구현
- [ ] Role 기반 권한 관리
- [ ] Security Filter Chain 이해

---

### Week 20-22: 테스트 주도 개발 (TDD)

#### 학습 내용
- [ ] 단위 테스트 (JUnit 5)
- [ ] Mocking (Mockito)
- [ ] 통합 테스트
- [ ] Test Coverage

#### 체크포인트
- [ ] TDD 사이클 실천
- [ ] Coverage 80% 이상

---

### Week 23-24: Docker & 컨테이너화

#### 학습 내용
- [ ] Docker 개념 및 설치
- [ ] Dockerfile 작성
- [ ] Docker Compose
- [ ] 멀티 스테이지 빌드

#### 체크포인트
- [ ] Docker 이미지 빌드
- [ ] Docker Compose로 환경 구성

---

### Phase 2 총정리 프로젝트

**프로젝트: 블로그 플랫폼**
```
Frontend: Next.js 14 (App Router)
Backend: Spring Boot + JPA + Security
Database: PostgreSQL
Cache: Redis
Container: Docker Compose

기능:
  - 사용자 회원가입/로그인 (JWT)
  - 블로그 포스트 CRUD
  - 댓글 기능
  - 검색 기능
  - 페이지네이션
  - 캐싱 (Redis)
```

**평가 기준:**
- [ ] Next.js SSR/SSG 활용
- [ ] JWT 인증/인가 구현
- [ ] JPA 연관 관계 설계
- [ ] 단위 테스트 커버리지 80% 이상
- [ ] Docker Compose로 전체 환경 구성

---

## Phase 3: MSA 아키텍처 (예정)

**예상 기간**: 3-4개월

### 🎓 학습 목표
- Spring Cloud Netflix 활용
- 마이크로서비스 설계 및 구현
- Event-Driven Architecture
- 분산 시스템 이해

### 학습 내용
- [ ] Service Discovery (Eureka)
- [ ] API Gateway (Spring Cloud Gateway)
- [ ] Config Server
- [ ] Feign Client
- [ ] Apache Kafka
- [ ] Event Sourcing & CQRS
- [ ] Saga 패턴
- [ ] Distributed Tracing (Zipkin)

### Phase 3 총정리 프로젝트

**프로젝트: 이커머스 플랫폼 (MSA)**
```
Microservices:
  - API Gateway
  - Discovery Service (Eureka)
  - Config Service
  - Auth Service
  - User Service
  - Product Service
  - Order Service
  - Payment Service
  - Notification Service

Technology:
  - Spring Cloud Netflix
  - Apache Kafka
  - PostgreSQL (각 서비스별)
  - Redis (캐싱)
  - Docker & Kubernetes
```

---

## Phase 4: 실전 프로젝트 (예정)

**예상 기간**: 진행 중

### 🎓 학습 목표
- 실제 프로덕션 환경 구축
- CI/CD 파이프라인
- Kubernetes 배포
- 성능 최적화

### 학습 내용
- [ ] Kubernetes 기초
- [ ] Helm Charts
- [ ] GitHub Actions CI/CD
- [ ] 성능 테스트 (JMeter, K6)
- [ ] 보안 강화

---

## 📊 학습 진도 체크

### 자가 평가 기준

#### Frontend ✅
- [x] TypeScript 타입 시스템 숙달
- [x] React Hooks 자유자재로 사용
- [x] Custom Hook 구현 및 재사용
- [ ] Next.js SSR/SSG 구현 가능
- [ ] 상태 관리 (Zustand/Recoil) 이해

#### Backend
- [ ] Spring Boot REST API 설계
- [ ] JPA 연관 관계 매핑
- [ ] Spring Security JWT 인증
- [ ] FastAPI 비동기 프로그래밍

#### MSA
- [ ] Service Discovery 구축
- [ ] API Gateway 설정
- [ ] Event-Driven 패턴 구현
- [ ] 분산 트랜잭션 관리

#### DevOps
- [x] Git 워크플로우 마스터
- [ ] Docker 컨테이너화
- [ ] Docker Compose 활용
- [ ] CI/CD 파이프라인 구축
- [ ] Kubernetes 기초

---

## 🎯 다음 단계

Phase 1 완료 후:
1. ✅ 통합 프로젝트 완성 (북마크 관리 앱)
2. ✅ 문서 업데이트
3. 🔜 Phase 2 준비
4. 🔜 Spring Boot 학습 시작

---

## 📚 추천 학습 자료

### 온라인 강의
- Udemy: Spring Boot & React 풀스택 개발
- Inflearn: MSA 실전 프로젝트
- YouTube: Fireship (개발 트렌드)

### 책
- Clean Code (로버트 마틴)
- Effective Java (조슈아 블로크)
- 도메인 주도 설계 (에릭 에반스)
- Building Microservices (샘 뉴먼)

### 블로그 & 문서
- [Spring.io Blog](https://spring.io/blog)
- [React.dev](https://react.dev)
- [Martin Fowler Blog](https://martinfowler.com)

---

## 🏆 Phase 1 달성 완료!

**기간**: 2024-11-18 ~ 2024-11-22 (5일)  
**성과**: Git + TypeScript + React 완벽 마스터  
**결과물**: 실사용 가능한 북마크 관리 앱  

**학습은 여정입니다. 꾸준히 나아가세요! 🚀**
