# Next.js 14 App Router 학습 노트

## 📅 학습 기간
2025-11-23 ~ 2025-11-23

## 🎯 학습 목표
- Next.js 14 App Router 핵심 개념 이해
- Server Components와 Client Components 구분
- 파일 기반 라우팅 및 동적 라우팅 구현
- Loading States와 Error Handling 패턴 학습

---

## 📚 Module 1: App Router 기본 구조

### 학습 내용
- **파일 기반 라우팅**: 폴더 구조가 자동으로 URL 경로로 매핑
- **page.tsx**: 각 경로의 UI를 정의하는 특수 파일
- **Next.js Link**: 클라이언트 사이드 네비게이션

### 실습 프로젝트
- `/about` 페이지 생성
- 메인 페이지와 About 페이지 간 네비게이션 구현

### 핵심 코드
```typescript
// app/about/page.tsx
export default function AboutPage() {
  return <div>About Page Content</div>;
}
```

### 학습 포인트
- ✅ `app/about/page.tsx` → `/about` 경로로 자동 매핑
- ✅ `<Link href="/about">` 로 클라이언트 사이드 네비게이션
- ✅ Server Component가 기본값

---

## 📚 Module 2: Server Components vs Client Components

### 학습 내용
- **Server Components**: 서버에서만 렌더링, 번들 크기 0
- **Client Components**: 브라우저에서 실행, `"use client"` 지시어 필요
- useState, useEffect 등은 Client Component에서만 사용 가능

### 실습 프로젝트
- ServerInfo 컴포넌트 (Server Component)
- Counter 컴포넌트 with useState (Client Component)
- `/components-demo` 페이지로 비교 데모

### 핵심 코드
```typescript
// Client Component
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 학습 포인트
- ✅ Server Component: 데이터 페칭, 백엔드 접근에 최적
- ✅ Client Component: 인터랙션, State, Lifecycle 필요 시
- ✅ `"use client"` 지시어로 명시적 선언
- ✅ 기본값은 Server Component

---

## 📚 Module 3: Layouts & Nested Routes

### 학습 내용
- **Layout**: 여러 페이지에서 공통 UI 재사용
- **children prop**: 각 페이지 콘텐츠가 주입되는 위치
- **중첩 레이아웃**: Root Layout + 각 섹션별 Layout

### 실습 프로젝트
- Blog 섹션 생성 (`/blog`)
- Blog Layout (Header + Footer)
- 중첩 라우팅 (`/blog`, `/blog/posts`, `/blog/about`)

### 핵심 코드
```typescript
// app/blog/layout.tsx
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>Blog Header</header>
      <main>{children}</main>
      <footer>Blog Footer</footer>
    </div>
  );
}
```

### 학습 포인트
- ✅ Layout은 페이지 전환 시에도 유지됨 (리렌더링 X)
- ✅ children prop으로 페이지 콘텐츠 주입
- ✅ 중첩 레이아웃으로 섹션별 공통 UI 구성
- ✅ 상태와 이벤트 리스너 유지

---

## 📚 Module 4: Dynamic Routes & Data Fetching

### 학습 내용
- **Dynamic Routes**: `[id]` 폴더로 동적 세그먼트 생성
- **params**: URL 파라미터 접근 (Next.js 15에서는 Promise)
- **generateStaticParams**: 빌드 시 정적 페이지 미리 생성
- **Server Component 데이터 페칭**: async/await로 직접 데이터 접근

### 실습 프로젝트
- Blog 포스트 데이터 (Mock Data)
- 포스트 목록 페이지 (`/blog/posts`)
- 개별 포스트 페이지 (`/blog/posts/[id]`)
- generateStaticParams로 정적 생성

### 핵심 코드
```typescript
// app/blog/posts/[id]/page.tsx
export async function generateStaticParams() {
  const ids = getAllPostIds();
  return ids.map((id) => ({ id }));
}

