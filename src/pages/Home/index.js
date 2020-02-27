import React, { useEffect, useState, useMemo } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { Container } from './styles';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

export default function Home() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    api.get('/products').then(response => {
      setProducts(response.data);
    });
  }, []);

  const formatData = useMemo(() => {
    return products?.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));
  }, [products]);

  return (
    <Container>
      {formatData?.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>
          <button type="button">
            <div>
              <MdAddShoppingCart size={16} color="#fff" /> 3
            </div>
            <span>Adicionar ao carrinho</span>
          </button>
        </li>
      ))}
    </Container>
  );
}
