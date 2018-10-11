import asyncMap from './asyncMap';
import trigger from './trigger';

export default (function(name, components, locals) {
  return asyncMap(components, component => trigger(name, component, locals));
});
