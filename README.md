# 🏭 Git Factory

> **개발 학습 저장소** - Git 워크플로우, 코딩 실습, 최신 개발 방법론을 학습하는 공간

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## 📖 목차

- [프로젝트 소개](#-프로젝트-소개)
- [학습 기술 스택](#-학습-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [시작하기](#-시작하기)
- [학습 로드맵](#-학습-로드맵)
- [Git 워크플로우](#-git-워크플로우)
- [기여하기](#-기여하기)
- [라이선스](#-라이선스)

## 🎯 프로젝트 소개

Git Factory는 **현대적인 웹 개발 기술과 MSA(Microservices Architecture)**를 학습하기 위한 체계적인 저장소입니다.

### 주요 학습 목표

- ✅ **Git 워크플로우** - 브랜치 전략, 협업, 코드 리뷰
- ✅ **풀스택 개발** - Frontend부터 Backend까지
- ✅ **MSA 아키텍처** - 마이크로서비스 설계 및 구현
- ✅ **최신 개발 방법론** - TDD, Clean Code, Agile
- ✅ **실전 프로젝트** - 학습한 내용을 실제 프로젝트에 적용

## 🛠 학습 기술 스택

### Frontend
```
React 18+          - UI 라이브러리
Next.js 14+        - React 프레임워크 (App Router)
TypeScript 5+      - 타입 안전성
Tailwind CSS       - 스타일링
Zustand/Recoil     - 상태 관리
React Query        - 서버 상태 관리
```

### Backend
```
Java 17+           - Spring Boot 3.x
Python 3.11+       - FastAPI, Django
Node.js 20+        - Express (검토 중)
```

### MSA & Infrastructure
```
Spring Cloud       - MSA 프레임워크
Docker             - 컨테이너화
Kubernetes         - 오케스트레이션 (학습 예정)
Kafka/RabbitMQ     - 메시지 큐
Redis              - 캐싱 & 세션
PostgreSQL/MySQL   - 데이터베이스
MongoDB            - NoSQL
Elasticsearch      - 검색 엔진 (검토 중)
```

### DevOps & Tools
```
Git & GitHub       - 버전 관리
GitHub Actions     - CI/CD
Nginx              - 리버스 프록시
Prometheus/Grafana - 모니터링 (학습 예정)
```

## 📂 프로젝트 구조
```
git-factory/
├── README.md                      # 프로젝트 소개
├── LICENSE                        # MIT 라이선스
├── .gitignore                     # Git 제외 파일
├── CONTRIBUTING.md                # 기여 가이드
│
├── docs/                          # 📚 학습 문서
│   ├── GIT_WORKFLOW.md           # Git 작업 정책
│   ├── MSA_ARCHITECTURE.md       # MSA 아키텍처 가이드
│   ├── LEARNING_PATH.md          # 학습 로드맵
│   ├── HANDOVER_TYPESCRIPT.md    # TypeScript 인수인계
│   ├── HANDOVER_REACT.md         # React 인수인계
│   └── API_DESIGN.md             # API 설계 가이드
│
├── workflows/                     # 🔄 Git 워크플로우 학습
│   ├── git-basics/               # Git 기초
│   ├── branching-strategies/     # 브랜치 전략
│   └── collaboration/            # 협업 방법
│
├── practices/                     # 💻 코딩 실습
│   ├── java/                     # Java 실습
│   │   ├── spring-boot/         # Spring Boot 기초
│   │   ├── jpa/                 # JPA/Hibernate
│   │   └── design-patterns/     # 디자인 패턴
│   ├── python/                   # Python 실습
│   │   ├── fastapi/             # FastAPI 기초
│   │   ├── django/              # Django (검토 중)
│   │   └── algorithms/          # 알고리즘
│   ├── react/                    # React 실습
│   │   ├── components/          # 컴포넌트 설계
│   │   ├── hooks/               # Custom Hooks
│   │   └── state-management/    # 상태 관리
│   ├── nextjs/                   # Next.js 실습
│   │   ├── app-router/          # App Router
│   │   ├── server-components/   # Server Components
│   │   └── api-routes/          # API Routes
│   └── typescript/               # TypeScript 실습
│       ├── fundamentals/        # 타입 기초
│       ├── advanced/            # 고급 타입
│       └── generics/            # 제네릭
│
├── methodologies/                 # 📋 개발 방법론
│   ├── agile/                    # 애자일 방법론
│   ├── tdd/                      # 테스트 주도 개발
│   ├── clean-code/               # 클린 코드
│   └── solid/                    # SOLID 원칙
│
├── microservices/                 # 🏗 MSA 실습 프로젝트
│   ├── api-gateway/              # API Gateway (Spring Cloud Gateway)
│   ├── discovery-service/        # Service Discovery (Eureka)
│   ├── config-service/           # Config Server
│   ├── auth-service/             # 인증/인가 서비스
│   ├── user-service/             # 사용자 서비스
│   ├── order-service/            # 주문 서비스 (예시)
│   ├── notification-service/     # 알림 서비스 (예시)
│   └── common/                   # 공통 라이브러리
│
└── projects/                      # 🚀 실전 프로젝트
    ├── e-commerce/               # 이커머스 플랫폼 (예정)
    ├── blog-platform/            # 블로그 플랫폼 (예정)
    └── task-management/          # 태스크 관리 시스템 (예정)
```

## 🚀 시작하기

### 필수 요구사항
```bash
# Node.js & npm
node --version  # v20.x 이상
npm --version   # v10.x 이상

# Java
java --version  # 17 이상

# Python
python --version  # 3.11 이상

# Docker (선택)
docker --version

# Git
git --version
```

### 저장소 클론
```bash
git clone https://github.com/hwan0050/git-factory.git
cd git-factory
```

### 학습 영역별 실행

#### 🎨 Frontend (React/Next.js)
```bash
cd practices/react/components
npm install
npm run dev
```

#### ☕ Backend (Java/Spring Boot)
```bash
cd microservices/user-service
./mvnw clean install
./mvnw spring-boot:run
```

#### 🐍 Backend (Python/FastAPI)
```bash
cd practices/python/fastapi
pip install -r requirements.txt
uvicorn main:app --reload
```

## 📚 학습 로드맵

### Phase 1: 기초 다지기 (1-2개월)
- [x] Git 기본 명령어 & 브랜치 전략
- [x] TypeScript 기초 & 타입 시스템
- [x] React 핵심 개념 (Hooks, Context, State)
- [ ] Java 기초 & Spring Boot 입문
- [ ] Python 기초 & FastAPI 입문

### Phase 2: 중급 개발 (2-3개월)
- [ ] Next.js App Router & Server Components
- [ ] Spring Boot REST API 설계
- [ ] JPA/Hibernate 데이터베이스 연동
- [ ] React Query & 상태 관리
- [ ] Docker 컨테이너화
- [ ] TDD & 단위 테스트 작성

### Phase 3: MSA 아키텍처 (3-4개월)
- [ ] Spring Cloud Netflix (Eureka, Gateway)
- [ ] 마이크로서비스 간 통신 (REST, gRPC)
- [ ] 메시지 큐 (Kafka/RabbitMQ)
- [ ] 분산 트레이싱 & 로깅
- [ ] API Gateway 패턴
- [ ] Circuit Breaker 패턴

### Phase 4: 실전 프로젝트 (진행 중)
- [ ] 풀스택 프로젝트 설계
- [ ] CI/CD 파이프라인 구축
- [ ] 모니터링 & 알림 시스템
- [ ] 성능 최적화
- [ ] Kubernetes 배포 (학습 예정)

자세한 학습 로드맵: [📖 LEARNING_PATH.md](docs/LEARNING_PATH.md)

## 🔄 Git 워크플로우

이 프로젝트는 체계적인 Git 작업 정책을 따릅니다.

### 브랜치 전략
```
main              - 프로덕션 브랜치 (배포 가능한 상태)
  └── develop     - 개발 브랜치 (다음 릴리스 준비)
       ├── feature/java-spring-basic      - 기능 개발
       ├── feature/react-custom-hooks     - 기능 개발
       └── fix/typo-in-readme            - 버그 수정
```

### 커밋 메시지 규칙
```bash
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅 (기능 변경 없음)
refactor: 코드 리팩토링
test: 테스트 코드 추가/수정
chore: 빌드, 설정 파일 수정
```

**예시:**
```bash
git commit -m "feat: Add Spring Boot user authentication service"
git commit -m "docs: Update MSA architecture guide"
git commit -m "fix: Resolve TypeScript type error in React component"
```

📖 자세한 내용: [Git 작업 정책](docs/GIT_WORKFLOW.md)

## 🤝 기여하기

이 프로젝트는 학습 목적이지만 기여를 환영합니다!

1. 🍴 이 저장소를 Fork
2. 🌿 Feature 브랜치 생성 (`git checkout -b feature/amazing-learning`)
3. 💾 변경사항 커밋 (`git commit -m 'feat: Add amazing learning content'`)
4. 📤 브랜치에 Push (`git push origin feature/amazing-learning`)
5. 🎉 Pull Request 생성

자세한 가이드: [CONTRIBUTING.md](CONTRIBUTING.md)

## 📝 학습 기록

### 진행 중인 학습
- 🔄 Java Spring Boot 기초 학습 예정
- 🔄 Python FastAPI 학습 예정

### 완료한 학습
- ✅ **Git 기본 명령어 마스터** (2024-11-18)
  - 브랜치 생성, 병합, Conflict 해결
  - Pull Request 작성 및 코드 리뷰
  - Git Flow 워크플로우 실습

- ✅ **TypeScript 기초 완료** (2024-11-18)
  - 기본 타입 (Primitive, Array, Tuple, Enum)
  - 인터페이스 (정의, 확장, 구현)
  - 제네릭 (함수, 클래스, 제약조건)
  - 유틸리티 타입 (Partial, Pick, Omit)
  - 학습 시간: 4시간

- ✅ **React 기초 완료** (2024-11-18)
  - JSX 문법 및 컴포넌트 작성
  - Props 타입 정의 및 전달
  - useState로 상태 관리 (Counter, TodoList)
  - useEffect로 Side Effect 처리 (Timer, API, Events)
  - TypeScript와 React 조합
  - 학습 시간: 4.5시간

- ✅ Docker 기초 개념 이해
- ✅ REST API 설계 원칙

**총 학습 시간: 10.5시간**

## 🔗 유용한 링크

- [Spring Boot 공식 문서](https://spring.io/projects/spring-boot)
- [React 공식 문서](https://react.dev)
- [Next.js 공식 문서](https://nextjs.org/docs)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [FastAPI 공식 문서](https://fastapi.tiangolo.com)
- [Martin Fowler - Microservices](https://martinfowler.com/articles/microservices.html)

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👨‍💻 작성자

**Hwan Lee**
- GitHub: [@hwan0050](https://github.com/hwan0050)
- Email: akma0050@naver.com

---

⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요! ⭐

**Made with ❤️ for Learning**