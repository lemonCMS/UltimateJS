import propName from './propName';
import propNameAuth from './propNameAuth';

export default hooks => ComposedComponent => {
  if (hooks.authorized !== 'undefined') {
    const authHooks = {};
    authHooks.authorized = hooks.authorized;
    ComposedComponent[propNameAuth] = authHooks;
    delete hooks.authorized;
  }
  if (Object.keys(hooks).length > 0) {
    ComposedComponent[propName] = hooks;
  }
  return ComposedComponent;
};
