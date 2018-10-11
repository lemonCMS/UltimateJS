import asyncMap from './asyncMap';
import trigger from './trigger';

export default (name, components, locals) =>
  asyncMap(components, component => trigger(name, component, locals));
