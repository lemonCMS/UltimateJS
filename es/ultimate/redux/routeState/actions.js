/* eslint import/prefer-default-export: 0 */
import { ROUTER_STORE_STATE } from './constants';
export function storeState(route, state) {
  return {
    type: ROUTER_STORE_STATE,
    route: route,
    state: state
  };
}