import _isEqual from 'lodash/isEqual';
import _get from 'lodash/get';
import _set from 'lodash/set';
import * as constants from './constants';

export function multiUpdate(key, path, params) {
  return {
    types: [
      constants.STORE_LIST_UPDATE,
      constants.STORE_LIST_UPDATE_SUCCESS,
      constants.STORE_LIST_UPDATE_FAIL,
    ],
    key,
    params,
    promise: ({ client }) => client.post(path, params),
  };
}

export function simpleLoad(key, path, params = {}) {
  return {
    types: [
      constants.STORE_SIMPLE_LOAD,
      constants.STORE_SIMPLE_LOAD_SUCCESS,
      constants.STORE_SIMPLE_LOAD_FAIL,
    ],
    key,
    path,
    params,
    promise: ({ client }) =>
      client.get(path, {
        params,
      }),
  };
}

export function simpleClear(key) {
  return {
    type: constants.STORE_SIMPLE_CLEAR,
    key,
  };
}

export function load(key, path, params) {
  return {
    types: [
      constants.STORE_LIST,
      constants.STORE_LIST_SUCCESS,
      constants.STORE_LIST_FAIL,
    ],
    key,
    promise: ({ client }) => client.get(path, { params }),
  };
}

export function loadAll(key, path) {
  return {
    types: [
      constants.STORE_LIST_ALL,
      constants.STORE_LIST_ALL_SUCCESS,
      constants.STORE_LIST_ALL_FAIL,
    ],
    key,
    promise: ({ client }) =>
      client.get(path, {
        params: {
          all: true,
        },
      }),
  };
}

export function clearAll(key) {
  return {
    type: constants.STORE_LIST_ALL_CLEAR,
    key,
  };
}

export function updateItemLocal(key, payload) {
  return {
    type: constants.STORE_ITEM_LOCAL_UPDATE,
    key,
    payload,
  };
}

export function updateAndDispatch(key, path, id, params) {
  return {
    types: [
      constants.STORE_ITEM_LOCAL_UPDATE,
      constants.STORE_ITEM_LOCAL_UPDATE_SUCCESS,
      constants.STORE_ITEM_LOCAL_UPDATE_FAIL,
    ],
    key,
    promise: ({ client }) => client.put(`${path}/${id}`, params),
    payload: params,
  };
}

export function update(key, path, id, params) {
  return {
    types: [
      constants.STORE_ITEM_UPDATE,
      constants.STORE_ITEM_UPDATE_SUCCESS,
      constants.STORE_ITEM_UPDATE_FAIL,
    ],
    key,
    promise: ({ client }) => client.put(`${path}/${id}`, params),
    payload: params,
  };
}

export function updateDeep(key, path, id, params, pathDeep, cb) {
  return {
    types: [
      constants.STORE_ITEM_UPDATE_DEEP,
      constants.STORE_ITEM_UPDATE_DEEP_SUCCESS,
      constants.STORE_ITEM_UPDATE_DEEP_FAIL,
    ],
    key,
    promise: ({ client }) => client.put(`${path}/${id}`, params),
    payload: params,
    pathDeep,
    cb,
  };
}

export function destroyDeep(key, path, id, params, pathDeep, cb) {
  return {
    types: [
      constants.STORE_ITEM_DELETE_DEEP,
      constants.STORE_ITEM_DELETE_DEEP_SUCCESS,
      constants.STORE_ITEM_DELETE_DEEP_FAIL,
    ],
    key,
    promise: ({ client }) => client.delete(`${path}/${id}`, { params }),
    payload: params,
    pathDeep,
    cb,
  };
}

export function createDeep(key, path, params, pathDeep) {
  return {
    types: [
      constants.STORE_ITEM_CREATE_DEEP,
      constants.STORE_ITEM_CREATE_DEEP_SUCCESS,
      constants.STORE_ITEM_CREATE_DEEP_FAIL,
    ],
    key,
    promise: ({ client }) => client.post(path, params),
    pathDeep,
  };
}

export function create(key, path, params) {
  return {
    types: [
      constants.STORE_ITEM_CREATE,
      constants.STORE_ITEM_CREATE_SUCCESS,
      constants.STORE_ITEM_CREATE_FAIL,
    ],
    key,
    promise: ({ client }) => client.post(path, params),
    payload: params,
  };
}

export function post(key, path, params) {
  return {
    types: [
      constants.STORE_ITEM_CREATE,
      constants.STORE_ITEM_CREATE_SUCCESS,
      constants.STORE_ITEM_CREATE_FAIL,
    ],
    key,
    promise: ({ client }) => client.post(path, params),
    payload: params,
  };
}

