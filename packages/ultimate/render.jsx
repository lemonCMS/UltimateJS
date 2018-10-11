import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import {StaticRouter} from 'react-router-dom';
import {triggerWait, authorizeWait} from '../redial';
import DefaultDoc from './Document';
import Ultimate from './Ultimate';
import asyncMatchRoutes from './asyncMatchRoutes';

const modPageFn = function(Page) {
  return (props) => <Page {...props} />;
};

export async function render(options) {


  const { req, res, routes, assets, document, customRenderer, store, client, ...rest } = options;

  const Doc = document || DefaultDoc;
  const context = {};
  const renderPage = async (fn = modPageFn) => {
    // By default, we keep ReactDOMServer synchronous renderToString function
    const defaultRenderer = (element) => ({ html: ReactDOMServer.renderToString(element) });
    const renderer = customRenderer || defaultRenderer;
    const renderedContent = renderer(
      <StaticRouter location={req.originalUrl} context={context}>
        {console.log(routes)};

        {fn(Ultimate)({ routes })}
      </StaticRouter>
    );

    const helmet = Helmet.renderStatic();

    return { helmet, ...renderedContent };
  };

  const {components, match, params} = await asyncMatchRoutes(routes, req._parsedUrl.pathname);

  const locals = {
    store,
    match,
    params,
    client
  };

  return await authorizeWait('authorized', components, locals).then(async () => {
    const triggers = triggerWait('fetch', components, locals);
    await triggers;

    if (!match) {
      res.status(404);
      return;
    }

    if (match.path === '**') {
      res.status(404);
    } else if (match && match.redirectTo && match.path) {
      res.redirect(301, req.originalUrl.replace(match.path, match.redirectTo));
      return;
    }

    const { html, ...docProps } = await Doc.getInitialProps({
      req,
      res,
      assets,
      renderPage,
      helmet: Helmet.renderStatic(),
      data: store.getState(),
      match,
      ...rest
    });

    const doc = ReactDOMServer.renderToStaticMarkup(<Doc {...docProps} />);
    return `<!doctype html>${doc.replace('DO_NOT_DELETE_THIS_YOU_WILL_BREAK_YOUR_APP', html)}`;

  })
  .catch(() => {
    res.status(401);
    return (`<!doctype html><html><body>Access denied.</body></html>`);
  });

}
