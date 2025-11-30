# Phase 2-4: TDD & Spring Boot Testing 학습 노트

## 📚 학습 개요

**기간**: Phase 2-4  
**주제**: TDD (Test-Driven Development) & Spring Boot 테스트  
**목표**: Repository, Service, Controller 계층별 테스트 작성 및 실행

---

## 🎯 학습 목표 달성 현황

- ✅ TDD 개념 이해 및 적용
- ✅ Spring Boot Test Slice 어노테이션 활용
- ✅ Mockito를 활용한 단위 테스트 작성
- ✅ MockMvc를 활용한 Controller 테스트 작성
- ✅ Given-When-Then 패턴 적용
- ✅ 총 25개 테스트 케이스 작성 및 통과

---

## 1️⃣ TDD (Test-Driven Development)

### 📖 TDD란?

**테스트 주도 개발(Test-Driven Development)**은 테스트를 먼저 작성하고, 그 테스트를 통과하는 코드를 작성하는 개발 방법론입니다.

### 🔄 TDD 사이클: Red-Green-Refactor

```
1. Red (실패하는 테스트 작성)
   ↓
2. Green (테스트를 통과하는 최소한의 코드 작성)
   ↓
3. Refactor (코드 개선 및 리팩토링)
   ↓
   (반복)
```

### 💡 TDD의 장점

1. **버그 조기 발견**: 개발 초기에 문제를 발견하여 수정 비용 절감
2. **설계 개선**: 테스트 가능한 코드 작성을 통해 자연스럽게 좋은 설계 유도
3. **문서화 효과**: 테스트 코드가 코드의 사용 방법을 명확히 보여줌
4. **리팩토링 안정성**: 테스트가 있어 코드 변경 시 안심하고 리팩토링 가능
5. **협업 효율성**: 명확한 스펙 정의로 팀원 간 의사소통 개선

---

## 2️⃣ Spring Boot Test Annotations

### 📌 계층별 Test Slice 어노테이션

Spring Boot는 계층별로 필요한 빈만 로드하여 테스트 속도를 높이는 **Test Slice** 기능을 제공합니다.

#### `@DataJpaTest`
```java
@DataJpaTest
class PostRepositoryTest {
    @Autowired
    private TestEntityManager entityManager;
    
    @Autowired
    private PostRepository postRepository;
}
```

**특징:**
- JPA 관련 컴포넌트만 로드
- 내장 DB 사용 (H2)
- 트랜잭션 자동 롤백
- `TestEntityManager` 제공

**용도:**
- Repository 계층 테스트
- DB 쿼리 검증
- JPA 메서드 동작 확인

---

#### `@WebMvcTest`
```java
@WebMvcTest(controllers = PostController.class)
class PostControllerTest {
    @Autowired
    private MockMvc mockMvc;
    
    @MockitoBean
    private PostService postService;
}
```

**특징:**
- MVC 관련 컴포넌트만 로드
- `MockMvc` 제공
- Service 계층은 Mock 처리 필요
- JPA, DB 관련 빈은 로드 안 됨

**용도:**
- Controller 계층 테스트
- HTTP 요청/응답 검증
- API 엔드포인트 테스트

---

#### `@SpringBootTest`
```java
@SpringBootTest
class IntegrationTest {
    @Autowired
    private PostService postService;
}
```

**특징:**
- 전체 ApplicationContext 로드
- 통합 테스트에 적합
- 실행 속도가 느림

**용도:**
- E2E(End-to-End) 테스트
- 전체 시스템 통합 테스트

---

## 3️⃣ Mockito 기본 사용법

### 📌 Mock vs Stub vs Spy

| 구분 | 설명 | 사용 시기 |
|------|------|-----------|
| **Mock** | 가짜 객체, 동작을 정의해야 함 | 외부 의존성 격리 |
| **Stub** | 미리 정의된 응답 반환 | 단순 반환값 필요 시 |
| **Spy** | 실제 객체의 일부만 Mock | 일부 메서드만 Mock 필요 시 |

