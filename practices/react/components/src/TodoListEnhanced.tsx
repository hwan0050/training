import { FC, useState, FormEvent, ChangeEvent } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

// Todo 아이템 타입 정의
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// 필터 타입 정의
type FilterType = 'all' | 'active' | 'completed';

/**
 * 개선된 TodoList 컴포넌트
 * - LocalStorage로 데이터 영구 저장
 * - 필터링 기능 (전체/활성/완료)
 * - Todo 수정 기능
 * - 개선된 UI/UX
 */
const TodoListEnhanced: FC = () => {
  // LocalStorage에 저장되는 todos 상태
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  
  // 입력 필드 상태
  const [inputValue, setInputValue] = useState('');
  
  // 필터 상태
  const [filter, setFilter] = useState<FilterType>('all');
  
  // 수정 모드 상태 (수정 중인 todo의 id)
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // 수정 중인 텍스트
  const [editingText, setEditingText] = useState('');

  /**
   * Todo 추가 핸들러
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim() === '') {
      alert('할 일을 입력해주세요!');
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  /**
   * Todo 완료 토글 핸들러
   */
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /**
   * Todo 삭제 핸들러
   */
  const deleteTodo = (id: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  /**
   * 수정 모드 진입
   */
  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  /**
   * 수정 취소
   */
  const cancelEditing = () => {
    setEditingId(null);
    setEditingText('');
  };

  /**
   * 수정 저장
   */
  const saveEditing = (id: number) => {
    if (editingText.trim() === '') {
      alert('할 일을 입력해주세요!');
      return;
    }

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText.trim() } : todo
      )
    );
    
    setEditingId(null);
    setEditingText('');
  };

  /**
   * 모든 완료된 Todo 삭제
   */
  const clearCompleted = () => {
    if (window.confirm('완료된 항목을 모두 삭제하시겠습니까?')) {
      setTodos(todos.filter((todo) => !todo.completed));
    }
  };

  /**
   * 필터링된 todos 계산
   */
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  /**
   * 통계 계산
   */
  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📝 Enhanced Todo List</h2>
      
      {/* Todo 추가 폼 */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          placeholder="할 일을 입력하세요..."
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          추가
        </button>
      </form>

      {/* 필터 버튼 */}
      <div style={styles.filterContainer}>
        <button
          onClick={() => setFilter('all')}
          style={{
            ...styles.filterButton,
            ...(filter === 'all' ? styles.filterButtonActive : {}),
          }}
        >
          전체 ({stats.total})
        </button>
        <button
          onClick={() => setFilter('active')}
          style={{
            ...styles.filterButton,
            ...(filter === 'active' ? styles.filterButtonActive : {}),
          }}
        >
          진행중 ({stats.active})
        </button>
        <button
          onClick={() => setFilter('completed')}
          style={{
            ...styles.filterButton,
            ...(filter === 'completed' ? styles.filterButtonActive : {}),
          }}
        >
          완료 ({stats.completed})
        </button>
      </div>

      {/* Todo 리스트 */}
      {filteredTodos.length === 0 ? (
        <p style={styles.emptyMessage}>
          {filter === 'all' && '할 일이 없습니다. 새로운 할 일을 추가해보세요!'}
          {filter === 'active' && '진행중인 할 일이 없습니다.'}
          {filter === 'completed' && '완료된 할 일이 없습니다.'}
        </p>
      ) : (
        <ul style={styles.list}>
          {filteredTodos.map((todo) => (
            <li key={todo.id} style={styles.listItem}>
              {editingId === todo.id ? (
                // 수정 모드
                <div style={styles.editMode}>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    style={styles.editInput}
                    autoFocus
                  />
                  <button
                    onClick={() => saveEditing(todo.id)}
                    style={styles.saveButton}
                  >
                    저장
                  </button>
                  <button
                    onClick={cancelEditing}
                    style={styles.cancelButton}
                  >
                    취소
                  </button>
                </div>
              ) : (
                // 일반 모드
                <>
                  <div style={styles.todoContent}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      style={styles.checkbox}
                    />
                    <span
                      style={{
                        ...styles.todoText,
                        ...(todo.completed ? styles.todoTextCompleted : {}),
                      }}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <div style={styles.buttonGroup}>
                    <button
                      onClick={() => startEditing(todo.id, todo.text)}
                      style={styles.editButton}
                      disabled={todo.completed}
                    >
                      ✏️ 수정
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      style={styles.deleteButton}
                    >
                      🗑️ 삭제
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* 하단 액션 버튼 */}
      {stats.completed > 0 && (
        <div style={styles.footer}>
          <button onClick={clearCompleted} style={styles.clearButton}>
            완료된 항목 모두 삭제 ({stats.completed})
          </button>
        </div>
      )}

      {/* 도움말 */}
      <div style={styles.help}>
        💡 <strong>팁:</strong> 데이터는 LocalStorage에 자동 저장되어 새로고침해도 유지됩니다!
      </div>
    </div>
  );
};

// 스타일 정의
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '4px',
  },
  addButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  filterContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    justifyContent: 'center',
  },
  filterButton: {
    padding: '8px 16px',
    fontSize: '14px',
    backgroundColor: '#f0f0f0',
    border: '2px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  filterButtonActive: {
    backgroundColor: '#2196F3',
    color: 'white',
    borderColor: '#2196F3',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    marginBottom: '8px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    border: '1px solid #e0e0e0',
  },
  todoContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
  },
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
  },
  todoText: {
    fontSize: '16px',
    color: '#333',
  },
  todoTextCompleted: {
    textDecoration: 'line-through',
    color: '#999',
  },
  buttonGroup: {
    display: 'flex',
    gap: '8px',
  },
  editButton: {
    padding: '6px 12px',
    fontSize: '14px',
    backgroundColor: '#FFC107',
    color: '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '6px 12px',
    fontSize: '14px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  editMode: {
    display: 'flex',
    gap: '8px',
    width: '100%',
  },
  editInput: {
    flex: 1,
    padding: '8px',
    fontSize: '14px',
    border: '2px solid #2196F3',
    borderRadius: '4px',
  },
  saveButton: {
    padding: '6px 12px',
    fontSize: '14px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '6px 12px',
    fontSize: '14px',
    backgroundColor: '#999',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    fontSize: '16px',
    padding: '40px 20px',
  },
  footer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  clearButton: {
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  help: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#e3f2fd',
    borderRadius: '4px',
    fontSize: '14px',
    textAlign: 'center',
    color: '#1976d2',
  },
};

export default TodoListEnhanced;
