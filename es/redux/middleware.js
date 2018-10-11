import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
export default function clientMiddleware(helpers) {
  return function (_ref) {
    var dispatch = _ref.dispatch;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(_extends({
            dispatch: dispatch
          }, helpers));
        }

        var promise = action.promise,
            types = action.types,
            rest = _objectWithoutPropertiesLoose(action, ["promise", "types"]);

        if (!promise) {
          return next(action);
        }

        var REQUEST = types[0],
            SUCCESS = types[1],
            FAILURE = types[2];
        next(_extends({}, rest, {
          type: REQUEST
        }));
        var actionPromise = promise(helpers, dispatch);
        actionPromise.then(function (result) {
          return next(_extends({}, rest, {
            result: result,
            type: SUCCESS
          }));
        }, function (error) {
          return next(_extends({}, rest, {
            error: error,
            type: FAILURE
          }));
        }).catch(function (error) {
          // eslint-disable-next-line
          console.error('MIDDLEWARE ERROR:', error);
          next(_extends({}, rest, {
            error: error,
            type: FAILURE
          }));
        });
        return actionPromise;
      };
    };
  };
}