### 🔧 주요 Mockito 메서드

#### 1. Mock 객체 생성
```java
// 방법 1: @MockitoBean (Spring Test)
@MockitoBean
private PostService postService;

// 방법 2: @Mock (순수 Mockito)
@Mock
private PostRepository postRepository;

// 방법 3: 직접 생성
PostService mockService = Mockito.mock(PostService.class);
```

#### 2. Stubbing (동작 정의)
```java
// given() - BDD 스타일
given(postService.getPostById(1L)).willReturn(postResponse);

// when() - 전통적 스타일
when(postService.getPostById(1L)).thenReturn(postResponse);

// 예외 발생
given(postService.getPostById(999L))
    .willThrow(new RuntimeException("Not found"));
```

#### 3. Argument Matchers
```java
// any() - 모든 값 매칭
given(postService.createPost(any(PostRequest.class)))
    .willReturn(postResponse);

// eq() - 특정 값 매칭
given(postService.updatePost(eq(1L), any(PostRequest.class)))
    .willReturn(postResponse);

// anyString(), anyLong() 등
given(postService.searchByTitle(anyString()))
    .willReturn(Arrays.asList(postResponse));
```

#### 4. 동작 검증
```java
// verify() - 메서드 호출 검증
verify(postService).deletePost(1L);
verify(postService, times(1)).getPostById(1L);
verify(postService, never()).deletePost(999L);
```

#### 5. doNothing() - void 메서드
```java
doNothing().when(postService).deletePost(1L);
```

---

## 4️⃣ MockMvc 사용법

### 📌 MockMvc란?

**MockMvc**는 실제 서버를 띄우지 않고 Controller를 테스트할 수 있는 도구입니다.

### 🔧 기본 사용법

#### 1. GET 요청
```java
mockMvc.perform(get("/api/posts"))
    .andExpect(status().isOk())
    .andExpect(jsonPath("$", hasSize(1)))
    .andExpect(jsonPath("$[0].title", is("제목")));
```

#### 2. POST 요청
```java
mockMvc.perform(post("/api/posts")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(postRequest)))
    .andExpect(status().isCreated())
    .andExpect(jsonPath("$.title", is("제목")));
```

#### 3. PUT 요청
```java
mockMvc.perform(put("/api/posts/{id}", 1L)
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(updateRequest)))
    .andExpect(status().isOk());
```

#### 4. DELETE 요청
```java
mockMvc.perform(delete("/api/posts/{id}", 1L))
    .andExpect(status().isNoContent());
```

#### 5. Query Parameter
```java
mockMvc.perform(get("/api/posts/search")
        .param("keyword", "테스트"))
    .andExpect(status().isOk());
```

#### 6. Path Variable
```java
mockMvc.perform(get("/api/posts/{id}", 1L))
    .andExpect(status().isOk());
```

---

## 5️⃣ Given-When-Then 패턴

### 📌 BDD (Behavior-Driven Development) 스타일

**Given-When-Then**은 테스트를 더 읽기 쉽게 만드는 BDD 패턴입니다.

```java
@Test
void getPostById_Success() {
    // Given (준비): 테스트에 필요한 데이터 설정
    given(postService.getPostById(1L)).willReturn(postResponse);
    
    // When (실행): 테스트할 동작 수행
    mockMvc.perform(get("/api/posts/{id}", 1L))
    
    // Then (검증): 결과 확인
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title", is("테스트 제목")));
}
```

### 💡 각 단계의 의미

- **Given**: 테스트 전 상태를 설정 (Mock 동작 정의, 테스트 데이터 준비)
- **When**: 실제 테스트할 행동을 실행
- **Then**: 예상한 결과가 나왔는지 검증

---

## 6️⃣ 실전 테스트 작성 예제

### 📌 Module 1: Repository 테스트 (7개)

