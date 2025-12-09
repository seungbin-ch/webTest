// 1) 성능 문제가 있는 코드
import { useState } from 'react';

export default function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div>
      <h1>카운트: {count}</h1>
      <button onClick={() => setCount(count + 1)}>증가</button>
      
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="텍스트 입력"
      />
      
      {/* 이 컴포넌트는 text가 변경될 때도 리렌더링됨 */}
      <ExpensiveComponent count={count} />
    </div>
  );
}

function ExpensiveComponent({ count }) {
  console.log('ExpensiveComponent 렌더링됨!');
  
  // 무거운 계산 시뮬레이션
  const result = heavyCalculation(count);
  
  return <div>계산 결과: {result}</div>;
}

function heavyCalculation(num) {
  // 실제로 무거운 작업이라고 가정
  let result = 0;
  for (let i = 0; i < 100000000; i++) {
    result += num;
  }
  return result;
}
