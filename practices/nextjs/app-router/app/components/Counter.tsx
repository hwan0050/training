'use client'; // 이 지시어로 Client Component임을 명시

import { useState } from 'react';

export default function Counter() {
  // useState는 Client Component에서만 사용 가능
  const [count, setCount] = useState(0);
  
  return (
    <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg">
      <h3 className="text-xl font-bold text-blue-700 mb-3">
        💻 Client Component
      </h3>
      
      <div className="space-y-4">
        <div className="text-gray-700">
          <p><strong>렌더링 위치:</strong> 클라이언트 (브라우저)</p>
          <p><strong>특징:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>브라우저에서 실행됨</li>
            <li>useState, useEffect 사용 가능</li>
            <li>이벤트 핸들러 사용 가능</li>
            <li>인터랙티브한 UI 구현</li>
          </ul>
        </div>
        
        <div className="bg-white p-4 rounded border border-blue-300">
          <p className="text-2xl font-bold text-center mb-4">
            카운트: {count}
          </p>
          
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setCount(count - 1)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              -1
            </button>
            
            <button
              onClick={() => setCount(0)}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Reset
            </button>
            
            <button
              onClick={() => setCount(count + 1)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              +1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}