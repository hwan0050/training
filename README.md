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

## 🎯 프로젝트 개요

Git Factory는 단순한 코드 저장소가 아닌, **체계적인 학습 여정**을 기록하는 공간입니다.  
각 Phase는 실전 프로젝트를 통해 기술을 익히고, 상세한 문서화를 통해 지식을 내재화합니다.

### 🎯 핵심 학습 원칙

1. **실전 중심**: 이론보다 실습, 튜토리얼보다 프로젝트
2. **체계적 문서화**: 모든 학습 과정을 상세히 기록
3. **점진적 발전**: 각 Phase가 다음 Phase의 기반이 됨
4. **Git Workflow**: 실무와 동일한 브랜치 전략 및 PR 프로세스

---

## 🗺️ 학습 로드맵

### ✅ Phase 1: 기초 다지기 (완료!)

**학습 기간**: 2024-11-18 ~ 2024-11-22 (5일)  
**총 학습 시간**: 약 15시간  
**완성 코드**: ~4,000줄  
**완료 PR**: 4개

#### 🎓 학습 목표
- ✅ Git을 자유자재로 사용
- ✅ TypeScript로 타입 안전한 코드 작성
- ✅ React 핵심 개념 이해 및 활용
- ✅ 실전 CRUD 애플리케이션 개발

#### 완료된 모듈
- ✅ **Git 워크플로우 마스터**
    - Git 기본 명령어, 브랜치 전략
    - Conflict 해결, Merge vs Rebase
    - Cherry-pick, Reset, Revert
    - 워크플로우 가이드 작성 (~600줄)

- ✅ **TypeScript 완벽 정복**
    - 기본 타입, Interface, Type Alias
    - Generics, Utility Types (11개)
    - Type Guards (20개)
    - 유틸리티 함수 (45개)
    - 총 ~1,400줄 코드

- ✅ **React 핵심 개념**
    - 컴포넌트, Props, State
    - useState, useEffect Hooks
    - Custom Hook (useLocalStorage)
    - Enhanced TodoList (필터링, 수정)
    - 총 ~500줄 코드

- ✅ **통합 실전 프로젝트**
    - 🔖 **북마크 관리 앱** 완성!
    - 완전한 CRUD 구현
    - TypeScript + React 통합
    - LocalStorage 영구 저장
    - 필터링, 검색, 정렬 기능
    - 총 ~800줄 코드

#### 📊 Phase 1 최종 성과
- **코드**: ~4,000줄
- **PR**: 4개 (모두 Merged)
- **프로젝트**: 1개 (실사용 가능)
- **학습 시간**: 약 15시간
- **문서**: GIT_WORKFLOW_GUIDE.md 외 5개

---

### 🔄 Phase 2: 중급 개발 (진행 중)

**시작일**: 2025-11-23  
**현재 진도**: Phase 2-5 Module 1 & 2 완료 ✅

---

#### ✅ Phase 2-1: Next.js 14 App Router (완료!)

**학습 기간**: 2025-11-23 (1일)  
**학습 시간**: 약 4-5시간  
**완성 코드**: ~800줄  
**완료 커밋**: 6개

**학습 내용**:
- Next.js 14 프로젝트 초기화 (TypeScript + Tailwind CSS)
- App Router 파일 기반 라우팅
- Server Components vs Client Components
- Layouts & Nested Routes
- Dynamic Routes & Data Fetching
- Loading States & Error Handling

**완성 프로젝트**: `app-router`
- 파일 기반 라우팅 15개 파일
- Server/Client Components 구분
- Dynamic Routes 구현
- Loading/Error Handling 패턴

**문서**:
- [NEXTJS_LEARNING.md](./practices/nextjs/NEXTJS_LEARNING.md)
- [PHASE2-1_HANDOVER.md](./practices/nextjs/PHASE2-1_HANDOVER.md)

---

#### ✅ Phase 2-2: Spring Boot 3.x + JPA (완료!)

**학습 기간**: 2025-11-25 (1일)  
**학습 시간**: 약 3-4시간  
**완성 코드**: ~350줄  
**완료 커밋**: 3개

**학습 내용**:
- Spring Boot 프로젝트 구조
- JPA Entity 설계 및 Auditing
- Repository 패턴 (쿼리 메서드)
- Service 계층 (트랜잭션 관리)
- REST Controller (7개 API 엔드포인트)
- DTO 패턴 (Request/Response)
- H2 Database 연동

