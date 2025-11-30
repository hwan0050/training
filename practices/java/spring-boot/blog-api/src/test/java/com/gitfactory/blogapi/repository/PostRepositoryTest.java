package com.gitfactory.blogapi.repository;

import com.gitfactory.blogapi.entity.Post;
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

    @Test
    @DisplayName("포스트 저장 테스트")
    void savePost() {
        // Given
        Post post = Post.builder()
                .title("테스트 제목")
                .content("테스트 내용")
                .author("테스트 작성자")
                .build();

        // When
        Post savedPost = postRepository.save(post);

        // Then
        assertThat(savedPost.getId()).isNotNull();
        assertThat(savedPost.getTitle()).isEqualTo("테스트 제목");
        assertThat(savedPost.getContent()).isEqualTo("테스트 내용");
        assertThat(savedPost.getAuthor()).isEqualTo("테스트 작성자");
        assertThat(savedPost.getCreatedAt()).isNotNull();
        assertThat(savedPost.getUpdatedAt()).isNotNull();
    }

    @Test
    @DisplayName("ID로 포스트 조회 테스트")
    void findById() {
        // Given
        Post post = Post.builder()
                .title("테스트 제목")
                .content("테스트 내용")
                .author("테스트 작성자")
                .build();
        Post savedPost = postRepository.save(post);

        // When
        Optional<Post> foundPost = postRepository.findById(savedPost.getId());

        // Then
        assertThat(foundPost).isPresent();
        assertThat(foundPost.get().getTitle()).isEqualTo("테스트 제목");
    }

    @Test
    @DisplayName("전체 포스트 조회 테스트")
    void findAll() {
        // Given
        Post post1 = Post.builder()
                .title("제목1")
                .content("내용1")
                .author("작성자1")
                .build();
        Post post2 = Post.builder()
                .title("제목2")
                .content("내용2")
                .author("작성자2")
                .build();
        postRepository.save(post1);
        postRepository.save(post2);

        // When
        List<Post> posts = postRepository.findAll();

        // Then
        assertThat(posts).hasSize(2);
    }

    @Test
    @DisplayName("포스트 수정 테스트")
    void updatePost() {
        // Given
        Post post = Post.builder()
                .title("원본 제목")
                .content("원본 내용")
                .author("작성자")
                .build();
        Post savedPost = postRepository.save(post);

        // When - update 메서드 사용! ⭐
        savedPost.update("수정된 제목", "수정된 내용");
        Post updatedPost = postRepository.save(savedPost);

        // Then
        assertThat(updatedPost.getTitle()).isEqualTo("수정된 제목");
        assertThat(updatedPost.getContent()).isEqualTo("수정된 내용");
    }

    @Test
    @DisplayName("포스트 삭제 테스트")
    void deletePost() {
        // Given
        Post post = Post.builder()
                .title("삭제할 제목")
                .content("삭제할 내용")
                .author("작성자")
                .build();
        Post savedPost = postRepository.save(post);

        // When
        postRepository.delete(savedPost);

        // Then
        Optional<Post> deletedPost = postRepository.findById(savedPost.getId());
        assertThat(deletedPost).isEmpty();
    }

    @Test
    @DisplayName("제목으로 포스트 검색 테스트")
    void findByTitleContaining() {
        // Given
        Post post1 = Post.builder()
                .title("Spring Boot 테스트")
                .content("내용1")
                .author("작성자1")
                .build();
        Post post2 = Post.builder()
                .title("JPA 테스트")
                .content("내용2")
                .author("작성자2")
                .build();
        postRepository.save(post1);
        postRepository.save(post2);

        // When
        List<Post> posts = postRepository.findByTitleContaining("Spring");

        // Then
        assertThat(posts).hasSize(1);
        assertThat(posts.get(0).getTitle()).contains("Spring Boot");
    }

    @Test
    @DisplayName("작성자로 포스트 검색 테스트")
    void findByAuthor() {
        // Given
        Post post1 = Post.builder()
                .title("제목1")
                .content("내용1")
                .author("Hwan")
                .build();
        Post post2 = Post.builder()
                .title("제목2")
                .content("내용2")
                .author("Hwan")
                .build();
        Post post3 = Post.builder()
                .title("제목3")
                .content("내용3")
                .author("Other")
                .build();
        postRepository.save(post1);
        postRepository.save(post2);
        postRepository.save(post3);

        // When
        List<Post> hwanPosts = postRepository.findByAuthor("Hwan");

        // Then
        assertThat(hwanPosts).hasSize(2);
        assertThat(hwanPosts).allMatch(post -> post.getAuthor().equals("Hwan"));
    }
}