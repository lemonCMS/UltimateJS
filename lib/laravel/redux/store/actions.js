"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.multiUpdate = multiUpdate;
exports.simpleLoad = simpleLoad;
exports.simpleClear = simpleClear;
exports.load = load;
exports.loadAll = loadAll;
exports.clearAll = clearAll;
exports.updateItemLocal = updateItemLocal;
exports.updateAndDispatch = updateAndDispatch;
exports.update = update;
exports.updateDeep = updateDeep;
exports.destroyDeep = destroyDeep;
exports.createDeep = createDeep;
exports.create = create;
exports.post = post;
exports.loadItem = loadItem;
exports.destroyItem = destroyItem;
exports.setPropertyItem = setPropertyItem;
exports.clearList = clearList;
exports.clearItem = clearItem;
exports.loadStackItem = loadStackItem;
exports.request = request;
exports.clearStackItem = clearStackItem;
exports.clearNetworkState = clearNetworkState;
exports.isAllLoaded = isAllLoaded;
exports.isLoaded = isLoaded;
exports.isLoadedSimple = isLoadedSimple;
exports.isLoadedItem = isLoadedItem;
exports.isLoadedItemByString = isLoadedItemByString;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var constants = _interopRequireWildcard(require("./constants"));

function multiUpdate(key, path, params) {
  return {
    types: [constants.STORE_LIST_UPDATE, constants.STORE_LIST_UPDATE_SUCCESS, constants.STORE_LIST_UPDATE_FAIL],
    key: key,
    params: params,
    promise: function promise(_ref) {
      var client = _ref.client;
      return client.post(path, params);
    }
  };
}

function simpleLoad(key, path, params) {
  if (params === void 0) {
    params = {};
  }

  return {
    types: [constants.STORE_SIMPLE_LOAD, constants.STORE_SIMPLE_LOAD_SUCCESS, constants.STORE_SIMPLE_LOAD_FAIL],
    key: key,
    path: path,
    params: params,
    promise: function promise(_ref2) {
      var client = _ref2.client;
      return client.get(path, {
        params: params
      });
    }
  };
}

function simpleClear(key) {
  return {
    type: constants.STORE_SIMPLE_CLEAR,
    key: key
  };
}

function load(key, path, params) {
  return {
    types: [constants.STORE_LIST, constants.STORE_LIST_SUCCESS, constants.STORE_LIST_FAIL],
    key: key,
    promise: function promise(_ref3) {
      var client = _ref3.client;
      return client.get(path, {
        params: params
      });
    }
  };
}

function loadAll(key, path) {
  return {
    types: [constants.STORE_LIST_ALL, constants.STORE_LIST_ALL_SUCCESS, constants.STORE_LIST_ALL_FAIL],
    key: key,
    promise: function promise(_ref4) {
      var client = _ref4.client;
      return client.get(path, {
        params: {
          all: true
        }
      });
    }
  };
}

function clearAll(key) {
  return {
    type: constants.STORE_LIST_ALL_CLEAR,
    key: key
  };
}

function updateItemLocal(key, payload) {
  return {
    type: constants.STORE_ITEM_LOCAL_UPDATE,
    key: key,
    payload: payload
  };
}

function updateAndDispatch(key, path, id, params) {
  return {
    types: [constants.STORE_ITEM_LOCAL_UPDATE, constants.STORE_ITEM_LOCAL_UPDATE_SUCCESS, constants.STORE_ITEM_LOCAL_UPDATE_FAIL],
    key: key,
    promise: function promise(_ref5) {
      var client = _ref5.client;
      return client.put(path + "/" + id, params);
    },
    payload: params
  };
}

function update(key, path, id, params) {
  return {
    types: [constants.STORE_ITEM_UPDATE, constants.STORE_ITEM_UPDATE_SUCCESS, constants.STORE_ITEM_UPDATE_FAIL],
    key: key,
    promise: function promise(_ref6) {
      var client = _ref6.client;
      return client.put(path + "/" + id, params);
    },
    payload: params
  };
}

function updateDeep(key, path, id, params, pathDeep, cb) {
  return {
    types: [constants.STORE_ITEM_UPDATE_DEEP, constants.STORE_ITEM_UPDATE_DEEP_SUCCESS, constants.STORE_ITEM_UPDATE_DEEP_FAIL],
    key: key,
    promise: function promise(_ref7) {
      var client = _ref7.client;
      return client.put(path + "/" + id, params);
    },
    payload: params,
    pathDeep: pathDeep,
    cb: cb
  };
}

function destroyDeep(key, path, id, params, pathDeep, cb) {
  return {
    types: [constants.STORE_ITEM_DELETE_DEEP, constants.STORE_ITEM_DELETE_DEEP_SUCCESS, constants.STORE_ITEM_DELETE_DEEP_FAIL],
    key: key,
    promise: function promise(_ref8) {
      var client = _ref8.client;
      return client.delete(path + "/" + id, {
        params: params
      });
    },
    payload: params,
    pathDeep: pathDeep,
    cb: cb
  };
}

function createDeep(key, path, params, pathDeep) {
  return {
    types: [constants.STORE_ITEM_CREATE_DEEP, constants.STORE_ITEM_CREATE_DEEP_SUCCESS, constants.STORE_ITEM_CREATE_DEEP_FAIL],
    key: key,
    promise: function promise(_ref9) {
      var client = _ref9.client;
      return client.post(path, params);
    },
    pathDeep: pathDeep
  };
}

