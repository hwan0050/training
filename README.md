# 🏭 Git Factory

> 🎓 **체계적인 풀스택 개발 학습 저장소** - Git 워크플로우부터 MSA까지

[![GitHub stars](https://img.shields.io/github/stars/hwan0050/git-factory?style=social)](https://github.com/hwan0050/git-factory/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/hwan0050/git-factory?style=social)](https://github.com/hwan0050/git-factory/network/members)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Git Factory는 **현대적인 웹 개발 기술과 MSA(Microservices Architecture)**를 학습하기 위한 체계적인 저장소입니다.

## ✨ 특징

- ✅ **Git 워크플로우** - 브랜치 전략, 협업, 코드 리뷰
- ✅ **풀스택 개발** - Frontend부터 Backend까지
- ✅ **MSA 아키텍처** - 마이크로서비스 설계 및 구현
- ✅ **최신 개발 방법론** - TDD, Clean Code, Agile
- ✅ **실전 프로젝트** - 학습한 내용을 실제 프로젝트에 적용

---

## 🎯 Phase 1 완료! (2024-11-22)

### ✅ 완성된 학습 내용

#### 1. Git 워크플로우 마스터
- [x] Git 기본 명령어 & 브랜치 전략
- [x] Conflict 해결 실습
- [x] Merge vs Rebase 비교
- [x] Cherry-pick, Reset, Revert
- [x] 실전 워크플로우 가이드 작성

#### 2. TypeScript 완벽 정복
- [x] TypeScript 기초 & 타입 시스템
- [x] Type Guards 20개 구현
- [x] Utility Types 11개 활용
- [x] 실전 유틸리티 함수 45개 작성
- [x] 제네릭 & 고급 타입 패턴

#### 3. React 핵심 개념
- [x] React 기초 (Hooks, State, Props)
- [x] Custom Hook (useLocalStorage) 구현
- [x] Enhanced TodoList (필터링, LocalStorage, 수정)
- [x] 컴포넌트 설계 & 상태 관리

#### 4. 통합 실전 프로젝트
- [x] 🔖 **북마크 관리 앱** 완성!
- [x] 완전한 CRUD 구현
- [x] TypeScript + React 통합
- [x] LocalStorage 영구 저장
- [x] 필터링, 검색, 정렬 기능

### 📊 Phase 1 성과
- **코드**: ~4,000줄
- **PR**: 4개 (모두 Merged)
- **프로젝트**: 1개 (실사용 가능)
- **학습 시간**: 약 15시간

---

## 🛠️ 기술 스택

### Frontend
- **React 18+** - UI 라이브러리 ✅
- **TypeScript 5+** - 타입 안전성 ✅
- **Next.js 14+** - React 프레임워크 (App Router) ✅
- **Tailwind CSS** - 스타일링 ✅

### Backend
- **Java 17+** - Spring Boot 3.x *[예정]*
- **Python 3.11+** - FastAPI, Django *[예정]*
- **Node.js 20+** - Express *[검토 중]*

### Database & Cache
- **PostgreSQL/MySQL** - 관계형 데이터베이스 *[예정]*
- **MongoDB** - NoSQL *[예정]*
- **Redis** - 캐싱 & 세션 *[예정]*

### DevOps & Tools
- **Git & GitHub** - 버전 관리 ✅
- **Docker** - 컨테이너화 *[예정]*
- **GitHub Actions** - CI/CD *[예정]*

---

## 📂 프로젝트 구조
```
git-factory/
├── README.md                      # 프로젝트 소개
├── LICENSE                        # MIT 라이선스
├── .gitignore                     # Git 제외 파일
│
├── docs/                          # 📚 학습 문서
│   ├── GIT_WORKFLOW.md           # Git 작업 정책
│   ├── LEARNING_PATH.md          # 학습 로드맵
│   └── MSA_ARCHITECTURE.md       # MSA 아키텍처 가이드 (예정)
│
├── workflows/                     # 🔄 Git 워크플로우 학습
│   └── git-practice/             # ✅ Git 실습
│       ├── GIT_WORKFLOW_GUIDE.md # 워크플로우 완전 가이드
│       └── practice.txt          # 실습 파일
│
├── practices/                     # 💻 코딩 실습
│   ├── react/                    # ✅ React 실습
│   │   └── components/           # React 컴포넌트 학습
│   │       ├── src/
│   │       │   ├── hooks/       # Custom Hooks
│   │       │   ├── Counter.tsx
│   │       │   ├── TodoList.tsx
│   │       │   ├── TodoListEnhanced.tsx  # ⭐ 개선 버전
│   │       │   └── ...
│   │       └── package.json
│   │
│   ├── nextjs/                   # ✅ Next.js 실습
│   │   ├── app-router/          # App Router 학습
│   │   ├── NEXTJS_LEARNING.md   # 학습 노트
│   │   └── PHASE2-1_HANDOVER.md # 핸드오버 문서
│   │
│   └── typescript/               # ✅ TypeScript 실습
│       └── utilities/            # TypeScript 유틸리티
│           ├── type-guards.ts   # Type Guard 20개
│           ├── utility-types.ts # Utility Types 11개
│           └── utility-functions.ts  # 유틸리티 함수 45개
│
└── projects/                     # 🚀 실전 프로젝트
    └── bookmark-manager/         # ✅ 북마크 관리 앱
        ├── src/
        │   ├── components/      # 컴포넌트 4개
        │   ├── hooks/           # Custom Hook
        │   ├── types/           # TypeScript 타입
        │   ├── utils/           # 유틸리티
        │   └── App.tsx
        └── package.json
```

---

## 🚀 시작하기

### 필수 요구사항
```bash
# Node.js & npm
node --version  # v20.x 이상
npm --version   # v10.x 이상

# Git
git --version
```

### 저장소 클론
```bash
git clone https://github.com/hwan0050/git-factory.git
cd git-factory
```

### 프로젝트 실행

#### 1. React 학습 프로젝트
```bash
cd practices/react/components
npm install
npm start
```

#### 2. Next.js App Router 학습
```bash
cd practices/nextjs/app-router
npm install
npm run dev
```

#### 3. 북마크 관리 앱 (통합 프로젝트)
```bash
cd projects/bookmark-manager
npm install
npm start
```

---

## 📚 학습 로드맵

### ✅ Phase 1: 기초 다지기 (완료!)

**학습 기간**: 2024-11-18 ~ 2024-11-22

- [x] **Git 워크플로우** 
  - Git 기본 명령어, 브랜치 전략
  - Conflict 해결, Merge vs Rebase
  - 워크플로우 가이드 작성

- [x] **TypeScript 기초**
  - 기본 타입, Interface, Type Alias
  - Generics, Utility Types
  - Type Guards, 유틸리티 함수

- [x] **React 핵심 개념**
  - 컴포넌트, Props, State
  - useState, useEffect Hooks
  - Custom Hook (useLocalStorage)

- [x] **실전 보강 학습**
  - React TodoList 개선 (LocalStorage, 필터링, 수정)
  - TypeScript 개념 강화 (Type Guards, Utility Types, 함수)
  - Git 워크플로우 연습 (Conflict, Merge, Rebase)

- [x] **통합 미니 프로젝트**
  - 🔖 북마크 관리 앱 완성
  - CRUD, 필터링, 검색, 정렬
  - Git + TypeScript + React 통합

**성과**: 코드 ~4,000줄, PR 4개, 프로젝트 1개

---

### 🔄 Phase 2: 중급 개발 (진행 중)

**시작일**: 2025-11-23

#### ✅ Phase 2-1: Next.js 14 App Router (완료 2025-11-23)
- [x] Next.js 프로젝트 초기화 (TypeScript + Tailwind CSS)
- [x] App Router 파일 기반 라우팅
- [x] Server Components vs Client Components
- [x] Layouts & Nested Routes
- [x] Dynamic Routes & Data Fetching
- [x] Loading States & Error Handling

**성과**: 코드 ~800줄, 커밋 6개, 파일 15개

📝 **학습 자료**:
- [Next.js 학습 노트](./practices/nextjs/NEXTJS_LEARNING.md)
- [Phase 2-1 핸드오버 문서](./practices/nextjs/PHASE2-1_HANDOVER.md)

#### 📋 Phase 2-2: Spring Boot 3.x + JPA (예정)
- Spring Boot 프로젝트 초기화
- REST API 설계 및 구현
- JPA/Hibernate 데이터베이스 연동
- CRUD 작업 구현

#### 📋 Phase 2-3: Docker 컨테이너화 (예정)
- Dockerfile 작성
- Docker Compose 구성
- 개발 환경 컨테이너화

#### 📋 Phase 2-4: TDD & 테스트 (예정)
- Jest 설정
- React Testing Library
- 단위 테스트 작성

**예상 완료**: 2026-01

---

### 🎯 Phase 3: MSA 아키텍처 (예정)

**예상 기간**: 3-4개월

- [ ] Spring Cloud Netflix (Eureka, Gateway)
- [ ] 마이크로서비스 간 통신
- [ ] 메시지 큐 (Kafka/RabbitMQ)
- [ ] 분산 트레이싱 & 로깅
- [ ] API Gateway 패턴

**목표 프로젝트**: 이커머스 플랫폼 (MSA)

---

자세한 학습 로드맵: [📖 LEARNING_PATH.md](docs/LEARNING_PATH.md)

---

## 🔄 Git 워크플로우

### 브랜치 전략
```
main - 프로덕션 브랜치 (안정 버전)
 └── develop - 개발 브랜치 (다음 릴리스)
      ├── feature/nextjs-app-router      # 기능 개발 (진행 중)
      ├── feature/bookmark-manager       # 기능 개발 (완료)
      ├── feature/typescript-utilities   # 기능 개발 (완료)
      └── fix/typo-in-readme            # 버그 수정
```

### 커밋 메시지 규칙
```bash
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 코드 리팩토링
test: 테스트 코드
chore: 빌드, 설정 파일 수정
```

**예시:**
```bash
git commit -m "feat: Add bookmark manager app with CRUD functionality"
git commit -m "feat: Implement Next.js App Router with dynamic routes"
git commit -m "docs: Update README with Phase 2-1 completion"
git commit -m "fix: Resolve TypeScript type error in BookmarkForm"
```

📖 자세한 내용: [Git 워크플로우 가이드](workflows/git-practice/GIT_WORKFLOW_GUIDE.md)

---

## 🎓 완성 프로젝트

### 🔖 북마크 관리 앱 (Phase 1)

**기술**: React + TypeScript + LocalStorage

**주요 기능**:
- ✅ CRUD (추가, 조회, 수정, 삭제)
- ✅ 카테고리 분류 (6종)
- ✅ 즐겨찾기
- ✅ 태그 시스템
- ✅ 검색 & 필터링
- ✅ 정렬 (최신순, 오래된순, 제목순)
- ✅ LocalStorage 영구 저장
- ✅ 통계 대시보드

**실행 방법**:
```bash
cd projects/bookmark-manager
npm install
npm start
```

**관련 PR**: [#11](https://github.com/hwan0050/git-factory/pull/11)

---

### 📝 Next.js Blog (Phase 2-1)

**기술**: Next.js 14 + TypeScript + Tailwind CSS

**주요 기능**:
- ✅ App Router 파일 기반 라우팅
- ✅ Server Components & Client Components 구분
- ✅ Dynamic Routes (`/blog/posts/[id]`)
- ✅ Layouts & Nested Routes
- ✅ Loading UI (Skeleton)
- ✅ Error Boundary
- ✅ 404 페이지

**실행 방법**:
```bash
cd practices/nextjs/app-router
npm install
npm run dev
```

---

## 🤝 기여하기

이 프로젝트는 학습 목적이지만 기여를 환영합니다!

1. 🍴 이 저장소를 Fork
2. 🌿 Feature 브랜치 생성 (`git checkout -b feature/amazing-learning`)
3. 💾 변경사항 커밋 (`git commit -m 'feat: Add amazing learning content'`)
4. 📤 브랜치에 Push (`git push origin feature/amazing-learning`)
5. 🎉 Pull Request 생성

자세한 가이드: [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📊 현재 진행 상황

### ✅ Phase 1 완료 (2024-11-22)
- Git 기본 명령어 마스터
- TypeScript 타입 시스템 완벽 이해
- React Hooks 자유자재로 사용
- Custom Hook 구현 및 재사용
- 실전 CRUD 앱 개발 (북마크 관리 앱)

### 🔄 Phase 2 진행 중 (2025-11-23~)

#### ✅ Phase 2-1: Next.js 14 App Router (완료 2025-11-23)
- ✅ Next.js 프로젝트 초기화 (TypeScript + Tailwind)
- ✅ App Router 파일 기반 라우팅 학습
- ✅ Server Components vs Client Components 구현
- ✅ Layouts & Nested Routes 실습
- ✅ Dynamic Routes & Data Fetching
- ✅ Loading States & Error Handling
- 📝 [학습 노트](./practices/nextjs/NEXTJS_LEARNING.md) | [핸드오버 문서](./practices/nextjs/PHASE2-1_HANDOVER.md)

#### 📋 Phase 2-2: Spring Boot 3.x + JPA (예정)
- Spring Boot 프로젝트 초기화
- REST API 설계 및 구현
- JPA/Hibernate 데이터베이스 연동

#### 📋 Phase 2-3: Docker 컨테이너화 (예정)
- Dockerfile 작성
- Docker Compose 구성

#### 📋 Phase 2-4: TDD & 테스트 (예정)
- Jest 설정
- 단위 테스트 작성

### 📅 예정
- Spring Boot 백엔드 개발
- Docker 컨테이너화
- TDD & 테스트
- MSA 아키텍처 구현

---

## 📖 참고 자료

### 공식 문서
- [React 공식 문서](https://react.dev)
- [Next.js 공식 문서](https://nextjs.org/docs)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [Spring Boot 공식 문서](https://spring.io/projects/spring-boot)
- [FastAPI 공식 문서](https://fastapi.tiangolo.com)

### 추천 자료
- [Git 브랜치 전략](workflows/git-practice/GIT_WORKFLOW_GUIDE.md)
- [Martin Fowler - Microservices](https://martinfowler.com/articles/microservices.html)

---

## 📜 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## 👤 만든이

**Hwan Lee**

- GitHub: [@hwan0050](https://github.com/hwan0050)
- Email: [akma0050@naver.com](mailto:akma0050@naver.com)

---

## ⭐ Star History

이 프로젝트가 도움이 되셨다면 Star를 눌러주세요! ⭐

---

## 📝 업데이트 로그

### 2025-11-23 - Phase 2-1 완료! 🎉
- ✅ Next.js 14 App Router 학습 완료
- ✅ Server/Client Components 구분 학습
- ✅ Dynamic Routes & Data Fetching 구현
- ✅ Loading/Error Handling 패턴 학습
- 📊 총 800줄 코드, 6개 커밋, 15개 파일

### 2024-11-22 - Phase 1 완료! 🎉
- ✅ Git 워크플로우 학습 완료
- ✅ TypeScript 기초 & 고급 개념 완료
- ✅ React 기초 & 실전 연습 완료
- ✅ 북마크 관리 앱 프로젝트 완성
- 📊 총 4,000줄 코드, 4개 PR, 1개 완성 프로젝트

### 2024-11-18 - 프로젝트 시작
- 🎯 Git Factory 저장소 생성
- 📚 학습 로드맵 수립

---

<p align="center">
  Made with ❤️ for Learning
</p>