import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-8">
          Next.js 14 App Router 학습
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Phase 2-1: Next.js App Router 기본 구조 이해하기
        </p>
        
        <div className="flex gap-4 justify-center mb-8">
          <Link 
            href="/about"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            About 페이지 →
          </Link>
          
          <Link 
            href="/components-demo"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Components Demo →
          </Link>
        </div>

        <div className="mt-12 text-left bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">📚 학습 내용</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✅ App Router 파일 기반 라우팅</li>
            <li>✅ Server Components vs Client Components</li>
            <li>✅ Next.js Link 컴포넌트</li>
            <li>✅ Tailwind CSS 스타일링</li>
          </ul>
        </div>
      </div>
    </main>
  );
}