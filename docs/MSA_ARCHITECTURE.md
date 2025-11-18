# 🏗 MSA 아키텍처 가이드

> Microservices Architecture (마이크로서비스 아키텍처) 학습 가이드

## 📋 목차

- [MSA란?](#-msa란)
- [MSA의 장단점](#-msa의-장단점)
- [핵심 패턴](#-핵심-패턴)
- [기술 스택](#-기술-스택)
- [아키텍처 설계](#-아키텍처-설계)
- [서비스 구성](#-서비스-구성)
- [실습 예제](#-실습-예제)

## 🎯 MSA란?

**Microservices Architecture (MSA)**는 애플리케이션을 작고 독립적인 서비스들의 집합으로 구성하는 아키텍처 스타일입니다.

### Monolithic vs MSA

```
┌─────────────────────────────────┐     ┌──────────┐  ┌──────────┐  ┌──────────┐
│     Monolithic Application      │     │  User    │  │  Order   │  │ Payment  │
│                                 │     │ Service  │  │ Service  │  │ Service  │
│  ┌──────────────────────────┐  │     │          │  │          │  │          │
│  │    Presentation Layer    │  │     │  REST    │  │  REST    │  │  REST    │
│  └──────────────────────────┘  │     │   API    │  │   API    │  │   API    │
│  ┌──────────────────────────┐  │     └────┬─────┘  └────┬─────┘  └────┬─────┘
│  │    Business Logic        │  │          │             │             │
│  └──────────────────────────┘  │          └─────────────┴─────────────┘
│  ┌──────────────────────────┐  │                       │
│  │    Data Access Layer     │  │              ┌────────▼────────┐
│  └──────────────────────────┘  │              │   API Gateway   │
│                                 │              └─────────────────┘
│        Single Database          │                  Microservices
└─────────────────────────────────┘
```

### MSA의 특징

1. **서비스의 독립성**: 각 서비스는 독립적으로 배포 및 확장 가능
2. **느슨한 결합**: 서비스 간 최소한의 의존성
3. **비즈니스 중심 설계**: 각 서비스는 특정 비즈니스 기능 수행
4. **기술 다양성**: 각 서비스마다 다른 기술 스택 사용 가능
5. **자율적인 팀**: 각 서비스는 독립된 팀이 관리

## ⚖️ MSA의 장단점

### 장점 👍

✅ **독립적 배포**
- 서비스별로 독립적인 배포 가능
- 전체 시스템을 중단하지 않고 업데이트

✅ **확장성**
- 필요한 서비스만 선택적으로 확장
- 수평적 확장이 용이

✅ **기술 유연성**
- 각 서비스마다 최적의 기술 선택 가능
- 새로운 기술 도입이 쉬움

✅ **장애 격리**
- 하나의 서비스 장애가 전체 시스템에 영향 최소화
- 부분적인 장애 허용

✅ **팀 자율성**
- 작은 팀이 독립적으로 개발 가능
- 개발 속도 향상

### 단점 👎

❌ **복잡성 증가**
- 분산 시스템 관리의 복잡성
- 디버깅과 모니터링 어려움

❌ **네트워크 비용**
- 서비스 간 통신 오버헤드
- 네트워크 지연 시간

❌ **데이터 일관성**
- 분산 트랜잭션 관리 복잡
- 최종 일관성(Eventual Consistency) 필요

❌ **테스트 복잡성**
- 통합 테스트 어려움
- 전체 시스템 테스트 복잡

❌ **운영 오버헤드**
- 많은 서비스 관리 필요
- DevOps 역량 필수

## 🎨 핵심 패턴

### 1. API Gateway Pattern

모든 클라이언트 요청의 진입점 역할

```
┌─────────┐
│ Client  │
└────┬────┘
     │
     ▼
┌────────────────┐
│  API Gateway   │  ← 인증, 로깅, 라우팅
└────┬───────────┘
     │
     ├─────────┬─────────┬─────────┐
     ▼         ▼         ▼         ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│  User   │ │  Order  │ │ Payment │ │ Product │
│ Service │ │ Service │ │ Service │ │ Service │
└─────────┘ └─────────┘ └─────────┘ └─────────┘
```

**역할:**
- 요청 라우팅
- 인증/인가
- 요청 집계
- 프로토콜 변환
- 속도 제한

### 2. Service Discovery Pattern

서비스 위치 자동 탐색

```
┌──────────────┐
│   Service    │ ─── Register ──→ ┌───────────────┐
│   Registry   │                   │   Service A   │
│  (Eureka)    │ ←── Discover ──── │  (Instance 1) │
└──────────────┘                   └───────────────┘
```

**주요 도구:**
- Netflix Eureka
- Consul
- Zookeeper
- etcd

### 3. Circuit Breaker Pattern

장애 전파 방지

```
Normal State:
┌─────────┐      Request      ┌─────────┐
│Service A│ ───────────────→  │Service B│
│         │ ←──── Response ─── │         │
└─────────┘                    └─────────┘

Circuit Open (장애):
┌─────────┐      Request      ┌─────────┐
│Service A│ ───X─────────────  │Service B│
│         │                    │  (Down) │
└─────────┘                    └─────────┘
      │
      └─→ Fallback Response
```

**주요 도구:**
- Resilience4j
- Hystrix (deprecated)

### 4. Database per Service Pattern

각 서비스는 자체 데이터베이스 소유

```
┌─────────────────┐         ┌─────────────────┐
│  User Service   │         │  Order Service  │
└────────┬────────┘         └────────┬────────┘
         │                           │
         ▼                           ▼
┌─────────────────┐         ┌─────────────────┐
│   User DB       │         │   Order DB      │
│  (PostgreSQL)   │         │    (MongoDB)    │
└─────────────────┘         └─────────────────┘
```

### 5. Event-Driven Architecture

이벤트를 통한 비동기 통신

```
┌─────────┐   Publish Event   ┌─────────┐
│Order    │ ─────────────────→ │ Message │
│Service  │                    │  Broker │
└─────────┘                    │ (Kafka) │
                               └────┬────┘
                                    │ Subscribe
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
              ┌─────────┐     ┌─────────┐     ┌─────────┐
              │ Payment │     │ Email   │     │ Inventory│
              │ Service │     │ Service │     │ Service  │
              └─────────┘     └─────────┘     └─────────┘
```

### 6. CQRS Pattern

명령과 조회의 분리

```
Write Side (Command):           Read Side (Query):
┌─────────┐                    ┌─────────┐
│ Command │                    │  Query  │
│ Service │                    │ Service │
└────┬────┘                    └────┬────┘
     │                              │
     ▼                              ▼
┌─────────┐    Event Stream    ┌─────────┐
│ Write   │ ─────────────────→ │  Read   │
│   DB    │                    │   DB    │
└─────────┘                    └─────────┘
```

### 7. Saga Pattern

분산 트랜잭션 관리

```
┌─────────┐     ┌─────────┐     ┌─────────┐
│  Order  │ ──→ │ Payment │ ──→ │Inventory│
│ Service │     │ Service │     │ Service │
└─────────┘     └─────────┘     └─────────┘
     │               │               │
     └───── Compensating Transaction ┘
           (실패 시 롤백)
```

## 🛠 기술 스택

### Backend Framework

#### Java/Spring Boot
```java
// Spring Boot 마이크로서비스 예시
@SpringBootApplication
@EnableDiscoveryClient
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }
}
```

#### Python/FastAPI
```python
# FastAPI 마이크로서비스 예시
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="User Service")

class User(BaseModel):
    id: int
    name: str
    email: str

@app.get("/api/users/{user_id}")
async def get_user(user_id: int) -> User:
    return await user_service.find_by_id(user_id)
```

### API Gateway

#### Spring Cloud Gateway
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://USER-SERVICE
          predicates:
            - Path=/api/users/**
          filters:
            - RewritePath=/api/users/(?<segment>.*), /${segment}
```

#### Kong
```yaml
services:
  - name: user-service
    url: http://user-service:8080
    routes:
      - name: user-route
        paths:
          - /api/users
```

### Service Discovery

#### Eureka Server
```java
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}
```

### Message Broker

#### Apache Kafka
```java
@Service
public class OrderEventProducer {
    
    @Autowired
    private KafkaTemplate<String, OrderEvent> kafkaTemplate;
    
    public void publishOrderCreated(OrderEvent event) {
        kafkaTemplate.send("order-events", event);
    }
}
```

#### RabbitMQ
```java
@Service
public class NotificationService {
    
    @RabbitListener(queues = "order-notifications")
    public void handleOrderNotification(OrderEvent event) {
        // 알림 처리
    }
}
```

## 🏛 아키텍처 설계

### Git Factory MSA 아키텍처

```
┌──────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  (React/Next.js Frontend, Mobile App, Third-party Services)  │
└─────────────────────────┬────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway Layer                        │
│         (Spring Cloud Gateway / Kong / Nginx)                │
│    - Authentication/Authorization                            │
│    - Request Routing                                         │
│    - Rate Limiting                                           │
│    - Load Balancing                                          │
└─────────────────────────┬────────────────────────────────────┘
                          │
            ┌─────────────┴─────────────┐
            │                           │
            ▼                           ▼
┌─────────────────────┐       ┌─────────────────────┐
│ Service Discovery   │       │  Config Server      │
│  (Eureka Server)    │       │ (Spring Cloud Config)│
└─────────────────────┘       └─────────────────────┘
            │
            └───────────────────┬───────────────────┐
                                │                   │
┌───────────────────────────────┼───────────────────┼─────────┐
│                    Microservices Layer                      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Auth        │  │  User        │  │  Order       │     │
│  │  Service     │  │  Service     │  │  Service     │     │
│  │ (Spring Boot)│  │(Spring Boot) │  │  (FastAPI)   │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │              │
│         ▼                  ▼                  ▼              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  PostgreSQL  │  │  PostgreSQL  │  │   MongoDB    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   Infrastructure Layer                       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Kafka/     │  │    Redis     │  │ Monitoring   │     │
│  │  RabbitMQ    │  │   (Cache)    │  │(Prometheus + │     │
│  │ (Event Bus)  │  │              │  │  Grafana)    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 서비스 구성

### 1. API Gateway Service
```
microservices/api-gateway/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/gitfactory/gateway/
│       │       ├── GatewayApplication.java
│       │       ├── config/
│       │       │   └── SecurityConfig.java
│       │       └── filter/
│       │           ├── AuthenticationFilter.java
│       │           └── LoggingFilter.java
│       └── resources/
│           └── application.yml
└── pom.xml
```

**주요 역할:**
- 모든 요청의 단일 진입점
- JWT 토큰 검증
- 서비스 라우팅
- Rate Limiting

### 2. Discovery Service (Eureka)
```
microservices/discovery-service/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/gitfactory/discovery/
│       │       └── DiscoveryServiceApplication.java
│       └── resources/
│           └── application.yml
└── pom.xml
```

**주요 역할:**
- 서비스 등록
- 서비스 탐색
- 헬스 체크

### 3. Config Service
```
microservices/config-service/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/gitfactory/config/
│       │       └── ConfigServiceApplication.java
│       └── resources/
│           └── application.yml
└── config-repo/  # Git repository
    ├── user-service.yml
    ├── order-service.yml
    └── auth-service.yml
```

**주요 역할:**
- 중앙 집중식 설정 관리
- 환경별 설정 분리
- 동적 설정 변경

### 4. Auth Service
```
microservices/auth-service/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/gitfactory/auth/
│       │       ├── AuthServiceApplication.java
│       │       ├── controller/
│       │       │   └── AuthController.java
│       │       ├── service/
│       │       │   └── JwtService.java
│       │       └── security/
│       │           └── SecurityConfig.java
│       └── resources/
│           └── application.yml
└── pom.xml
```

**주요 기능:**
- JWT 토큰 발급
- 사용자 인증
- OAuth 2.0 연동
- 토큰 갱신

### 5. User Service
```
microservices/user-service/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/gitfactory/user/
│       │       ├── UserServiceApplication.java
│       │       ├── controller/
│       │       ├── service/
│       │       ├── repository/
│       │       └── model/
│       └── resources/
│           └── application.yml
└── pom.xml
```

**주요 기능:**
- 사용자 CRUD
- 프로필 관리
- 권한 관리

### 6. Order Service (예시)
```
microservices/order-service/
├── main.py
├── api/
│   ├── __init__.py
│   └── routes.py
├── models/
│   └── order.py
├── services/
│   └── order_service.py
└── requirements.txt
```

**주요 기능:**
- 주문 생성/조회
- 주문 상태 관리
- 이벤트 발행

## 💻 실습 예제

### 예제 1: Service-to-Service 통신

#### Rest Template 사용 (Java)
```java
@Service
public class OrderService {
    
    @Autowired
    private RestTemplate restTemplate;
    
    public Order createOrder(CreateOrderRequest request) {
        // User Service 호출하여 사용자 정보 확인
        String userServiceUrl = "http://user-service/api/users/" + request.getUserId();
        User user = restTemplate.getForObject(userServiceUrl, User.class);
        
        // 주문 생성 로직
        Order order = new Order();
        order.setUser(user);
        // ...
        
        return orderRepository.save(order);
    }
}
```

#### Feign Client 사용 (권장)
```java
@FeignClient(name = "user-service")
public interface UserServiceClient {
    
    @GetMapping("/api/users/{id}")
    User getUserById(@PathVariable("id") Long id);
}

@Service
public class OrderService {
    
    @Autowired
    private UserServiceClient userServiceClient;
    
    public Order createOrder(CreateOrderRequest request) {
        User user = userServiceClient.getUserById(request.getUserId());
        // 주문 생성 로직
    }
}
```

### 예제 2: Circuit Breaker

```java
@Service
public class OrderService {
    
    @CircuitBreaker(name = "userService", fallbackMethod = "getUserFallback")
    public User getUser(Long userId) {
        return userServiceClient.getUserById(userId);
    }
    
    // Fallback 메서드
    private User getUserFallback(Long userId, Exception ex) {
        log.warn("User service is down, returning default user");
        return User.builder()
                .id(userId)
                .name("Unknown User")
                .build();
    }
}
```

### 예제 3: Event-Driven Communication

#### Event Producer
```java
@Service
public class OrderService {
    
    @Autowired
    private KafkaTemplate<String, OrderEvent> kafkaTemplate;
    
    public Order createOrder(CreateOrderRequest request) {
        Order order = orderRepository.save(new Order(request));
        
        // 이벤트 발행
        OrderEvent event = OrderEvent.builder()
                .orderId(order.getId())
                .userId(order.getUserId())
                .status(order.getStatus())
                .timestamp(LocalDateTime.now())
                .build();
        
        kafkaTemplate.send("order-events", event);
        
        return order;
    }
}
```

#### Event Consumer
```java
@Service
public class NotificationService {
    
    @KafkaListener(topics = "order-events", groupId = "notification-group")
    public void handleOrderEvent(OrderEvent event) {
        // 주문 알림 발송
        emailService.sendOrderConfirmation(event.getUserId(), event.getOrderId());
    }
}
```

## 📚 학습 로드맵

### Level 1: 기초
- [ ] Spring Boot 기본
- [ ] RESTful API 설계
- [ ] Database 연동 (JPA)
- [ ] Docker 기초

### Level 2: MSA 입문
- [ ] Spring Cloud Netflix
- [ ] Service Discovery (Eureka)
- [ ] API Gateway
- [ ] Config Server

### Level 3: 중급
- [ ] Circuit Breaker
- [ ] Event-Driven Architecture
- [ ] Message Queue (Kafka/RabbitMQ)
- [ ] Distributed Tracing

### Level 4: 고급
- [ ] CQRS Pattern
- [ ] Saga Pattern
- [ ] Kubernetes
- [ ] Service Mesh (Istio)

## 🔗 참고 자료

- [Martin Fowler - Microservices](https://martinfowler.com/articles/microservices.html)
- [Spring Cloud Documentation](https://spring.io/projects/spring-cloud)
- [Microservices Patterns (Chris Richardson)](https://microservices.io/patterns)
- [Building Microservices (Sam Newman)](https://samnewman.io/books/building_microservices_2nd_edition/)

---

**다음 단계**: [실습 예제 시작하기](../microservices/README.md)
