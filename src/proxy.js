var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.use('/', proxy({target: 'https://snkrs.prod.commerce.nikecloud.com', changeOrigin: true}))
app.listen(3001);
