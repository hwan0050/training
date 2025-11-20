// DataFetcher.tsx - useEffect로 API 데이터 가져오기

import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

function DataFetcher() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect: 컴포넌트가 마운트될 때 한 번만 실행
  useEffect(() => {
    // API 호출 함수
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        setUsers(data.slice(0, 5)); // 처음 5명만
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // 빈 배열 = 마운트될 때만 실행

  // 다시 불러오기
  const refetch = () => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data.slice(0, 5));
        setError(null);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div style={{
      backgroundColor: '#e3f2fd',
      padding: '20px',
      borderRadius: '8px',
      marginTop: '10px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>🌐 API 데이터 가져오기</h3>
        <button
          onClick={refetch}
          disabled={loading}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            cursor: loading ? 'not-allowed' : 'pointer',
            backgroundColor: loading ? '#ccc' : '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          {loading ? '로딩 중...' : '🔄 새로고침'}
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          <p>⏳ 데이터를 불러오는 중...</p>
        </div>
      )}

      {error && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '15px',
          borderRadius: '4px',
          marginTop: '10px'
        }}>
          ❌ 오류: {error}
        </div>
      )}

      {!loading && !error && users.length > 0 && (
        <div style={{ marginTop: '15px' }}>
          {users.map(user => (
            <div
              key={user.id}
              style={{
                backgroundColor: 'white',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                👤 {user.name}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                📧 {user.email}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                🏢 {user.company.name}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '15px', fontSize: '12px', color: '#999', textAlign: 'center' }}>
        💡 useEffect로 컴포넌트 마운트 시 자동으로 API 호출
      </div>
    </div>
  );
}

export default DataFetcher;