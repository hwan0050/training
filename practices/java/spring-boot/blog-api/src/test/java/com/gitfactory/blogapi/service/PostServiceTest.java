package com.gitfactory.blogapi.service;

import com.gitfactory.blogapi.dto.PostRequest;
import com.gitfactory.blogapi.dto.PostResponse;
import com.gitfactory.blogapi.entity.Post;
import com.gitfactory.blogapi.repository.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
@DisplayName("PostService 테스트")
class PostServiceTest {

    @Mock
    private PostRepository postRepository;

    @InjectMocks
    private PostService postService;

    private Post testPost;
    private PostRequest postRequest;

    @BeforeEach
    void setUp() {
        testPost = Post.builder()
                .title("테스트 제목")
                .content("테스트 내용")
                .author("테스트 작성자")
                .build();

        postRequest = PostRequest.builder()
                .title("테스트 제목")
                .content("테스트 내용")
                .author("테스트 작성자")
                .build();
    }

    @Test
    @DisplayName("전체 포스트 조회 성공")
    void getAllPosts() {
        // Given
        List<Post> posts = Arrays.asList(testPost);
        given(postRepository.findAll()).willReturn(posts);

        // When
        List<PostResponse> result = postService.getAllPosts();

        // Then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getTitle()).isEqualTo("테스트 제목");
    }

    @Test
    @DisplayName("ID로 포스트 조회 성공")
    void getPostById_Success() {
        // Given
        given(postRepository.findById(1L)).willReturn(Optional.of(testPost));

        // When
        PostResponse result = postService.getPostById(1L);

        // Then
        assertThat(result.getTitle()).isEqualTo("테스트 제목");
        assertThat(result.getContent()).isEqualTo("테스트 내용");
    }

    @Test
    @DisplayName("ID로 포스트 조회 실패 - 존재하지 않는 ID")
    void getPostById_NotFound() {
        // Given
        given(postRepository.findById(999L)).willReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> postService.getPostById(999L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Post not found with id: 999");
    }

    @Test
    @DisplayName("포스트 생성 성공")
    void createPost() {
        // Given
        given(postRepository.save(any(Post.class))).willReturn(testPost);

        // When
        PostResponse result = postService.createPost(postRequest);

        // Then
        assertThat(result.getTitle()).isEqualTo("테스트 제목");
        assertThat(result.getContent()).isEqualTo("테스트 내용");
        verify(postRepository, times(1)).save(any(Post.class));
    }

    @Test
    @DisplayName("포스트 수정 성공")
    void updatePost_Success() {
        // Given
        PostRequest updateRequest = PostRequest.builder()
                .title("수정된 제목")
                .content("수정된 내용")
                .author("테스트 작성자")
                .build();

        given(postRepository.findById(1L)).willReturn(Optional.of(testPost));

        // When
        PostResponse result = postService.updatePost(1L, updateRequest);

        // Then
        assertThat(result.getTitle()).isEqualTo("수정된 제목");
        assertThat(result.getContent()).isEqualTo("수정된 내용");
    }

    @Test
    @DisplayName("포스트 수정 실패 - 존재하지 않는 ID")
    void updatePost_NotFound() {
        // Given
        given(postRepository.findById(999L)).willReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> postService.updatePost(999L, postRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Post not found with id: 999");
    }

    @Test
    @DisplayName("포스트 삭제 성공")
    void deletePost_Success() {
        // Given
        given(postRepository.findById(1L)).willReturn(Optional.of(testPost));

        // When
        postService.deletePost(1L);

        // Then
        verify(postRepository, times(1)).delete(testPost);
    }

    @Test
    @DisplayName("포스트 삭제 실패 - 존재하지 않는 ID")
    void deletePost_NotFound() {
        // Given
        given(postRepository.findById(999L)).willReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> postService.deletePost(999L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Post not found with id: 999");
    }

    @Test
    @DisplayName("제목으로 포스트 검색")
    void searchByTitle() {
        // Given
        List<Post> posts = Arrays.asList(testPost);
        given(postRepository.findByTitleContaining("테스트")).willReturn(posts);

        // When
        List<PostResponse> result = postService.searchByTitle("테스트");

        // Then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getTitle()).isEqualTo("테스트 제목");
    }

    @Test
    @DisplayName("작성자로 포스트 검색")
    void getPostsByAuthor() {
        // Given
        List<Post> posts = Arrays.asList(testPost);
        given(postRepository.findByAuthor("테스트 작성자")).willReturn(posts);

        // When
        List<PostResponse> result = postService.getPostsByAuthor("테스트 작성자");

        // Then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getAuthor()).isEqualTo("테스트 작성자");
    }
}