# 🚀 Spring Boot 3.x + JPA 학습 노트

> Phase 2-2: Spring Boot REST API 개발 학습 기록

**학습 기간**: 2025-11-25  
**프로젝트**: Blog REST API  
**기술 스택**: Spring Boot 3.4.0, Spring Data JPA, H2 Database, Lombok

---

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [Module 1: Entity 설계](#module-1-entity-설계)
- [Module 2: Repository](#module-2-repository)
- [Module 3: DTO](#module-3-dto)
- [Module 4: Service](#module-4-service)
- [Module 5: Controller](#module-5-controller)
- [Module 6: 설정](#module-6-설정)
- [Module 7: 테스트](#module-7-테스트)
- [핵심 개념 정리](#핵심-개념-정리)
- [학습 성과](#학습-성과)

---

## 프로젝트 개요

### 🎯 학습 목표
- Spring Boot 프로젝트 구조 이해
- JPA Entity 및 Repository 패턴 학습
- REST API 설계 및 구현
- 계층형 아키텍처 (Controller-Service-Repository) 이해

### 🛠️ 기술 스택

| 카테고리 | 기술 | 버전 |
|---------|------|------|
| Framework | Spring Boot | 3.4.0 |
| Language | Java | 17 |
| Build Tool | Gradle | 8.x |
| ORM | Spring Data JPA | 3.x |
| Database | H2 Database | 2.3.x |
| Utils | Lombok | Latest |

### 📂 프로젝트 구조
```
blog-api/
├── src/
│   ├── main/
│   │   ├── java/com/gitfactory/blogapi/
│   │   │   ├── entity/
│   │   │   │   └── Post.java                 # JPA 엔티티
│   │   │   ├── repository/
│   │   │   │   └── PostRepository.java       # 데이터 접근 계층
│   │   │   ├── dto/
│   │   │   │   ├── PostRequest.java          # 요청 DTO
│   │   │   │   └── PostResponse.java         # 응답 DTO
│   │   │   ├── service/
│   │   │   │   └── PostService.java          # 비즈니스 로직
│   │   │   ├── controller/
│   │   │   │   └── PostController.java       # REST API 엔드포인트
│   │   │   └── BlogApiApplication.java       # 메인 클래스
│   │   └── resources/
│   │       └── application.properties        # 설정 파일
│   └── test/
└── build.gradle                              # 빌드 설정
```

---

## Module 1: Entity 설계

### 📝 Post.java
```java
@Entity
@Table(name = "posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Post {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 200)
    private String title;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;
    
    @Column(nullable = false, length = 100)
    private String author;
    
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
```

### 🎓 학습 포인트

#### JPA 어노테이션
- **@Entity**: 이 클래스가 JPA 엔티티임을 선언
- **@Table(name = "posts")**: 테이블 이름 명시적 지정
- **@Id**: 기본 키(Primary Key) 지정
- **@GeneratedValue**: 자동 증가 전략
  - `IDENTITY`: 데이터베이스의 AUTO_INCREMENT 사용
- **@Column**: 컬럼 속성 설정
  - `nullable = false`: NOT NULL 제약 조건
  - `length = 200`: 최대 길이
  - `columnDefinition = "TEXT"`: 데이터베이스 타입 직접 지정

#### Lombok 어노테이션
- **@Data**: Getter/Setter/toString/equals/hashCode 자동 생성
- **@NoArgsConstructor**: 기본 생성자 자동 생성
- **@AllArgsConstructor**: 모든 필드를 포함하는 생성자 자동 생성
- **@Builder**: 빌더 패턴 적용
```java
  Post post = Post.builder()
      .title("제목")
      .content("내용")
      .author("작성자")
      .build();
```

#### JPA Auditing
- **@EntityListeners(AuditingEntityListener.class)**: JPA Auditing 활성화
- **@CreatedDate**: 엔티티 생성 시 자동으로 현재 시간 저장
- **@LastModifiedDate**: 엔티티 수정 시 자동으로 현재 시간 업데이트
- **설정 필요**: `@EnableJpaAuditing`을 메인 클래스에 추가

### 📊 생성되는 테이블 구조
```sql
CREATE TABLE posts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
```

---

## Module 2: Repository

### 📝 PostRepository.java
```java
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    
    List<Post> findByTitleContaining(String keyword);
    List<Post> findByAuthor(String author);
    List<Post> findByTitleContainingAndAuthor(String title, String author);
}
```

### 🎓 학습 포인트

#### JpaRepository 인터페이스
- **제네릭 타입**: `JpaRepository<Entity, ID 타입>`
- **기본 제공 메서드** (구현 불필요):
```java
  save(entity)           // 저장/수정
  findById(id)           // ID로 조회
  findAll()              // 전체 조회
  deleteById(id)         // ID로 삭제
  count()                // 개수 조회
  existsById(id)         // 존재 여부 확인
```

#### 쿼리 메서드 (Query Method)
Spring Data JPA가 **메서드 이름**을 분석해서 자동으로 쿼리를 생성합니다!

**규칙:**
- `findBy` + 필드명: 조회
- `countBy` + 필드명: 개수
- `deleteBy` + 필드명: 삭제
- `Containing`: LIKE %keyword%
- `And`: 여러 조건 결합

**예시:**
```java
// SELECT * FROM posts WHERE title LIKE %keyword%
List<Post> findByTitleContaining(String keyword);

// SELECT * FROM posts WHERE author = ?
List<Post> findByAuthor(String author);

// SELECT * FROM posts WHERE title LIKE %title% AND author = ?
List<Post> findByTitleContainingAndAuthor(String title, String author);
```

#### @Repository 어노테이션
- Spring의 데이터 접근 계층 컴포넌트
- 예외를 Spring의 DataAccessException으로 변환

---

## Module 3: DTO

### 📝 PostRequest.java (요청 DTO)
```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostRequest {
    private String title;
    private String content;
    private String author;
}
```

### 📝 PostResponse.java (응답 DTO)
```java
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostResponse {
    private Long id;
    private String title;
    private String content;
    private String author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public static PostResponse from(Post post) {
        return PostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .author(post.getAuthor())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }
}
```

### 🎓 학습 포인트

#### DTO (Data Transfer Object)란?
- **계층 간 데이터 전송을 위한 객체**
- Entity를 직접 노출하지 않고 필요한 데이터만 전달

#### 왜 DTO를 사용하는가?
1. **보안**: 민감한 정보 숨김 (비밀번호 등)
2. **유연성**: API 응답 형식을 자유롭게 변경
3. **성능**: 필요한 필드만 전송
4. **순환 참조 방지**: Entity 간 관계에서 무한 루프 방지

#### PostRequest vs PostResponse
- **PostRequest**: 클라이언트 → 서버 (생성/수정 요청)
  - `id` 필드 없음 (서버에서 자동 생성)
  - 타임스탬프 없음 (서버에서 자동 기록)
  
- **PostResponse**: 서버 → 클라이언트 (조회 응답)
  - `id` 포함 (클라이언트가 식별할 수 있도록)
  - 타임스탬프 포함 (생성/수정 시간 정보)

#### from() 정적 메서드
```java
Post post = /* ... */;
PostResponse response = PostResponse.from(post);
```
- Entity를 DTO로 변환하는 편리한 메서드
- 빌더 패턴으로 가독성 좋은 변환

---

## Module 4: Service

### 📝 PostService.java
```java
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    private final PostRepository postRepository;

    // 전체 조회
    public List<PostResponse> getAllPosts() {
        return postRepository.findAll()
                .stream()
                .map(PostResponse::from)
                .collect(Collectors.toList());
    }

    // ID로 조회
    public PostResponse getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return PostResponse.from(post);
    }

    // 생성
    @Transactional
    public PostResponse createPost(PostRequest request) {
        Post post = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .author(request.getAuthor())
                .build();
        Post savedPost = postRepository.save(post);
        return PostResponse.from(savedPost);
    }

    // 수정
    @Transactional
    public PostResponse updatePost(Long id, PostRequest request) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setAuthor(request.getAuthor());
        Post updatedPost = postRepository.save(post);
        return PostResponse.from(updatedPost);
    }

    // 삭제
    @Transactional
    public void deletePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        postRepository.delete(post);
    }
}
```

### 🎓 학습 포인트

#### @Service 어노테이션
- Spring의 서비스 계층 컴포넌트
- 비즈니스 로직을 담당

#### @RequiredArgsConstructor (Lombok)
- `final` 필드에 대한 생성자 자동 생성
- **의존성 주입(DI)** 방식:
```java
  // Lombok이 자동 생성
  public PostService(PostRepository postRepository) {
      this.postRepository = postRepository;
  }
```

#### @Transactional
트랜잭션 관리를 자동화하는 어노테이션

**클래스 레벨**: `@Transactional(readOnly = true)`
- 모든 메서드를 읽기 전용 트랜잭션으로 설정
- 성능 최적화 (불필요한 Dirty Checking 방지)

**메서드 레벨**: `@Transactional`
- 쓰기 작업(생성/수정/삭제)에 적용
- 메서드 레벨이 클래스 레벨보다 우선

**트랜잭션이란?**
- 여러 작업을 하나의 단위로 묶음
- 모두 성공하거나 모두 실패 (원자성)
- 예외 발생 시 자동 롤백

#### Stream API
```java
postRepository.findAll()
    .stream()                    // Stream 생성
    .map(PostResponse::from)     // Entity → DTO 변환
    .collect(Collectors.toList()); // List로 수집
```

#### Optional 처리
```java
Post post = postRepository.findById(id)
    .orElseThrow(() -> new RuntimeException("Post not found"));
```
- `findById()`는 `Optional<Post>` 반환
- `orElseThrow()`: 값이 없으면 예외 발생

---

## Module 5: Controller

### 📝 PostController.java
```java
@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable Long id) {
        return ResponseEntity.ok(postService.getPostById(id));
    }

    @PostMapping
    public ResponseEntity<PostResponse> createPost(@RequestBody PostRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(postService.createPost(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostResponse> updatePost(
            @PathVariable Long id,
            @RequestBody PostRequest request) {
        return ResponseEntity.ok(postService.updatePost(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
```

### 🎓 학습 포인트

#### @RestController
- `@Controller` + `@ResponseBody` 결합
- 모든 메서드의 반환값을 JSON으로 변환

#### @RequestMapping
- 기본 경로 설정: `/api/posts`
- 모든 메서드의 URL 앞에 자동 추가

#### HTTP 메서드 매핑
| 어노테이션 | HTTP 메서드 | 용도 |
|-----------|------------|------|
| @GetMapping | GET | 조회 |
| @PostMapping | POST | 생성 |
| @PutMapping | PUT | 수정 (전체) |
| @PatchMapping | PATCH | 수정 (일부) |
| @DeleteMapping | DELETE | 삭제 |

#### @PathVariable
URL 경로의 변수 값을 파라미터로 받음
```java
// GET /api/posts/1
@GetMapping("/{id}")
public ResponseEntity<PostResponse> getPostById(@PathVariable Long id) {
    // id = 1
}
```

#### @RequestBody
HTTP 요청 본문(JSON)을 Java 객체로 변환
```json
// POST /api/posts
{
  "title": "제목",
  "content": "내용",
  "author": "작성자"
}
```
```java
@PostMapping
public ResponseEntity<PostResponse> createPost(@RequestBody PostRequest request) {
    // request 객체로 변환됨
}
```

#### @RequestParam
쿼리 파라미터를 받음
```java
// GET /api/posts/search?keyword=spring
@GetMapping("/search")
public ResponseEntity<List<PostResponse>> search(@RequestParam String keyword) {
    // keyword = "spring"
}
```

#### ResponseEntity
HTTP 응답을 세밀하게 제어
```java
// 200 OK
ResponseEntity.ok(data)

// 201 Created
ResponseEntity.status(HttpStatus.CREATED).body(data)

// 204 No Content
ResponseEntity.noContent().build()

// 404 Not Found
ResponseEntity.notFound().build()
```

### 📡 완성된 API 엔드포인트

| HTTP 메서드 | 엔드포인트 | 설명 | 요청 본문 | 응답 |
|------------|-----------|------|----------|------|
| GET | /api/posts | 전체 조회 | - | List&lt;PostResponse&gt; |
| GET | /api/posts/{id} | ID로 조회 | - | PostResponse |
| POST | /api/posts | 생성 | PostRequest | PostResponse |
| PUT | /api/posts/{id} | 수정 | PostRequest | PostResponse |
| DELETE | /api/posts/{id} | 삭제 | - | - |
| GET | /api/posts/search?keyword=xxx | 제목 검색 | - | List&lt;PostResponse&gt; |
| GET | /api/posts/author/{author} | 작성자 검색 | - | List&lt;PostResponse&gt; |

---

## Module 6: 설정

### 📝 application.properties
```properties
# Server Port
server.port=8080

# H2 Database
spring.datasource.url=jdbc:h2:mem:blogdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JPA
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Logging
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

### 🎓 학습 포인트

#### H2 Database 설정
- **인메모리 데이터베이스**: 애플리케이션 재시작 시 데이터 초기화
- **웹 콘솔**: `http://localhost:8080/h2-console`
- **JDBC URL**: `jdbc:h2:mem:blogdb`

#### JPA 설정
- **ddl-auto 옵션**:
  - `create`: 시작 시 테이블 생성
  - `create-drop`: 시작 시 생성, 종료 시 삭제 (개발용)
  - `update`: 변경사항만 반영 (운영 주의)
  - `validate`: 스키마 검증만
  - `none`: 아무 작업 안 함

- **show-sql**: 실행되는 SQL 쿼리를 콘솔에 출력
- **format_sql**: SQL을 보기 좋게 포맷팅

#### Logging 설정
- **SQL 로깅**: 실행되는 SQL 쿼리 확인
- **파라미터 로깅**: 쿼리에 바인딩되는 값 확인

---

## Module 7: 테스트

### 🧪 API 테스트 예시

#### 1. 포스트 생성 (POST)
```bash
POST http://localhost:8080/api/posts
Content-Type: application/json

{
  "title": "첫 번째 포스트",
  "content": "Spring Boot로 만든 첫 번째 블로그 포스트입니다!",
  "author": "Hwan"
}
```

**응답:**
```json
{
  "id": 1,
  "title": "첫 번째 포스트",
  "content": "Spring Boot로 만든 첫 번째 블로그 포스트입니다!",
  "author": "Hwan",
  "createdAt": "2025-11-25T21:50:00",
  "updatedAt": "2025-11-25T21:50:00"
}
```

#### 2. 전체 조회 (GET)
```bash
GET http://localhost:8080/api/posts
```

**응답:**
```json
[
  {
    "id": 1,
    "title": "첫 번째 포스트",
    "content": "Spring Boot로 만든 첫 번째 블로그 포스트입니다!",
    "author": "Hwan",
    "createdAt": "2025-11-25T21:50:00",
    "updatedAt": "2025-11-25T21:50:00"
  }
]
```

#### 3. ID로 조회 (GET)
```bash
GET http://localhost:8080/api/posts/1
```

#### 4. 수정 (PUT)
```bash
PUT http://localhost:8080/api/posts/1
Content-Type: application/json

{
  "title": "수정된 제목",
  "content": "수정된 내용입니다.",
  "author": "Hwan"
}
```

#### 5. 삭제 (DELETE)
```bash
DELETE http://localhost:8080/api/posts/1
```

**응답:** `204 No Content`

#### 6. 제목 검색 (GET)
```bash
GET http://localhost:8080/api/posts/search?keyword=Spring
```

#### 7. 작성자 검색 (GET)
```bash
GET http://localhost:8080/api/posts/author/Hwan
```

---

## 핵심 개념 정리

### 🏗️ 계층형 아키텍처 (Layered Architecture)
```
┌─────────────────────────────────────┐
│        Controller (REST API)        │  ← HTTP 요청/응답
├─────────────────────────────────────┤
│       Service (비즈니스 로직)        │  ← 트랜잭션, 검증
├─────────────────────────────────────┤
│    Repository (데이터 접근 계층)     │  ← SQL 쿼리
├─────────────────────────────────────┤
│          Database (H2)              │  ← 데이터 저장
└─────────────────────────────────────┘
```

**각 계층의 역할:**
- **Controller**: HTTP 요청 처리, 응답 반환
- **Service**: 비즈니스 로직, 트랜잭션 관리
- **Repository**: 데이터베이스 접근
- **Entity**: 데이터베이스 테이블과 매핑
- **DTO**: 계층 간 데이터 전송

### 🔄 요청 흐름
```
1. 클라이언트 → HTTP 요청
2. Controller → 요청 받음, DTO로 변환
3. Service → 비즈니스 로직 처리
4. Repository → 데이터베이스 조회/저장
5. Entity ↔ Repository ↔ Database
6. Service → Entity를 DTO로 변환
7. Controller → HTTP 응답 반환
8. 클라이언트 ← JSON 응답
```

### 📊 JPA Entity Lifecycle
```
New (비영속)
    ↓ persist()
Managed (영속) ← merge()
    ↓ remove()
Removed (삭제)
    ↓ flush()
Detached (준영속)
```

### 🔐 Spring의 의존성 주입 (DI)
```java
@Service
@RequiredArgsConstructor  // ← Lombok이 생성자 자동 생성
public class PostService {
    private final PostRepository postRepository;  // ← final = 불변
    // Spring이 자동으로 PostRepository 구현체 주입
}
```

**장점:**
- 결합도 낮춤 (Loose Coupling)
- 테스트 용이
- 코드 재사용성 향상

---

## 학습 성과

### ✅ 완료된 학습 내용

#### 1. Spring Boot 기초
- [x] 프로젝트 생성 및 구조 이해
- [x] Gradle 빌드 시스템
- [x] application.properties 설정

#### 2. JPA & Hibernate
- [x] Entity 설계 및 매핑
- [x] JPA Auditing (@CreatedDate, @LastModifiedDate)
- [x] Repository 인터페이스
- [x] 쿼리 메서드 (Query Method)

#### 3. 계층형 아키텍처
- [x] Controller 계층 (REST API)
- [x] Service 계층 (비즈니스 로직)
- [x] Repository 계층 (데이터 접근)
- [x] DTO 패턴

#### 4. REST API 설계
- [x] HTTP 메서드 (GET, POST, PUT, DELETE)
- [x] URL 설계
- [x] 요청/응답 처리
- [x] 상태 코드 (200, 201, 204)

#### 5. Spring 핵심 개념
- [x] 의존성 주입 (DI)
- [x] 트랜잭션 관리 (@Transactional)
- [x] 컴포넌트 스캔
- [x] Lombok 활용

### 📊 코드 통계
```
총 파일: 8개
├── Entity: 1개 (Post.java)
├── Repository: 1개 (PostRepository.java)
├── DTO: 2개 (PostRequest.java, PostResponse.java)
├── Service: 1개 (PostService.java)
├── Controller: 1개 (PostController.java)
├── Main: 1개 (BlogApiApplication.java)
└── Config: 1개 (application.properties)

총 코드: ~350줄
API 엔드포인트: 7개
커밋: 2개
```

### 🎯 API 엔드포인트 완성도

| 기능 | 엔드포인트 | 상태 |
|-----|-----------|------|
| 전체 조회 | GET /api/posts | ✅ |
| ID 조회 | GET /api/posts/{id} | ✅ |
| 생성 | POST /api/posts | ✅ |
| 수정 | PUT /api/posts/{id} | ✅ |
| 삭제 | DELETE /api/posts/{id} | ✅ |
| 제목 검색 | GET /api/posts/search?keyword=xxx | ✅ |
| 작성자 검색 | GET /api/posts/author/{author} | ✅ |

### 🚀 다음 단계

#### Phase 2-3: 추가 기능 구현 (예정)
- [ ] 페이지네이션 (Pagination)
- [ ] 정렬 (Sorting)
- [ ] 예외 처리 (@ControllerAdvice)
- [ ] Validation (@Valid, @NotNull)
- [ ] PostgreSQL 연동
- [ ] Docker 컨테이너화

---

## 🎓 학습 회고

### 잘한 점
- ✅ 계층형 아키텍처를 명확하게 분리
- ✅ DTO 패턴으로 Entity 직접 노출 방지
- ✅ Lombok으로 보일러플레이트 코드 최소화
- ✅ JPA Auditing으로 타임스탬프 자동 관리
- ✅ 쿼리 메서드로 SQL 없이 데이터 조회

### 개선할 점
- 예외 처리를 `RuntimeException` 대신 커스텀 예외로 개선
- 입력 검증 (Validation) 추가 필요
- 테스트 코드 작성 필요
- API 문서화 (Swagger/OpenAPI) 고려

### 배운 것
- Spring Boot의 자동 설정이 개발을 얼마나 빠르게 만드는지 체감
- JPA가 SQL을 자동 생성하는 강력함
- 계층 분리의 중요성 (유지보수성 향상)
- Lombok이 코드를 얼마나 간결하게 만드는지 실감

---

**학습 완료일**: 2025-11-25  
**소요 시간**: 약 3-4시간  
**다음 학습**: Phase 2-3 (고급 기능 및 Docker)

**Made with ❤️ for Learning**