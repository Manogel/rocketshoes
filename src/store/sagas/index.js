import { all, takeLatest } from 'redux-saga/effects';
import { handleAddToCard, removeFromCard, updateAmount } from './cart';
import { CartTypes } from '../ducks/cart';

export default function* rootSaga() {
  yield all([
    takeLatest(CartTypes.ADD_TO_CART_REQUEST, handleAddToCard),
    takeLatest(CartTypes.REMOVE_TO_CART_REQUEST, removeFromCard),
    takeLatest(CartTypes.UPDATE_AMOUNT_REQUEST, updateAmount),
  ]);
}
