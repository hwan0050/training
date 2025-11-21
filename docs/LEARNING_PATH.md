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

- [Phase 1: 기초 다지기](#phase-1-기초-다지기-1-2개월)
- [Phase 2: 중급 개발](#phase-2-중급-개발-2-3개월)
- [Phase 3: MSA 아키텍처](#phase-3-msa-아키텍처-3-4개월)
- [Phase 4: 실전 프로젝트](#phase-4-실전-프로젝트-진행-중)

---

## Phase 1: 기초 다지기 (1-2개월)

### 🎓 학습 목표
- Git을 자유자재로 사용
- TypeScript로 타입 안전한 코드 작성
- React 핵심 개념 이해
- Java와 Python 기본 문법 숙달
- 기본적인 REST API 이해

### Week 1-2: Git & 협업 도구

#### 학습 내용
- [x] Git 기본 명령어 (add, commit, push, pull)
- [x] 브랜치 생성 및 병합
- [x] Conflict 해결
- [x] GitHub 사용법
- [x] Pull Request 작성

#### 실습 과제
```bash
# 실습 1: 첫 PR 만들기
cd workflows/git-basics
# README.md 파일 수정
git checkout -b feature/my-first-pr
git add README.md
git commit -m "docs: Update README with learning notes"
git push origin feature/my-first-pr
# GitHub에서 PR 생성
```

#### 학습 자료
- [Git 공식 문서](https://git-scm.com/doc)
- [Git 브랜치 전략](../docs/GIT_WORKFLOW.md)
- [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials)

#### 체크포인트
- [x] Git 기본 명령어 숙달
- [x] 브랜치 전략 이해
- [x] Conflict 해결 경험
- [x] Pull Request 작성 및 Merge

**✅ Week 1-2 완료! (2024-11-18)**

---

### Week 3-4: TypeScript 기초

#### 학습 내용
- [x] TypeScript 설치 및 설정
- [x] 기본 타입 (string, number, boolean, array)
- [x] 인터페이스 (Interface)
- [x] 타입 별칭 (Type Alias)
- [x] 유니온과 인터섹션 타입
- [x] 제네릭 기초

#### 실습 과제
```typescript
// practices/typescript/fundamentals/user-types.ts

// Task 1: User 인터페이스 정의
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;  // Optional
}

// Task 2: 사용자 배열 타입 정의
type Users = User[];

// Task 3: 사용자 조회 함수 (제네릭)
function findUser<T extends User>(users: T[], id: number): T | undefined {
  return users.find(user => user.id === id);
}

// Task 4: 사용자 생성 함수
function createUser(name: string, email: string): User {
  return {
    id: Date.now(),
    name,
    email
  };
}
```

#### 체크포인트
- [x] TypeScript 컴파일 오류 없이 코드 작성 가능
- [x] 인터페이스와 타입 차이점 설명 가능
- [x] 제네릭의 필요성 이해
- [x] 유틸리티 타입 (Partial, Pick, Omit) 활용

**✅ Week 3-4 완료! (2024-11-18)**

---

### Week 5-6: React 기초

#### 학습 내용
- [x] React 설치 및 프로젝트 생성
- [x] JSX 문법
- [x] 컴포넌트 (함수형)
- [x] Props와 State
- [x] useState Hook
- [x] useEffect Hook
- [x] 이벤트 핸들링
- [x] 조건부 렌더링
- [x] 리스트 렌더링

#### 실습 과제
```typescript
// practices/react/components/UserList.tsx

import { FC, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserListProps {
  initialUsers: User[];
}

export const UserList: FC<UserListProps> = ({ initialUsers }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};
```

#### 체크포인트
- [x] 함수형 컴포넌트 작성 가능
- [x] useState Hook 사용 가능
- [x] useEffect Hook 활용 (타이머, API 호출, 이벤트 리스너)
- [x] Props 전달 및 사용 이해
- [x] 이벤트 핸들러 작성 가능
- [x] 조건부 렌더링 구현

**✅ Week 5-6 완료! (2024-11-18)**

---

### Week 7-8: Java & Spring Boot 기초

#### 학습 내용
- [ ] Java 기본 문법
- [ ] 객체 지향 프로그래밍 (OOP)
- [ ] Spring Boot 프로젝트 생성
- [ ] REST Controller 작성
- [ ] 의존성 주입 (DI)
- [ ] Spring Boot Starter

#### 실습 과제
```java
// practices/java/spring-boot/UserController.java

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final UserService userService;
    
    // 생성자 주입 (권장)
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody CreateUserRequest request) {
        User user = userService.create(request);
        return ResponseEntity
                .created(URI.create("/api/users/" + user.getId()))
                .body(user);
    }
}
```

#### 체크포인트
- [ ] Spring Boot 애플리케이션 실행 가능
- [ ] REST API 엔드포인트 작성 가능
- [ ] 의존성 주입 개념 이해
- [ ] HTTP 메서드 (GET, POST, PUT, DELETE) 이해

---

### Week 9-10: Python & FastAPI 기초

#### 학습 내용
- [ ] Python 기본 문법
- [ ] 타입 힌트
- [ ] FastAPI 설치 및 프로젝트 생성
- [ ] Pydantic 모델
- [ ] 비동기 프로그래밍 기초 (async/await)

#### 실습 과제
```python
# practices/python/fastapi/main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List, Optional

app = FastAPI(title="User API")

class User(BaseModel):
    id: int
    name: str
    email: EmailStr
    age: Optional[int] = None

# In-memory database
users_db: List[User] = []

@app.get("/api/users", response_model=List[User])
async def get_users():
    """모든 사용자 조회"""
    return users_db

@app.get("/api/users/{user_id}", response_model=User)
async def get_user(user_id: int):
    """특정 사용자 조회"""
    for user in users_db:
        if user.id == user_id:
            return user
    raise HTTPException(status_code=404, detail="User not found")

@app.post("/api/users", response_model=User, status_code=201)
async def create_user(user: User):
    """사용자 생성"""
    users_db.append(user)
    return user
```

#### 체크포인트
- [ ] FastAPI 애플리케이션 실행 가능
- [ ] Pydantic 모델 정의 가능
- [ ] async/await 기본 이해
- [ ] 자동 문서화 (Swagger) 확인 가능

---

### Phase 1 총정리 프로젝트

**프로젝트: 간단한 Todo 애플리케이션**
```
Frontend: React + TypeScript
Backend: Spring Boot 또는 FastAPI
기능:
  - Todo 목록 조회
  - Todo 추가
  - Todo 완료 처리
  - Todo 삭제
```

**평가 기준:**
- [ ] Git 브랜치 전략 사용
- [ ] TypeScript 타입 정의
- [ ] React 컴포넌트 구조화
- [ ] REST API 설계
- [ ] 에러 핸들링

---

## Phase 2: 중급 개발 (2-3개월)

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
- [ ] Server Component와 Client Component 구분 가능
- [ ] App Router로 라우팅 구현 가능
- [ ] 서버 사이드 데이터 페칭 이해
- [ ] Metadata 설정 가능

---

### Week 14-16: Spring Boot 심화 (JPA)

#### 학습 내용
- [ ] JPA/Hibernate 개념
- [ ] Entity 설계
- [ ] Repository 패턴
- [ ] 연관 관계 매핑 (1:N, N:M)
- [ ] Query Method
- [ ] JPQL & Native Query

#### 실습 과제
```java
// practices/java/jpa/entity/User.java

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders = new ArrayList<>();
    
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
}

// practices/java/jpa/repository/UserRepository.java

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    List<User> findByNameContaining(String keyword);
    
    @Query("SELECT u FROM User u WHERE u.createdAt > :date")
    List<User> findUsersCreatedAfter(@Param("date") LocalDateTime date);
    
    @Query(value = "SELECT * FROM users WHERE email LIKE %:domain", 
           nativeQuery = true)
    List<User> findByEmailDomain(@Param("domain") String domain);
}
```

#### 체크포인트
- [ ] Entity 설계 및 연관 관계 매핑 가능
- [ ] Repository Query Method 작성 가능
- [ ] JPQL 쿼리 작성 가능
- [ ] N+1 문제 이해 및 해결

---

### Week 17-19: Spring Security & JWT

#### 학습 내용
- [ ] Spring Security 개념
- [ ] JWT (JSON Web Token)
- [ ] 인증 (Authentication)
- [ ] 인가 (Authorization)
- [ ] Password 암호화
- [ ] Security Filter Chain

#### 실습 과제
```java
// practices/java/security/config/SecurityConfig.java

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .addFilterBefore(jwtAuthenticationFilter(), 
                           UsernamePasswordAuthenticationFilter.class)
            .build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

// practices/java/security/service/JwtService.java

@Service
public class JwtService {
    
    @Value("${jwt.secret}")
    private String secret;
    
    @Value("${jwt.expiration}")
    private Long expiration;
    
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities());
        
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }
    
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
```

#### 체크포인트
- [ ] JWT 토큰 생성 및 검증 가능
- [ ] Spring Security 설정 가능
- [ ] 인증/인가 구분 이해
- [ ] Role 기반 접근 제어 구현 가능

---

### Week 20-22: 테스트 주도 개발 (TDD)

#### 학습 내용
- [ ] 단위 테스트 (Unit Test)
- [ ] 통합 테스트 (Integration Test)
- [ ] Mocking (Mockito)
- [ ] Test Coverage
- [ ] TDD 사이클 (Red-Green-Refactor)

#### 실습 과제
```java
// practices/java/tdd/service/UserService.java

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public UserService(UserRepository userRepository, 
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    public User register(RegisterRequest request) {
        // 이메일 중복 체크
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException("Email already exists");
        }
        
        // 사용자 생성
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        
        return userRepository.save(user);
    }
}

// practices/java/tdd/service/UserServiceTest.java

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    @DisplayName("정상적인 회원가입")
    void register_Success() {
        // Given
        RegisterRequest request = new RegisterRequest("John", "john@example.com", "password123");
        when(userRepository.existsByEmail(request.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encoded");
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));
        
        // When
        User user = userService.register(request);
        
        // Then
        assertNotNull(user);
        assertEquals("John", user.getName());
        assertEquals("john@example.com", user.getEmail());
        verify(userRepository).save(any(User.class));
    }
    
    @Test
    @DisplayName("이메일 중복 시 예외 발생")
    void register_DuplicateEmail_ThrowsException() {
        // Given
        RegisterRequest request = new RegisterRequest("John", "john@example.com", "password123");
        when(userRepository.existsByEmail(request.getEmail())).thenReturn(true);
        
        // When & Then
        assertThrows(DuplicateEmailException.class, () -> {
            userService.register(request);
        });
    }
}
```

#### 체크포인트
- [ ] JUnit 5 테스트 작성 가능
- [ ] Mockito로 의존성 Mocking 가능
- [ ] Test Coverage 80% 이상 달성
- [ ] TDD 사이클 실천

---

### Week 23-24: Docker & 컨테이너화

#### 학습 내용
- [ ] Docker 개념 및 설치
- [ ] Dockerfile 작성
- [ ] Docker Image 빌드
- [ ] Docker Compose
- [ ] 멀티 스테이지 빌드

#### 실습 과제
```dockerfile
# practices/java/docker/Dockerfile

# Build stage
FROM maven:3.9-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```
```yaml
# practices/docker/docker-compose.yml

version: '3.8'

services:
  user-service:
    build: ./user-service
    ports:
      - "8081:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/userdb
      - SPRING_DATASOURCE_USERNAME=postgres
      - SPRING_DATASOURCE_PASSWORD=password
    depends_on:
      - postgres
    networks:
      - app-network

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=userdb
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - app-network

volumes:
  postgres-data:

networks:
  app-network:
    driver: bridge
```

#### 체크포인트
- [ ] Dockerfile 작성 및 이미지 빌드 가능
- [ ] Docker Compose로 다중 컨테이너 실행 가능
- [ ] 멀티 스테이지 빌드 이해
- [ ] 볼륨과 네트워크 설정 가능

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

## Phase 3: MSA 아키텍처 (3-4개월)

### 🎓 학습 목표
- Spring Cloud Netflix 활용
- 마이크로서비스 설계 및 구현
- Event-Driven Architecture
- 분산 시스템 이해

### Week 25-28: Spring Cloud 기초

#### 학습 내용
- [ ] Service Discovery (Eureka)
- [ ] API Gateway (Spring Cloud Gateway)
- [ ] Config Server
- [ ] Feign Client
- [ ] Load Balancing

#### 실습 과제
상세한 내용은 [MSA 아키텍처 가이드](MSA_ARCHITECTURE.md) 참조

#### 체크포인트
- [ ] Eureka Server 구축 가능
- [ ] API Gateway 설정 가능
- [ ] Feign Client로 서비스 간 통신 구현
- [ ] Config Server 설정 가능

---

### Week 29-32: Event-Driven Architecture

#### 학습 내용
- [ ] Apache Kafka 개념
- [ ] Producer & Consumer
- [ ] Event Sourcing
- [ ] CQRS 패턴
- [ ] Saga 패턴

#### 체크포인트
- [ ] Kafka Producer/Consumer 구현 가능
- [ ] Event-Driven 패턴 이해
- [ ] CQRS 패턴 적용 가능
- [ ] Saga 패턴으로 분산 트랜잭션 관리

---

### Week 33-36: Monitoring & Observability

#### 학습 내용
- [ ] Spring Boot Actuator
- [ ] Prometheus
- [ ] Grafana
- [ ] ELK Stack (Elasticsearch, Logstash, Kibana)
- [ ] Distributed Tracing (Zipkin/Jaeger)

#### 체크포인트
- [ ] Actuator로 헬스 체크 구현
- [ ] Prometheus + Grafana 대시보드 구성
- [ ] 로그 수집 및 분석
- [ ] 분산 트레이싱 구현

---

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

## Phase 4: 실전 프로젝트 (진행 중)

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

#### Frontend
- [x] TypeScript 타입 시스템 숙달
- [x] React Hooks 자유자재로 사용
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
- [ ] Docker 컨테이너화
- [ ] Docker Compose 활용
- [ ] CI/CD 파이프라인 구축
- [ ] Kubernetes 기초 (학습 중)

---

## 🎯 다음 단계

현재 단계를 완료하면:
1. [실습 프로젝트](../projects/README.md) 시작
2. [MSA 아키텍처](MSA_ARCHITECTURE.md) 심화 학습
3. 오픈소스 기여
4. 개인 포트폴리오 프로젝트

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

**학습은 여정입니다. 꾸준히 나아가세요! 🚀**