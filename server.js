const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.server.js');
const options = {
  hot: true,
  host: 'localhost',
  port: '5002',
  proxy: {
      '/': {
          target: 'http://test.phpcap.com',
          secure: false,
          changeOrigin: true
      }
  }
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5002, 'localhost', () => {
  console.log('dev server listening on port 5002');
});