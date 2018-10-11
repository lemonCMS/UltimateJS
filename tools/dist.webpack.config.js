module.exports = (distRoot, optimize) => ({
  mode: 'production',
  optimization: {
    minimize: !!optimize,
  },
  entry: './packages/index.js',
  output: {
    path: distRoot,
    filename: optimize ? 'ultimate.min.js' : 'ultimate.js',
    library: 'ReactBootstrap',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            envName: `dist-${optimize ? 'prod' : 'dev'}`,
          },
        },
      },
    ],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
});
