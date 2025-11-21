// WindowSize.tsx - useEffect로 이벤트 리스너 등록

import React, { useState, useEffect } from 'react';

function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    // 이벤트 핸들러
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // Cleanup: 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 마운트/언마운트 시에만 실행

  return (
    <div style={{
      backgroundColor: '#f3e5f5',
      padding: '20px',
      borderRadius: '8px',
      marginTop: '10px'
    }}>
      <h3>📐 윈도우 크기 추적</h3>
      <div style={{
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        marginTop: '15px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '4px',
          textAlign: 'center',
          flex: 1
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#7b1fa2' }}>
            {windowSize.width}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>너비 (px)</div>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '4px',
          textAlign: 'center',
          flex: 1
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#7b1fa2' }}>
            {windowSize.height}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>높이 (px)</div>
        </div>
      </div>
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#999', textAlign: 'center' }}>
        💡 창 크기를 조절해보세요! useEffect가 실시간으로 추적합니다.
      </div>
    </div>
  );
}

export default WindowSize;