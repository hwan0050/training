import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <p className="text-xl text-gray-600 mb-8">
        포스트를 찾을 수 없습니다.
      </p>
      <Link 
        href="/blog/posts"
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded"
      >
        포스트 목록으로 돌아가기
      </Link>
    </div>
  );
}