'use strict';

const HealthController = require('./healthController');

const health = {
	tags: ['system'],
	path: '/health',
	handler: HealthController.check,
	response: {
		204: { description: 'API is live' }
	}
};

module.exports = [health];
