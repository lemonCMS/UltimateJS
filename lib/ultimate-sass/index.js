let autoprefixer = require('autoprefixer');

let MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(baseConfig, _ref) {
  let dev = _ref.dev,
    target = _ref.target;
  let appConfig = Object.assign({}, baseConfig);

  if (target === 'web') {
    // Setup SCSS
    let cssLoader = {
      loader: 'css-loader',
      options: {
        minimize: !dev,
        sourceMap: dev,
        importLoaders: 3,
      },
    };
    let postCSSLoader = {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        // https://webpack.js.org/guides/migrating/#complex-options
        sourceMap: dev,
        plugins: function plugins() {
          return [
            autoprefixer({
              browsers: ['>1%', 'last 2 versions', 'Firefox ESR', 'not ie < 9'],
            }),
          ];
        },
      },
    };
    let sassLoader = {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    };
    let lessLoader = {
      loader: 'less-loader',
      options: {
        outputStyle: 'expanded',
        sourceMap: true,
      },
    };

    if (dev) {
      appConfig.module.rules.push({
        test: /\.less$/,
        use: ['style-loader', cssLoader, postCSSLoader, lessLoader],
      }); // For development, include source map

      appConfig.module.rules.push({
        test: /\.(sa|sc)ss$/,
        use: ['style-loader', cssLoader, postCSSLoader, sassLoader],
      });
      appConfig.plugins.push(
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: '[name].css',
          chunkFilename: '[id].css',
        }),
      );
    } else {
      // For production, extract CSS
      appConfig.module.rules.push({
        test: /\.(sa|sc)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          cssLoader,
          postCSSLoader,
          'resolve-url-loader',
          sassLoader,
        ],
      });
      appConfig.plugins.push(
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: '[name].css',
          chunkFilename: '[id].css',
        }),
      );
    }
  } else {
    appConfig.module.rules.push({
      test: /.scss$/,
      use: ['ignore-loader'],
    });
  }

  return appConfig;
};
