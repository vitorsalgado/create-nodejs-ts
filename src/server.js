'use strict';

const HTTPS = require('https');
const Koa = require('koa');
const KoaStatic = require('koa-static');
const KoaMount = require('koa-mount');

const Routes = require('./routes');
const Swagger = require('./libs/swagger');
const Config = require('./config/config');
const ErrorHandler = require('./libs/middlewares/errorHandler');

module.exports.start = () => new Promise((resolve, reject) => {
	const app = new Koa();
	const routes = Routes.load();

	app.use(ErrorHandler);

	Routes.setUp(routes, app);
	const doc = Swagger.buildDocumentation(routes);

	console.log(JSON.stringify(doc, 2, 2));

	app.use(KoaMount('/docs', KoaStatic('.swagger')));

	// app.use(HealthRoutes.routes());
	// app.use(HealthRoutes.allowedMethods());

	app.listen(Config.port);

	if (process.env.NODE_ENV === 'production') {
		HTTPS.createServer({}, app.callback()).listen(443);
	}

	return resolve(app);
});
