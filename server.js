const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api', proxy({
  target: 'https://snkrs.prod.commerce.nikecloud.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);
