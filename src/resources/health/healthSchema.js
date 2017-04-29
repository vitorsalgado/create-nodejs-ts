'use strict';

const Joi = require('joi');

module.exports = Joi.object({
	status: Joi.string().description('API status'),
	uptime: Joi.string()
}).label('Health');
