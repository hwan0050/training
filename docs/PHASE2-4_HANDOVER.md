# Phase 2-4 Handover Document

## 📋 프로젝트 인수인계서

**Phase**: 2-4 TDD & Spring Boot Testing  
**작성일**: 2025-12-01  
**작성자**: 이환  
**상태**: ✅ 완료

---

## 📌 Phase 2-4 개요

### 목적
Spring Boot 애플리케이션에 대한 **계층별 테스트 코드 작성**을 통해 TDD 개발 방법론을 학습하고 적용

### 달성 목표
- ✅ Repository 계층 테스트 (7개)
- ✅ Service 계층 테스트 (10개)
- ✅ Controller 계층 테스트 (8개)
- ✅ 총 25개 테스트 케이스 작성 및 통과
- ✅ TDD 사이클 (Red-Green-Refactor) 이해
- ✅ Spring Boot Test Slice 활용
- ✅ Mockito 및 MockMvc 사용법 습득

### 학습 기간
Phase 2-4 진행 중

---

## 🏗️ 구현 내용

### 1. 테스트 구조

```
src/test/java/com/gitfactory/blogapi/
├── repository/
│   └── PostRepositoryTest.java       (7개 테스트)
├── service/
│   └── PostServiceTest.java          (10개 테스트)
└── controller/
    └── PostControllerTest.java       (8개 테스트)

총 25개 테스트 케이스
```

---

### 2. Module 1: Repository 테스트 (7개)

**파일**: `PostRepositoryTest.java`  
**어노테이션**: `@DataJpaTest`  
**의존성**: `TestEntityManager`, `PostRepository`

#### 테스트 케이스

| # | 테스트 메서드 | 검증 내용 | 상태 |
|---|--------------|----------|------|
| 1 | `findById()` | ID로 포스트 조회 | ✅ |
| 2 | `save()` | 포스트 저장 | ✅ |
| 3 | `findAll()` | 전체 포스트 조회 | ✅ |
| 4 | `deleteById()` | 포스트 삭제 | ✅ |
| 5 | `findByTitleContaining()` | 제목 검색 | ✅ |
| 6 | `findByAuthor()` | 작성자로 검색 | ✅ |
| 7 | `count()` | 전체 개수 조회 | ✅ |

#### 주요 특징
- `@DataJpaTest`: JPA 관련 컴포넌트만 로드
- `TestEntityManager`: 테스트용 EntityManager 제공
- 자동 트랜잭션 롤백
- H2 인메모리 DB 사용

---

### 3. Module 2: Service 테스트 (10개)

**파일**: `PostServiceTest.java`  
**어노테이션**: `@ExtendWith(MockitoExtension.class)`  
**Mock 객체**: `PostRepository`  
**테스트 대상**: `PostService`

#### 테스트 케이스

| # | 테스트 메서드 | 검증 내용 | 상태 |
|---|--------------|----------|------|
| 1 | `getAllPosts()` | 전체 조회 | ✅ |
| 2 | `getPostById_Success()` | ID 조회 성공 | ✅ |
| 3 | `getPostById_NotFound()` | ID 조회 실패 (예외) | ✅ |
| 4 | `createPost()` | 포스트 생성 | ✅ |
| 5 | `updatePost_Success()` | 포스트 수정 성공 | ✅ |
| 6 | `updatePost_NotFound()` | 포스트 수정 실패 (예외) | ✅ |
| 7 | `deletePost()` | 포스트 삭제 | ✅ |
| 8 | `searchByTitle()` | 제목 검색 | ✅ |
| 9 | `getPostsByAuthor()` | 작성자 검색 | ✅ |
| 10 | `toEntity()` / `toResponse()` | DTO 변환 검증 | ✅ |

#### 주요 특징
- Mockito를 활용한 의존성 격리
- `given().willReturn()` - BDD 스타일 Stubbing
- `verify()` - 메서드 호출 검증
- 예외 처리 테스트

---

### 4. Module 3: Controller 테스트 (8개)

**파일**: `PostControllerTest.java`  
**어노테이션**: `@WebMvcTest`  
**Mock 객체**: `PostService`  
**테스트 도구**: `MockMvc`

#### 테스트 케이스

| # | 테스트 메서드 | HTTP | 엔드포인트 | 상태 |
|---|--------------|------|-----------|------|
| 1 | `getAllPosts()` | GET | `/api/posts` | ✅ |
| 2 | `getPostById_Success()` | GET | `/api/posts/{id}` | ✅ |
| 3 | `getPostById_NotFound()` | GET | `/api/posts/{id}` (404) | ✅ |
| 4 | `createPost()` | POST | `/api/posts` | ✅ |
| 5 | `updatePost()` | PUT | `/api/posts/{id}` | ✅ |
| 6 | `deletePost()` | DELETE | `/api/posts/{id}` | ✅ |
| 7 | `searchByTitle()` | GET | `/api/posts/search` | ✅ |
| 8 | `getPostsByAuthor()` | GET | `/api/posts/author/{author}` | ✅ |

