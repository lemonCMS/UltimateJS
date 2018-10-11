import { ROUTER_STORE_STATE } from './constants';

const storeStateReducer = (object, id, value) => {
  const clone = Object.assign({}, object);
  clone[id] = value;
  return clone;
};

const initialState = {
  routes: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ROUTER_STORE_STATE:
      return Object.assign({}, state, {
        routes: storeStateReducer(state.routes, action.route, action.state),
      });
    default:
      return Object.assign({}, state);
  }
}
