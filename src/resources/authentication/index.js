'use strict';

const Router = require('../../libs/routing/routeBuilder');

module.exports = [
	Router
		.post('/oauth/authorize')
		.tags('authentication')
		.handledBy(ctx => {

		})
		.build()
];
