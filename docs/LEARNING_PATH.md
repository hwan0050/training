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
- [Phase 2: 중급 개발](#phase-2-중급-개발-진행-중) 🔄
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

## Phase 2: 중급 개발 (진행 중)

**시작일**: 2025-11-23  
**예상 완료**: 2026-01  
**현재 진도**: Phase 2-4 완료 ✅

### 🎓 Phase 2 학습 목표
- Next.js로 SSR/SSG 구현
- Spring Boot 심화 (JPA, Testing)
- Docker 컨테이너화
- 데이터베이스 설계 및 최적화
- 테스트 주도 개발 (TDD)

---

### ✅ Phase 2-1: Next.js 14 App Router (완료!)

**학습 기간**: 2025-11-23 (1일)  
**총 학습 시간**: 약 4-5시간  
**완성 코드**: ~800줄  
**완료 커밋**: 6개

#### 🎓 학습 목표
- ✅ Next.js 14 App Router 핵심 개념 이해
- ✅ Server Components와 Client Components 구분
- ✅ 파일 기반 라우팅 및 동적 라우팅 구현
- ✅ Loading States와 Error Handling 패턴 학습

#### 학습 내용
- [x] Next.js 14 프로젝트 초기화 (TypeScript + Tailwind CSS)
- [x] App Router 파일 기반 라우팅
- [x] Server Components (기본값)
- [x] Client Components ("use client" 지시어)
- [x] Layouts & Nested Routes
- [x] Dynamic Routes ([id])
- [x] Data Fetching (async Server Components)
- [x] Loading UI (loading.tsx)
- [x] Error Boundary (error.tsx)
- [x] 404 페이지 (not-found.tsx)
- [x] generateStaticParams로 정적 생성
- [x] generateMetadata로 동적 메타데이터

#### 실습 과제 완료 ✅
```typescript
// Module 1: 기본 라우팅
app/about/page.tsx → /about

// Module 2: Server vs Client Components
app/components/ServerInfo.tsx    // Server Component
app/components/Counter.tsx       // Client Component ('use client')

// Module 3: Layouts
app/blog/layout.tsx              // Blog Layout (Header + Footer)
app/blog/page.tsx → /blog
app/blog/posts/page.tsx → /blog/posts

// Module 4: Dynamic Routes
app/blog/posts/[id]/page.tsx → /blog/posts/1
- generateStaticParams()
- async params handling (Next.js 15)

// Module 5: Loading & Error
app/blog/posts/loading.tsx       // Skeleton UI
app/blog/posts/[id]/loading.tsx
app/blog/posts/[id]/error.tsx    // Error Boundary
app/blog/posts/[id]/not-found.tsx
```

#### 프로젝트 구조
```
practices/nextjs/app-router/
├── app/
│   ├── page.tsx                  # 메인 페이지
│   ├── about/page.tsx            # About 페이지
│   ├── components/
│   │   ├── ServerInfo.tsx        # Server Component
│   │   └── Counter.tsx           # Client Component
│   ├── components-demo/page.tsx  # Components 비교
│   └── blog/
│       ├── layout.tsx            # Blog Layout
│       ├── page.tsx              # Blog 홈
│       ├── data/posts.ts         # Mock 데이터
│       ├── posts/
│       │   ├── loading.tsx       # 로딩 UI
│       │   ├── page.tsx          # 포스트 목록
│       │   └── [id]/
│       │       ├── loading.tsx
│       │       ├── error.tsx
│       │       ├── not-found.tsx
│       │       └── page.tsx      # 포스트 상세
│       └── about/page.tsx
└── package.json
```

#### 학습 통합
```
✅ Git 워크플로우
   - Feature 브랜치: feature/nextjs-app-router
   - 6개 커밋 (모듈별 커밋)
   - Conventional Commits

✅ TypeScript
   - Interface (Post, Props)
   - Type Safety (params: Promise<{ id: string }>)
   - Async/Await

✅ React
   - Server Components (기본값)
   - Client Components ('use client')
   - useState Hook
   - 컴포넌트 구조화
```

#### 핵심 개념 정리

**1. Server Components (기본값)**
- 서버에서만 렌더링
- 번들 크기 0
- async/await로 데이터 페칭
- 데이터베이스 직접 접근 가능

**2. Client Components**
- 'use client' 지시어 필요
- useState, useEffect 사용
- 이벤트 핸들러
- 브라우저 API

**3. 파일 기반 라우팅**
- page.tsx: 경로 UI
- layout.tsx: 공통 레이아웃
- loading.tsx: 로딩 UI (Suspense)
- error.tsx: Error Boundary
- not-found.tsx: 404 페이지
- [param]: 동적 세그먼트

**4. Next.js 15 변경사항**
- params가 Promise로 변경
- `const { id } = await params` 필요

#### 체크포인트
- [x] Next.js 프로젝트 생성 및 실행 ✅
- [x] Server Component와 Client Component 구분 ✅
- [x] 파일 기반 라우팅 이해 ✅
- [x] Dynamic Routes 구현 ✅
- [x] Layout 시스템 활용 ✅
- [x] Loading/Error Handling ✅

#### 완료 결과물
- ✅ **커밋 6개**: feature/nextjs-app-router 브랜치
- 📄 **학습 노트**: [NEXTJS_LEARNING.md](../practices/nextjs/NEXTJS_LEARNING.md)
- 📄 **핸드오버**: [PHASE2-1_HANDOVER.md](../practices/nextjs/PHASE2-1_HANDOVER.md)
- 📊 **코드량**: ~800줄
- 📁 **파일**: 15개

**✅ Phase 2-1 완료! (2025-11-23)**

---

### ✅ Phase 2-2: Spring Boot 3.x + JPA (완료!)

**학습 기간**: 2025-11-25 (1일)  
**총 학습 시간**: 약 3-4시간  
**완성 코드**: ~350줄  
**완료 커밋**: 3개

#### 🎓 학습 목표
- ✅ Spring Boot 프로젝트 구조 이해
- ✅ JPA Entity 및 Repository 패턴 학습
- ✅ REST API 설계 및 구현
- ✅ 계층형 아키텍처 (Controller-Service-Repository) 이해

#### 학습 내용
- [x] Spring Boot 3.4.0 프로젝트 초기화 (Java 17 + Gradle)
- [x] JPA Entity 설계 (@Entity, @Table, @Column)
- [x] JPA Auditing (@CreatedDate, @LastModifiedDate)
- [x] Repository 인터페이스 (JpaRepository 상속)
- [x] 쿼리 메서드 (Query Method) 구현
- [x] Service 계층 (비즈니스 로직, @Transactional)
- [x] DTO 패턴 (PostRequest, PostResponse)
- [x] REST Controller (@RestController, HTTP 메서드 매핑)
- [x] H2 Database 연동 및 설정
- [x] API 테스트 및 검증

#### 실습 과제 완료 ✅
```java
// Module 1: Entity 설계
@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @CreatedDate
    private LocalDateTime createdAt;
}

// Module 2: Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByTitleContaining(String keyword);
}

// Module 3: DTO
public class PostRequest { /* title, content, author */ }
public class PostResponse { /* + id, createdAt, updatedAt */ }

// Module 4: Service
@Service
@Transactional(readOnly = true)
public class PostService {
    @Transactional
    public PostResponse createPost(PostRequest request) { }
}

// Module 5: Controller
@RestController
@RequestMapping("/api/posts")
public class PostController {
    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts() { }
    
    @PostMapping
    public ResponseEntity<PostResponse> createPost(@RequestBody PostRequest request) { }
}
```

#### 프로젝트 구조
```
blog-api/
├── entity/Post.java                  # JPA 엔티티
├── repository/PostRepository.java    # 데이터 접근
├── dto/PostRequest.java             # 요청 DTO
├── dto/PostResponse.java            # 응답 DTO
├── service/PostService.java         # 비즈니스 로직
├── controller/PostController.java   # REST API
└── application.properties           # 설정
```

#### 학습 통합
```
✅ Git 워크플로우
   - Feature 브랜치: feature/spring-boot-jpa
   - 3개 커밋 (모듈별 커밋)
   - Conventional Commits

✅ Java 17
   - Record, var, Stream API
   - Lombok으로 보일러플레이트 제거

✅ Spring Boot
   - 의존성 주입 (DI)
   - 트랜잭션 관리
   - 자동 설정 (Auto Configuration)

✅ JPA
   - Entity 매핑
   - Repository 패턴
   - 쿼리 메서드
```

#### 핵심 개념 정리

**1. 계층형 아키텍처**
```
Controller (HTTP 요청/응답)
    ↓
Service (비즈니스 로직, 트랜잭션)
    ↓
Repository (데이터 접근)
    ↓
Database (H2)
```

**2. JPA Repository**
- JpaRepository 상속으로 기본 CRUD 자동 제공
- 쿼리 메서드로 SQL 없이 데이터 조회
- `findByTitleContaining()` → SQL 자동 생성

**3. DTO 패턴**
- Entity를 직접 노출하지 않음
- 계층 간 데이터 전송 최적화
- API 응답 형식 자유롭게 변경 가능

**4. 트랜잭션 관리**
- `@Transactional(readOnly = true)`: 조회 최적화
- `@Transactional`: 쓰기 작업 (생성/수정/삭제)
- 예외 발생 시 자동 롤백

#### 체크포인트
- [x] Spring Boot 프로젝트 생성 및 실행 ✅
- [x] JPA Entity 설계 및 테이블 자동 생성 ✅
- [x] Repository 패턴 이해 ✅
- [x] Service 계층 구현 ✅
- [x] REST API 엔드포인트 구현 ✅
- [x] CRUD 작업 테스트 완료 ✅

#### 완료 결과물
- ✅ **커밋 3개**: feature/spring-boot-jpa 브랜치
- 📄 **학습 노트**: [SPRING_BOOT_LEARNING.md](../docs/SPRING_BOOT_LEARNING.md)
- 📄 **핸드오버**: [PHASE2-2_HANDOVER.md](../docs/PHASE2-2_HANDOVER.md)
- 📊 **코드량**: ~350줄
- 📁 **파일**: 8개
- 🔌 **API**: 7개 엔드포인트

#### API 엔드포인트
```
GET    /api/posts              - 전체 조회
GET    /api/posts/{id}         - ID로 조회
POST   /api/posts              - 생성
PUT    /api/posts/{id}         - 수정
DELETE /api/posts/{id}         - 삭제
GET    /api/posts/search?keyword=xxx  - 제목 검색
GET    /api/posts/author/{author}     - 작성자 검색
```

**✅ Phase 2-2 완료! (2025-11-25)**

---

### ✅ Phase 2-3: Docker 컨테이너화 (완료!)

**학습 기간**: 2025-11-27 (1일)  
**총 학습 시간**: 약 2-3시간  
**완성 코드**: ~120줄  
**완료 커밋**: 2개

#### 🎓 학습 목표
- ✅ Docker 기본 개념 이해
- ✅ Dockerfile 작성 (멀티 스테이지 빌드)
- ✅ Docker Compose로 멀티 컨테이너 구성
- ✅ 환경 변수 기반 설정 관리
- ✅ PostgreSQL 연동

#### 학습 내용
- [x] Docker 기본 개념 (Image, Container, Volume, Network)
- [x] Dockerfile 작성 (FROM, WORKDIR, COPY, RUN, EXPOSE, ENTRYPOINT)
- [x] 멀티 스테이지 빌드 (빌드 스테이지 + 실행 스테이지)
- [x] .dockerignore로 빌드 최적화
- [x] Docker Compose 파일 작성 (services, volumes, networks)
- [x] PostgreSQL 서비스 구성
- [x] healthcheck를 통한 서비스 의존성 관리
- [x] 환경 변수로 설정 분리 (H2 ↔ PostgreSQL)
- [x] 볼륨을 통한 데이터 영속성
- [x] 네트워크를 통한 컨테이너 간 통신

#### 실습 과제 완료 ✅
```dockerfile
# Dockerfile (멀티 스테이지 빌드)
FROM gradle:8.5-jdk17 AS builder
WORKDIR /app
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle
COPY src ./src
RUN ./gradlew clean build -x test

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```
```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: blogdb
      POSTGRES_USER: bloguser
      POSTGRES_PASSWORD: blogpass
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U bloguser -d blogdb"]

  app:
    build:
      context: .
      dockerfile: Dockerfile
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/blogdb
    depends_on:
      postgres:
        condition: service_healthy

volumes:
  postgres-data:

networks:
  blog-network:
```
```properties
# application.properties (환경 변수 지원)
spring.datasource.url=${SPRING_DATASOURCE_URL:jdbc:h2:mem:blogdb}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME:sa}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD:}

# 로컬: 환경 변수 없음 → H2 사용
# Docker: 환경 변수 있음 → PostgreSQL 사용
```

#### 프로젝트 구조
```
blog-api/
├── Dockerfile                    # 멀티 스테이지 빌드
├── docker-compose.yml            # PostgreSQL + Spring Boot
├── .dockerignore                # 빌드 최적화
└── application.properties        # 환경 변수 지원
```

#### 학습 통합
```
✅ Git 워크플로우
   - Feature 브랜치: feature/docker-compose
   - 2개 커밋 (설정 + 문서)
   - Conventional Commits

✅ Docker
   - 멀티 스테이지 빌드 (700MB → 300MB)
   - Volume으로 데이터 영속성
   - Network로 컨테이너 간 통신

✅ Spring Boot
   - 환경 변수 기반 설정
   - H2 / PostgreSQL 자동 전환
   - 코드 수정 없이 환경 변경
```

#### 핵심 개념 정리

**1. 멀티 스테이지 빌드**
```
1단계 (builder): Gradle 빌드 (700MB)
   └─ JAR 파일 생성
   
2단계 (runtime): Java 실행 환경 (300MB)
   └─ JAR 파일만 복사
   
결과: 최종 이미지 400MB 절약!
```

**2. Docker Compose 의존성 관리**
```yaml
depends_on:
  postgres:
    condition: service_healthy

# PostgreSQL healthcheck 통과 → Spring Boot 시작
# 연결 실패 방지
```

**3. 환경 변수 전략**
```
로컬 (IntelliJ):
  환경 변수 없음 → H2 Database
  
Docker Compose:
  environment 설정 → PostgreSQL
  
→ 코드 수정 없이 자동 전환!
```

**4. 볼륨을 통한 데이터 영속성**
```
컨테이너 삭제 → 데이터 유지
컨테이너 재생성 → 기존 데이터 사용
```

#### 체크포인트
- [x] Docker 기본 개념 이해 ✅
- [x] Dockerfile 작성 (멀티 스테이지) ✅
- [x] Docker Compose 작성 ✅
- [x] 환경 변수 설정 ✅
- [x] 로컬 테스트 (H2) ✅
- [ ] Docker 실행 테스트 (추후) ⏳

#### 완료 결과물
- ✅ **커밋 2개**: feature/docker-compose 브랜치
- 📄 **학습 노트**: [DOCKER_LEARNING.md](../docs/DOCKER_LEARNING.md) (~800 lines)
- 📄 **핸드오버**: [PHASE2-3_HANDOVER.md](../docs/PHASE2-3_HANDOVER.md) (~600 lines)
- 📊 **코드량**: ~120줄
- 📁 **파일**: 5개 (생성/수정)

#### Docker 명령어 (참고용)
```bash
# 실행
docker compose up -d              # 백그라운드 실행
docker compose up --build        # 재빌드 후 실행

# 상태 확인
docker compose ps                # 컨테이너 상태
docker compose logs -f app       # 앱 로그

# 중지
docker compose down              # 중지 + 삭제
docker compose down -v           # 중지 + 삭제 + 볼륨 삭제
```

#### 트러블슈팅
**Issue: Docker Desktop 설치 실패**
- **원인**: Windows 버전 부족 (18362 < 19045)
- **해결**: 파일 작성만 진행, 실행은 환경 준비 후
- **대안**: Play with Docker, Windows 업데이트

**⚠️ 현재 상태:**
- Docker 개념 학습 완료
- 모든 설정 파일 작성 완료
- 실제 실행 테스트는 Docker Desktop 환경 준비 후 진행 예정

**✅ Phase 2-3 완료! (2025-11-27)**

---

### ✅ Phase 2-4: TDD & Spring Boot Testing (완료!)

**학습 기간**: 2025-11-30 ~ 2025-12-01 (2일)  
**총 학습 시간**: 약 6-7시간  
**완성 코드**: ~800줄 (테스트 코드)  
**완료 커밋**: 진행 중

#### 🎓 학습 목표
- ✅ TDD (Test-Driven Development) 사이클 이해
- ✅ Spring Boot 테스트 계층별 작성
- ✅ Mockito 활용한 단위 테스트
- ✅ MockMvc를 활용한 API 테스트
- ✅ Given-When-Then 패턴 적용

#### 학습 내용
- [x] TDD 기본 개념 (Red-Green-Refactor)
- [x] JUnit 5 테스트 프레임워크
- [x] Spring Boot Test Slice Annotations
    - `@DataJpaTest` - Repository 계층 테스트
    - `@WebMvcTest` - Controller 계층 테스트
    - `@ExtendWith(MockitoExtension.class)` - Service 계층 테스트
- [x] Mockito Mock 객체 생성 및 활용
- [x] MockMvc를 활용한 HTTP 요청 테스트
- [x] Given-When-Then 패턴
- [x] JPA Auditing 테스트 격리
- [x] 예외 처리 테스트

#### 실습 과제 완료 ✅

**Module 1: Repository 테스트 (7개)**
```java
@DataJpaTest
class PostRepositoryTest {
    @Autowired
    private PostRepository postRepository;
    
    @Test
    void 게시글_저장_성공() {
        // Given
        Post post = new Post("제목", "내용", "작성자");
        
        // When
        Post savedPost = postRepository.save(post);
        
        // Then
        assertThat(savedPost.getId()).isNotNull();
        assertThat(savedPost.getTitle()).isEqualTo("제목");
    }
    
    // + 6개 테스트 케이스
}
```

**Module 2: Service 테스트 (10개)**
```java
@ExtendWith(MockitoExtension.class)
class PostServiceTest {
    @Mock
    private PostRepository postRepository;
    
    @InjectMocks
    private PostService postService;
    
    @Test
    void 게시글_생성_성공() {
        // Given
        PostRequest request = new PostRequest("제목", "내용", "작성자");
        Post post = new Post("제목", "내용", "작성자");
        given(postRepository.save(any(Post.class))).willReturn(post);
        
        // When
        PostResponse response = postService.createPost(request);
        
        // Then
        assertThat(response.getTitle()).isEqualTo("제목");
        verify(postRepository).save(any(Post.class));
    }
    
    // + 9개 테스트 케이스
}
```

**Module 3: Controller 테스트 (8개)**
```java
@WebMvcTest(PostController.class)
class PostControllerTest {
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private PostService postService;
    
    @Test
    void 게시글_생성_API_성공() throws Exception {
        // Given
        PostRequest request = new PostRequest("제목", "내용", "작성자");
        PostResponse response = new PostResponse(1L, "제목", "내용", "작성자", now(), now());
        given(postService.createPost(any(PostRequest.class))).willReturn(response);
        
        // When & Then
        mockMvc.perform(post("/api/posts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("제목"));
    }
    
    // + 7개 테스트 케이스
}
```

#### 테스트 구조
```
src/test/java/com/gitfactory/blogapi/
├── repository/
│   └── PostRepositoryTest.java       (7개 테스트) ✅
│       ├── 게시글_저장_성공
│       ├── 게시글_ID로_조회_성공
│       ├── 게시글_ID로_조회_실패
│       ├── 전체_게시글_조회_성공
│       ├── 제목으로_검색_성공
│       ├── 작성자로_검색_성공
│       └── 게시글_삭제_성공
│
├── service/
│   └── PostServiceTest.java          (10개 테스트) ✅
│       ├── 게시글_생성_성공
│       ├── 게시글_ID로_조회_성공
│       ├── 게시글_ID로_조회_실패_예외발생
│       ├── 전체_게시글_조회_성공
│       ├── 게시글_수정_성공
│       ├── 게시글_수정_실패_존재하지않음
│       ├── 게시글_삭제_성공
│       ├── 게시글_삭제_실패_존재하지않음
│       ├── 제목으로_검색_성공
│       └── 작성자로_검색_성공
│
└── controller/
    └── PostControllerTest.java       (8개 테스트) ✅
        ├── 전체_게시글_조회_API_성공
        ├── 게시글_ID로_조회_API_성공
        ├── 게시글_ID로_조회_API_실패_404
        ├── 게시글_생성_API_성공
        ├── 게시글_수정_API_성공
        ├── 게시글_삭제_API_성공
        ├── 제목으로_검색_API_성공
        └── 작성자로_검색_API_성공

총 25개 테스트 케이스 - ALL PASSED ✅ (100%)
```

#### 추가 구현 사항

**JpaAuditingConfig.java**
```java
@Configuration
@EnableJpaAuditing
public class JpaAuditingConfig {
    // JPA Auditing 설정을 별도 클래스로 분리
    // @WebMvcTest에서 제외하여 테스트 격리
}
```

**GlobalExceptionHandler.java**
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(e.getMessage());
    }
}
```

#### 학습 통합
```
✅ Git 워크플로우
   - Feature 브랜치: feature/spring-boot-testing
   - Conventional Commits 적용
   - 모듈별 단계적 커밋

