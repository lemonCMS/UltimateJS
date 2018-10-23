"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = reducer;

var _clone2 = _interopRequireDefault(require("lodash/clone"));

var _extend2 = _interopRequireDefault(require("lodash/extend"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var constants = _interopRequireWildcard(require("./constants"));

/*
 *Reducer
 */
var initialState = {};

function reducer(orgState, action) {
  if (orgState === void 0) {
    orgState = initialState;
  }

  if (action === void 0) {
    action = {};
  }

  var state = Object.assign({}, orgState);
  var _action = action,
      key = _action.key;
  var keyState = Object.assign({}, (0, _get2.default)(state, key));
  var status = (0, _get2.default)(action, 'error.status', false);

  switch (action.type) {
    case constants.STORE_LIST:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        pending: true,
        failed: false
      })));

    case constants.STORE_LIST_SUCCESS:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        list: action.result,
        pending: false,
        success: true,
        failed: false
      })));

    case constants.STORE_LIST_FAIL:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        pending: false,
        failed: true,
        error: status
      })));

    case constants.STORE_LIST_ALL:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        all: keyState.all,
        allStatus: {
          pending: true
        }
      })));

    case constants.STORE_LIST_ALL_SUCCESS:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        all: action.result,
        allStatus: {
          pending: false,
          success: true
        }
      })));

    case constants.STORE_LIST_ALL_FAIL:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        all: keyState.all,
        allStatus: {
          pending: false,
          failed: true,
          error: status
        }
      })));

    case constants.STORE_LIST_ALL_CLEAR:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        all: {}
      })));

    case constants.STORE_ITEM_LOAD:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        item: Object.assign({}, (0, _get2.default)(keyState, 'item', {}), {
          pending: true
        })
      })));

    case constants.STORE_ITEM_LOAD_SUCCESS:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        item: Object.assign({}, action.result, {
          pending: false,
          success: true
        })
      })));

    case constants.STORE_ITEM_LOAD_FAIL:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        item: {
          pending: false,
          failed: true,
          error: status
        }
      })));

    case constants.STORE_ITEM_DELETE:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        item: Object.assign({}, {
          pending: true
        })
      })));

    case constants.STORE_ITEM_DELETE_SUCCESS:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        item: Object.assign({}, {
          pending: false,
          deleted: true
        })
      })));

    case constants.STORE_ITEM_DELETE_FAIL:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        item: Object.assign({}, {
          pending: false,
          failed: true,
          error: status
        })
      })));

    case constants.STORE_ITEM_LOCAL_UPDATE:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        item: Object.assign({}, keyState.item, action.payload)
      })));

    case constants.STORE_ITEM_UPDATE:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        item: Object.assign({}, keyState.item, {
          actionStatus: {
            pending: true,
            success: false,
            failed: false
          }
        })
      })));

    case constants.STORE_ITEM_UPDATE_SUCCESS:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        item: Object.assign({}, action.result, {
          actionStatus: {
            pending: false,
            success: true,
            failed: false
          }
        })
      })));

    case constants.STORE_ITEM_UPDATE_FAIL:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        item: Object.assign({}, keyState.item, {
          actionStatus: {
            pending: false,
            success: false,
            failed: true
          }
        })
      })));

    case constants.STORE_ITEM_PROPERTY:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        item: Object.assign({}, keyState.item, {
          actionStatus: {
            pending: true,
            success: false,
            failed: false,
            property: true
          }
        })
      })));

    case constants.STORE_ITEM_PROPERTY_SUCCESS:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        item: Object.assign({}, (0, _extend2.default)(keyState.item, action.props), {
          actionStatus: {
            pending: false,
            success: true,
            failed: false,
            property: true
          }
        })
      })));

    case constants.STORE_ITEM_PROPERTY_FAIL:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        item: Object.assign({}, keyState.item, {
          actionStatus: {
            pending: false,
            success: false,
            failed: true,
            property: true
          }
        })
      })));

    case constants.STORE_ITEM_CREATE:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        item: Object.assign({}, {
          actionStatus: {
            pending: true,
            failed: false,
            success: false
          }
        })
      })));

    case constants.STORE_ITEM_CREATE_SUCCESS:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        item: Object.assign({}, action.payload, action.result, {
          actionStatus: {
            pending: false,
            success: true
          }
        })
      })));

    case constants.STORE_ITEM_CREATE_FAIL:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        item: Object.assign({}, {
          actionStatus: {
            pending: false,
            failed: true,
            success: false
          }
        })
      })));

    case constants.STORE_LIST_CLEAR:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        list: {}
      })));

    case constants.STORE_ITEM_CLEAR:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        item: {}
      })));

    case constants.STORE_ITEM_CLEAR_NETWORK_STATE:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, keyState, {
        item: Object.assign({}, keyState.item, {
          actionStatus: {}
        })
      })));

    case constants.STORE_STACK_ITEM_LOAD:
      {
        var stack = (0, _clone2.default)((0, _get2.default)(state, [key, 'stack'], {}));
        stack[action.id] = Object.assign({}, {
          pending: true,
          success: false
        });
        return Object.assign({}, state, (0, _set2.default)({}, [key, 'stack'], stack));
      }

    case constants.STORE_STACK_ITEM_LOAD_SUCCESS:
      {
        var _stack = (0, _clone2.default)((0, _get2.default)(state, [key, 'stack'], {}));

        _stack[action.id] = Object.assign({}, action.result, {
          pending: false,
          success: true
        });
        return Object.assign({}, state, (0, _set2.default)({}, [key, 'stack'], _stack));
      }

    case constants.STORE_STACK_ITEM_LOAD_FAILED:
      {
        var _stack2 = (0, _clone2.default)((0, _get2.default)(state, [key, 'stack'], {}));

        _stack2[action.id] = Object.assign({}, {
          pending: false,
          failed: true
        });
        return Object.assign({}, state, (0, _set2.default)({}, [key, 'stack'], _stack2));
      }

    case constants.STORE_STACK_ITEM_CLEAR:
      {
        var _stack3 = (0, _omit2.default)((0, _clone2.default)((0, _get2.default)(state, [key, 'stack'], {})), action.id);

        return Object.assign({}, state, (0, _set2.default)({}, [key, 'stack'], _stack3));
      }

    case constants.STORE_SIMPLE_LOAD:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, {
        pending: true,
        success: false,
        failed: false
      })));

    case constants.STORE_SIMPLE_LOAD_SUCCESS:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, action.result, {
        path: action.path,
        params: action.params,
        pending: false,
        success: true,
        failed: false
      })));

    case constants.STORE_SIMPLE_LOAD_FAIL:
      return Object.assign({}, state, (0, _set2.default)(state, key, Object.assign({}, {
        pending: false,
        success: false,
        failed: true
      })));

    case constants.STORE_SIMPLE_CLEAR:
      return Object.assign({}, state, (0, _set2.default)(state, key, {}));

    default:
      return Object.assign({}, state);
  }
}

module.exports = exports["default"];