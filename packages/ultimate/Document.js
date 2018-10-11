import React from 'react';

const AfterRoot = () => (
  <div id="root">DO_NOT_DELETE_THIS_YOU_WILL_BREAK_YOUR_APP</div>
);

class Document extends React.PureComponent {
  static async getInitialProps({ assets, data, renderPage }) {
    const page = await renderPage();
    return { assets, data, ...page };
  }

  render() {
    const { helmet, assets, data, bundles } = this.props;
    const chunks = bundles.filter(bundle => bundle.file.endsWith('.js'));
    const styles = bundles.filter(bundle => bundle.file.endsWith('.css'));
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    const scripts = Object.keys(assets)
      .filter(key => assets[key] && assets[key].js)
      .map((key, index) => <script key={index} src={assets[key].js} defer />);

    /* eslint-disable jsx-a11y/html-has-lang */
    /* eslint-disable react/no-danger */
    return (
      <html {...htmlAttrs}>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>Welcome to the Afterparty</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {assets.client.css && (
            <link rel="stylesheet" href={assets.client.css} />
          )}
          {styles.map(
            (style, key) =>
              process.env.NODE_ENV === 'production' ? (
                <link rel="stylesheet" key={key} href={`/${style.file}`} />
              ) : (
                <link
                  rel="stylesheet"
                  key={key}
                  href={`http://${process.env.HOST}:${parseInt(
                    process.env.PORT,
                    10,
                  ) + 1}/${style.file}`}
                />
              ),
          )}

          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {helmet.style.toComponent()}
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />

          {scripts}
          {chunks.map(
            (chunk, key) =>
              process.env.NODE_ENV === 'production' ? (
                <script key={key} src={`/${chunk.file}`} />
              ) : (
                <script
                  key={key}
                  src={`http://${process.env.HOST}:${parseInt(
                    process.env.PORT,
                    10,
                  ) + 1}/${chunk.file}`}
                />
              ),
          )}
          <span
            dangerouslySetInnerHTML={
              {__html: `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(data)}</script>`} // prettier-ignore
            }
          />
        </body>
      </html>
    );
  }
}

export default Document;