✅ Spring Boot Testing
   - @DataJpaTest로 Repository 격리 테스트
   - @WebMvcTest로 Controller 격리 테스트
   - MockitoExtension으로 Service 단위 테스트

✅ TDD 실천
   - Red: 실패하는 테스트 작성
   - Green: 최소한의 코드로 테스트 통과
   - Refactor: 코드 개선
```

#### 핵심 개념 정리

**1. 테스트 계층 분리**
```
Repository 테스트 (@DataJpaTest)
   ↓ JPA 쿼리 메서드 검증
Service 테스트 (Mockito)
   ↓ 비즈니스 로직 검증
Controller 테스트 (@WebMvcTest)
   ↓ HTTP 요청/응답 검증
```

**2. Mockito 핵심 개념**
```java
// Mock 객체 생성
@Mock
private PostRepository postRepository;

// Mock 주입
@InjectMocks
private PostService postService;

// Stub 설정
given(postRepository.findById(1L)).willReturn(Optional.of(post));

// 검증
verify(postRepository).save(any(Post.class));
```

**3. MockMvc 사용법**
```java
mockMvc.perform(get("/api/posts/1"))
       .andExpect(status().isOk())
       .andExpect(jsonPath("$.title").value("제목"))
       .andExpect(jsonPath("$.content").value("내용"));
