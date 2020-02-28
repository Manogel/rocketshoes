import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { Container } from './styles';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import { CartTypes } from '../../store/ducks/cart';

export default function Home() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    api.get('/products').then(response => {
      setProducts(response.data);
    });
  }, []);

  function handleAddProduct(product) {
    dispatch({
      type: CartTypes.ADD_TO_CART_REQUEST,
      product,
    });
  }

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
          <button type="button" onClick={() => handleAddProduct(product)}>
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
