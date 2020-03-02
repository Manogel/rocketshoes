import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { CartTypes } from '../../store/ducks/cart';
import { Container, ProductTable, Total } from './styles';
import { formatPrice } from '../../util/format';

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.data).map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  }));

  const total = useSelector(state => state.cart.data).reduce(
    (amount, product) => amount + product.price * product.amount,
    0
  );

  function handleDeleteItem(id) {
    dispatch({
      type: CartTypes.REMOVE_TO_CART_REQUEST,
      id,
    });
  }

  function increment(product) {
    dispatch({
      type: CartTypes.UPDATE_AMOUNT_REQUEST,
      id: product.id,
      amount: product.amount + 1,
    });
  }

  function decrement(product) {
    dispatch({
      type: CartTypes.UPDATE_AMOUNT_REQUEST,
      id: product.id,
      amount: product.amount - 1,
    });
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.name} />
              </td>
              <td>
                <strong>{product.name}</strong>
                <span>{product.formattedPrice}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(product)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button" onClick={() => increment(product)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleDeleteItem(product.id)}
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button"> Finalizar Pedido </button>
        <Total>
          <span>TOTAL</span>
          <strong>{formatPrice(total)}</strong>
        </Total>
      </footer>
    </Container>
  );
}
