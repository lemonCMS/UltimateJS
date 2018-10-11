import '@babel/polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import createBrowserHistory from 'history/createBrowserHistory';
import apiClient from '../apiClient';
import ReduxAsyncConnect from '../ReduxAsyncConnect';
import Ultimate from '../Ultimate';

let _store = {};
let _providers = {};
let _wrapper = component => component;

export const rehydrate = async (_routes, { store, providers }, wrapper) => {
  const ultimate = <Ultimate routes={_routes} />;
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <ConnectedRouter history={providers.history}>
          <ReduxAsyncConnect routes={_routes} store={store} helpers={providers}>
            {wrapper(ultimate, { store, providers })}
          </ReduxAsyncConnect>
        </ConnectedRouter>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );
};

export const trigger = _routes =>
  rehydrate(_routes, { store: _store, providers: _providers }, _wrapper);

export default function client(
  routes,
  { initializeStore, state, providers },
  wrapper,
  awaitRender,
) {
  (async () => {
    providers.client = apiClient();
    providers.history = createBrowserHistory();
    _store = initializeStore(state, providers);
    _providers = providers;
    _wrapper = wrapper;

    await Loadable.preloadReady();

    if (typeof awaitRender === 'function') {
      awaitRender({ store: _store, provider: _providers }).then(() => {
        rehydrate(routes, { store: _store, providers: _providers }, _wrapper);
      });
    } else {
      rehydrate(routes, { store: _store, providers: _providers }, _wrapper);
    }
  })();
}
