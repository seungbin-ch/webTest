// 2) 무거운 계산
// 매번 계산하는 비효율적인 코드
import { useState } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([
    { id: 1, name: '노트북', price: 1000000, category: '전자기기' },
    { id: 2, name: '마우스', price: 30000, category: '전자기기' },
    { id: 3, name: '책상', price: 200000, category: '가구' },
    // ... 수백 개의 상품
  ]);
  const [filter, setFilter] = useState('');

  // ⚠️ 컴포넌트가 리렌더링될 때마다 매번 계산됨
  const filteredProducts = products.filter(product => 
    product.name.includes(filter)
  );

  const totalPrice = filteredProducts.reduce((sum, product) => 
    sum + product.price, 0
  );

  return (
    <div>
      <input 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="상품 검색"
      />
      
      <h2>총 가격: {totalPrice.toLocaleString()}원</h2>
      
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            {product.name} - {product.price.toLocaleString()}원
          </li>
        ))}
      </ul>
    </div>
  );
}
