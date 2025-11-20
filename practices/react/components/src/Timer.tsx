// Timer.tsx - useEffect Hook 학습 (타이머)

import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // useEffect: 컴포넌트가 렌더링될 때마다 실행
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    // Cleanup 함수: 컴포넌트가 언마운트되거나 의존성이 변경될 때 실행
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]); // isRunning이 변경될 때만 실행

  // 시간 포맷팅 (00:00:00)
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div style={{
      backgroundColor: '#fff3e0',
      padding: '20px',
      borderRadius: '8px',
      marginTop: '10px'
    }}>
      <h3>⏱️ 타이머</h3>
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '20px 0',
        fontFamily: 'monospace',
        color: '#ff6f00'
      }}>
        {formatTime(seconds)}
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {!isRunning ? (
          <button 
            onClick={handleStart}
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
            ▶️ 시작
          </button>
        ) : (
          <button 
            onClick={handlePause}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            ⏸️ 일시정지
          </button>
        )}
        <button 
          onClick={handleReset}
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
          🔄 리셋
        </button>
      </div>
      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666', textAlign: 'center' }}>
        상태: {isRunning ? '⏱️ 실행 중' : '⏸️ 정지'}
      </div>
    </div>
  );
}

export default Timer;