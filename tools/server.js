var express = require('express');
var webpack = require('webpack');
var path = require('path');
var config = require('./webpack.config');

var customPort = 3333;
var app = express();
var compiler = webpack(config);

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
app.use(express.static(path.join(__dirname, '/assets')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(customPort, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Listening on port ${customPort}`);
});