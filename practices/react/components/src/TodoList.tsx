// TodoList.tsx - useState로 배열 상태 관리

import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'React 기초 학습', completed: true },
    { id: 2, text: 'TypeScript 학습', completed: true },
    { id: 3, text: 'Hooks 마스터하기', completed: false }
  ]);
  const [inputText, setInputText] = useState<string>('');

  // Todo 추가
  const addTodo = () => {
    if (inputText.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputText,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInputText('');
  };

  // Todo 완료 토글
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Todo 삭제
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Enter 키 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div style={{
      backgroundColor: '#e8f5e9',
      padding: '20px',
      borderRadius: '8px',
      marginTop: '10px'
    }}>
      <h3>✅ Todo List</h3>
      
      {/* 입력 영역 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="할 일을 입력하세요..."
          style={{
            flex: 1,
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            cursor: 'pointer',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          추가
        </button>
      </div>

      {/* Todo 목록 */}
      <div>
        {todos.map(todo => (
          <div
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px',
              backgroundColor: 'white',
              marginBottom: '5px',
              borderRadius: '4px'
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={{ cursor: 'pointer' }}
            />
            <span style={{
              flex: 1,
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#999' : '#333'
            }}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                padding: '5px 10px',
                fontSize: '12px',
                cursor: 'pointer',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              삭제
            </button>
          </div>
        ))}
      </div>

      {/* 통계 */}
      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <p>전체: {todos.length}개 | 완료: {todos.filter(t => t.completed).length}개 | 남은 작업: {todos.filter(t => !t.completed).length}개</p>
      </div>
    </div>
  );
}

export default TodoList;