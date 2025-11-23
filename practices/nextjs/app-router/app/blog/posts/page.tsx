import Link from 'next/link';
import { getPostsAsync } from '../data/posts.tsx';

export default async function PostsPage() {
  // 비동기 데이터 페칭 (1.5초 지연)
  const posts = await getPostsAsync();
  
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">📚 Blog Posts</h2>
      
      <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-lg mb-6">
        <p className="text-yellow-800">
          💡 <strong>Tip:</strong> 이 페이지는 loading.tsx를 통해 로딩 상태를 표시합니다. 
          새로고침하면 스켈레톤 UI를 볼 수 있습니다!
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            href={`/blog/posts/${post.id}`}
            className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <span className="text-sm text-gray-500">{post.date}</span>
            </div>
            
            <p className="text-gray-600 text-sm mb-3">작성자: {post.author}</p>
            
            <div className="flex gap-2 flex-wrap mb-3">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
            
            <p className="text-purple-600 hover:text-purple-800 font-medium">
              Read More →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}