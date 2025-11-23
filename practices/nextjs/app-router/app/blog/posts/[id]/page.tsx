import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostById, getAllPostIds } from '../../data/posts';

// 정적 생성을 위한 params 미리 생성
export async function generateStaticParams() {
  const ids = getAllPostIds();
  
  return ids.map((id) => ({
    id: id,
  }));
}

// 메타데이터 생성
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const post = getPostById(id);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: post.title,
    description: post.content.substring(0, 160),
  };
}

export default async function PostDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // params를 await로 풀어야 함
  const { id } = await params;
  
  // Server Component에서 데이터 페칭
  const post = getPostById(id);
  
  // 포스트가 없으면 404 페이지로
  if (!post) {
    notFound();
  }
  
  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        <Link href="/blog" className="hover:text-purple-600">Blog</Link>
        {' > '}
        <Link href="/blog/posts" className="hover:text-purple-600">Posts</Link>
        {' > '}
        <span className="text-gray-900">{post.title}</span>
      </div>

      {/* Post Header */}
      <article className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <span>👤 {post.author}</span>
          <span>•</span>
          <span>📅 {post.date}</span>
        </div>
        
        <div className="flex gap-2 flex-wrap mb-6">
          {post.tags.map((tag) => (
            <span 
              key={tag}
              className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        {/* Post Content */}
        <div className="prose max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </div>
      </article>

      {/* Learning Points */}
      <div className="mt-8 bg-blue-50 border-2 border-blue-200 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-blue-700 mb-3">
          🎯 Dynamic Routes 학습 포인트
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li>
            ✅ <strong>동적 경로:</strong> [id] 폴더로 동적 세그먼트 생성
          </li>
          <li>
            ✅ <strong>params 접근:</strong> await params로 URL 파라미터 사용 (Next.js 15+)
          </li>
          <li>
            ✅ <strong>generateStaticParams:</strong> 빌드 시 정적 페이지 미리 생성
          </li>
          <li>
            ✅ <strong>Server Component 데이터 페칭:</strong> 직접 데이터 접근
          </li>
          <li>
            ✅ <strong>notFound():</strong> 존재하지 않는 페이지 처리
          </li>
          <li>
            ✅ <strong>generateMetadata:</strong> 동적 메타데이터 생성
          </li>
        </ul>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex gap-4">
        <Link 
          href="/blog/posts"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded"
        >
          ← 목록으로
        </Link>
        
        <Link 
          href="/blog"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded"
        >
          Blog 홈
        </Link>
      </div>
    </div>
  );
}