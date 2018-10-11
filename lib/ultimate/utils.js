"use strict";

exports.__esModule = true;
exports.isAsyncComponent = isAsyncComponent;
exports.isPromise = exports.isObject = exports.isFunction = void 0;

/** @private is the given object a Function? */
var isFunction = function isFunction(obj) {
  return typeof obj === 'function';
};
/** @private is the given object an Object? */


exports.isFunction = isFunction;

var isObject = function isObject(obj) {
  return obj !== null && typeof obj === 'object';
};
/** @private is the given object/value a promise? */


exports.isObject = isObject;

var isPromise = function isPromise(value) {
  return isObject(value) && isFunction(value.then);
};
/** @private Guard cluase to narrow the AsyncRouteableComponent union type */


exports.isPromise = isPromise;

function isAsyncComponent(Component) {
  return Component.load !== undefined;
}