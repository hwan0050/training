// Counter.tsx - useState Hook 학습

import React, { useState } from 'react';

function Counter() {
  // useState Hook: [상태값, 상태변경함수] = useState(초기값)
  const [count, setCount] = useState<number>(0);

  // 증가 함수
  const increment = () => {
    setCount(count + 1);
  };

  // 감소 함수
  const decrement = () => {
    setCount(count - 1);
  };

  // 리셋 함수
  const reset = () => {
    setCount(0);
  };

  return (
    <div style={{
      backgroundColor: '#fff3e0',
      padding: '20px',
      borderRadius: '8px',
      marginTop: '10px'
    }}>
      <h3>🔢 카운터</h3>
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '20px 0',
        color: count > 0 ? '#4caf50' : count < 0 ? '#f44336' : '#333'
      }}>
        {count}
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          onClick={decrement}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          - 감소
        </button>
        <button 
          onClick={reset}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#9e9e9e',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          🔄 리셋
        </button>
        <button 
          onClick={increment}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          + 증가
        </button>
      </div>
    </div>
  );
}

export default Counter;