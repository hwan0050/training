package com.gitfactory.blogapi.service;

import com.gitfactory.blogapi.dto.PostRequest;
import com.gitfactory.blogapi.dto.PostResponse;
import com.gitfactory.blogapi.entity.Post;
import com.gitfactory.blogapi.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 게시글 비즈니스 로직을 처리하는 서비스
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    private final PostRepository postRepository;

    /**
     * 모든 게시글 조회
     */
    public List<PostResponse> getAllPosts() {
        return postRepository.findAll().stream()
                .map(PostResponse::from)
                .toList();
    }

    /**
     * ID로 게시글 조회
     */
    public PostResponse getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
        return PostResponse.from(post);
    }

    /**
     * 게시글 생성
     */
    @Transactional
    public PostResponse createPost(PostRequest request) {
        // ✨ request.toEntity() 사용
        Post post = request.toEntity();
        Post savedPost = postRepository.save(post);
        return PostResponse.from(savedPost);
    }

    /**
     * 게시글 수정
     */
    @Transactional
    public PostResponse updatePost(Long id, PostRequest request) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));

        // ✨ record 접근자 사용: title(), content(), author()
        post.update(
                request.title(),
                request.content(),
                request.author()
        );

        return PostResponse.from(post);
    }

    /**
     * 게시글 삭제
     */
    @Transactional
    public void deletePost(Long id) {
        if (!postRepository.existsById(id)) {
            throw new RuntimeException("Post not found with id: " + id);
        }
        postRepository.deleteById(id);
    }

    /**
     * 제목으로 게시글 검색
     */
    public List<PostResponse> searchByTitle(String keyword) {
        // ✨ findByTitleContaining 사용 (IgnoreCase 제거)
        return postRepository.findByTitleContaining(keyword).stream()
                .map(PostResponse::from)
                .toList();
    }

    /**
     * 작성자로 게시글 검색
     */
    public List<PostResponse> getPostsByAuthor(String author) {
        return postRepository.findByAuthor(author).stream()
                .map(PostResponse::from)
                .toList();
    }
}