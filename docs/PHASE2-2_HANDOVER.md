# 📋 Phase 2-2 핸드오버 문서

> Spring Boot 3.x + JPA 학습 프로젝트 인수인계 문서

**작성일**: 2025-11-25  
**프로젝트**: Blog REST API  
**브랜치**: feature/spring-boot-jpa

---

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [완료된 작업](#완료된-작업)
- [프로젝트 구조](#프로젝트-구조)
- [실행 방법](#실행-방법)
- [API 명세](#api-명세)
- [기술 스택](#기술-스택)
- [주요 코드 설명](#주요-코드-설명)
- [트러블슈팅](#트러블슈팅)
- [다음 단계](#다음-단계)

---

## 프로젝트 개요

### 🎯 목적
Spring Boot와 JPA를 활용한 RESTful API 개발 학습

### 📅 작업 기간
- **시작**: 2025-11-25
- **완료**: 2025-11-25
- **소요 시간**: 약 3-4시간

### 🎓 학습 목표
- [x] Spring Boot 프로젝트 구조 이해
- [x] JPA Entity 및 Repository 패턴
- [x] REST API 설계 및 구현
- [x] 계층형 아키텍처 적용

---

## 완료된 작업

### ✅ Module 1: 프로젝트 초기화
- Spring Boot 3.4.0 프로젝트 생성
- Gradle 빌드 설정
- 의존성 추가:
  - Spring Web
  - Spring Data JPA
  - H2 Database
  - Lombok
  - Spring Boot DevTools

**커밋**: `feat: Initialize Spring Boot project with basic dependencies`

### ✅ Module 2: Entity 설계
- Post 엔티티 생성
- JPA 어노테이션 적용
- JPA Auditing 설정 (createdAt, updatedAt)
- Lombok으로 보일러플레이트 코드 제거

**파일**: `entity/Post.java`

### ✅ Module 3: Repository 구현
- PostRepository 인터페이스 생성
- JpaRepository 상속
- 쿼리 메서드 3개 추가:
  - `findByTitleContaining()`
  - `findByAuthor()`
  - `findByTitleContainingAndAuthor()`

**파일**: `repository/PostRepository.java`

### ✅ Module 4: DTO 생성
- PostRequest (요청 DTO)
- PostResponse (응답 DTO)
- Entity ↔ DTO 변환 메서드

**파일**: `dto/PostRequest.java`, `dto/PostResponse.java`

### ✅ Module 5: Service 계층
- PostService 클래스 생성
- CRUD 비즈니스 로직 구현
- 트랜잭션 관리 적용
- 검색 기능 구현

**파일**: `service/PostService.java`

### ✅ Module 6: Controller 구현
- PostController 클래스 생성
- REST API 엔드포인트 7개 구현
- HTTP 메서드별 매핑
- ResponseEntity로 응답 제어

**파일**: `controller/PostController.java`

### ✅ Module 7: 설정 및 테스트
- application.properties 설정
- H2 데이터베이스 설정
- API 테스트 완료

**커밋**: `feat: Implement Blog REST API with CRUD operations`

---

## 프로젝트 구조
```
blog-api/
├── src/
│   ├── main/
│   │   ├── java/com/gitfactory/blogapi/
│   │   │   ├── controller/
│   │   │   │   └── PostController.java        # REST API 엔드포인트
│   │   │   ├── service/
│   │   │   │   └── PostService.java           # 비즈니스 로직
│   │   │   ├── repository/
│   │   │   │   └── PostRepository.java        # 데이터 접근 계층
│   │   │   ├── entity/
│   │   │   │   └── Post.java                  # JPA 엔티티
│   │   │   ├── dto/
│   │   │   │   ├── PostRequest.java           # 요청 DTO
│   │   │   │   └── PostResponse.java          # 응답 DTO
│   │   │   └── BlogApiApplication.java        # 메인 클래스
│   │   └── resources/
│   │       └── application.properties         # 설정 파일
│   └── test/
│       └── java/com/gitfactory/blogapi/
│           └── BlogApiApplicationTests.java
├── gradle/
├── build.gradle                                # Gradle 빌드 설정
├── settings.gradle
├── gradlew
├── gradlew.bat
└── README.md
```

### 📊 코드 통계
```
총 파일: 8개
총 코드: ~350줄

파일별 라인 수:
├── Post.java: ~40줄
├── PostRepository.java: ~15줄
├── PostRequest.java: ~15줄
├── PostResponse.java: ~30줄
├── PostService.java: ~80줄
├── PostController.java: ~70줄
├── BlogApiApplication.java: ~15줄
└── application.properties: ~20줄

커밋: 2개
API 엔드포인트: 7개
```

---

## 실행 방법

### 1️⃣ 사전 요구사항

- **Java 17** 이상 설치
- **IntelliJ IDEA** (또는 Eclipse)
- **Gradle** (또는 Gradle Wrapper 사용)

### 2️⃣ 프로젝트 실행

#### IntelliJ에서 실행
```bash
1. IntelliJ IDEA 실행
2. File → Open
3. blog-api 폴더 선택
4. BlogApiApplication.java 열기
5. 녹색 실행 버튼 클릭 (▶️)
```

#### Gradle로 실행
```bash
# Windows
cd F:\workspace\git-factory\practices\java\spring-boot\blog-api
.\gradlew.bat bootRun

# Linux/Mac
./gradlew bootRun
```

### 3️⃣ 실행 확인

**콘솔 로그 확인:**
```
Tomcat started on port(s): 8080
Started BlogApiApplication in X.XXX seconds
```

**브라우저에서 확인:**
```
http://localhost:8080/api/posts
```
→ 빈 배열 `[]` 응답이 오면 성공!

**H2 콘솔 접속:**
```
http://localhost:8080/h2-console

JDBC URL: jdbc:h2:mem:blogdb
Username: sa
Password: (비워두기)
```

---

## API 명세

### Base URL
```
http://localhost:8080/api
```

### 엔드포인트 목록

#### 1. 전체 포스트 조회
```http
GET /api/posts
```

**응답 예시:**
```json
[
  {
    "id": 1,
    "title": "첫 번째 포스트",
    "content": "내용입니다.",
    "author": "Hwan",
    "createdAt": "2025-11-25T21:50:00",
    "updatedAt": "2025-11-25T21:50:00"
  }
]
```

#### 2. 포스트 상세 조회
```http
GET /api/posts/{id}
```

**Path Variable:**
- `id` (Long): 포스트 ID

**응답 예시:**
```json
{
  "id": 1,
  "title": "첫 번째 포스트",
  "content": "내용입니다.",
  "author": "Hwan",
  "createdAt": "2025-11-25T21:50:00",
  "updatedAt": "2025-11-25T21:50:00"
}
```

**에러 응답 (404):**
```
Post not found with id: 999
```

#### 3. 포스트 생성
```http
POST /api/posts
Content-Type: application/json
```

**요청 본문:**
```json
{
  "title": "새 포스트",
  "content": "포스트 내용입니다.",
  "author": "작성자"
}
```

**응답 (201 Created):**
```json
{
  "id": 1,
  "title": "새 포스트",
  "content": "포스트 내용입니다.",
  "author": "작성자",
  "createdAt": "2025-11-25T21:50:00",
  "updatedAt": "2025-11-25T21:50:00"
}
```

#### 4. 포스트 수정
```http
PUT /api/posts/{id}
Content-Type: application/json
```

**Path Variable:**
- `id` (Long): 수정할 포스트 ID

**요청 본문:**
```json
{
  "title": "수정된 제목",
  "content": "수정된 내용",
  "author": "작성자"
}
```

**응답 (200 OK):**
```json
{
  "id": 1,
  "title": "수정된 제목",
  "content": "수정된 내용",
  "author": "작성자",
  "createdAt": "2025-11-25T21:50:00",
  "updatedAt": "2025-11-25T22:00:00"
}
```

#### 5. 포스트 삭제
```http
DELETE /api/posts/{id}
```

**Path Variable:**
- `id` (Long): 삭제할 포스트 ID

**응답 (204 No Content):**
```
(빈 응답)
```

#### 6. 제목으로 검색
```http
GET /api/posts/search?keyword={keyword}
```

**Query Parameter:**
- `keyword` (String): 검색 키워드

**예시:**
```
GET /api/posts/search?keyword=Spring
```

**응답 (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Spring Boot 학습",
    "content": "...",
    "author": "Hwan",
    "createdAt": "2025-11-25T21:50:00",
    "updatedAt": "2025-11-25T21:50:00"
  }
]
```

#### 7. 작성자로 검색
```http
GET /api/posts/author/{author}
```

**Path Variable:**
- `author` (String): 작성자 이름

**예시:**
```
GET /api/posts/author/Hwan
```

**응답 (200 OK):**
```json
[
  {
    "id": 1,
    "title": "첫 번째 포스트",
    "content": "...",
    "author": "Hwan",
    "createdAt": "2025-11-25T21:50:00",
    "updatedAt": "2025-11-25T21:50:00"
  }
]
```

### HTTP 상태 코드

| 상태 코드 | 설명 |
|---------|------|
| 200 OK | 성공 (조회, 수정) |
| 201 Created | 생성 성공 |
| 204 No Content | 삭제 성공 (응답 본문 없음) |
| 404 Not Found | 리소스를 찾을 수 없음 |
| 500 Internal Server Error | 서버 에러 |

---

## 기술 스택

### Framework & Language
- **Spring Boot**: 3.4.0
- **Java**: 17.0.6
- **Gradle**: 8.x

### Dependencies
```gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    runtimeOnly 'com.h2database:h2'
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    developmentOnly 'org.springframework.boot:spring-boot-devtools'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

### Database
- **H2 Database**: 2.3.232 (인메모리)
- **JPA/Hibernate**: 6.6.36

---

## 주요 코드 설명

### 1. Entity (Post.java)
```java
@Entity
@Table(name = "posts")
@Data
@EntityListeners(AuditingEntityListener.class)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 200)
    private String title;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
```

**주요 포인트:**
- `@Entity`: JPA 엔티티 선언
- `@GeneratedValue`: ID 자동 생성 (AUTO_INCREMENT)
- `@CreatedDate/@LastModifiedDate`: JPA Auditing (자동 타임스탬프)

### 2. Repository (PostRepository.java)
```java
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByTitleContaining(String keyword);
}
```

**주요 포인트:**
- `JpaRepository` 상속으로 기본 CRUD 자동 제공
- 쿼리 메서드: 메서드 이름으로 SQL 자동 생성

### 3. Service (PostService.java)
```java
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {
    private final PostRepository postRepository;
    
    @Transactional
    public PostResponse createPost(PostRequest request) {
        Post post = Post.builder()
                .title(request.getTitle())
                .build();
        return PostResponse.from(postRepository.save(post));
    }
}
```

**주요 포인트:**
- `@Transactional`: 트랜잭션 자동 관리
- `readOnly = true`: 조회 성능 최적화
- Builder 패턴으로 객체 생성

### 4. Controller (PostController.java)
```java
@RestController
@RequestMapping("/api/posts")
public class PostController {
    
    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }
    
    @PostMapping
    public ResponseEntity<PostResponse> createPost(@RequestBody PostRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(postService.createPost(request));
    }
}
```

**주요 포인트:**
- `@RestController`: JSON 응답 자동 변환
- `@RequestMapping`: 기본 경로 설정
- `ResponseEntity`: HTTP 상태 코드 제어

---

## 트러블슈팅

### Issue 1: IntelliJ 프로젝트 중첩 문제

**문제:**
IntelliJ에서 처음 프로젝트 생성 시 `blog-api` 폴더가 중첩되는 문제 발생

**원인:**
Spring Initializr로 생성 시 경로 설정 오류

**해결:**
1. 기존 프로젝트 삭제
2. Spring Initializr 웹사이트에서 프로젝트 생성
3. 다운로드한 zip 파일을 원하는 경로에 압축 해제
4. IntelliJ에서 해당 폴더 열기

### Issue 2: Lombok 인식 안됨

**문제:**
Lombok 어노테이션이 인식되지 않음

**해결:**
1. IntelliJ: File → Settings → Plugins
2. "Lombok" 검색 후 설치
3. File → Settings → Build, Execution, Deployment → Compiler → Annotation Processors
4. "Enable annotation processing" 체크

### Issue 3: H2 Console 접속 안됨

**문제:**
`/h2-console` 경로 접속 시 404 에러

**원인:**
`application.properties`에서 H2 콘솔 활성화 누락

**해결:**
```properties
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

---

## 다음 단계

### Phase 2-3: 기능 확장 (예정)

#### 1. 예외 처리
- [ ] 커스텀 예외 클래스 생성
- [ ] @ControllerAdvice로 전역 예외 처리
- [ ] 에러 응답 DTO 추가

#### 2. Validation
- [ ] @Valid 어노테이션 적용
- [ ] @NotNull, @Size 등 검증 어노테이션
- [ ] 유효성 검사 실패 시 400 에러

#### 3. 페이지네이션
- [ ] Pageable 파라미터 추가
- [ ] Page<PostResponse> 반환
- [ ] 정렬 기능 추가

#### 4. PostgreSQL 연동
- [ ] H2 → PostgreSQL 변경
- [ ] Docker Compose로 DB 실행
- [ ] 프로파일 분리 (dev, prod)

#### 5. Docker 컨테이너화
- [ ] Dockerfile 작성
- [ ] docker-compose.yml 작성
- [ ] 멀티 스테이지 빌드

#### 6. 테스트 코드
- [ ] 단위 테스트 (JUnit 5)
- [ ] 통합 테스트 (@SpringBootTest)
- [ ] MockMvc로 Controller 테스트

---

## 체크리스트

### ✅ 인수인계 완료 항목

- [x] 프로젝트 실행 가능 확인
- [x] API 테스트 완료
- [x] 코드 주석 및 문서화
- [x] Git 커밋 정리
- [x] 학습 노트 작성
- [x] 핸드오버 문서 작성

### 📝 인수자 확인 사항

- [ ] Java 17 설치 확인
- [ ] IntelliJ IDEA 설치 확인
- [ ] 프로젝트 실행 확인
- [ ] API 엔드포인트 테스트
- [ ] H2 Console 접속 확인
- [ ] 학습 노트 읽기
- [ ] 다음 단계 계획 확인

---

## 참고 자료

### 공식 문서
- [Spring Boot 공식 문서](https://spring.io/projects/spring-boot)
- [Spring Data JPA 문서](https://spring.io/projects/spring-data-jpa)
- [H2 Database 문서](https://www.h2database.com/)
- [Lombok 공식 사이트](https://projectlombok.org/)

### 학습 자료
- [Git Factory 학습 노트](./SPRING_BOOT_LEARNING.md)
- [Git Factory 로드맵](../../docs/LEARNING_PATH.md)
- [Baeldung Spring Boot Tutorials](https://www.baeldung.com/spring-boot)

---

## 연락처

**작성자**: Hwan Lee  
**Email**: akma0050@naver.com  
**GitHub**: [@hwan0050](https://github.com/hwan0050)  
**Repository**: [git-factory](https://github.com/hwan0050/git-factory)

---

**작성일**: 2025-11-25  
**버전**: 1.0.0  
**상태**: ✅ 완료

**Made with ❤️ for Learning**