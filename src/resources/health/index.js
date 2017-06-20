'use strict';

const Joi = require('joi');
const Router = require('../../libs/routing/routeBuilder');

const responseSchema = Joi.object({
	status: Joi.string().description('API status'),
	uptime: Joi.string()
}).label('Health');

module.exports = [
	Router
		.get('/health')
		.tags('system')
		.withResponse(200, 'API health check', responseSchema)
		.handledBy(ctx => {
			// ctx.body = {
			// 	status: 'UP',
			// 	uptime: process.uptime()
			// };

			ctx.body = {
				body: ctx,
				params: ctx.params,
				query: ctx.query
			};
		})
		.build()
];
