"use strict";

exports.__esModule = true;
exports.storeState = storeState;

var _constants = require("./constants");

/* eslint-disable import/prefer-default-export */
function storeState(route, state) {
  return {
    type: _constants.ROUTER_STORE_STATE,
    route: route,
    state: state
  };
}