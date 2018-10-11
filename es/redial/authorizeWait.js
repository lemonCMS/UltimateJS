import asyncMap from './asyncMap';
import authorize from './authorize';
export default (function (name, components, locals) {
  return asyncMap(components, function (component) {
    return authorize(name, component, locals);
  });
});