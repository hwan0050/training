# 🏗 Microservices

> MSA 아키텍처 학습 및 실습을 위한 마이크로서비스 프로젝트

## 📋 목차

- [아키텍처 개요](#-아키텍처-개요)
- [서비스 목록](#-서비스-목록)
- [시작하기](#-시작하기)
- [기술 스택](#-기술-스택)
- [서비스 간 통신](#-서비스-간-통신)

## 🏛 아키텍처 개요

```
┌──────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│              (Web App, Mobile App, etc.)                     │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway                              │
│              (Spring Cloud Gateway)                          │
│         - 인증/인가                                          │
│         - 라우팅                                             │
│         - Rate Limiting                                      │
└─────────────────────────┬────────────────────────────────────┘
                          │
            ┌─────────────┴─────────────┐
            │                           │
            ▼                           ▼
┌─────────────────────┐       ┌─────────────────────┐
│ Discovery Service   │       │  Config Service     │
│  (Eureka Server)    │       │(Spring Cloud Config)│
└─────────────────────┘       └─────────────────────┘
            │
            └───────────────────┬───────────────────┐
                                │                   │
┌───────────────────────────────┼───────────────────┼─────────┐
│                    Business Services                         │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Auth        │  │  User        │  │  Order       │     │
│  │  Service     │  │  Service     │  │  Service     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐                                           │
│  │ Notification │                                           │
│  │  Service     │                                           │
│  └──────────────┘                                           │
└──────────────────────────────────────────────────────────────┘
```

## 📦 서비스 목록

### Infrastructure Services

#### 1. API Gateway
- **포트**: 8080
- **기술**: Spring Cloud Gateway
- **역할**:
  - 모든 클라이언트 요청의 진입점
  - 인증/인가 처리
  - 라우팅 및 로드 밸런싱
  - Rate Limiting
  - CORS 처리

#### 2. Discovery Service
- **포트**: 8761
- **기술**: Netflix Eureka
- **역할**:
  - 서비스 등록 및 탐색
  - 헬스 체크
  - 로드 밸런싱 지원

#### 3. Config Service
- **포트**: 8888
- **기술**: Spring Cloud Config
- **역할**:
  - 중앙 집중식 설정 관리
  - 환경별 설정 분리
  - 설정 동적 변경

### Business Services

#### 4. Auth Service
- **포트**: 8081
- **기술**: Spring Boot, Spring Security, JWT
- **데이터베이스**: PostgreSQL
- **주요 기능**:
  - 사용자 인증 (로그인/로그아웃)
  - JWT 토큰 발급 및 검증
  - OAuth 2.0 소셜 로그인 (예정)
  - 토큰 갱신

#### 5. User Service
- **포트**: 8082
- **기술**: Spring Boot, JPA
- **데이터베이스**: PostgreSQL
- **주요 기능**:
  - 사용자 CRUD
  - 프로필 관리
  - 권한 관리
  - 사용자 검색

#### 6. Order Service
- **포트**: 8083
- **기술**: Python FastAPI (또는 Spring Boot)
- **데이터베이스**: MongoDB
- **주요 기능**:
  - 주문 생성
  - 주문 조회
  - 주문 상태 관리
  - 주문 이벤트 발행

#### 7. Notification Service
- **포트**: 8084
- **기술**: Spring Boot, Kafka Consumer
- **데이터베이스**: Redis (캐시)
- **주요 기능**:
  - 이메일 알림
  - 푸시 알림 (예정)
  - SMS 알림 (예정)
  - 이벤트 구독 및 처리

### Shared Libraries

#### common
- **기술**: Java Library
- **내용**:
  - 공통 Exception
  - 공통 DTO
  - 공통 유틸리티
  - 공통 인터셉터/필터

## 🚀 시작하기

### 필수 요구사항

```bash
# Java 17+
java --version

# Maven 3.8+
mvn --version

# Docker & Docker Compose
docker --version
docker-compose --version

# Python 3.11+ (Order Service용)
python --version

# PostgreSQL 13+ (또는 Docker로 실행)
# MongoDB 5+ (또는 Docker로 실행)
# Redis 7+ (또는 Docker로 실행)
```

### 전체 환경 실행 (Docker Compose)

```bash
cd microservices
docker-compose up -d
```

### 개별 서비스 실행

#### 1. Discovery Service 실행 (필수)
```bash
cd microservices/discovery-service
./mvnw spring-boot:run
```

#### 2. Config Service 실행 (필수)
```bash
cd microservices/config-service
./mvnw spring-boot:run
```

#### 3. API Gateway 실행 (필수)
```bash
cd microservices/api-gateway
./mvnw spring-boot:run
```

#### 4. Auth Service 실행
```bash
cd microservices/auth-service
./mvnw spring-boot:run
```

#### 5. User Service 실행
```bash
cd microservices/user-service
./mvnw spring-boot:run
```

#### 6. Order Service 실행 (Python FastAPI)
```bash
cd microservices/order-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8083
```

#### 7. Notification Service 실행
```bash
cd microservices/notification-service
./mvnw spring-boot:run
```

### 서비스 헬스 체크

```bash
# Discovery Service
curl http://localhost:8761/actuator/health

# Auth Service
curl http://localhost:8081/actuator/health

# User Service  
curl http://localhost:8082/actuator/health

# Order Service
curl http://localhost:8083/health
```

### Eureka Dashboard 확인

```
http://localhost:8761
```

등록된 모든 서비스를 확인할 수 있습니다.

## 🛠 기술 스택

### Backend Frameworks
```
Spring Boot 3.2.x
  - Spring Cloud Gateway
  - Spring Cloud Netflix Eureka
  - Spring Cloud Config
  - Spring Data JPA
  - Spring Security
  - Spring WebFlux (Gateway)

FastAPI 0.104.x (Python)
  - Pydantic
  - SQLAlchemy (또는 Motor for MongoDB)
```

### Databases
```
PostgreSQL 15 - Auth, User Services
MongoDB 5 - Order Service
Redis 7 - Caching, Session
```

### Message Broker
```
Apache Kafka 3.5.x - Event Streaming
RabbitMQ 3.12.x - Notification Queue (예정)
```

### Monitoring & Logging
```
Spring Boot Actuator
Prometheus (예정)
Grafana (예정)
ELK Stack (예정)
```

## 🔄 서비스 간 통신

### 1. Synchronous Communication (동기 통신)

#### REST API (Feign Client)
```java
@FeignClient(name = "user-service")
public interface UserServiceClient {
    
    @GetMapping("/api/users/{id}")
    User getUserById(@PathVariable Long id);
}
```

### 2. Asynchronous Communication (비동기 통신)

#### Kafka Event
```java
// Producer (Order Service)
@Service
public class OrderEventProducer {
    
    @Autowired
    private KafkaTemplate<String, OrderEvent> kafkaTemplate;
    
    public void publishOrderCreated(OrderEvent event) {
        kafkaTemplate.send("order-events", event);
    }
}

// Consumer (Notification Service)
@Service
public class NotificationService {
    
    @KafkaListener(topics = "order-events", groupId = "notification-group")
    public void handleOrderEvent(OrderEvent event) {
        // 알림 발송
        sendNotification(event);
    }
}
```

## 📊 API 문서

각 서비스는 Swagger UI를 통해 API 문서를 제공합니다.

```
Auth Service:     http://localhost:8081/swagger-ui.html
User Service:     http://localhost:8082/swagger-ui.html
Order Service:    http://localhost:8083/docs
```

## 🧪 테스트

### 단위 테스트
```bash
cd microservices/user-service
./mvnw test
```

### 통합 테스트
```bash
./mvnw verify
```

### API 테스트 (Postman Collection)
각 서비스 디렉토리에 `postman-collection.json` 파일 포함

## 📝 환경 변수

각 서비스의 `application.yml`에서 다음 환경 변수를 설정할 수 있습니다:

```yaml
# application.yml 예시
spring:
  application:
    name: user-service
  datasource:
    url: ${DB_URL:jdbc:postgresql://localhost:5432/userdb}
    username: ${DB_USERNAME:postgres}
    password: ${DB_PASSWORD:password}
  
eureka:
  client:
    service-url:
      defaultZone: ${EUREKA_SERVER:http://localhost:8761/eureka/}

jwt:
  secret: ${JWT_SECRET:your-secret-key}
  expiration: ${JWT_EXPIRATION:86400000}
```

## 🐳 Docker 배포

### Docker Compose로 전체 환경 실행

```bash
cd microservices
docker-compose up -d
```

### 개별 서비스 Docker 실행

```bash
cd microservices/user-service
docker build -t user-service .
docker run -p 8082:8082 user-service
```

## 🔐 보안

### JWT 인증 플로우

```
1. 사용자 로그인 → Auth Service
2. JWT 토큰 발급
3. 클라이언트는 모든 요청에 토큰 포함
4. API Gateway에서 토큰 검증
5. 검증된 요청만 비즈니스 서비스로 라우팅
```

### 보안 헤더

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📈 모니터링 (예정)

- Prometheus: 메트릭 수집
- Grafana: 대시보드 시각화
- Zipkin/Jaeger: 분산 트레이싱
- ELK Stack: 로그 수집 및 분석

## 🤝 기여하기

1. 새로운 서비스 추가 시 `microservices/` 디렉토리에 생성
2. `docker-compose.yml`에 서비스 추가
3. README 업데이트
4. PR 생성

## 📚 참고 자료

- [Spring Cloud 공식 문서](https://spring.io/projects/spring-cloud)
- [MSA 아키텍처 가이드](../docs/MSA_ARCHITECTURE.md)
- [Netflix OSS](https://netflix.github.io/)
- [Apache Kafka 문서](https://kafka.apache.org/documentation/)

---

**Happy Microservices Journey! 🚀**
