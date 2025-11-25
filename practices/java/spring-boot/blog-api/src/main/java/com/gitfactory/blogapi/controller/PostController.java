package com.gitfactory.blogapi.controller;

import com.gitfactory.blogapi.dto.PostRequest;
import com.gitfactory.blogapi.dto.PostResponse;
import com.gitfactory.blogapi.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    // 전체 조회
    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        List<PostResponse> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    // ID로 조회
    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable Long id) {
        PostResponse post = postService.getPostById(id);
        return ResponseEntity.ok(post);
    }

    // 생성
    @PostMapping
    public ResponseEntity<PostResponse> createPost(@RequestBody PostRequest request) {
        PostResponse post = postService.createPost(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(post);
    }

    // 수정
    @PutMapping("/{id}")
    public ResponseEntity<PostResponse> updatePost(
            @PathVariable Long id,
            @RequestBody PostRequest request) {
        PostResponse post = postService.updatePost(id, request);
        return ResponseEntity.ok(post);
    }

    // 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    // 제목으로 검색
    @GetMapping("/search")
    public ResponseEntity<List<PostResponse>> searchByTitle(@RequestParam String keyword) {
        List<PostResponse> posts = postService.searchByTitle(keyword);
        return ResponseEntity.ok(posts);
    }

    // 작성자로 검색
    @GetMapping("/author/{author}")
    public ResponseEntity<List<PostResponse>> searchByAuthor(@PathVariable String author) {
        List<PostResponse> posts = postService.searchByAuthor(author);
        return ResponseEntity.ok(posts);
    }
}

/*## 📚 코드 설명

### 어노테이션:
        - `@RestController` - REST API 컨트롤러
- `@RequestMapping("/api/posts")` - 기본 경로
- `@GetMapping` - HTTP GET
- `@PostMapping` - HTTP POST
- `@PutMapping` - HTTP PUT
- `@DeleteMapping` - HTTP DELETE
- `@PathVariable` - URL 경로 변수
- `@RequestBody` - 요청 본문 (JSON)
- `@RequestParam` - 쿼리 파라미터

### API 엔드포인트:
        ```
GET    /api/posts              - 전체 조회
GET    /api/posts/{id}         - ID로 조회
POST   /api/posts              - 생성
PUT    /api/posts/{id}         - 수정
DELETE /api/posts/{id}         - 삭제
GET    /api/posts/search?keyword=xxx  - 제목 검색
GET    /api/posts/author/{author}     - 작성자 검색

*/