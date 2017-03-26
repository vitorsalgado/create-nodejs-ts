'use strict';

const KoaRouter = require('koa-router');
const Path = require('path');
const Joi = require('joi');

const FileUtils = require('./libs/fileUtils');
const RouteSchema = require('./libs/core/routeSchema');
const ContextValidator = require('./libs/middlewares/contextValidator');

const ROUTES_PATH = Path.join(__dirname, './resources');

const router = new KoaRouter();

module.exports.load = () => FileUtils.readDirRecursively(ROUTES_PATH, file => file.indexOf('Routes') > -1)
	.reduce((a, b) => a.concat(b))
	.map(route => Joi.attempt(route, RouteSchema))
	.filter(route => !route.environments || route.environments.some(env => env === 'all') || route.environments.some(env => env === process.env.NODE_ENV))
	.map(sanitize);

module.exports.setUp = (routes, app) => routes
	.map(buildKoaRoute)
	.forEach(route => app.use(route.routes()).use(route.allowedMethods()));

const buildKoaRoute = (route) => {
	const middlewares = [];

	Object.keys(route.request)
		.map(key => { return { key: key, req: route.request[key] } })
		.filter(pair => pair.req.validate)
		.forEach(pair => middlewares.push(ContextValidator.validate(pair.req.schema, pair.key.toString())));

	middlewares.push(route.handler);

	Object.keys(route.response)
		.map(key => { return { key: key, res: route.response[key] } })
		.filter(pair => pair.res.validate)
		.forEach(pair => middlewares.push(ContextValidator.validate(pair.res.schema, pair.key.toString())));

	router[route.method](route.path, ...middlewares);

	return router;
};

const sanitize = (route) => {
	route.request = route.request || {};
	route.response = route.response || {};

	return route;
};
