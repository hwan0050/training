import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-center">About Page</h1>
        
        <p className="text-lg text-gray-600 mb-8 text-center">
          이것은 Next.js 14 App Router로 만든 첫 번째 페이지입니다.
        </p>
        
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">🎯 학습 포인트</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-blue-500 font-bold mr-2">✓</span>
              <div>
                <strong>파일 기반 라우팅:</strong> app/about/page.tsx → /about 경로로 자동 매핑
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 font-bold mr-2">✓</span>
              <div>
                <strong>Server Component:</strong> 기본적으로 서버에서 렌더링되어 성능 최적화
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 font-bold mr-2">✓</span>
              <div>
                <strong>Tailwind CSS:</strong> 유틸리티 클래스로 빠른 스타일링
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">💡 App Router의 장점</h2>
          <ul className="space-y-2">
            <li>🚀 <strong>Server Components:</strong> 기본값으로 성능 향상</li>
            <li>📦 <strong>Layouts:</strong> 공통 레이아웃 재사용</li>
            <li>🔄 <strong>Streaming:</strong> 점진적 렌더링 지원</li>
            <li>⚡ <strong>Data Fetching:</strong> 서버에서 직접 데이터 fetch</li>
          </ul>
        </div>

        <div className="flex justify-center">
          <Link 
            href="/"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded transition-colors"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}