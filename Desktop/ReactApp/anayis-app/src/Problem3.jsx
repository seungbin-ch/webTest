// 3) 불필요한 리렌더링을 유발하는 코드
import { useState, memo } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // 컴포넌트가 리렌더링될 때마다 새로운 함수가 생성됨
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => {
        addTodo(input);
        setInput('');
      }}>
        추가
      </button>

      {todos.map(todo => (
        <TodoItem 
          key={todo.id}
          todo={todo}
          onDelete={deleteTodo}  // 매번 새로운 함수라서 TodoItem이 리렌더링됨
        />
      ))}
    </div>
  );
}

// memo로 감쌌지만 onDelete가 매번 바뀌어서 효과 없음
const TodoItem = memo(function TodoItem({ todo, onDelete }) {
  console.log('TodoItem 렌더링:', todo.text);
  
  return (
    <div>
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </div>
  );
});