import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { MdShoppingBasket } from 'react-icons/md';
import logo from '../../assets/logo.svg';
import { Container, Cart } from './styles';

export default function Header() {
  const cart = useSelector(state => state.cart.data);
  const cartSize = useMemo(() => cart.length, [cart]);

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="rocketshoes" />
      </Link>
      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cartSize} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  );
}
