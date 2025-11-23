// Mock 블로그 포스트 데이터
export interface Post {
  id: string;
  title: string;
  date: string;
  author: string;
  content: string;
  tags: string[];
}

export const posts: Post[] = [
  {
    id: '1',
    title: 'Next.js 14 App Router 소개',
    date: '2025-01-15',
    author: '이환',
    content: `
      Next.js 14의 App Router는 React Server Components를 기반으로 한 
      새로운 라우팅 시스템입니다. 파일 시스템 기반 라우팅을 사용하며,
      강력한 레이아웃 시스템과 데이터 페칭 기능을 제공합니다.
      
      주요 특징:
      - Server Components가 기본값
      - 향상된 데이터 페칭
      - Streaming과 Suspense 지원
      - 개선된 성능과 번들 크기
    `,
    tags: ['Next.js', 'React', 'Web Development'],
  },
  {
    id: '2',
    title: 'Server Components의 장점',
    date: '2025-01-16',
    author: '이환',
    content: `
      React Server Components는 서버에서 렌더링되는 컴포넌트입니다.
      이를 통해 다음과 같은 이점을 얻을 수 있습니다:
      
      1. Zero Bundle Size: 클라이언트로 전송되지 않음
      2. Direct Backend Access: 데이터베이스 직접 접근
      3. Automatic Code Splitting: 자동 코드 분할
      4. Improved SEO: 서버 사이드 렌더링으로 SEO 향상
      
      클라이언트 컴포넌트는 필요할 때만 'use client'로 선택적 사용!
    `,
    tags: ['React', 'Server Components', 'Performance'],
  },
  {
    id: '3',
    title: 'Layouts로 UI 재사용하기',
    date: '2025-01-17',
    author: '이환',
    content: `
      Next.js App Router의 Layout 시스템을 사용하면
      여러 페이지에서 공통 UI를 효율적으로 재사용할 수 있습니다.
      
      Layout의 특징:
      - 페이지 전환 시에도 상태 유지
      - 리렌더링 없이 부분만 업데이트
      - 중첩 레이아웃 지원
      - 로딩 상태와 에러 처리 가능
      
      이를 통해 더 나은 사용자 경험과 성능을 제공할 수 있습니다.
    `,
    tags: ['Next.js', 'Layouts', 'UI Design'],
  },
];

// ID로 포스트 찾기
export function getPostById(id: string): Post | undefined {
  return posts.find((post) => post.id === id);
}

// 모든 포스트 ID 가져오기 (정적 생성용)
export function getAllPostIds(): string[] {
  return posts.map((post) => post.id);
}

// 비동기 데이터 페칭 시뮬레이션 (느린 API 호출)
export async function getPostByIdAsync(id: string): Promise<Post | undefined> {
  // 2초 지연 (로딩 상태 확인용)
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return posts.find((post) => post.id === id);
}

// 모든 포스트 비동기로 가져오기
export async function getPostsAsync(): Promise<Post[]> {
  // 1.5초 지연
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return posts;
}

// 에러를 발생시키는 함수 (에러 핸들링 테스트용)
export async function getPostByIdWithError(id: string): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  if (id === 'error') {
    throw new Error('포스트를 불러오는 중 에러가 발생했습니다!');
  }
  
  const post = posts.find((post) => post.id === id);
  if (!post) {
    throw new Error('포스트를 찾을 수 없습니다.');
  }
  
  return post;
}