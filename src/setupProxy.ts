// src/setupProxy.js

import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function(app:any) {
  app.use(
    '/api', // Your API routes
    createProxyMiddleware({
      target: 'https://primefaces.org', // Target server URL
      changeOrigin: true,
    })
  );
};
