import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  actionType: ['dataPassed'],
});

export const UserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACTION_TYPE]: state => state.merge({ data: [] }),
});