```java
@DataJpaTest
@DisplayName("PostRepository 테스트")
class PostRepositoryTest {
    
    @Autowired
    private TestEntityManager entityManager;
    
    @Autowired
    private PostRepository postRepository;
    
    @Test
    @DisplayName("ID로 포스트 조회")
    void findById() {
        // Given
        Post post = Post.builder()
            .title("제목")
            .content("내용")
            .author("작성자")
            .build();
        entityManager.persist(post);
        entityManager.flush();
        
        // When
        Optional<Post> found = postRepository.findById(post.getId());
        
        // Then
        assertThat(found).isPresent();
        assertThat(found.get().getTitle()).isEqualTo("제목");
    }
}
```

**테스트 케이스:**
1. ✅ `findById()` - ID로 조회
2. ✅ `save()` - 포스트 저장
3. ✅ `findAll()` - 전체 조회
4. ✅ `deleteById()` - 포스트 삭제
5. ✅ `findByTitleContaining()` - 제목 검색
6. ✅ `findByAuthor()` - 작성자로 검색
7. ✅ `count()` - 전체 개수

---

### 📌 Module 2: Service 테스트 (10개)

```java
@ExtendWith(MockitoExtension.class)
@DisplayName("PostService 테스트")
class PostServiceTest {
    
    @Mock
    private PostRepository postRepository;
    
    @InjectMocks
    private PostService postService;
    
    @Test
    @DisplayName("ID로 포스트 조회 - 성공")
    void getPostById_Success() {
        // Given
        Post post = Post.builder()
            .id(1L)
            .title("제목")
            .content("내용")
            .author("작성자")
            .build();
        given(postRepository.findById(1L)).willReturn(Optional.of(post));
        
        // When
        PostResponse result = postService.getPostById(1L);
        
        // Then
        assertThat(result.getTitle()).isEqualTo("제목");
        verify(postRepository).findById(1L);
    }
}
```

**테스트 케이스:**
1. ✅ `getAllPosts()` - 전체 조회
2. ✅ `getPostById()` - ID로 조회 성공
3. ✅ `getPostById()` - ID로 조회 실패 (예외)
4. ✅ `createPost()` - 포스트 생성
5. ✅ `updatePost()` - 포스트 수정 성공
6. ✅ `updatePost()` - 포스트 수정 실패 (예외)
7. ✅ `deletePost()` - 포스트 삭제
8. ✅ `searchByTitle()` - 제목 검색
9. ✅ `getPostsByAuthor()` - 작성자 검색
10. ✅ Entity ↔ DTO 변환 검증

---

### 📌 Module 3: Controller 테스트 (8개)

```java
@WebMvcTest(
    controllers = PostController.class,
    excludeFilters = @ComponentScan.Filter(
        type = FilterType.ASSIGNABLE_TYPE,
        classes = JpaAuditingConfig.class
    )
)
@DisplayName("PostController 통합 테스트")
class PostControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockitoBean
    private PostService postService;
    
    @Test
    @DisplayName("GET /api/posts - 전체 포스트 조회")
    void getAllPosts() throws Exception {
        // Given
        List<PostResponse> posts = Arrays.asList(postResponse);
        given(postService.getAllPosts()).willReturn(posts);
        
        // When & Then
        mockMvc.perform(get("/api/posts"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(1)));
    }
}
```

**테스트 케이스:**
1. ✅ `GET /api/posts` - 전체 조회
2. ✅ `GET /api/posts/{id}` - ID로 조회 성공
3. ✅ `GET /api/posts/{id}` - ID로 조회 실패 (404)
4. ✅ `POST /api/posts` - 포스트 생성 (201)
5. ✅ `PUT /api/posts/{id}` - 포스트 수정
6. ✅ `DELETE /api/posts/{id}` - 포스트 삭제 (204)
7. ✅ `GET /api/posts/search` - 제목 검색
8. ✅ `GET /api/posts/author/{author}` - 작성자 검색

---

## 7️⃣ 주요 이슈 및 해결 방법

### 🔥 Issue 1: JPA Auditing 에러

**문제:**
```
Error creating bean with name 'jpaAuditingHandler'
JPA metamodel must not be empty
```

