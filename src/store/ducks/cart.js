import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  actionType: ['dataPassed'],
  addToCartRequest: ['id'],
  addToCartSuccess: ['data'],
  addToCartFailure: ['error'],
  removeToCartRequest: [],
  updateAmountRequest: [],
});

export const CartTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  loading: true,
  error: null,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REMOVE_TO_CART_REQUEST]: state => state.merge({}),
  [Types.UPDATE_AMOUNT_REQUEST]: state => state.merge({}),
  [Types.ADD_TO_CART_REQUEST]: state => state.merge({ loading: true }),
  [Types.ADD_TO_CART_FAILURE]: (state, { error }) =>
    state.merge({ loading: false, error }),
  [Types.ADD_TO_CART_SUCCESS]: (state, { data }) =>
    state.merge({ loading: false, data, error: null }),
});