#### 주요 특징
- MockMvc를 활용한 API 테스트
- JSON 응답 검증 (JsonPath)
- HTTP 상태 코드 검증
- Request/Response Body 검증

---

## 🔧 추가 구현 사항

### 1. JpaAuditingConfig 분리

**파일**: `src/main/java/com/gitfactory/blogapi/config/JpaAuditingConfig.java`

**목적**:  
`@WebMvcTest`에서 JPA Auditing을 제외하여 테스트 격리

```java
@Configuration
@EnableJpaAuditing
public class JpaAuditingConfig {
    // JPA Auditing 설정을 별도 클래스로 분리
}
```

**적용**:
```java
@WebMvcTest(
    controllers = PostController.class,
    excludeFilters = @ComponentScan.Filter(
        type = FilterType.ASSIGNABLE_TYPE,
        classes = JpaAuditingConfig.class
    )
)
```

---

### 2. GlobalExceptionHandler 추가

**파일**: `src/main/java/com/gitfactory/blogapi/exception/GlobalExceptionHandler.java`

**목적**:  
RuntimeException을 404 NOT FOUND로 변환

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

## 🐛 주요 이슈 및 해결

### Issue 1: JPA Auditing 에러

**증상**:
```
Error creating bean with name 'jpaAuditingHandler'
JPA metamodel must not be empty
```

**원인**:  
`@WebMvcTest`는 JPA를 로드하지 않는데, `@EnableJpaAuditing`이 활성화되어 에러 발생

**해결**:
1. `JpaAuditingConfig` 클래스로 분리
2. `@WebMvcTest`에서 `excludeFilters`로 제외

**관련 커밋**: `fix: Extract JpaAuditingConfig for test isolation`

---

### Issue 2: Import 충돌 (Hamcrest vs Mockito)

**증상**:
```java
The method any() is ambiguous for the type PostControllerTest
```

**원인**:  
Hamcrest와 Mockito의 `any()` 메서드 충돌

**해결**:
```java
// Wildcard import 제거
// import static org.mockito.Mockito.*;
// import static org.hamcrest.Matchers.*;

// 명시적 import 사용
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
```

**관련 커밋**: `fix: Resolve import conflicts between Hamcrest and Mockito`

---

### Issue 3: 404 예외 처리

**증상**:  
RuntimeException이 500 Internal Server Error로 처리됨

**원인**:  
예외 처리 핸들러 없음

**해결**:  
`GlobalExceptionHandler` 추가하여 "not found" 메시지 포함 시 404 반환

**관련 커밋**: `feat: Add GlobalExceptionHandler for 404 error handling`

---

### Issue 4: 파라미터 이름 불일치

**증상**:
```
Required request parameter 'keyword' for method parameter type String is not present
```

**원인**:  
Controller는 `keyword` 파라미터를 기대하는데, 테스트는 `title`로 전송

**해결**:
```java
// Before
mockMvc.perform(get("/api/posts/search")
        .param("title", "테스트"))

// After
mockMvc.perform(get("/api/posts/search")
        .param("keyword", "테스트"))
```

**관련 커밋**: `fix: Fix test parameter naming (title -> keyword)`

---

## 📦 의존성 추가

### build.gradle

```gradle
dependencies {
    // 기존 의존성...
    
    // Hamcrest (추가)
    testImplementation 'org.hamcrest:hamcrest:2.2'
}
```

**용도**: JsonPath 검증 시 Hamcrest Matchers 사용

---

## 🧪 테스트 실행 방법

### 전체 테스트 실행

```bash
cd F:\workspace\git-factory\practices\java\spring-boot\blog-api
./gradlew clean test
```

**예상 결과**:
```
BUILD SUCCESSFUL in 8s
25 tests completed, 25 passed
```

### 특정 테스트만 실행

```bash
# Repository 테스트
./gradlew test --tests "com.gitfactory.blogapi.repository.PostRepositoryTest"

# Service 테스트
./gradlew test --tests "com.gitfactory.blogapi.service.PostServiceTest"

# Controller 테스트
./gradlew test --tests "com.gitfactory.blogapi.controller.PostControllerTest"
```

### IntelliJ IDEA

1. 테스트 클래스 우클릭 → Run
2. 개별 테스트 메서드 실행 아이콘 클릭
3. Gradle 탭 → Tasks → verification → test

---

## 📊 테스트 결과

### 최종 테스트 통과율

```
✅ PostRepositoryTest:  7/7  (100%)
✅ PostServiceTest:     10/10 (100%)
✅ PostControllerTest:  8/8   (100%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ 총합:                25/25 (100%)
```

### 실행 시간

```
> Task :test
BUILD SUCCESSFUL in 8s
```

---

## 📁 변경된 파일 목록

### 신규 생성

