'use strict';

const Package = require('../../package.json');

const server = {
	port: process.env.PORT

};

const ensureConfiguration = () => {
	const required = Object.assign({}, server);
	const optionals = [];

	Object.keys(required)
		.map((key) => { return { key: key, value: required[key] }; })
		.filter((config) => !optionals.find((c) => config.key === c))
		.forEach((config) => {
			if (config.value === '' || config.value === null || typeof config.value === 'undefined') {
				throw new Error(`Parameter "${config.key}" is required! You may have missed an environment variable.`);
			}
		});
};

module.exports = {
	environment: process.env.NODE_ENV || 'development',
	version: Package.version,

	isProduction: process.env.NODE_ENV === 'production',
	isTest: process.env.NODE_ENV === 'test',
	isTraceEnabled: parseInt(process.env.MCOM_ENABLE_TRACE),

	ensureConfiguration: ensureConfiguration,

	server
};