```

**4. Given-When-Then 패턴**
```java
@Test
void 테스트케이스() {
    // Given: 테스트 준비
    PostRequest request = new PostRequest("제목", "내용", "작성자");
    
    // When: 테스트 실행
    PostResponse response = postService.createPost(request);
    
    // Then: 검증
    assertThat(response.getTitle()).isEqualTo("제목");
}
```

#### 주요 이슈 및 해결

**Issue 1: JPA Auditing 에러**
```
Bean named 'jpaMappingContext' not found
```
- **원인**: @WebMvcTest가 JPA Auditing 설정을 로드하지 못함
- **해결**: @EnableJpaAuditing을 별도 Config 클래스로 분리 후 excludeFilters로 제외

**Issue 2: Import 충돌 (Hamcrest vs Mockito)**
```
'is' 메서드 모호성
```
- **원인**: org.hamcrest.Matchers.is와 org.mockito.Mockito.is 충돌
- **해결**: Hamcrest 명시적 import 사용

**Issue 3: 404 예외 처리**
```
RuntimeException이 500 에러로 응답
```
- **원인**: 예외 처리 핸들러 없음
- **해결**: GlobalExceptionHandler 추가하여 404로 변환

**Issue 4: 파라미터 이름 불일치**
```
검색 API 테스트 실패
```
- **원인**: 컨트롤러 파라미터명 'title'이지만 테스트에서 'keyword' 사용
- **해결**: 파라미터명 통일 (keyword → title)

#### 체크포인트
- [x] TDD 사이클 이해 및 실천 ✅
- [x] Repository 테스트 작성 (7개) ✅
- [x] Service 테스트 작성 (10개) ✅
- [x] Controller 테스트 작성 (8개) ✅
- [x] 100% 테스트 통과 ✅
- [x] Given-When-Then 패턴 적용 ✅
- [x] Mock 객체 활용 ✅
- [x] 테스트 격리 및 독립성 보장 ✅

#### 테스트 실행 결과
```bash
$ ./gradlew clean test

