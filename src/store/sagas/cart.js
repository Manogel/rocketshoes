import { call, put, select } from 'redux-saga/effects';
import CartActions from '../ducks/cart';

export function* handleAddToCard({ product }) {
  try {
    const data = yield select(state => state.cart.data);

    yield put(CartActions.addToCartSuccess([...data, product]));
  } catch (err) {
    alert('Ocorreu um erro ao processar seus dados!');
    yield put(CartActions.addToCartFailure(err));
  }
}
