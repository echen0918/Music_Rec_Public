const proxy = require('http-proxy-middleware').createProxyMiddleware;

module.exports = function(app) {
    app.use(proxy(`/user/**`, {target: 'http://localhost:8000'}));
    app.use(proxy(`/auth/**`, {target: 'http://localhost:8000'}));
    app.use(proxy(`/song/**`, {target: 'http://localhost:8000'}));
    app.use(proxy(`/remix/**`, {target: 'http://localhost:8000'}));
};