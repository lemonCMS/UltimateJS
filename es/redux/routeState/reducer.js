import { ROUTER_STORE_STATE } from './constants';

var storeStateReducer = function storeStateReducer(object, id, value) {
  var clone = Object.assign({}, object);
  clone[id] = value;
  return clone;
};

var initialState = {
  routes: {}
};
export default function reducer(state, action) {
  if (state === void 0) {
    state = initialState;
  }

  if (action === void 0) {
    action = {};
  }

  switch (action.type) {
    case ROUTER_STORE_STATE:
      return Object.assign({}, state, {
        routes: storeStateReducer(state.routes, action.route, action.state)
      });

    default:
      return Object.assign({}, state);
  }
}