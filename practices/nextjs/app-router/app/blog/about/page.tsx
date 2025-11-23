export default function BlogAboutPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">ℹ️ About This Blog</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-3">블로그 소개</h3>
        <p className="text-gray-700 mb-4">
          이 블로그는 Next.js 14 App Router의 Layout 시스템을 학습하기 위한 예제입니다.
        </p>
        <p className="text-gray-700">
          모든 페이지가 동일한 Header와 Footer를 공유하며, 
          페이지 전환 시에도 Layout은 리렌더링되지 않고 유지됩니다.
        </p>
      </div>

      <div className="bg-purple-50 border-2 border-purple-200 p-6 rounded-lg">
        <h4 className="text-lg font-bold text-purple-700 mb-3">
          🎨 Layout의 장점
        </h4>
        <ul className="space-y-2 text-gray-700">
          <li>✅ <strong>코드 재사용:</strong> 공통 UI를 한 곳에서 관리</li>
          <li>✅ <strong>성능 최적화:</strong> Layout은 마운트 상태 유지</li>
          <li>✅ <strong>상태 유지:</strong> Navigation 간 상태 보존</li>
          <li>✅ <strong>중첩 가능:</strong> 여러 레벨의 Layout 구성 가능</li>
          <li>✅ <strong>독립적 로딩:</strong> 각 페이지는 독립적으로 로딩</li>
        </ul>
      </div>
    </div>
  );
}