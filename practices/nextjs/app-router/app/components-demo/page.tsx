import Link from 'next/link';
import ServerInfo from '../components/ServerInfo';
import Counter from '../components/Counter';

export default function ComponentsDemoPage() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">
          Server vs Client Components
        </h1>
        
        <p className="text-gray-600 text-center mb-8">
          Next.js App Router의 핵심 개념을 실습해봅니다
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <ServerInfo />
          <Counter />
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-bold text-yellow-700 mb-3">
            💡 핵심 정리
          </h3>
          <div className="space-y-2 text-gray-700">
            <p><strong>Server Component (기본값):</strong></p>
            <ul className="list-disc list-inside ml-4 mb-3">
              <li>데이터 fetching, 백엔드 리소스 접근에 최적</li>
              <li>민감한 정보(API keys) 안전하게 보관</li>
              <li>큰 의존성을 서버에 유지하여 번들 크기 감소</li>
            </ul>
            
            <p><strong>Client Component ("use client"):</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li>인터랙션(onClick, onChange 등) 필요 시</li>
              <li>State와 Lifecycle Effects 사용 시</li>
              <li>브라우저 전용 APIs 사용 시</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <Link 
            href="/"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}