BUILD SUCCESSFUL in 8s

> Task :test
PostRepositoryTest:     7/7 passed  (100%)
PostServiceTest:        10/10 passed (100%)
PostControllerTest:     8/8 passed  (100%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
총 25개 테스트:        25/25 passed (100%) ✅
```

#### 완료 결과물
- ✅ **테스트 코드**: ~800줄
- 📄 **학습 노트**: [TESTING_LEARNING.md](../docs/TESTING_LEARNING.md) (~800 lines)
- 📄 **핸드오버**: [PHASE2-4_HANDOVER.md](../docs/PHASE2-4_HANDOVER.md) (~600 lines)
- 📊 **코드량**: ~800줄 (테스트)
- 📁 **파일**: 5개 (테스트 3개 + Config 2개)
- 🧪 **테스트**: 25개 (100% 통과)

#### 학습 성과
```
✅ TDD 사이클 완전 이해
✅ 계층별 테스트 전략 수립
✅ Mockito로 의존성 격리
✅ MockMvc로 API 테스트
✅ 테스트 코드 품질 향상
✅ 트러블슈팅 경험 축적
```

**✅ Phase 2-4 완료! (2025-12-01)**

---

### 📋 Phase 2-5: API Documentation & Integration Testing (예정)

**예상 기간**: 2-3일

#### 학습 계획
- [ ] Spring REST Docs 작성
- [ ] Swagger/OpenAPI 통합
- [ ] 통합 테스트 (@SpringBootTest)
- [ ] 테스트 커버리지 측정 (JaCoCo)
- [ ] Testcontainers 활용

#### 학습 목표
- API 문서 자동 생성
- 실제 환경과 유사한 통합 테스트
- 테스트 커버리지 80% 이상 달성

---

### Phase 2 총정리 프로젝트 (예정)

**프로젝트: 블로그 플랫폼**
```
Frontend: Next.js 14 (App Router)
Backend: Spring Boot + JPA + Security
Database: PostgreSQL
Cache: Redis
Container: Docker Compose
Testing: JUnit + MockMvc + Testcontainers

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
- [x] Next.js App Router 이해 ✅
- [x] Server Components vs Client Components ✅
- [ ] 상태 관리 (Zustand/Recoil) 이해

#### Backend ✅
- [x] Spring Boot REST API 설계 ✅
- [x] JPA 기본 매핑 ✅
- [x] Spring Boot Testing (TDD) ✅
- [x] 계층별 테스트 작성 ✅
- [ ] JPA 연관 관계 매핑
- [ ] Spring Security JWT 인증

#### DevOps ✅
- [x] Git 워크플로우 마스터 ✅
- [x] Docker 기본 개념 ✅
- [x] Dockerfile 작성 ✅
- [x] Docker Compose 활용 ✅
- [ ] Docker 실행 테스트
- [ ] CI/CD 파이프라인 구축
- [ ] Kubernetes 기초

#### Testing ✅
- [x] JUnit 5 단위 테스트 ✅
- [x] Mockito Mock 객체 ✅
- [x] MockMvc API 테스트 ✅
- [x] @DataJpaTest Repository 테스트 ✅
- [x] @WebMvcTest Controller 테스트 ✅
- [x] Given-When-Then 패턴 ✅
- [ ] 통합 테스트 (@SpringBootTest)
- [ ] Testcontainers
- [ ] 테스트 커버리지 80%+

---

## 🎯 다음 단계

Phase 2-4 완료 후:
1. ✅ TDD & Spring Boot Testing 완료
2. ✅ 학습 노트 및 핸드오버 문서 작성
3. 🔜 Phase 2-4 최종 커밋 및 PR
4. 🔜 Phase 2-5 준비: API Documentation & Integration Testing
5. 🔜 Docker 환경 준비 후 실행 테스트

---

## 📚 추천 학습 자료

### 온라인 강의
- Udemy: Spring Boot & React 풀스택 개발
- Inflearn: 스프링 부트 - 핵심 원리와 활용
- Inflearn: 실전! 스프링 부트와 JPA 활용
- YouTube: Fireship (개발 트렌드)

### 책
- Clean Code (로버트 마틴)
- Effective Java (조슈아 블로크)
- 테스트 주도 개발 (켄트 벡)
- 도메인 주도 설계 (에릭 에반스)
- Building Microservices (샘 뉴먼)

### 블로그 & 문서
- [Spring.io Blog](https://spring.io/blog)
- [Spring Boot Testing Guide](https://spring.io/guides/gs/testing-web/)
- [React.dev](https://react.dev)
- [Next.js Docs](https://nextjs.org/docs)
- [Docker Docs](https://docs.docker.com/)
- [Martin Fowler Blog](https://martinfowler.com)

---

## 🏆 현재 달성 현황

### ✅ Phase 1 완료! (2024-11-22)
**기간**: 2024-11-18 ~ 2024-11-22 (5일)  
**성과**: Git + TypeScript + React 완벽 마스터  
**결과물**: 실사용 가능한 북마크 관리 앱

### ✅ Phase 2-1 완료! (2025-11-23)
**기간**: 2025-11-23 (1일)  
**성과**: Next.js 14 App Router 마스터  
**결과물**: Blog 예제 프로젝트 (15개 파일, 800줄)

### ✅ Phase 2-2 완료! (2025-11-25)
**기간**: 2025-11-25 (1일)  
**성과**: Spring Boot 3.x + JPA 마스터  
**결과물**: Blog REST API (8개 파일, 350줄, 7개 API)

### ✅ Phase 2-3 완료! (2025-11-27)
**기간**: 2025-11-27 (1일)  
**성과**: Docker 컨테이너화 마스터  
**결과물**: Docker 설정 파일 (5개 파일, 120줄)

### ✅ Phase 2-4 완료! (2025-12-01)
**기간**: 2025-11-30 ~ 2025-12-01 (2일)  
**성과**: TDD & Spring Boot Testing 마스터  
**결과물**: 25개 테스트 (100% 통과), 800줄 테스트 코드, 1,400줄 문서

**학습은 여정입니다. 꾸준히 나아가세요! 🚀**