import { combineReducers } from 'redux';
import { reducer as cart } from './cart';

const reducers = combineReducers({
  cart,
});

export default reducers;