**완성 프로젝트**: `blog-api`
- CRUD 기능 완전 구현
- RESTful API 설계
- JPA Auditing
- 계층형 아키텍처 (Controller-Service-Repository)
- 7개 API 엔드포인트

**문서**:
- [SPRING_BOOT_LEARNING.md](./docs/SPRING_BOOT_LEARNING.md)
- [PHASE2-2_HANDOVER.md](./docs/PHASE2-2_HANDOVER.md)

---

#### ✅ Phase 2-3: Docker & Containerization (완료!)

**학습 기간**: 2025-11-27 (1일)  
**학습 시간**: 약 2-3시간  
**완성 코드**: ~120줄  
**완료 커밋**: 2개

**학습 내용**:
- Docker 기본 개념 및 명령어
- Dockerfile 작성 (Multi-stage build)
- Docker Compose 활용
- Spring Boot + PostgreSQL 컨테이너화
- 환경 변수 관리 (H2 ↔ PostgreSQL 전환)
- 볼륨을 통한 데이터 영속성
- 네트워크 구성 및 서비스 간 통신

**주요 성과**:
- Multi-stage Dockerfile 작성
- docker-compose.yml 구성
- 환경별 DB 전환 전략
- 상세한 학습 노트 및 핸드오버 문서

**기술적 제약**:
- Windows 10 build 호환성 문제로 Docker Desktop 미설치
- 개념 학습 및 설정 완료, 실행 환경은 추후 구축 예정

**문서**:
- [DOCKER_LEARNING.md](./docs/DOCKER_LEARNING.md) (~800 lines)
- [PHASE2-3_HANDOVER.md](./docs/PHASE2-3_HANDOVER.md) (~600 lines)

---

#### ✅ Phase 2-4: TDD & Spring Boot Testing (완료!)

**학습 기간**: 2025-11-30 ~ 2025-12-01 (2일)  
**학습 시간**: 약 6-7시간  
**완성 코드**: ~800줄 (테스트 코드)  
**완료 커밋**: 예정

**학습 내용**:
- TDD (Test-Driven Development) 사이클
- Spring Boot Test Slice Annotations
    - `@DataJpaTest` - Repository 계층 테스트
    - `@WebMvcTest` - Controller 계층 테스트
    - `@ExtendWith(MockitoExtension.class)` - Service 계층 테스트
- Mockito 활용한 단위 테스트
- MockMvc를 활용한 API 테스트
- Given-When-Then 패턴

**테스트 구조**:
```
src/test/java/com/gitfactory/blogapi/
├── repository/
│   └── PostRepositoryTest.java       (7개 테스트) ✅
├── service/
│   └── PostServiceTest.java          (10개 테스트) ✅
└── controller/
    └── PostControllerTest.java       (8개 테스트) ✅

총 25개 테스트 케이스 - ALL PASSED ✅
```

**주요 성과**:
- 계층별 테스트 완전 구현 (Repository, Service, Controller)
- 100% 테스트 통과율 (25/25)
- JPA Auditing 분리 및 테스트 격리
- GlobalExceptionHandler 구현 (404 에러 처리)
- 상세한 학습 노트 및 트러블슈팅 문서

**해결한 이슈**:
1. JPA Auditing 에러 → JpaAuditingConfig 분리
2. Import 충돌 (Hamcrest vs Mockito) → 명시적 import
3. 404 예외 처리 → GlobalExceptionHandler 추가
4. 파라미터 이름 불일치 수정 (title → keyword)

**추가 구현**:
- `JpaAuditingConfig.java` - JPA Auditing 설정 분리
- `GlobalExceptionHandler.java` - 전역 예외 처리

**문서**:
- [TESTING_LEARNING.md](./docs/TESTING_LEARNING.md) (~800 lines)
- [PHASE2-4_HANDOVER.md](./docs/PHASE2-4_HANDOVER.md) (~600 lines)

---

#### ✅ Phase 2-5: API Documentation (Module 1 & 2 완료!) 🎉

**학습 기간**: 2025-12-06 (1일)  
**학습 시간**: 약 4-5시간  
**완성 코드**: ~1,000줄 (테스트 + 설정)  
**완료 커밋**: 예정

