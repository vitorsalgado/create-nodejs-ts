'use strict';

const Joi = require('joi');

const request = Joi.object({
	validate: Joi.boolean().optional(),
	schema: Joi.object().schema()
}).optional();

const route = Joi.object({
	tags: Joi.array().items(Joi.string().required()).required().description('Tags for better organization in Swagger'),
	method: Joi.string().description('HTTP Method definition').lowercase().allow('get', 'post', 'put', 'delete', 'patch').default('get'),
	path: Joi.string().required().description('Request path'),
	handler: Joi.func().required().description('Request handler'),
	environments: Joi.array().items(Joi.string()).optional().description('Environments that the route should be set'),
	request: Joi.object({
		query: request,
		body: request,
		header: request,
		params: request
	}),
	response: Joi.object({
		200: Joi.object()
	}).optional()
});

module.exports = route;
