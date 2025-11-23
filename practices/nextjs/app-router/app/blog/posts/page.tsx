import Link from 'next/link';
import { posts } from '../data/posts';

export default function PostsPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">📚 Blog Posts</h2>
      
      <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-lg mb-6">
        <p className="text-yellow-800">
          💡 <strong>Tip:</strong> 각 포스트를 클릭하면 동적 라우팅으로 
          개별 포스트 페이지(/blog/posts/[id])로 이동합니다!
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