**원인:**  
`@WebMvcTest`는 JPA를 로드하지 않는데, `BlogApiApplication`에 `@EnableJpaAuditing`이 있어서 에러 발생

**해결:**
```java
// 1. JpaAuditingConfig 분리
@Configuration
@EnableJpaAuditing
public class JpaAuditingConfig {
}

// 2. @WebMvcTest에서 제외
@WebMvcTest(
    controllers = PostController.class,
    excludeFilters = @ComponentScan.Filter(
        type = FilterType.ASSIGNABLE_TYPE,
        classes = JpaAuditingConfig.class
    )
)
```

---

### 🔥 Issue 2: Import 충돌 (Hamcrest vs Mockito)

**문제:**
```java
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
// any() 메서드 충돌!
```

**해결:**
```java
// Mockito - 명시적 import
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

// Hamcrest - 명시적 import
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
```

---

### 🔥 Issue 3: 예외 처리 (404 반환)

**문제:**  
RuntimeException이 500으로 처리됨

**해결:**
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException ex) {
        if (ex.getMessage() != null && ex.getMessage().contains("not found")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ex.getMessage());
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ex.getMessage());
    }
}
```

---

### 🔥 Issue 4: 파라미터 이름 불일치

**문제:**  
Controller는 `keyword` 파라미터를 기대하는데, 테스트는 `title`로 전송

**해결:**
```java
// Controller
@GetMapping("/search")
public List<PostResponse> searchByTitle(@RequestParam String keyword)

// Test - keyword로 통일
mockMvc.perform(get("/api/posts/search")
        .param("keyword", "테스트"))
```

---

## 8️⃣ 테스트 실행 방법

### 📌 Gradle 명령어

```bash
# 전체 테스트 실행
./gradlew test

# 특정 테스트 클래스만 실행
./gradlew test --tests "com.gitfactory.blogapi.controller.PostControllerTest"

# 테스트 결과 보고서 확인
./gradlew test
# 결과: build/reports/tests/test/index.html
```

### 📌 IntelliJ IDEA

1. 테스트 클래스에서 우클릭 → Run
2. Gradle 탭 → Tasks → verification → test
3. 개별 테스트 메서드에서 실행 아이콘 클릭

---

## 9️⃣ 학습 성과

### 📊 완성된 테스트 구조

```
src/test/java/com/gitfactory/blogapi/
├── repository/
│   └── PostRepositoryTest.java (7개 테스트)
├── service/
│   └── PostServiceTest.java (10개 테스트)
└── controller/
    └── PostControllerTest.java (8개 테스트)

총 25개 테스트 케이스 ✅ ALL PASSED
```

### 💪 습득한 기술

1. ✅ **TDD 사이클** 이해 및 적용
2. ✅ **계층별 테스트** 작성 (Repository, Service, Controller)
3. ✅ **Mockito**를 활용한 의존성 격리
4. ✅ **MockMvc**를 활용한 API 테스트
5. ✅ **Given-When-Then** 패턴 적용
6. ✅ **AssertJ, Hamcrest** 사용법
7. ✅ **예외 처리 테스트** 작성
8. ✅ **Spring Boot Test Slice** 활용

---

## 🔟 참고 자료

### 📚 공식 문서
- [Spring Boot Testing](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.testing)
- [Mockito Documentation](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html)
- [AssertJ Documentation](https://assertj.github.io/doc/)

### 🎓 추천 학습 자료
- Baeldung - Spring Testing Guide
- Spring Boot Test 완벽 가이드
- JUnit 5 User Guide

---

## 📝 다음 학습 계획

1. **통합 테스트** (@SpringBootTest)
2. **테스트 커버리지** 측정 (JaCoCo)
3. **성능 테스트** (JMeter)
4. **E2E 테스트** (RestAssured)
5. **Test Container** 활용

---

**작성일**: 2025-12-01  
**Phase**: 2-4 TDD & Spring Boot Testing  
**상태**: ✅ 완료 (25/25 tests passed)