```
src/main/java/com/gitfactory/blogapi/
├── config/
│   └── JpaAuditingConfig.java                    (NEW)
└── exception/
    └── GlobalExceptionHandler.java               (NEW)

src/test/java/com/gitfactory/blogapi/
├── repository/
│   └── PostRepositoryTest.java                   (NEW)
├── service/
│   └── PostServiceTest.java                      (NEW)
└── controller/
    └── PostControllerTest.java                   (NEW)

docs/
├── TESTING_LEARNING.md                           (NEW)
└── PHASE2-4_HANDOVER.md                          (NEW)
```

### 수정

```
src/main/java/com/gitfactory/blogapi/
└── BlogApiApplication.java                       (MODIFIED)
    - @EnableJpaAuditing 제거

build.gradle                                       (MODIFIED)
    - Hamcrest 의존성 추가
```

---

## 🔗 Git 작업 내역

### Branch

```
feature/spring-boot-testing
```

### Commits

```bash
# Module 1
git commit -m "test: Add Repository tests (Module 1)"

# Module 2
git commit -m "test: Add Service tests (Module 2)"

# Module 3 - 에러 해결 과정
git commit -m "fix: Extract JpaAuditingConfig for test isolation"
git commit -m "fix: Resolve import conflicts between Hamcrest and Mockito"
git commit -m "feat: Add GlobalExceptionHandler for 404 error handling"
git commit -m "test: Add Controller tests (Module 3)"

# 문서화
git commit -m "docs: Add TESTING_LEARNING.md"
git commit -m "docs: Add PHASE2-4_HANDOVER.md"
git commit -m "docs: Update README for Phase 2-4 completion"
```

---

## 📖 학습 자료

### 작성된 문서

1. **TESTING_LEARNING.md** (~800 lines)
    - TDD 개념 및 사이클
    - Spring Boot Test Annotations
    - Mockito 사용법
    - MockMvc 사용법
    - Given-When-Then 패턴
    - 실전 예제 및 이슈 해결

2. **PHASE2-4_HANDOVER.md** (현재 문서)
    - 프로젝트 인수인계서
    - 구현 내용 상세
    - 이슈 및 해결 방법
    - 테스트 실행 가이드

---

## ✅ 완료 체크리스트

- [x] Repository 테스트 작성 (7개)
- [x] Service 테스트 작성 (10개)
- [x] Controller 테스트 작성 (8개)
- [x] JPA Auditing 분리
- [x] GlobalExceptionHandler 추가
- [x] 전체 테스트 통과 확인 (25/25)
- [x] 학습 노트 작성 (TESTING_LEARNING.md)
- [x] 핸드오버 문서 작성 (PHASE2-4_HANDOVER.md)
- [ ] README 업데이트
- [ ] Git 커밋 및 PR
- [ ] develop 브랜치 병합
- [ ] main 브랜치 병합

---

## 🚀 다음 단계 (Phase 2-5)

### 예상 학습 주제

1. **통합 테스트** (@SpringBootTest)
    - 전체 ApplicationContext 로드
    - E2E 테스트 작성

2. **테스트 커버리지** 측정
    - JaCoCo 플러그인 추가
    - 커버리지 리포트 생성

3. **API 문서화**
    - Spring REST Docs
    - Swagger/OpenAPI

4. **성능 테스트**
    - JMeter 기본 사용법
    - 부하 테스트

---

## 📞 인수인계 담당자

**이전 담당자**: 이환  
**다음 담당자**: 이환 (계속 진행)  
**작성일**: 2025-12-01

---

## 💡 참고 사항

### 테스트 작성 시 주의사항

1. **Given-When-Then 패턴** 준수
2. **테스트 메서드명**은 명확하게 (한글 사용 가능)
3. **@DisplayName**으로 테스트 설명 추가
4. **하나의 테스트는 하나의 기능**만 검증
5. **테스트 간 의존성** 제거 (독립적 실행 가능)

### 코드 품질 유지

1. 테스트 코드도 **리팩토링** 대상
2. **중복 코드** 제거 (@BeforeEach 활용)
3. **Magic Number** 대신 상수 사용
4. **명확한 Assertion** 메시지

### 트러블슈팅

문제 발생 시 참고할 문서:
- `TESTING_LEARNING.md` - 상세한 학습 내용 및 이슈 해결
- 이 문서(PHASE2-4_HANDOVER.md) - 주요 이슈 및 해결 방법

---

**Phase 2-4 TDD & Spring Boot Testing 완료** ✅  
**다음 Phase로 이동 준비 완료** 🚀

---

## 📎 첨부

- [TESTING_LEARNING.md](./TESTING_LEARNING.md)
- [PostRepositoryTest.java](./src/test/java/com/gitfactory/blogapi/repository/PostRepositoryTest.java)
- [PostServiceTest.java](./src/test/java/com/gitfactory/blogapi/service/PostServiceTest.java)
- [PostControllerTest.java](./src/test/java/com/gitfactory/blogapi/controller/PostControllerTest.java)
- [JpaAuditingConfig.java](./src/main/java/com/gitfactory/blogapi/config/JpaAuditingConfig.java)
- [GlobalExceptionHandler.java](./src/main/java/com/gitfactory/blogapi/exception/GlobalExceptionHandler.java)