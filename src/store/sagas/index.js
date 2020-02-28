import { all, takeLatest } from 'redux-saga/effects';
import { handleAddToCard } from './cart';
import { CartTypes } from '../ducks/cart';

export default function* rootSaga() {
  yield all([takeLatest(CartTypes.ADD_TO_CART_REQUEST, handleAddToCard)]);
}
