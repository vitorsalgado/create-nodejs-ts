'use strict';

const KoaRouter = require('koa-router');
const Path = require('path');
const Joi = require('joi');

const FileUtils = require('../fileUtils');
const RouteSchema = require('./routeSchema');
const ContextValidator = require('../middlewares/contextValidator');

const ROUTES_PATH = Path.join(__dirname, '../../resources');

const router = new KoaRouter();

module.exports.load = () => FileUtils.readDirRecursively(ROUTES_PATH, file => file.indexOf('index') > -1)
	.reduce((a, b) => a.concat(b))
	.map(route => {
		try {
			return Joi.attempt(route, RouteSchema)
		} catch (ex) {
			console.log('Route SetUp', `Route ${route.path} - ${route.description} setup failed!`);
			throw ex;
		}
	})
	.filter(filterRoutes)
	.map(sanitize);

module.exports.setUp = (routes, app) => routes
	.map(buildKoaRoute)
	.forEach(route => setRouteInApplication(app, route));

const setRouteInApplication = (app, route) => app.use(route.routes()).use(route.allowedMethods());

const filterRoutes = (route) => !route.environments || route.environments.some(env => env === 'all') || route.environments.some(env => env === process.env.NODE_ENV);

const buildKoaRoute = (route) => {
	const middlewareList = [];

	// adding validators for request ( querystring, headers, params ... )
	addValidators(route.request, middlewareList);

	// main route handler
	middlewareList.push(route.handler);

	// adding validators for response
	addValidators(route.response, middlewareList);

	// setting middleware list to Koa router
	router[route.method](route.path, ...middlewareList);

	return router;
};

const addValidators = (ctx, middlewares) => Object.keys(ctx)
	.map(key => { return { key: key, value: ctx[key] } })
	.filter(pair => pair.value.validate)
	.forEach(pair => middlewares.push(ContextValidator.validate(pair.value.schema, pair.key.toString())));

const sanitize = (route) => {
	route.request = route.request || {};
	route.response = route.response || {};

	return route;
};
