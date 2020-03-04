import { call, put, select } from 'redux-saga/effects';
import Immutable from 'seamless-immutable';
import { toast } from 'react-toastify';
import CartActions from '../ducks/cart';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

export function* handleAddToCard({ id }) {
  try {
    const response = yield call(api.get, `/products/${id}`);

    const data = yield select(state => state.cart.data);

    const stock = yield call(api.get, `/stock/${id}`);

    const stockAmount = stock.data.amount;

    let muttedData = data;
    const productIndex = data.findIndex(p => p.id === id);

    const currentAmount = productIndex >= 0 ? data[productIndex].amount : 0;
    const amount = currentAmount + 1;

    if (amount > stockAmount) {
      toast.error('Quantidade solicitada fora de estoque!');
      return;
    }

    if (productIndex >= 0) {
      muttedData = Immutable.set(data, productIndex, {
        ...data[productIndex],
        amount,
      });
    } else {
      muttedData = [
        ...muttedData,
        {
          ...response.data,
          amount,
          priceFormatted: formatPrice(response.data.price),
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

    const stock = yield call(api.get, `/stock/${id}`);

    const stockAmount = stock.data.amount;

    if (amount > stockAmount) {
      toast.error('Quantidade solicitada fora de estoque!');
      return;
    }

    const muttedData = data.map(p => (p.id === id ? { ...p, amount } : p));

    yield put(CartActions.addToCartSuccess(muttedData));
  } catch (err) {
    alert('Ocorreu um erro ao processar seus dados!');
    yield put(CartActions.addToCartFailure(err));
  }
}
