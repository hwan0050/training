// App.tsx - React 기초 학습

import React from 'react';
import './index.css';
import Greeting from './Greeting';
import Counter from './Counter';
import TodoList from './TodoList';
import Timer from './Timer';
import DataFetcher from './DataFetcher';
import WindowSize from './WindowSize';

function App() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🎨 React 기초 학습</h1>
      <p>안녕하세요! React와 TypeScript로 만든 첫 컴포넌트입니다.</p>
      
      <div style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h2>📚 학습 목표</h2>
        <ul>
          <li>JSX 문법 이해하기 ✅</li>
          <li>컴포넌트 만들기 ✅</li>
          <li>Props 전달하기 ✅</li>
          <li>State 관리하기 ✅</li>
          <li>Hooks 사용하기 ✅</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>🎯 Props 실습</h2>
        <Greeting name="환" age={25} />
        <Greeting name="김철수" />
        <Greeting name="이영희" age={30} />
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>🎣 useState Hook 실습</h2>
        <Counter />
        <TodoList />
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>⚡ useEffect Hook 실습</h2>
        <Timer />
        <DataFetcher />
        <WindowSize />
      </div>
    </div>
  );
}

export default App;