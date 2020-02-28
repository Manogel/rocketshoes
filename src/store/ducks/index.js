import { combineReducers } from 'redux';
import { reducer as cart } from './cart';
import { reducer as user } from './user';

const reducers = combineReducers({
  cart,
  user,
});

export default reducers;
