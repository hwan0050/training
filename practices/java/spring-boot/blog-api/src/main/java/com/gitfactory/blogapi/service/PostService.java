package com.gitfactory.blogapi.service;

import com.gitfactory.blogapi.dto.PostRequest;
import com.gitfactory.blogapi.dto.PostResponse;
import com.gitfactory.blogapi.entity.Post;
import com.gitfactory.blogapi.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    private final PostRepository postRepository;

    // 전체 포스트 조회
    public List<PostResponse> getAllPosts() {
        return postRepository.findAll().stream()
                .map(PostResponse::from)
                .collect(Collectors.toList());
    }

    // ID로 포스트 조회
    public PostResponse getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
        return PostResponse.from(post);
    }

    // 포스트 생성
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

    // 포스트 수정
    @Transactional
    public PostResponse updatePost(Long id, PostRequest request) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));

        post.update(request.getTitle(), request.getContent());
        return PostResponse.from(post);
    }

    // 포스트 삭제
    @Transactional
    public void deletePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
        postRepository.delete(post);
    }

    // 제목으로 검색
    public List<PostResponse> searchByTitle(String title) {
        return postRepository.findByTitleContaining(title).stream()
                .map(PostResponse::from)
                .collect(Collectors.toList());
    }

    // 작성자로 검색
    public List<PostResponse> getPostsByAuthor(String author) {
        return postRepository.findByAuthor(author).stream()
                .map(PostResponse::from)
                .collect(Collectors.toList());
    }
}