**완료된 모듈**:
- ✅ **Module 1**: Spring REST Docs (테스트 기반 문서)
- ✅ **Module 2**: Swagger/OpenAPI (인터랙티브 문서)

**학습 내용**:

**Module 1: Spring REST Docs**
- REST Docs 의존성 및 AsciiDoctor 플러그인 설정
- 테스트 기반 API 문서 자동 생성
- 7개 API 문서화 테스트 작성
- AsciiDoc 문서 작성 및 HTML 변환
- @AutoConfigureRestDocs, document() 활용

**Module 2: Swagger/OpenAPI**
- springdoc-openapi 의존성 추가 (2.6.0)
- SwaggerConfig 설정 (OpenAPI 3.1)
- Controller @Tag 어노테이션
- DTO @Schema 정의
- Record 타입 DTO 패턴 (toEntity(), from())
- Swagger UI 실행 및 테스트

**주요 성과**:
- 7개 API 완전 문서화 (REST Docs + Swagger)
- 32개 테스트 100% 통과 (25 + 7)
- Spring Boot 버전 호환성 문제 해결 (3.4.12 → 3.3.5)
- Record 타입 DTO 패턴 확립
- 2가지 문서화 전략 동시 활용

**해결한 이슈**:
1. Spring Boot 버전 호환성 → 3.3.5로 다운그레이드
2. Record 타입 접근자 → request.title(), post.createdAt()
3. PostResponse.from() 메서드 누락 → 정적 팩토리 메서드 추가
4. Post.update() 파라미터 → 3개 파라미터로 수정
5. Repository 메서드 누락 → 검색 메서드 추가

**생성된 파일**:
- `PostControllerRestDocsTest.java` (~250 lines)
- `index.adoc` (~200 lines)
- `SwaggerConfig.java` (~120 lines)
- PostRequest/PostResponse 스키마 정의
- build/generated-snippets/ (7개 API)
- build/docs/asciidoc/index.html

**API 문서 접속**:
- REST Docs: `build/docs/asciidoc/index.html`
- Swagger UI: `http://localhost:8080/swagger-ui/index.html` ✅
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

**문서**:
- [SWAGGER_LEARNING.md](./docs/SWAGGER_LEARNING.md) (~1,000 lines)
- [PHASE2-5_MODULE1-2_HANDOVER.md](./docs/PHASE2-5_MODULE1-2_HANDOVER.md) (~800 lines)

---

#### 📋 Phase 2-5 Module 3 (예정)

**예상 기간**: 1-2일

**계획**:
- 통합 테스트 (@SpringBootTest)
- 테스트 커버리지 측정 (JaCoCo)
- Testcontainers (선택)

---

### Phase 3: Advanced Backend 🚀
**상태**: 📅 예정

- Security & Authentication (Spring Security, JWT)
- Microservices Architecture
- Message Queues (RabbitMQ, Kafka)
- Caching Strategies (Redis)

---

### Phase 4: Frontend & Full-Stack Integration 🎨
**상태**: 📅 예정

- Next.js & Server Components
- State Management (Redux, Zustand)
- API Integration
- Full-Stack 프로젝트

---

## 📁 프로젝트 구조

