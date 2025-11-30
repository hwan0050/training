# 🐳 Docker 학습 노트

> Phase 2-3: Docker 컨테이너화 학습 기록

**학습 기간**: 2025-11-27  
**프로젝트**: Blog REST API with Docker & PostgreSQL  
**기술 스택**: Docker, Docker Compose, PostgreSQL

---

## 📋 목차

- [Docker 기본 개념](#docker-기본-개념)
- [Dockerfile 작성](#dockerfile-작성)
- [Docker Compose](#docker-compose)
- [환경 변수 관리](#환경-변수-관리)
- [핵심 명령어](#핵심-명령어)
- [학습 성과](#학습-성과)

---

## Docker 기본 개념

### 🐳 Docker란?

**컨테이너라는 격리된 환경에서 애플리케이션을 실행하는 플랫폼**
```
┌─────────────────────────────────┐
│       내 컴퓨터 (Windows)        │
│  ┌───────────────────────────┐  │
│  │         Docker            │  │
│  │  ┌─────────┐  ┌────────┐ │  │
│  │  │ Spring  │  │Postgres│ │  │
│  │  │  Boot   │  │   DB   │ │  │
│  │  └─────────┘  └────────┘ │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

---

### 🎯 왜 Docker를 사용하는가?

#### 문제 상황
```
개발자 A: "내 컴퓨터에서는 잘 되는데..."
개발자 B: "내 컴퓨터에서는 안 되는데..."

원인:
- Java 버전 차이 (17 vs 11)
- 데이터베이스 설정 차이
- OS 차이 (Windows vs Mac vs Linux)
```

#### Docker 사용 시
```
✅ 개발자 A: Docker로 실행 → 성공
✅ 개발자 B: Docker로 실행 → 성공
✅ 서버: Docker로 실행 → 성공

→ 모두 동일한 환경에서 실행!
```

---

### 📦 핵심 용어

#### 1. Image (이미지)
애플리케이션 실행에 필요한 **모든 것이 담긴 템플릿**
```
Image = 붕어빵 틀

예시:
- openjdk:17        (Java 17 환경)
- postgres:16       (PostgreSQL 16)
- nginx:latest      (웹 서버)
```

#### 2. Container (컨테이너)
Image를 실행한 **실제 인스턴스**
```
Container = 붕어빵 (틀로 찍어낸 결과물)

하나의 Image로 여러 Container 생성 가능:
postgres Image → Container 1 (개발용 DB)
              → Container 2 (테스트용 DB)
```

#### 3. Dockerfile
Image를 만드는 **레시피(설명서)**
```dockerfile
FROM openjdk:17               # Java 17 기반
COPY app.jar /app.jar         # 앱 복사
CMD ["java", "-jar", "app.jar"]  # 실행 명령
```

#### 4. Docker Compose
**여러 컨테이너를 한 번에 관리**하는 도구
```yaml
services:
  app:       # Spring Boot 컨테이너
  database:  # PostgreSQL 컨테이너
  redis:     # Redis 컨테이너
```

---

### 🆚 Docker vs 가상머신 (VM)

| 구분 | Docker | VM |
|-----|--------|-----|
| 무게 | 가벼움 (MB) | 무거움 (GB) |
| 시작 속도 | 빠름 (초) | 느림 (분) |
| OS | 호스트 OS 공유 | 각자 OS 필요 |
| 격리 수준 | 프로세스 레벨 | 하드웨어 레벨 |
| 용도 | 애플리케이션 실행 | 완전한 격리 |

**아키텍처 비교:**
```
VM (가상머신):
┌────────────────────────────┐
│ App A │ App B │ App C      │
├───────┼───────┼────────────┤
│ OS    │ OS    │ OS         │  ← 각자 OS 필요 (무거움)
├────────────────────────────┤
│      Hypervisor            │
├────────────────────────────┤
│      Host OS               │
└────────────────────────────┘

Docker (컨테이너):
┌────────────────────────────┐
│ App A │ App B │ App C      │  ← 앱만 격리 (가벼움)
├────────────────────────────┤
│      Docker Engine         │
├────────────────────────────┤
│      Host OS               │
└────────────────────────────┘
```

---

## Dockerfile 작성

### 📝 우리 프로젝트의 Dockerfile
```dockerfile
# 1단계: 빌드 스테이지
FROM gradle:8.5-jdk17 AS builder
WORKDIR /app
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle
COPY src ./src
RUN ./gradlew clean build -x test

# 2단계: 실행 스테이지
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

### 🎓 Dockerfile 명령어 설명

#### FROM
베이스 이미지 지정
```dockerfile
FROM gradle:8.5-jdk17 AS builder
```
- `gradle:8.5-jdk17` - Gradle 8.5와 Java 17이 설치된 이미지
- `AS builder` - 이 스테이지에 "builder"라는 이름 부여

#### WORKDIR
작업 디렉토리 설정
```dockerfile
WORKDIR /app
```
- 컨테이너 내부의 `/app` 폴더를 작업 디렉토리로 설정
- 이후 명령어는 이 폴더 기준으로 실행

#### COPY
파일 복사 (호스트 → 컨테이너)
```dockerfile
COPY build.gradle settings.gradle gradlew ./
```
- 호스트의 파일들을 컨테이너의 현재 디렉토리(WORKDIR)로 복사

#### RUN
이미지 빌드 시 실행할 명령어
```dockerfile
RUN ./gradlew clean build -x test
```
- Gradle로 애플리케이션 빌드
- `-x test` - 테스트 제외 (빌드 시간 단축)

#### EXPOSE
포트 노출 (문서화 목적)
```dockerfile
EXPOSE 8080
```
- 컨테이너가 8080 포트를 사용함을 명시
- 실제 포트 매핑은 `docker run -p` 또는 docker-compose에서 설정

#### ENTRYPOINT
컨테이너 실행 시 실행할 명령어
```dockerfile
ENTRYPOINT ["java", "-jar", "app.jar"]
```
- 컨테이너 시작 시 자동으로 실행
- JSON 배열 형식 사용 (권장)

---

### 🏗️ 멀티 스테이지 빌드 (Multi-Stage Build)

#### 개념
여러 단계로 나누어 이미지를 빌드하여 **최종 이미지 크기를 줄이는 기법**

#### 우리 프로젝트 예시
```dockerfile
# 1단계: 빌드 스테이지 (builder)
FROM gradle:8.5-jdk17 AS builder
# ... 빌드 작업 ...
RUN ./gradlew clean build -x test

# 2단계: 실행 스테이지
FROM openjdk:17-jdk-slim
COPY --from=builder /app/build/libs/*.jar app.jar
```

#### 장점

**이미지 크기 비교:**
```
단일 스테이지:
gradle:8.5-jdk17 (700MB)
  ├─ Gradle (200MB)
  ├─ Java 17 (300MB)
  ├─ 빌드 도구들 (150MB)
  └─ 앱 (50MB)
  = 총 700MB

멀티 스테이지:
1단계 (builder): 700MB  → 빌드만 수행, 버림
2단계 (runtime): 300MB  → 실행만 수행
  ├─ Java 17 (250MB)
  └─ 앱 (50MB)
  = 최종 300MB (400MB 절약!)
```

**보안:**
- 빌드 도구, 소스 코드가 최종 이미지에 포함되지 않음
- 공격 표면 감소

---

### 📄 .dockerignore

#### 역할
Docker Image 빌드 시 **제외할 파일** 지정 (`.gitignore`와 유사)

#### 우리 프로젝트의 .dockerignore
```
# Gradle
.gradle
build/

# IDE
.idea
*.iml

# Docker 파일 자체
Dockerfile
docker-compose.yml
.dockerignore

# 문서
README.md
*.md

# 로그
*.log
```

#### 왜 필요한가?
```
제외 전:
Docker Context: 500MB
  ├─ 소스 코드: 10MB
  ├─ .gradle: 200MB      ← 불필요
  ├─ build/: 150MB       ← 불필요
  ├─ .idea/: 100MB       ← 불필요
  └─ 기타: 40MB
→ 빌드 느림, 이미지 커짐

제외 후:
Docker Context: 50MB
  ├─ 소스 코드: 10MB
  └─ 기타: 40MB
→ 빌드 빠름, 이미지 작음
```

---

## Docker Compose

### 📝 docker-compose.yml 구조
```yaml
version: '3.8'

services:          # 컨테이너 정의
  postgres:        # PostgreSQL 컨테이너
  app:             # Spring Boot 컨테이너

volumes:           # 데이터 저장소
  postgres-data:

networks:          # 네트워크
  blog-network:
```

---

### 🗄️ PostgreSQL 서비스
```yaml
postgres:
  image: postgres:16-alpine
  container_name: blog-postgres
  environment:
    POSTGRES_DB: blogdb
    POSTGRES_USER: bloguser
    POSTGRES_PASSWORD: blogpass
  ports:
    - "5432:5432"
  volumes:
    - postgres-data:/var/lib/postgresql/data
  networks:
    - blog-network
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U bloguser -d blogdb"]
    interval: 10s
    timeout: 5s
    retries: 5
```

#### 주요 설정 설명

**image**
```yaml
image: postgres:16-alpine
```
- Docker Hub의 공식 PostgreSQL 16 이미지 사용
- `alpine` - 경량 리눅스 (용량 작음)

**environment**
```yaml
environment:
  POSTGRES_DB: blogdb
  POSTGRES_USER: bloguser
  POSTGRES_PASSWORD: blogpass
```
- 환경 변수로 데이터베이스 초기 설정
- 컨테이너 시작 시 자동으로 데이터베이스 생성

**ports**
```yaml
ports:
  - "5432:5432"
```
- 포트 매핑: `호스트:컨테이너`
- 내 PC의 5432 포트 → 컨테이너의 5432 포트
- 외부에서 접근 가능 (DBeaver 등)

**volumes**
```yaml
volumes:
  - postgres-data:/var/lib/postgresql/data
```
- 명명된 볼륨 사용
- 컨테이너 삭제해도 **데이터 유지**
- `/var/lib/postgresql/data` - PostgreSQL 기본 데이터 경로

**healthcheck**
```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U bloguser -d blogdb"]
  interval: 10s
  timeout: 5s
  retries: 5
```
- PostgreSQL이 준비되었는지 확인
- `interval: 10s` - 10초마다 확인
- `retries: 5` - 5번 실패하면 unhealthy 상태
- `app` 서비스가 이 상태를 기다림

---

### 🚀 Spring Boot 서비스
```yaml
app:
  build:
    context: .
    dockerfile: Dockerfile
  container_name: blog-api
  environment:
    SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/blogdb
    SPRING_DATASOURCE_USERNAME: bloguser
    SPRING_DATASOURCE_PASSWORD: blogpass
    SPRING_JPA_HIBERNATE_DDL_AUTO: update
    SPRING_JPA_SHOW_SQL: "true"
  ports:
    - "8080:8080"
  depends_on:
    postgres:
      condition: service_healthy
  networks:
    - blog-network
```

#### 주요 설정 설명

**build**
```yaml
build:
  context: .
  dockerfile: Dockerfile
```
- 이미지를 직접 빌드
- `context: .` - 현재 디렉토리를 빌드 컨텍스트로 사용
- Dockerfile을 사용해서 이미지 생성

**environment**
```yaml
environment:
  SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/blogdb
```
- 환경 변수로 Spring Boot 설정 덮어쓰기
- `postgres` - Docker 네트워크 내부 호스트명
  - ✅ `postgres:5432` (Docker 내부)
  - ❌ `localhost:5432` (작동 안 함)

**depends_on**
```yaml
depends_on:
  postgres:
    condition: service_healthy
```
- 의존성 관리
- PostgreSQL의 healthcheck가 통과된 후에 실행
- 순서 보장 + 준비 상태 확인

---

### 💾 볼륨 (Volumes)

#### 개념
컨테이너의 데이터를 **호스트에 영구 저장**
```yaml
volumes:
  postgres-data:
```

#### 동작 방식
```
컨테이너 삭제 전:
postgres 컨테이너 → postgres-data 볼륨
                     (blogdb 데이터 저장)

컨테이너 삭제:
postgres 컨테이너 (삭제됨)
postgres-data 볼륨 (유지됨!)

컨테이너 재생성:
postgres 컨테이너 → postgres-data 볼륨
                     (기존 데이터 그대로!)
```

#### 볼륨 위치
```bash
# Windows (WSL 2 사용 시)
\\wsl$\docker-desktop-data\version-pack-data\community\docker\volumes\

# Linux/Mac
/var/lib/docker/volumes/
```

---

### 🌐 네트워크 (Networks)

#### 개념
컨테이너 간 통신을 위한 **가상 네트워크**
```yaml
networks:
  blog-network:
    driver: bridge
```

#### 동작 방식
```
blog-network (가상 네트워크)
├─ postgres 컨테이너 (IP: 172.18.0.2)
└─ app 컨테이너 (IP: 172.18.0.3)

app 컨테이너에서:
jdbc:postgresql://postgres:5432/blogdb
                   ↑
                Docker가 자동으로 IP 매핑
                postgres → 172.18.0.2
```

#### 격리성
```
blog-network
├─ app
└─ postgres

다른 네트워크
├─ redis
└─ nginx

→ blog-network와 다른 네트워크는 서로 통신 불가 (격리)
```

---

### 🔄 실행 흐름
```
$ docker compose up

1. 네트워크 생성
   └─ blog-network (bridge)

2. 볼륨 생성
   └─ postgres-data

3. PostgreSQL 컨테이너 시작
   ├─ 이미지 다운로드 (postgres:16-alpine)
   ├─ 컨테이너 생성 및 시작
   ├─ 데이터베이스 초기화 (blogdb, bloguser)
   └─ healthcheck 시작 (10초마다)

4. healthcheck 대기
   └─ "pg_isready" 성공할 때까지 대기

5. Spring Boot 이미지 빌드
   ├─ Dockerfile 읽기
   ├─ 1단계: Gradle 빌드
   └─ 2단계: 실행 이미지 생성

6. Spring Boot 컨테이너 시작
   ├─ 환경 변수 주입
   ├─ PostgreSQL 연결
   └─ 애플리케이션 시작

7. 실행 완료!
   ├─ http://localhost:8080 (Spring Boot)
   └─ localhost:5432 (PostgreSQL)
```

---

## 환경 변수 관리

### 🎯 설정 전략

**목표: 코드 수정 없이 환경만 바꿔서 실행**
```
개발 환경 (로컬)
├─ application.properties
└─ 기본값 사용 → H2 Database

운영 환경 (Docker)
├─ application.properties (동일 파일)
└─ 환경 변수로 덮어쓰기 → PostgreSQL
```

---

### 📝 application.properties 설정
```properties
# 환경 변수 우선, 없으면 기본값
spring.datasource.url=${SPRING_DATASOURCE_URL:jdbc:h2:mem:blogdb}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME:sa}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD:}
```

**문법:** `${환경변수명:기본값}`

---

### 🔄 환경별 동작

#### 로컬 실행 (IntelliJ)
```
환경 변수 없음
↓
기본값 사용
↓
spring.datasource.url=jdbc:h2:mem:blogdb
spring.datasource.username=sa
spring.datasource.password=
↓
H2 Database 사용
```

#### Docker Compose 실행
```
docker-compose.yml의 environment 적용
↓
환경 변수 덮어쓰기
↓
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/blogdb
SPRING_DATASOURCE_USERNAME=bloguser
SPRING_DATASOURCE_PASSWORD=blogpass
↓
PostgreSQL 사용
```

---

### 🎨 장점

**1. 코드 수정 불필요**
```java
// 어떤 DB를 쓰든 코드는 동일!
@Autowired
private PostRepository postRepository;

postRepository.findAll(); // H2든 PostgreSQL이든 동일하게 작동
```

**2. 환경별 설정 분리**
```
개발: H2 (빠름, 간편)
테스트: H2 (격리, 재현 가능)
운영: PostgreSQL (안정, 고성능)
```

**3. 보안**
```
비밀번호를 코드에 하드코딩 X
환경 변수나 Secret으로 관리 O
```

---

## 핵심 명령어

### 📦 Docker 기본 명령어
```bash
# 이미지 관련
docker images                    # 이미지 목록
docker pull postgres:16          # 이미지 다운로드
docker build -t myapp .          # 이미지 빌드
docker rmi <image-id>            # 이미지 삭제

# 컨테이너 관련
docker ps                        # 실행 중인 컨테이너
docker ps -a                     # 모든 컨테이너
docker run <image>               # 컨테이너 실행
docker stop <container-id>       # 컨테이너 중지
docker rm <container-id>         # 컨테이너 삭제
docker logs <container-id>       # 로그 확인
docker exec -it <container-id> bash  # 컨테이너 접속
```

---

### 🎼 Docker Compose 명령어
```bash
# 실행
docker compose up                # 시작 (포그라운드)
docker compose up -d             # 시작 (백그라운드)
docker compose up --build        # 이미지 재빌드 후 시작

# 중지
docker compose stop              # 중지 (컨테이너 유지)
docker compose down              # 중지 + 컨테이너 삭제
docker compose down -v           # 중지 + 컨테이너 + 볼륨 삭제

# 상태 확인
docker compose ps                # 컨테이너 상태
docker compose logs              # 전체 로그
docker compose logs app          # 특정 서비스 로그
docker compose logs -f           # 로그 실시간 확인

# 재시작
docker compose restart           # 재시작
docker compose restart app       # 특정 서비스만 재시작
```

---

### 🔍 유용한 명령어
```bash
# 시스템 정보
docker version                   # Docker 버전
docker info                      # 시스템 정보

# 정리
docker system prune              # 미사용 리소스 정리
docker system prune -a           # 모든 미사용 리소스 정리
docker volume prune              # 미사용 볼륨 정리

# 네트워크
docker network ls                # 네트워크 목록
docker network inspect <name>    # 네트워크 상세 정보

# 볼륨
docker volume ls                 # 볼륨 목록
docker volume inspect <name>     # 볼륨 상세 정보
```

---

## 학습 성과

### ✅ 완료된 학습 내용

#### 1. Docker 기본 개념
- [x] Docker vs VM 차이점 이해
- [x] Image, Container, Volume, Network 개념
- [x] Docker의 필요성과 장점

#### 2. Dockerfile 작성
- [x] 기본 명령어 (FROM, WORKDIR, COPY, RUN, EXPOSE, ENTRYPOINT)
- [x] 멀티 스테이지 빌드
- [x] .dockerignore 활용
- [x] 이미지 최적화 기법

#### 3. Docker Compose
- [x] 멀티 컨테이너 구성
- [x] 서비스 간 의존성 관리 (depends_on, healthcheck)
- [x] 볼륨을 통한 데이터 영속성
- [x] 네트워크를 통한 컨테이너 간 통신
- [x] 환경 변수 관리

#### 4. Spring Boot & PostgreSQL 연동
- [x] 환경 변수 기반 설정
- [x] H2 (로컬) / PostgreSQL (Docker) 전환
- [x] 데이터베이스 마이그레이션

---

### 📊 생성된 파일
```
blog-api/
├── Dockerfile              # 멀티 스테이지 빌드
├── docker-compose.yml      # PostgreSQL + Spring Boot
├── .dockerignore          # 빌드 최적화
└── application.properties  # 환경 변수 지원
```

**코드 통계:**
- Dockerfile: ~20줄
- docker-compose.yml: ~50줄
- .dockerignore: ~30줄
- application.properties: ~20줄 (수정)

---

### 🎓 핵심 학습 내용

#### 멀티 스테이지 빌드
```
빌드 스테이지 (700MB)
  → JAR 파일 생성
  
실행 스테이지 (300MB)
  → JAR 파일만 복사
  
결과: 최종 이미지 400MB 절약!
```

#### 환경 변수 전략
```
application.properties:
spring.datasource.url=${SPRING_DATASOURCE_URL:jdbc:h2:mem:blogdb}

로컬: 환경 변수 없음 → H2 사용
Docker: 환경 변수 있음 → PostgreSQL 사용

→ 코드 수정 없이 환경만 변경!
```

#### 서비스 의존성
```
depends_on + healthcheck
→ PostgreSQL 준비 완료 후 Spring Boot 시작
→ 연결 실패 방지
```

---

### 🚀 Docker 명령어 (참고용)
```bash
# 실행 (Docker 환경에서)
docker compose up -d

# 로그 확인
docker compose logs -f app

# 중지
docker compose down

# 재시작 (코드 수정 후)
docker compose up --build -d
```

---

### 🎯 다음 단계

#### Phase 2-4: TDD & 테스트 (예정)
- [ ] JUnit 5 단위 테스트
- [ ] MockMvc를 이용한 통합 테스트
- [ ] Testcontainers로 실제 DB 테스트
- [ ] Test Coverage 측정

#### Phase 3: MSA 아키텍처 (예정)
- [ ] API Gateway
- [ ] Service Discovery (Eureka)
- [ ] 각 서비스별 Docker 이미지
- [ ] Docker Compose로 MSA 구성

---

## 🎓 학습 회고

### 잘한 점
- ✅ 멀티 스테이지 빌드로 이미지 크기 최적화
- ✅ 환경 변수로 설정 분리 (로컬/Docker)
- ✅ healthcheck로 안정적인 서비스 시작
- ✅ .dockerignore로 빌드 컨텍스트 최적화

### 배운 것
- Docker가 개발 환경 통일에 얼마나 유용한지 체감
- 멀티 스테이지 빌드의 효율성
- 환경 변수 기반 설정의 유연성
- Docker Compose로 멀티 컨테이너 관리의 편리함

### 한계점
- **Docker Desktop 미설치**: Windows 버전 문제로 실제 실행 불가
- 개념 학습과 파일 작성만 완료
- 실제 컨테이너 실행 및 테스트 필요

### 향후 계획
- Windows 업데이트 또는 다른 환경에서 실행 테스트
- Kubernetes 학습 (오케스트레이션)
- CI/CD 파이프라인에 Docker 통합

---

**학습 완료일**: 2025-11-27  
**소요 시간**: 약 2-3시간  
**다음 학습**: Phase 2-4 (TDD & 테스트) 또는 실제 Docker 실행

**Made with ❤️ for Learning**