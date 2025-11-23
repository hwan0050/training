# Phase 2-1: Next.js App Router 완료 핸드오버

## 📋 프로젝트 개요

**프로젝트명**: Next.js 14 App Router 학습  
**완료일**: 2025-11-23  
**브랜치**: `feature/nextjs-app-router`  
**커밋 수**: 6개  

---

## ✅ 완료된 작업

### Module 1: App Router 기본 구조
- [x] Next.js 14 프로젝트 초기화 (TypeScript, Tailwind CSS)
- [x] About 페이지 생성 및 라우팅 구현
- [x] Next.js Link 컴포넌트 활용
- [x] 파일 기반 라우팅 이해

**커밋**: `feat: Add About page with Next.js App Router`

### Module 2: Server vs Client Components
- [x] ServerInfo 컴포넌트 (Server Component)
- [x] Counter 컴포넌트 (Client Component with useState)
- [x] Components Demo 페이지 구현
- [x] "use client" 지시어 사용법 학습

**커밋**: `feat: Implement Server vs Client Components demo`

### Module 3: Layouts & Nested Routes
- [x] Blog Layout 생성 (Header + Footer)
- [x] 중첩 라우팅 구조 (`/blog`, `/blog/posts`, `/blog/about`)
- [x] children prop을 통한 레이아웃 시스템
- [x] Layout 상태 유지 확인

**커밋**: `feat: Implement Layouts and Nested Routes with Blog example`

### Module 4: Dynamic Routes & Data Fetching
- [x] Mock 블로그 포스트 데이터 생성
- [x] `[id]` 동적 라우팅 구현
- [x] generateStaticParams로 정적 생성
- [x] async Server Component 데이터 페칭
- [x] Next.js 15 params Promise 처리

**커밋**: `feat: Implement Dynamic Routes and Data Fetching`

### Module 5: Loading States & Error Handling
- [x] loading.tsx로 스켈레톤 UI 구현
- [x] error.tsx로 Error Boundary 구현
- [x] not-found.tsx로 404 페이지 커스터마이징
- [x] 비동기 데이터 페칭 시뮬레이션

**커밋**: `feat: Implement Loading States and Error Handling`

---

## 📂 프로젝트 구조
```
practices/nextjs/app-router/
├── app/
│   ├── layout.tsx                # Root Layout
│   ├── page.tsx                  # 메인 페이지
│   ├── globals.css               # 전역 스타일
│   │
│   ├── about/
│   │   └── page.tsx              # About 페이지
│   │
│   ├── components/
│   │   ├── ServerInfo.tsx        # Server Component 데모
│   │   └── Counter.tsx           # Client Component 데모
│   │
│   ├── components-demo/
│   │   └── page.tsx              # Components 비교 페이지
│   │
│   └── blog/
│       ├── layout.tsx            # Blog 공통 레이아웃
│       ├── page.tsx              # Blog 메인 페이지
│       │
│       ├── data/
│       │   └── posts.ts          # Mock 포스트 데이터
│       │
│       ├── posts/
│       │   ├── loading.tsx       # Posts 로딩 UI
│       │   ├── page.tsx          # 포스트 목록
│       │   │
│       │   └── [id]/
│       │       ├── loading.tsx   # Post 상세 로딩 UI
│       │       ├── error.tsx     # Error Boundary
│       │       ├── not-found.tsx # 404 페이지
│       │       └── page.tsx      # 포스트 상세 페이지
│       │
│       └── about/
│           └── page.tsx          # Blog About 페이지
│
├── public/                        # 정적 파일
├── package.json                   # 의존성 관리
├── tsconfig.json                  # TypeScript 설정
├── tailwind.config.ts             # Tailwind 설정
└── next.config.ts                 # Next.js 설정
```

---

## 🔑 핵심 학습 내용

### 1. App Router 핵심 개념

#### 파일 시스템 라우팅
```
app/blog/posts/[id]/page.tsx → /blog/posts/123
```

#### 특수 파일들
- `page.tsx`: 경로의 UI
- `layout.tsx`: 공통 레이아웃
- `loading.tsx`: 로딩 UI (Suspense)
- `error.tsx`: 에러 바운더리
- `not-found.tsx`: 404 페이지

### 2. Server Components vs Client Components

