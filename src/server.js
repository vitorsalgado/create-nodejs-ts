'use strict';

const Koa = require('koa');
const KoaStatic = require('koa-static');
const KoaMount = require('koa-mount');
const Kors = require('kcors');

const Routing = require('./libs/routing');
const Swagger = require('./libs/swagger');
const Config = require('./config');
const ErrorHandler = require('./libs/middlewares/errors');

const app = new Koa();
const routes = Routing.load();

let server;

app.use(ErrorHandler);

Routing.setUp(routes, app);
Swagger.buildDocumentation(routes);

app.use(KoaMount('/', KoaStatic('wwwroot/swagger')));
app.use(Kors());

app.on('error', err => console.log('server error', err));

module.exports.get = () => server;

module.exports.start = () => {
	server = app.listen(Config.port);
	return server;
};

module.exports.stop = () => server.close;
