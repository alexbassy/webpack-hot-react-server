const path = require('path')
const webpack = require('webpack')

const dist = path.join(__dirname, 'dist')
const isProduction = process.env.NODE_ENV === 'production'
const mode = isProduction ? 'production' : 'development'

const babel = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
}

const CLIENT_CONFIG = {
  name: 'client',
  mode,
  target: 'web',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './src/client',
  ],
  output: {
    path: path.join(dist, 'client'),
    publicPath: '/',
    filename: '[name].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      multiStep: true,
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  ...babel,
  devtool: 'source-map',
}

const SERVER_CONFIG = {
  name: 'server',
  mode,
  target: 'node',
  entry: './src/server/server.js',
  output: {
    path: path.join(dist, 'server'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  ...babel,
  devtool: 'source-map',
}

const DEV_SERVER_CONFIG = {
  ...SERVER_CONFIG,
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  name: 'dev-server',
  entry: './src/index.js',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'production'",
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  output: {
    ...SERVER_CONFIG.output,
    path: dist,
    filename: 'entry.js',
  },
}

module.exports = [
  CLIENT_CONFIG,
  SERVER_CONFIG,
  isProduction && DEV_SERVER_CONFIG,
].filter(Boolean)
