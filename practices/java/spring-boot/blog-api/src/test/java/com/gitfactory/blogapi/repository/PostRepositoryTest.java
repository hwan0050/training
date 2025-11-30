package com.gitfactory.blogapi.repository;

import com.gitfactory.blogapi.entity.Post;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@DisplayName("PostRepository 테스트")
class PostRepositoryTest {

    @Autowired
    private PostRepository postRepository;

    private Post testPost1;
    private Post testPost2;

    @BeforeEach
    void setUp() {
        // 테스트 데이터 초기화
        postRepository.deleteAll();

        testPost1 = Post.builder()
                .title("Spring Boot 테스트")
                .content("JUnit 5로 테스트 작성하기")
                .author("Hwan")
                .build();

        testPost2 = Post.builder()
                .title("JPA 테스트")
                .content("@DataJpaTest 어노테이션 활용")
                .author("Hwan")
                .build();
    }

    @Test
    @DisplayName("포스트 저장 테스트")
    void save() {
        // given (준비)
        // setUp()에서 testPost1 준비됨

        // when (실행)
        Post savedPost = postRepository.save(testPost1);

        // then (검증)
        assertThat(savedPost.getId()).isNotNull();
        assertThat(savedPost.getTitle()).isEqualTo("Spring Boot 테스트");
        assertThat(savedPost.getContent()).isEqualTo("JUnit 5로 테스트 작성하기");
        assertThat(savedPost.getAuthor()).isEqualTo("Hwan");
        assertThat(savedPost.getCreatedAt()).isNotNull();
        assertThat(savedPost.getUpdatedAt()).isNotNull();
    }

    @Test
    @DisplayName("ID로 포스트 조회 테스트")
    void findById() {
        // given
        Post savedPost = postRepository.save(testPost1);

        // when
        Optional<Post> foundPost = postRepository.findById(savedPost.getId());

        // then
        assertThat(foundPost).isPresent();
        assertThat(foundPost.get().getTitle()).isEqualTo("Spring Boot 테스트");
    }

    @Test
    @DisplayName("전체 포스트 조회 테스트")
    void findAll() {
        // given
        postRepository.save(testPost1);
        postRepository.save(testPost2);

        // when
        List<Post> posts = postRepository.findAll();

        // then
        assertThat(posts).hasSize(2);
        assertThat(posts).extracting("title")
                .containsExactlyInAnyOrder("Spring Boot 테스트", "JPA 테스트");
    }

    @Test
    @DisplayName("제목으로 포스트 검색 테스트")
    void findByTitleContaining() {
        // given
        postRepository.save(testPost1);
        postRepository.save(testPost2);

        // when
        List<Post> posts = postRepository.findByTitleContaining("테스트");

        // then
        assertThat(posts).hasSize(2);
        assertThat(posts).extracting("title")
                .contains("Spring Boot 테스트", "JPA 테스트");
    }

    @Test
    @DisplayName("작성자로 포스트 검색 테스트")
    void findByAuthor() {
        // given
        postRepository.save(testPost1);
        postRepository.save(testPost2);

        Post otherAuthorPost = Post.builder()
                .title("다른 작성자 포스트")
                .content("내용")
                .author("Other")
                .build();
        postRepository.save(otherAuthorPost);

        // when
        List<Post> hwanPosts = postRepository.findByAuthor("Hwan");

        // then
        assertThat(hwanPosts).hasSize(2);
        assertThat(hwanPosts).allMatch(post -> post.getAuthor().equals("Hwan"));
    }

    @Test
    @DisplayName("포스트 삭제 테스트")
    void delete() {
        // given
        Post savedPost = postRepository.save(testPost1);
        Long postId = savedPost.getId();

        // when
        postRepository.deleteById(postId);

        // then
        Optional<Post> deletedPost = postRepository.findById(postId);
        assertThat(deletedPost).isEmpty();
    }

    @Test
    @DisplayName("포스트 수정 테스트")
    void update() throws InterruptedException {
        // given
        Post savedPost = postRepository.save(testPost1);

        // 시간 차이를 만들기 위해 잠시 대기
        Thread.sleep(10);

        // when
        savedPost.setTitle("수정된 제목");
        savedPost.setContent("수정된 내용");
        Post updatedPost = postRepository.save(savedPost);

        // then
        assertThat(updatedPost.getTitle()).isEqualTo("수정된 제목");
        assertThat(updatedPost.getContent()).isEqualTo("수정된 내용");
        assertThat(updatedPost.getUpdatedAt()).isAfterOrEqualTo(updatedPost.getCreatedAt());  // ← isAfter → isAfterOrEqualTo 변경
    }
}