import { call, put, select } from 'redux-saga/effects';
import Immutable from 'seamless-immutable';
import CartActions from '../ducks/cart';
import api from '../../services/api';

export function* handleAddToCard({ id }) {
  try {
    const response = yield call(api.get, `/products/${id}`);

    const data = yield select(state => state.cart.data);

    let muttedData = data;
    const productIndex = data.findIndex(p => p.id === id);

    if (productIndex >= 0) {
      muttedData = Immutable.set(data, productIndex, {
        ...data[productIndex],
        amount: data[productIndex].amount + 1,
      });
    } else {
      muttedData = [
        ...muttedData,
        {
          ...response.data,
          amount: 1,
        },
      ];
    }

    yield put(CartActions.addToCartSuccess(muttedData));
  } catch (err) {
    alert('Ocorreu um erro ao processar seus dados!');
    yield put(CartActions.addToCartFailure(err));
  }
}

export function* removeFromCard({ id }) {
  try {
    const data = yield select(state => state.cart.data);

    const muttedData = data.filter(p => p.id !== id);

    yield put(CartActions.addToCartSuccess(muttedData));
  } catch (err) {
    alert('Ocorreu um erro ao processar seus dados!');
    yield put(CartActions.addToCartFailure(err));
  }
}

export function* updateAmount({ id, amount }) {
  try {
    if (amount <= 0) return;

    const data = yield select(state => state.cart.data);

    const muttedData = data.map(p => (p.id === id ? { ...p, amount } : p));

    yield put(CartActions.addToCartSuccess(muttedData));
  } catch (err) {
    alert('Ocorreu um erro ao processar seus dados!');
    yield put(CartActions.addToCartFailure(err));
  }
}
