import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { Container } from './styles';

export default function Home() {
  return (
    <Container>
      {[1, 2, 3, 4, 5].map(item => (
        <li>
          <img
            src="https://static.netshoes.com.br/produtos/tenis-de-caminhada-leve-confortavel/06/E74-0492-006/E74-0492-006_zoom1.jpg?ims=120x"
            alt="Tênis"
          />
          <strong>Tênis muito legal</strong>
          <span>R$129,90</span>
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
