/** @private is the given object a Function? */
export const isFunction = obj => typeof obj === 'function';

/** @private is the given object an Object? */
export const isObject = obj => obj !== null && typeof obj === 'object';

/** @private is the given object/value a promise? */
export const isPromise = value => isObject(value) && isFunction(value.then);

/** @private Guard cluase to narrow the AsyncRouteableComponent union type */
export function isAsyncComponent(Component) {
  return Component.load !== undefined;
}
