export default function PostsPage() {
  const posts = [
    { id: 1, title: 'Next.js 14 App Router 소개', date: '2025-01-15' },
    { id: 2, title: 'Server Components의 장점', date: '2025-01-16' },
    { id: 3, title: 'Layouts로 UI 재사용하기', date: '2025-01-17' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">📚 Blog Posts</h2>
      
      <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-lg mb-6">
        <p className="text-yellow-800">
          💡 <strong>Tip:</strong> 이 페이지도 Blog Layout을 공유하고 있습니다. 
          Header와 Footer는 그대로 유지되고 이 부분만 바뀝니다!
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-500 text-sm mb-3">{post.date}</p>
            <button className="text-purple-600 hover:text-purple-800 font-medium">
              Read More →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}