import asyncMap from './asyncMap';
import authorize from './authorize';

export default (name, components, locals) =>
  asyncMap(components, component => authorize(name, component, locals));
