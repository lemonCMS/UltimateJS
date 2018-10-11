import React from 'react';
import express from 'express';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import createMemoryHistory from 'history/createMemoryHistory';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import fs from 'fs-extra';
import apiClient from '../apiClient';
import { render as ultimateRender } from '../render';

const paths = require('razzle/config/paths');
// eslint-disable-next-line
const assets = require(paths.appManifest);

let vendorAssets = {};
if (process.env.RAZZLE_VENDOR_MANIFEST) {
  const vendorFile = `${paths.appBuild}/${process.env.RAZZLE_VENDOR_MANIFEST}`;
  if (fs.pathExistsSync(vendorFile)) {
    vendorAssets = fs.readJsonSync(vendorFile);
  }
}

const index = express();

index.disable('x-powered-by').use(express.static(paths.appPublic));

export default index;

export const render = (
  { req, res },
  stats,
  routes,
  { initializeStore, providers },
  wrapper,
  awaitRender,
) => {
  (async () => {
    try {
      const history = createMemoryHistory({
        initialEntries: [req.originalUrl],
      });
      providers.client = apiClient();
      providers.history = history;
      const store = initializeStore({}, providers);

      let bundles = [];
      const customRenderer = node => {
        const modules = [];
        const App = (
          <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <Provider store={store}>
              {typeof wrapper === 'function' ? wrapper(node) : node}
            </Provider>
          </Loadable.Capture>
        );
        const Html = renderToString(App);
        bundles = getBundles(stats, modules);

        return {
          html: Html,
          bundles,
        };
      };

      if (typeof awaitRender === 'function') {
        await awaitRender({ store, providers, req, res });
      }
      await Loadable.preloadReady();

      const html = await ultimateRender({
        req,
        res,
        customRenderer,
        routes,
        assets: Object.assign({}, vendorAssets, assets),
        store,
        client: providers.client,
      });
      res.send(html);
    } catch (error) {
      console.log('MOUNT ERROR', error);
      res.json(error);
    }
  })();
};
