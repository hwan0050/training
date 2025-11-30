export default function PostDetailLoading() {
  return (
    <div>
      {/* Breadcrumb Skeleton */}
      <div className="h-4 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>

      {/* Post Skeleton */}
      <article className="bg-white rounded-lg shadow-lg p-8 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        
        <div className="flex gap-2 mb-6">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
        
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </article>

      <div className="mt-8 text-center text-gray-600">
        ⏳ 포스트를 불러오는 중입니다...
      </div>
    </div>
  );
}