// Greeting.tsx - Props 학습

import React from 'react';

// Props 타입 정의
interface GreetingProps {
  name: string;
  age?: number;  // Optional
}

// 함수형 컴포넌트
function Greeting({ name, age }: GreetingProps) {
  return (
    <div style={{
      backgroundColor: '#e3f2fd',
      padding: '15px',
      borderRadius: '8px',
      marginTop: '10px'
    }}>
      <h3>👋 안녕하세요, {name}님!</h3>
      {age && <p>나이: {age}세</p>}
    </div>
  );
}

export default Greeting;