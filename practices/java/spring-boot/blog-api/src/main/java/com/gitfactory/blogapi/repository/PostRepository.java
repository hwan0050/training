package com.gitfactory.blogapi.repository;

import com.gitfactory.blogapi.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    // 제목으로 검색 (LIKE 검색)
    List<Post> findByTitleContaining(String title);

    // 작성자로 검색 (정확히 일치)
    List<Post> findByAuthor(String author);
}