'use strict';

const Koa = require('koa');
const KoaStatic = require('koa-static');
const KoaMount = require('koa-mount');
const Cors = require('./libs/middlewares/cors');

const Routes = require('./routes');
const Swagger = require('./libs/swagger');
const Config = require('./config/config');
const ErrorHandler = require('./libs/middlewares/errors');

module.exports = () => new Promise((resolve, reject) => {
	const app = new Koa();
	const routes = Routes.load();

	app.use(ErrorHandler);

	Routes.setUp(routes, app);
	Swagger.buildDocumentation(routes);

	app.use(KoaMount('/', KoaStatic('wwwroot/swagger')));
	app.use(Cors());

	const server = app.listen(Config.port);

	return resolve(server);
});