function create(key, path, params) {
  return {
    types: [constants.STORE_ITEM_CREATE, constants.STORE_ITEM_CREATE_SUCCESS, constants.STORE_ITEM_CREATE_FAIL],
    key: key,
    promise: function promise(_ref10) {
      var client = _ref10.client;
      return client.post(path, params);
    },
    payload: params
  };
}

function post(key, path, params) {
  return {
    types: [constants.STORE_ITEM_CREATE, constants.STORE_ITEM_CREATE_SUCCESS, constants.STORE_ITEM_CREATE_FAIL],
    key: key,
    promise: function promise(_ref11) {
      var client = _ref11.client;
      return client.post(path, params);
    },
    payload: params
  };
}

function loadItem(key, path, id, params) {
  return {
    types: [constants.STORE_ITEM_LOAD, constants.STORE_ITEM_LOAD_SUCCESS, constants.STORE_ITEM_LOAD_FAIL],
    key: key,
    promise: function promise(_ref12) {
      var client = _ref12.client;
      return client.get(path + "/" + id, {
        params: (0, _extends2.default)({}, params)
      });
    }
  };
}

function destroyItem(key, path, id) {
  return {
    types: [constants.STORE_ITEM_DELETE, constants.STORE_ITEM_DELETE_SUCCESS, constants.STORE_ITEM_DELETE_FAIL],
    key: key,
    promise: function promise(_ref13) {
      var client = _ref13.client;
      return client.delete(path + "/" + id);
    }
  };
}

function setPropertyItem(key, path, id, props) {
  return {
    types: [constants.STORE_ITEM_PROPERTY, constants.STORE_ITEM_PROPERTY_SUCCESS, constants.STORE_ITEM_PROPERTY_FAIL],
    key: key,
    props: props,
    promise: function promise(_ref14) {
      var client = _ref14.client;
      return client.post(path + "/" + id);
    }
  };
}

function clearList(key) {
  return {
    type: constants.STORE_LIST_CLEAR,
    key: key
  };
}

function clearItem(key) {
  return {
    type: constants.STORE_ITEM_CLEAR,
    key: key
  };
}

function loadStackItem(key, path, id, params) {
  return {
    types: [constants.STORE_STACK_ITEM_LOAD, constants.STORE_STACK_ITEM_LOAD_SUCCESS, constants.STORE_STACK_ITEM_LOAD_FAILED],
    key: key,
    id: id,
    promise: function promise(_ref15) {
      var client = _ref15.client;
      return client.get(path, params);
    }
  };
}

function request(type, path, params) {
  return function (dispatch, state, client) {
    return client[type](path, params).catch(function (Exception) {
      return console.error(Exception.message);
    });
  };
}

function clearStackItem(key, id) {
  return {
    type: constants.STORE_STACK_ITEM_CLEAR,
    key: key,
    id: id
  };
}

function clearNetworkState(key) {
  return {
    type: constants.STORE_ITEM_CLEAR_NETWORK_STATE,
    key: key
  };
}

function isAllLoaded(key, globalState) {
  return (0, _get2.default)(globalState, [constants.reducerIndex, key, 'allStatus', 'success'], false);
}

var Allparams = {};

function isLoaded(key, globalState, params) {
  if (params === void 0) {
    params = {};
  }

  var check = (0, _get2.default)(globalState, [constants.reducerIndex, key, 'success'], false) === true && parseInt((0, _get2.default)(globalState, [constants.reducerIndex, key, 'list', 'current_page'], 1), 10) === parseInt((0, _get2.default)(params, 'page', 1), 10) && JSON.stringify(params) === JSON.stringify((0, _get2.default)(Allparams, key, {}));
  (0, _set2.default)(Allparams, key, JSON.parse(JSON.stringify(params)));
  return check;
}

function isLoadedSimple(key, globalState, path, params) {
  if (params === void 0) {
    params = {};
  }

  return (0, _get2.default)(globalState, [constants.reducerIndex, key, 'success'], false) === true && (0, _get2.default)(globalState, [constants.reducerIndex, key, 'path'], null) === path && (0, _isEqual2.default)((0, _get2.default)(globalState, [constants.reducerIndex, key, 'params'], null), params);
}

function isLoadedItem(key, globalState, id) {
  return globalState[constants.reducerIndex] && globalState[constants.reducerIndex][key] && globalState[constants.reducerIndex][key][constants.reducerItem] && (globalState[constants.reducerIndex][key][constants.reducerItem].id && parseInt(globalState[constants.reducerIndex][key][constants.reducerItem].id, 10) === parseInt(id, 10) || globalState[constants.reducerIndex][key][constants.reducerItem].data && globalState[constants.reducerIndex][key][constants.reducerItem].data.id && parseInt(globalState[constants.reducerIndex][key][constants.reducerItem].data.id, 10) === parseInt(id, 10));
}

function isLoadedItemByString(key, globalState, id) {
  return globalState[constants.reducerIndex] && globalState[constants.reducerIndex][key] && globalState[constants.reducerIndex][key][constants.reducerItem] && (String(globalState[constants.reducerIndex][key][constants.reducerItem].id) === String(id) || globalState[constants.reducerIndex][key][constants.reducerItem].failed === true);
}