```
git-factory/
├── docs/                                    # 📚 모든 학습 문서 통합
│   ├── SPRING_BOOT_LEARNING.md             (Phase 2-2)
│   ├── PHASE2-2_HANDOVER.md                (Phase 2-2)
│   ├── DOCKER_LEARNING.md                  (Phase 2-3, ~800 lines)
│   ├── PHASE2-3_HANDOVER.md                (Phase 2-3, ~600 lines)
│   ├── TESTING_LEARNING.md                 (Phase 2-4, ~800 lines)
│   ├── PHASE2-4_HANDOVER.md                (Phase 2-4, ~600 lines)
│   ├── SWAGGER_LEARNING.md                 (Phase 2-5, ~1,000 lines) ✨
│   └── PHASE2-5_MODULE1-2_HANDOVER.md      (Phase 2-5, ~800 lines) ✨
│
├── workflows/                               # 🔄 Git 워크플로우 학습
│   └── git-practice/
│       ├── GIT_WORKFLOW_GUIDE.md           (~600 lines)
│       └── practice.txt
│
├── practices/                               # 💻 실습 프로젝트
│   ├── typescript/                         (Phase 1)
│   │   └── utilities/
│   │       ├── type-guards.ts             (20개)
│   │       ├── utility-types.ts           (11개)
│   │       └── utility-functions.ts       (45개)
│   │
│   ├── react/                              (Phase 1)
│   │   └── components/
│   │       ├── src/
│   │       │   ├── hooks/
│   │       │   │   └── useLocalStorage.ts
│   │       │   ├── Counter.tsx
│   │       │   ├── TodoList.tsx
│   │       │   └── TodoListEnhanced.tsx
│   │       └── package.json
│   │
│   ├── nextjs/                             (Phase 2-1)
│   │   ├── app-router/                    (~800 lines, 15개 파일)
│   │   ├── NEXTJS_LEARNING.md
│   │   └── PHASE2-1_HANDOVER.md
│   │
│   └── java/
│       └── spring-boot/
│           └── blog-api/                   (Phase 2-2, 2-3, 2-4, 2-5)
│               ├── src/
│               │   ├── main/
│               │   │   ├── java/
│               │   │   │   └── com/gitfactory/blogapi/
│               │   │   │       ├── controller/
│               │   │   │       │   └── PostController.java           (@Tag) ✨
│               │   │   │       ├── service/
│               │   │   │       │   └── PostService.java
│               │   │   │       ├── repository/
│               │   │   │       │   └── PostRepository.java
│               │   │   │       ├── entity/
│               │   │   │       │   └── Post.java
│               │   │   │       ├── dto/
│               │   │   │       │   ├── PostRequest.java             (@Schema) ✨
│               │   │   │       │   └── PostResponse.java            (@Schema) ✨
│               │   │   │       ├── config/
│               │   │   │       │   ├── JpaAuditingConfig.java
│               │   │   │       │   └── SwaggerConfig.java            ✨ NEW
│               │   │   │       └── exception/
│               │   │   │           └── GlobalExceptionHandler.java
│               │   │   └── resources/
│               │   │       └── application.properties
│               │   │
│               │   ├── docs/                                         ✨ NEW
│               │   │   └── asciidoc/
│               │   │       └── index.adoc                            ✨ NEW
│               │   │
│               │   └── test/
│               │       └── java/
│               │           └── com/gitfactory/blogapi/
│               │               ├── repository/
│               │               │   └── PostRepositoryTest.java       (7개)
│               │               ├── service/
│               │               │   └── PostServiceTest.java          (10개)
│               │               └── controller/
│               │                   ├── PostControllerTest.java       (8개)
│               │                   └── PostControllerRestDocsTest.java (7개) ✨
│               │
│               ├── build/                                            ✨ NEW
│               │   ├── generated-snippets/                          (7개 API) ✨
│               │   └── docs/asciidoc/index.html                     ✨ NEW
│               │
│               ├── Dockerfile                          (Phase 2-3)
│               ├── docker-compose.yml                  (Phase 2-3)
│               ├── .dockerignore                       (Phase 2-3)
│               └── build.gradle                        (REST Docs + Swagger) ✨
│
├── projects/                                # 🚀 실전 프로젝트
│   └── bookmark-manager/                   (Phase 1)
│       ├── src/
│       │   ├── components/                 (4개)
│       │   ├── hooks/                      (useLocalStorage)
│       │   ├── types/                      (8개 타입)
│       │   ├── utils/                      (7개 함수)
│       │   └── App.tsx
│       └── package.json
│
└── README.md                                (This file)
```

---

## 🧪 테스트 실행 방법

### blog-api 테스트

```bash
# 프로젝트 디렉토리로 이동
cd practices/java/spring-boot/blog-api

# 전체 테스트 실행
./gradlew clean test

# 특정 테스트만 실행
./gradlew test --tests "com.gitfactory.blogapi.repository.PostRepositoryTest"
./gradlew test --tests "com.gitfactory.blogapi.service.PostServiceTest"
./gradlew test --tests "com.gitfactory.blogapi.controller.PostControllerTest"
./gradlew test --tests "com.gitfactory.blogapi.controller.PostControllerRestDocsTest"

# 테스트 리포트 확인
# build/reports/tests/test/index.html
```

