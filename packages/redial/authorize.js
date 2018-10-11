import propName from './propNameAuth';

export default (name, components, locals) => {
  const promises = (Array.isArray(components) ? components : [components])

    // Filter out falsy components
    .filter(component => component)

    // Get component lifecycle hooks
    .map(component => ({
      component,
      hooks: component.default
        ? component.default[propName]
        : component[propName],
    }))

    // Filter out components that haven't been decorated
    .filter(({ hooks }) => hooks)

    // Calculate locals if required, execute hooks and store promises
    .map(({ component, hooks }) => {
      const hook = hooks[name];

      if (typeof hook !== 'function') {
        return null;
      }

      try {
        const authorized =
          typeof locals === 'function' ? hook(locals(component)) : hook(locals);

        return authorized
          ? Promise.resolve()
          : Promise.reject(new Error('not authorized'));
      } catch (err) {
        return Promise.reject(err);
      }
    });

  return Promise.all(promises);
};
