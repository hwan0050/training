package com.gitfactory.blogapi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing
public class JpaAuditingConfig {
    // JPA Auditing 설정을 별도 클래스로 분리
    // 이렇게 하면 @WebMvcTest에서 이 Configuration만 제외할 수 있음
}