| 구분 | Server Component | Client Component |
|------|------------------|------------------|
| 기본값 | ✅ | "use client" 필요 |
| 렌더링 위치 | 서버 | 클라이언트 |
| useState/useEffect | ❌ | ✅ |
| 이벤트 핸들러 | ❌ | ✅ |
| async/await | ✅ | ❌ (함수 컴포넌트) |
| 번들 크기 | 0 (클라이언트 전송 X) | 포함됨 |
| 데이터 페칭 | 직접 fetch | React Query 등 |

### 3. 데이터 페칭 패턴
```typescript
// Server Component - async 함수
export default async function Page() {
  const data = await getData();
  return <div>{data}</div>;
}

// Client Component - useEffect
'use client';
export default function Page() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  return <div>{data}</div>;
}
```

### 4. Next.js 15 변경사항
```typescript
// params가 Promise로 변경됨
export default async function Page({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params; // await 필요!
  // ...
}
```

---

## 🛠️ 기술 스택

- **Framework**: Next.js 14.2.18
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.x
- **React**: 18.x
- **Node.js**: 20.x

---

## 🚀 실행 방법

### 개발 서버 실행
```bash
cd F:\workspace\git-factory\practices\nextjs\app-router
npm run dev
```

### 접속 URL
- 메인: http://localhost:3000
- About: http://localhost:3000/about
- Components Demo: http://localhost:3000/components-demo
- Blog: http://localhost:3000/blog
- Blog Posts: http://localhost:3000/blog/posts
- Post Detail: http://localhost:3000/blog/posts/1

### 빌드
```bash
npm run build
npm start
```

---

## 📊 학습 성과

### 코드 통계
- **총 파일**: 15개
- **총 라인**: ~800 lines
- **컴포넌트**: 8개
- **페이지**: 7개

### Git 커밋 히스토리
```
237045e feat: Implement Loading States and Error Handling
e028234 feat: Implement Dynamic Routes and Data Fetching
728cfc4 feat: Implement Layouts and Nested Routes with Blog example
39bfdfd feat: Implement Server vs Client Components demo
a65c785 feat: Add About page with Next.js App Router
38931b7 feat: Initialize Next.js 14 project with App Router
```

---

## 🐛 트러블슈팅 이슈

### Issue 1: Module Resolution 에러
**문제**: `Module not found: Can't resolve '../data/posts'`

**원인**: 
- Next.js 개발 서버 캐시 문제
- 파일 저장 동기화 이슈

**해결**:
1. 개발 서버 완전 종료
2. 브라우저 캐시 클리어
3. 포트 프로세스 강제 종료: `taskkill /PID <PID> /F`
4. 서버 재시작

### Issue 2: params 타입 에러
**문제**: `params.id` 접근 시 Promise 에러

**원인**: Next.js 15에서 params가 Promise로 변경

**해결**:
```typescript
// ❌ 이전 방식
params.id

// ✅ Next.js 15
const { id } = await params;
```

---

## 🔄 다음 단계 (Phase 2-2)

### Spring Boot 3.x + JPA
1. Spring Boot 프로젝트 초기화
2. REST API 설계 및 구현
3. JPA Entity 및 Repository 구성
4. H2/PostgreSQL 연동
5. CRUD 작업 구현

### 예상 기간
- 3~4일

---

## 📝 인수인계 체크리스트

- [x] 모든 기능 정상 작동 확인
- [x] 코드 커밋 완료
- [x] 학습 노트 작성 (NEXTJS_LEARNING.md)
- [x] 핸드오버 문서 작성 (PHASE2-1_HANDOVER.md)
- [ ] Pull Request 생성
- [ ] develop 브랜치 merge
- [ ] Git Factory README 업데이트

---

## 💬 특이사항

1. **모듈 해석 문제**: 개발 중 간헐적으로 모듈을 찾지 못하는 문제 발생. 서버 재시작으로 해결.

2. **경로 문제**: 상대 경로(`../data/posts`)가 정확했음에도 에러 발생. 캐시 문제로 확인됨.

3. **Next.js 15 호환성**: params Promise 처리 필요. 향후 프로젝트에서도 주의.

4. **학습 시간**: 총 4~5시간 소요 (트러블슈팅 포함)

---

## 📞 연락처

**작성자**: 이환  
**이메일**: akma0050@naver.com  
**GitHub**: [@hwan0050](https://github.com/hwan0050)  

---

**문서 작성일**: 2025-11-23  
**최종 수정일**: 2025-11-23