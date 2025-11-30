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
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
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
                .id(1L)
                .title("테스트 포스트")
                .content("테스트 내용")
                .author("Hwan")
                .build();

        postRequest = PostRequest.builder()
                .title("새 포스트")
                .content("새 내용")
                .author("Hwan")
                .build();
    }

    @Test
    @DisplayName("전체 포스트 조회 - 성공")
    void getAllPosts_Success() {
        // given
        Post post1 = Post.builder()
                .id(1L)
                .title("포스트 1")
                .content("내용 1")
                .author("Hwan")
                .build();
        Post post2 = Post.builder()
                .id(2L)
                .title("포스트 2")
                .content("내용 2")
                .author("Hwan")
                .build();
        List<Post> posts = Arrays.asList(post1, post2);

        given(postRepository.findAll()).willReturn(posts);

        // when
        List<PostResponse> result = postService.getAllPosts();

        // then
        assertThat(result).hasSize(2);
        assertThat(result.get(0).getTitle()).isEqualTo("포스트 1");
        assertThat(result.get(1).getTitle()).isEqualTo("포스트 2");
        then(postRepository).should(times(1)).findAll();
    }

    @Test
    @DisplayName("ID로 포스트 조회 - 성공")
    void getPostById_Success() {
        // given
        given(postRepository.findById(1L)).willReturn(Optional.of(testPost));

        // when
        PostResponse result = postService.getPostById(1L);

        // then
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getTitle()).isEqualTo("테스트 포스트");
        assertThat(result.getContent()).isEqualTo("테스트 내용");
        then(postRepository).should(times(1)).findById(1L);
    }

    @Test
    @DisplayName("ID로 포스트 조회 - 실패 (존재하지 않는 ID)")
    void getPostById_NotFound() {
        // given
        given(postRepository.findById(999L)).willReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> postService.getPostById(999L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Post not found with id:");
        then(postRepository).should(times(1)).findById(999L);
    }

    @Test
    @DisplayName("포스트 생성 - 성공")
    void createPost_Success() {
        // given
        Post savedPost = Post.builder()
                .id(1L)
                .title(postRequest.getTitle())
                .content(postRequest.getContent())
                .author(postRequest.getAuthor())
                .build();

        given(postRepository.save(any(Post.class))).willReturn(savedPost);

        // when
        PostResponse result = postService.createPost(postRequest);

        // then
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getTitle()).isEqualTo("새 포스트");
        assertThat(result.getContent()).isEqualTo("새 내용");
        assertThat(result.getAuthor()).isEqualTo("Hwan");
        then(postRepository).should(times(1)).save(any(Post.class));
    }

    @Test
    @DisplayName("포스트 수정 - 성공")
    void updatePost_Success() {
        // given
        PostRequest updateRequest = PostRequest.builder()
                .title("수정된 제목")
                .content("수정된 내용")
                .author("Hwan")
                .build();

        Post updatedPost = Post.builder()
                .id(1L)
                .title("수정된 제목")
                .content("수정된 내용")
                .author("Hwan")
                .build();

        given(postRepository.findById(1L)).willReturn(Optional.of(testPost));
        given(postRepository.save(any(Post.class))).willReturn(updatedPost);

        // when
        PostResponse result = postService.updatePost(1L, updateRequest);

        // then
        assertThat(result.getTitle()).isEqualTo("수정된 제목");
        assertThat(result.getContent()).isEqualTo("수정된 내용");
        then(postRepository).should(times(1)).findById(1L);
        then(postRepository).should(times(1)).save(any(Post.class));
    }

    @Test
    @DisplayName("포스트 수정 - 실패 (존재하지 않는 ID)")
    void updatePost_NotFound() {
        // given
        given(postRepository.findById(999L)).willReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> postService.updatePost(999L, postRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Post not found with id:");
        then(postRepository).should(times(1)).findById(999L);
        then(postRepository).should(times(0)).save(any(Post.class));
    }

    @Test
    @DisplayName("포스트 삭제 - 성공")
    void deletePost_Success() {
        // given
        given(postRepository.findById(1L)).willReturn(Optional.of(testPost));

        // when
        postService.deletePost(1L);

        // then
        then(postRepository).should(times(1)).findById(1L);
        then(postRepository).should(times(1)).delete(testPost);
    }

    @Test
    @DisplayName("포스트 삭제 - 실패 (존재하지 않는 ID)")
    void deletePost_NotFound() {
        // given
        given(postRepository.findById(999L)).willReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> postService.deletePost(999L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Post not found with id:");
        then(postRepository).should(times(1)).findById(999L);
        then(postRepository).should(times(0)).delete(any(Post.class));
    }

    @Test
    @DisplayName("제목으로 포스트 검색 - 성공")
    void searchByTitle_Success() {
        // given
        List<Post> posts = Arrays.asList(testPost);
        given(postRepository.findByTitleContaining("테스트")).willReturn(posts);

        // when
        List<PostResponse> result = postService.searchByTitle("테스트");

        // then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getTitle()).isEqualTo("테스트 포스트");
        then(postRepository).should(times(1)).findByTitleContaining("테스트");
    }

    @Test
    @DisplayName("작성자로 포스트 검색 - 성공")
    void searchByAuthor_Success() {
        // given
        List<Post> posts = Arrays.asList(testPost);
        given(postRepository.findByAuthor("Hwan")).willReturn(posts);

        // when
        List<PostResponse> result = postService.searchByAuthor("Hwan");

        // then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getAuthor()).isEqualTo("Hwan");
        then(postRepository).should(times(1)).findByAuthor("Hwan");
    }
}