export function loadItem(key, path, id, params) {
  return {
    types: [
      constants.STORE_ITEM_LOAD,
      constants.STORE_ITEM_LOAD_SUCCESS,
      constants.STORE_ITEM_LOAD_FAIL,
    ],
    key,
    promise: ({ client }) =>
      client.get(`${path}/${id}`, {
        params: {
          ...params,
        },
      }),
  };
}

export function destroyItem(key, path, id) {
  return {
    types: [
      constants.STORE_ITEM_DELETE,
      constants.STORE_ITEM_DELETE_SUCCESS,
      constants.STORE_ITEM_DELETE_FAIL,
    ],
    key,
    promise: ({ client }) => client.delete(`${path}/${id}`),
  };
}

export function setPropertyItem(key, path, id, props) {
  return {
    types: [
      constants.STORE_ITEM_PROPERTY,
      constants.STORE_ITEM_PROPERTY_SUCCESS,
      constants.STORE_ITEM_PROPERTY_FAIL,
    ],
    key,
    props,
    promise: ({ client }) => client.post(`${path}/${id}`),
  };
}

export function clearList(key) {
  return {
    type: constants.STORE_LIST_CLEAR,
    key,
  };
}

export function clearItem(key) {
  return {
    type: constants.STORE_ITEM_CLEAR,
    key,
  };
}

export function loadStackItem(key, path, id, params) {
  return {
    types: [
      constants.STORE_STACK_ITEM_LOAD,
      constants.STORE_STACK_ITEM_LOAD_SUCCESS,
      constants.STORE_STACK_ITEM_LOAD_FAILED,
    ],
    key,
    id,
    promise: ({ client }) => client.get(path, params),
  };
}

export function request(type, path, params) {
  return (dispatch, state, client) =>
    client[type](path, params).catch(Exception =>
      // eslint-disable-next-line no-console
      console.error(Exception.message),
    );
}

export function clearStackItem(key, id) {
  return {
    type: constants.STORE_STACK_ITEM_CLEAR,
    key,
    id,
  };
}

export function clearNetworkState(key) {
  return {
    type: constants.STORE_ITEM_CLEAR_NETWORK_STATE,
    key,
  };
}

export function isAllLoaded(key, globalState) {
  return _get(
    globalState,
    [constants.reducerIndex, key, 'allStatus', 'success'],
    false,
  );
}

const Allparams = {};

export function isLoaded(key, globalState, params = {}) {
  const check =
    _get(globalState, [constants.reducerIndex, key, 'success'], false) ===
      true &&
    parseInt(
      _get(
        globalState,
        [constants.reducerIndex, key, 'list', 'current_page'],
        1,
      ),
      10,
    ) === parseInt(_get(params, 'page', 1), 10) &&
    JSON.stringify(params) === JSON.stringify(_get(Allparams, key, {}));

  _set(Allparams, key, JSON.parse(JSON.stringify(params)));
  return check;
}

export function isLoadedSimple(key, globalState, path, params = {}) {
  return (
    _get(globalState, [constants.reducerIndex, key, 'success'], false) ===
      true &&
    _get(globalState, [constants.reducerIndex, key, 'path'], null) === path &&
    _isEqual(
      _get(globalState, [constants.reducerIndex, key, 'params'], null),
      params,
    )
  );
}

export function isLoadedItem(key, globalState, id) {
  return (
    globalState[constants.reducerIndex] &&
    globalState[constants.reducerIndex][key] &&
    globalState[constants.reducerIndex][key][constants.reducerItem] &&
    ((globalState[constants.reducerIndex][key][constants.reducerItem].id &&
      parseInt(
        globalState[constants.reducerIndex][key][constants.reducerItem].id,
        10,
      ) === parseInt(id, 10)) ||
      (globalState[constants.reducerIndex][key][constants.reducerItem].data &&
        globalState[constants.reducerIndex][key][constants.reducerItem].data
          .id &&
        parseInt(
          globalState[constants.reducerIndex][key][constants.reducerItem].data
            .id,
          10,
        ) === parseInt(id, 10)))
  );
}

export function isLoadedItemByString(key, globalState, id) {
  return (
    globalState[constants.reducerIndex] &&
    globalState[constants.reducerIndex][key] &&
    globalState[constants.reducerIndex][key][constants.reducerItem] &&
    (String(
      globalState[constants.reducerIndex][key][constants.reducerItem].id,
    ) === String(id) ||
      globalState[constants.reducerIndex][key][constants.reducerItem].failed ===
        true)
  );
}
