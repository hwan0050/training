export default function PostsLoading() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">📚 Blog Posts</h2>
      
      <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg mb-6">
        <p className="text-blue-800">
          ⏳ 포스트를 불러오는 중입니다...
        </p>
      </div>

      {/* Skeleton UI */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div 
            key={i}
            className="bg-white rounded-lg shadow-md p-6 animate-pulse"
          >
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
            <div className="flex gap-2 mb-3">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        ))}
      </div>
    </div>
  );
}