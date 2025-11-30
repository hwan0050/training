'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러를 로깅 서비스로 보낼 수 있음
    console.error('Post error:', error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="max-w-md w-full bg-red-50 border-2 border-red-200 rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        
        <h2 className="text-2xl font-bold text-red-700 mb-2">
          에러가 발생했습니다
        </h2>
        
        <p className="text-gray-700 mb-6">
          {error.message || '포스트를 불러오는 중 문제가 발생했습니다.'}
        </p>

        <div className="bg-white rounded p-4 mb-6">
          <h3 className="font-semibold mb-2">🎯 Error Handling 학습 포인트</h3>
          <ul className="text-sm text-left space-y-1 text-gray-600">
            <li>✅ error.tsx는 자동으로 Error Boundary 생성</li>
            <li>✅ Client Component여야 함 ('use client')</li>
            <li>✅ reset() 함수로 재시도 가능</li>
            <li>✅ 에러를 로깅 서비스로 전송 가능</li>
          </ul>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-colors"
          >
            다시 시도
          </button>
          
          <Link
            href="/blog/posts"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded transition-colors inline-block"
          >
            목록으로
          </Link>
        </div>
      </div>
    </div>
  );
}