'use strict';

const HealthSchema = require('./healthSchema');

const health = {
	tags: ['system'],
	path: '/health',
	handler: (ctx) => {
		ctx.body = {
			status: 'UP',
			uptime: process.uptime()
		};
	},
	response: {
		200: { description: 'API health check', schema: HealthSchema }
	}
};

module.exports = [health];
