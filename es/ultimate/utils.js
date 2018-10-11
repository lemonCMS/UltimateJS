/** @private is the given object a Function? */
export var isFunction = function isFunction(obj) {
  return typeof obj === 'function';
};
/** @private is the given object an Object? */

export var isObject = function isObject(obj) {
  return obj !== null && typeof obj === 'object';
};
/** @private is the given object/value a promise? */

export var isPromise = function isPromise(value) {
  return isObject(value) && isFunction(value.then);
};
/** @private Guard cluase to narrow the AsyncRouteableComponent union type */

export function isAsyncComponent(Component) {
  return Component.load !== undefined;
}
