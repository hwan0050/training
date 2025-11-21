import React from 'react';
import Greeting from './Greeting';
import Counter from './Counter';
import TodoList from './TodoList';
import TodoListEnhanced from './TodoListEnhanced';
import Timer from './Timer';
import DataFetcher from './DataFetcher';
import WindowSize from './WindowSize';

function App() {
  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1>🚀 React + TypeScript 학습 프로젝트</h1>
        <p>Git Factory - React 기초 실습</p>
      </header>

      <main style={styles.main}>
        {/* 섹션 1: Props 예제 */}
        <section style={styles.section}>
          <h2>1️⃣ Props 전달</h2>
          <Greeting name="Hwan" />
          <Greeting name="React" />
        </section>

        {/* 섹션 2: useState 예제 - Counter */}
        <section style={styles.section}>
          <h2>2️⃣ useState Hook - Counter</h2>
          <Counter />
        </section>

        {/* 섹션 3: useState 예제 - TodoList (기본) */}
        <section style={styles.section}>
          <h2>3️⃣ useState Hook - Todo List (기본)</h2>
          <TodoList />
        </section>

        {/* 섹션 4: useState + Custom Hook - TodoList Enhanced (신규!) */}
        <section style={styles.sectionHighlight}>
          <h2>✨ 4️⃣ Enhanced Todo List (NEW!)</h2>
          <p style={styles.description}>
            LocalStorage + 필터링 + 수정 기능이 추가된 개선 버전
          </p>
          <TodoListEnhanced />
        </section>

        {/* 섹션 5: useEffect 예제 - Timer */}
        <section style={styles.section}>
          <h2>5️⃣ useEffect Hook - Timer</h2>
          <Timer />
        </section>

        {/* 섹션 6: useEffect 예제 - Data Fetching */}
        <section style={styles.section}>
          <h2>6️⃣ useEffect Hook - API 호출</h2>
          <DataFetcher />
        </section>

        {/* 섹션 7: useEffect 예제 - Window Size */}
        <section style={styles.section}>
          <h2>7️⃣ useEffect Hook - 이벤트 리스너</h2>
          <WindowSize />
        </section>
      </main>

      <footer style={styles.footer}>
        <p>
          Made with ❤️ by Hwan Lee | {' '}
          <a 
            href="https://github.com/hwan0050/git-factory" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.link}
          >
            GitHub Repository
          </a>
        </p>
      </footer>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#282c34',
    padding: '30px',
    color: 'white',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  section: {
    backgroundColor: 'white',
    padding: '30px',
    marginBottom: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  sectionHighlight: {
    backgroundColor: '#fff9e6',
    padding: '30px',
    marginBottom: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(255,193,7,0.3)',
    border: '3px solid #FFC107',
  },
  description: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#282c34',
    padding: '20px',
    color: 'white',
    textAlign: 'center',
    marginTop: '40px',
  },
  link: {
    color: '#61dafb',
    textDecoration: 'none',
  },
};

export default App;
