// Server Component (기본값)
// "use client" 없으면 자동으로 Server Component

export default function ServerInfo() {
  // 서버에서만 실행되는 코드
  const serverTime = new Date().toLocaleString('ko-KR');
  
  return (
    <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg">
      <h3 className="text-xl font-bold text-green-700 mb-3">
        🖥️ Server Component
      </h3>
      
      <div className="space-y-2 text-gray-700">
        <p><strong>렌더링 위치:</strong> 서버</p>
        <p><strong>서버 시간:</strong> {serverTime}</p>
        <p><strong>특징:</strong></p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>서버에서만 실행됨</li>
          <li>번들 크기 0 (클라이언트로 전송 안됨)</li>
          <li>데이터베이스 직접 접근 가능</li>
          <li>환경 변수 안전하게 사용</li>
          <li>useState, useEffect 사용 불가</li>
        </ul>
      </div>
    </div>
  );
}