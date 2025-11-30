export default function BlogPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Welcome to My Blog</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-3">🎯 Layout 학습 포인트</h3>
        <ul className="space-y-2 text-gray-700">
          <li>✅ <strong>공통 UI 재사용:</strong> Header와 Footer가 모든 blog 페이지에 자동 적용</li>
          <li>✅ <strong>중첩 레이아웃:</strong> app/layout.tsx + app/blog/layout.tsx</li>
          <li>✅ <strong>자동 라우팅:</strong> 폴더 구조가 URL 경로로 매핑</li>
          <li>✅ <strong>성능 최적화:</strong> Layout은 리렌더링되지 않고 유지됨</li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg">
          <h4 className="text-lg font-bold text-blue-700 mb-2">
            📁 폴더 구조
          </h4>
          <pre className="text-sm bg-white p-4 rounded overflow-x-auto">
{`app/
├── layout.tsx (Root Layout)
└── blog/
    ├── layout.tsx (Blog Layout)
    ├── page.tsx → /blog
    ├── posts/
    │   └── page.tsx → /blog/posts
    └── about/
        └── page.tsx → /blog/about`}
          </pre>
        </div>

        <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg">
          <h4 className="text-lg font-bold text-green-700 mb-2">
            🔄 Layout 동작
          </h4>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Root Layout이 항상 적용</li>
            <li>Blog Layout이 blog/* 경로에 추가 적용</li>
            <li>페이지 전환 시 Layout은 유지</li>
            <li>children에만 새 페이지 렌더링</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
