import asyncMap from './asyncMap';
import authorize from './authorize';

export default (function(name, components, locals) {
  return asyncMap(components, component => authorize(name, component, locals));
});