**예상 결과**:
```
BUILD SUCCESSFUL in 10s
✅ PostRepositoryTest:         7/7   (100%)
✅ PostServiceTest:            10/10 (100%)
✅ PostControllerTest:         8/8   (100%)
✅ PostControllerRestDocsTest: 7/7   (100%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ 총합:                       32/32 (100%)
```

---

## 📚 API 문서 확인

### REST Docs (정적 HTML)
```bash
# AsciiDoc → HTML 변환
./gradlew asciidoctor

# 문서 확인
# build/docs/asciidoc/index.html 브라우저에서 열기
```

### Swagger UI (인터랙티브)
```bash
# 애플리케이션 실행
./gradlew bootRun

# 브라우저 접속
http://localhost:8080/swagger-ui/index.html

# OpenAPI JSON
http://localhost:8080/v3/api-docs
```

---

## 🐳 Docker 실행 (Phase 2-3)

### Docker 명령어

```bash
# 프로젝트 디렉토리로 이동
cd practices/java/spring-boot/blog-api

# Docker 이미지 빌드
docker build -t blog-api:latest .

# Docker Compose로 실행 (Spring Boot + PostgreSQL)
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 컨테이너 중지
docker-compose down

# 볼륨까지 삭제
docker-compose down -v
```

**참고**: Windows 10 build 호환성 문제로 현재 Docker Desktop 미설치 상태

---

## 💻 개발 환경

### 필수 도구
- **OS**: Windows 10
- **IDE**: IntelliJ IDEA, VSCode
- **Shell**: PowerShell
- **JDK**: 17
- **Node.js**: 18+
- **Git**: 2.40+

### 선택 도구
- **Docker Desktop**: (설치 예정)
- **Postman**: API 테스트
- **DBeaver**: DB 관리

---

## 📖 학습 문서

### Phase 1
- [Phase 1 Handover Document](./HANDOVER_PHASE1.md)
- Git Workflow Guide (600 lines)
- TypeScript Learning Notes
- React Implementation Guide

### Phase 2-2: Spring Boot
- [SPRING_BOOT_LEARNING.md](./docs/SPRING_BOOT_LEARNING.md)
- [PHASE2-2_HANDOVER.md](./docs/PHASE2-2_HANDOVER.md)

### Phase 2-3: Docker
- [DOCKER_LEARNING.md](./docs/DOCKER_LEARNING.md) - 800 lines
    - Docker 기본 개념
    - Dockerfile 작성법
    - Docker Compose 활용
    - 실전 예제 및 명령어
- [PHASE2-3_HANDOVER.md](./docs/PHASE2-3_HANDOVER.md) - 600 lines
    - 구현 내용 상세
    - 주요 이슈 및 해결 방법
    - 인수인계 가이드

### Phase 2-4: TDD & Testing
- [TESTING_LEARNING.md](./docs/TESTING_LEARNING.md) - 800 lines
    - TDD 개념 및 사이클
    - Spring Boot Test Annotations
    - Mockito & MockMvc 사용법
    - Given-When-Then 패턴
    - 실전 예제 및 트러블슈팅
- [PHASE2-4_HANDOVER.md](./docs/PHASE2-4_HANDOVER.md) - 600 lines
    - 테스트 구조 상세
    - 25개 테스트 케이스 설명
    - 주요 이슈 및 해결 방법
    - 인수인계 가이드

### Phase 2-5: API Documentation ✨
- [SWAGGER_LEARNING.md](./docs/SWAGGER_LEARNING.md) - 1,000 lines
    - Spring REST Docs 개념 및 구현
    - Swagger/OpenAPI 통합
    - 테스트 기반 문서 생성
    - AsciiDoc 작성법
    - REST Docs vs Swagger 비교
    - 트러블슈팅 (버전 호환성, Record 타입)
- [PHASE2-5_MODULE1-2_HANDOVER.md](./docs/PHASE2-5_MODULE1-2_HANDOVER.md) - 800 lines
    - Module 1 & 2 상세 구현
    - 7개 API 문서화 완료
    - Swagger UI 설정
    - 주요 이슈 및 해결 방법
    - 인수인계 가이드

---

## 🎯 Git Workflow

### 브랜치 전략

```
main (프로덕션)
  ↑
develop (개발)
  ↑
feature/* (기능 개발)
```

