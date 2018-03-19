var express = require('express');
var webpack = require('webpack');
var path = require('path');
var config = require('./webpack.config');

var customPort = 3333;
var app = express();
var compiler = webpack(config);

var allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  next();
};

//
// Register Webpack middleware, hot-reload
// -----------------------------------------------------------------------------
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use('/', express.static(path.join(__dirname, '../assets')));
app.use('/fonts',express.static(path.join(__dirname, '../assets/fonts')));
app.use('/images',express.static(path.join(__dirname, '../assets/images')));

app.use(allowCrossDomain);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(customPort, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Listening on port ${customPort}`);
});