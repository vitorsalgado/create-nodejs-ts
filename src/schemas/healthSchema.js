'use strict';

const Joi = require('joi');

module.exports.response = Joi.object({
	live: Joi.boolean().required()
}).label('Health');