### 커밋 메시지 컨벤션

```bash
# Conventional Commits 형식
<type>(<scope>): <subject>

# 예시
feat(blog-api): Add Post CRUD endpoints
test(repository): Add PostRepositoryTest with 7 test cases
docs(phase2-5): Complete Module 1 & 2 - REST Docs & Swagger
fix(test): Resolve JPA Auditing conflict in tests
```

**Type**:
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `test`: 테스트 추가/수정
- `refactor`: 리팩토링
- `style`: 코드 포맷팅
- `chore`: 빌드/설정 변경

---

## 📊 학습 통계

### ✅ Phase 1 (완료)
- **기간**: 2024-11-18 ~ 2024-11-22 (5일)
- **학습 시간**: 15시간
- **커밋 수**: 50+
- **작성 코드**: ~4,000 lines
- **PR**: 4개 (모두 merge 완료)
- **프로젝트**: 북마크 관리 앱 (실사용 가능)

### 🔄 Phase 2 (진행 중)
- **기간**: 2025-11-23 ~ 현재
- **완료 모듈**: Phase 2-1, 2-2, 2-3, 2-4, 2-5 (Module 1 & 2) ✅
- **작성 코드**:
    - Java/Spring Boot: ~350 lines
    - 테스트 코드: ~1,800 lines ✨
    - Docker 설정: ~120 lines
    - Next.js: ~800 lines
- **테스트 케이스**: 32개 (100% 통과 ✅) ✨
- **작성 문서**: ~6,200 lines (10개 문서) ✨
- **커밋 수**: 15개+

---

## 🚀 다음 단계

### 즉시 진행
- [ ] Phase 2-5 Module 1 & 2 최종 커밋 및 PR
- [ ] develop → main 브랜치 병합

### Phase 2-5 Module 3 계획
- [ ] 통합 테스트 (@SpringBootTest)
- [ ] 테스트 커버리지 측정 (JaCoCo)
- [ ] Testcontainers (선택)

---

## 📞 Contact

- **GitHub**: [@hwan0050](https://github.com/hwan0050)
- **Email**: akma0050@naver.com

---

## 📝 License

이 프로젝트는 개인 학습 목적으로 작성되었습니다.

---

## 📝 업데이트 로그

### 2025-12-06 - Phase 2-5 Module 1 & 2 완료! 🎉
- ✅ Spring REST Docs 테스트 기반 문서 자동 생성
- ✅ Swagger/OpenAPI 인터랙티브 문서 구축
- ✅ 7개 API 완전 문서화 (REST Docs + Swagger)
- ✅ Spring Boot 버전 호환성 문제 해결 (3.4.12 → 3.3.5)
- ✅ Record 타입 DTO 패턴 확립
- ✅ 32개 테스트 100% 통과 (25 + 7)
- 📊 총 1,000줄 코드, 1,800줄 문서

### 2025-12-01 - Phase 2-4 완료! 🎉
- ✅ TDD & Spring Boot Testing 학습 완료
- ✅ Repository, Service, Controller 계층별 테스트 작성
- ✅ 총 25개 테스트 케이스 (100% 통과)
- ✅ JPA Auditing 분리 및 GlobalExceptionHandler 추가
- ✅ Mockito & MockMvc 마스터
- 📊 총 800줄 테스트 코드, 1,400줄 문서

### 2025-11-27 - Phase 2-3 완료! 🎉
- ✅ Docker 컨테이너화 학습 완료
- ✅ Dockerfile 작성 (멀티 스테이지 빌드)
- ✅ Docker Compose 구성 (Spring Boot + PostgreSQL)
- ✅ 환경 변수 기반 설정 관리
- ✅ 볼륨 및 네트워크 구성
- 📊 총 120줄 코드, 2개 커밋, 5개 파일
- ⚠️ Docker Desktop 환경 이슈로 실행 테스트는 추후 진행

### 2025-11-25 - Phase 2-2 완료! 🎉
- ✅ Spring Boot 3.x + JPA 학습 완료
- ✅ Blog REST API 구현 (7개 엔드포인트)
- ✅ Entity, Repository, Service, Controller 계층 구현
- ✅ JPA Auditing 및 쿼리 메서드 학습
- 📊 총 350줄 코드, 3개 커밋, 8개 파일

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