export default async function PostDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const post = await getPostByIdAsync(id);
  
  return <article>{post.title}</article>;
}
```

### 학습 포인트
- ✅ `[id]` 폴더로 동적 라우팅 구현
- ✅ Next.js 15+에서 params는 Promise
- ✅ `await params`로 파라미터 접근
- ✅ generateStaticParams로 SSG (정적 생성)
- ✅ Server Component에서 async 함수로 데이터 페칭

---

## 📚 Module 5: Loading States & Error Handling

### 학습 내용
- **loading.tsx**: Suspense 기반 자동 로딩 UI
- **error.tsx**: Error Boundary 자동 생성
- **not-found.tsx**: 404 페이지 커스터마이징
- **Streaming**: 준비된 부분부터 점진적 렌더링

### 실습 프로젝트
- 비동기 데이터 페칭 시뮬레이션 (지연 추가)
- 로딩 스켈레톤 UI 구현
- 에러 바운더리 with retry 기능
- 404 페이지 커스터마이징

### 핵심 코드
```typescript
// app/blog/posts/loading.tsx
export default function PostsLoading() {
  return <div className="animate-pulse">Loading...</div>;
}

// app/blog/posts/[id]/error.tsx
'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Error: {error.message}</h2>
      <button onClick={reset}>Retry</button>
    </div>
  );
}
```

### 학습 포인트
- ✅ loading.tsx는 자동으로 Suspense boundary 생성
- ✅ error.tsx는 반드시 Client Component
- ✅ reset() 함수로 에러 복구 시도
- ✅ Streaming으로 사용자 경험 향상

---

## 🎯 전체 학습 성과

### 완성된 기능
1. ✅ About 페이지 with 파일 기반 라우팅
2. ✅ Server/Client Components 비교 데모
3. ✅ Blog 섹션 with 중첩 레이아웃
4. ✅ 동적 블로그 포스트 상세 페이지
5. ✅ 로딩 UI & 에러 핸들링

### 프로젝트 구조
```
app/
├── page.tsx                      # 메인 페이지
├── about/
│   └── page.tsx                  # About 페이지
├── components/
│   ├── ServerInfo.tsx            # Server Component
│   └── Counter.tsx               # Client Component
├── components-demo/
│   └── page.tsx                  # Components 데모
└── blog/
    ├── layout.tsx                # Blog Layout
    ├── page.tsx                  # Blog 홈
    ├── data/
    │   └── posts.ts              # Mock 데이터
    ├── posts/
    │   ├── loading.tsx           # 로딩 UI
    │   ├── page.tsx              # 포스트 목록
    │   └── [id]/
    │       ├── loading.tsx       # 로딩 UI
    │       ├── error.tsx         # 에러 바운더리
    │       ├── not-found.tsx     # 404 페이지
    │       └── page.tsx          # 포스트 상세
    └── about/
        └── page.tsx              # Blog About
```

### 코드 통계
- **총 파일 수**: ~15개
- **총 코드 라인**: ~800 lines
- **학습 모듈**: 5개
- **커밋 수**: 6개

---

## 💡 핵심 개념 정리

### 1. Server Components (기본값)
- 서버에서만 렌더링
- 클라이언트 번들에 포함되지 않음
- 데이터베이스, 파일 시스템 직접 접근 가능
- async/await로 데이터 페칭

### 2. Client Components
- `"use client"` 지시어 필요
- useState, useEffect 등 React Hooks 사용
- 이벤트 핸들러, 브라우저 API 사용
- 인터랙티브한 UI 구현

### 3. 파일 기반 라우팅
- `page.tsx`: 경로의 UI
- `layout.tsx`: 공통 레이아웃
- `loading.tsx`: 로딩 UI
- `error.tsx`: 에러 바운더리
- `not-found.tsx`: 404 페이지
- `[param]`: 동적 세그먼트

### 4. 데이터 페칭 패턴
```typescript
// Server Component에서 직접 fetch
export default async function Page() {
  const data = await fetch('...');
  return <div>{data}</div>;
}
```

---

## 🚀 다음 학습 계획

### Phase 2-2: Spring Boot + JPA (예정)
- Spring Boot 3.x 프로젝트 초기화
- REST API 설계
- JPA/Hibernate 데이터베이스 연동
- CRUD 작업 구현

### Phase 2-3: Docker 컨테이너화 (예정)
- Dockerfile 작성
- Docker Compose 구성
- 개발 환경 컨테이너화

### Phase 2-4: TDD & 테스트 (예정)
- Jest 설정
- React Testing Library
- 단위 테스트 작성
- E2E 테스트 (Playwright)

---

## 📖 참고 자료
- [Next.js 14 공식 문서](https://nextjs.org/docs)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
- [App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)