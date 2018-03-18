const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const ROOT_DIR = path.resolve(__dirname, '../');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const SRC_DIR = path.resolve(ROOT_DIR, 'src');

// show deprecation
// process.traceDeprecation = true;

module.exports = {
  mode: 'development',
  devtool: 'eval',
  entry: [
    path.join(SRC_DIR, 'index'),
    'webpack-hot-middleware/client',
  ],
  output: {
    path: DIST_DIR,
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  resolve: {
    modules: [
      'node_modules',
     ],
    extensions: ['.js', '.css', '.scss', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      // vue
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      // css
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: [
          'style-loader',
          'css-loader',
        ]
      },
      // sass
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins() {
                return [autoprefixer('last 2 version')];
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }
        ]
      },
      // images
      {
        test: /\.(png|ico|gif|svg|jpe?g)(\?[a-z0-9]+)?$/,
        use: 'url-loader',
      },
      // fonts
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['url-loader'] }
    ]
  },
  plugins: [
    new ProgressBarPlugin({
      format: 'Build [:bar] :percent (:elapsed seconds)',
      clear: false,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
  ]
};