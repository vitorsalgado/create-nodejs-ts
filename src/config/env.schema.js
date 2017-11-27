'use strict';

/**
 * Environment variables schema and data transformation.
 * This should be used instead of direct calling process.env.
 * @module EnvVars
 */

const Joi = require('joi');

/**
 * Environment variables schema
 * @enum
 * @readonly
 */
module.exports = Joi.object(
	{
		/**
		 * Application runtime environment
		 * @const NODE_ENV
		 * @type {String}
		 * @default develop
		 * */
		NODE_ENV: Joi.string().allow('develop', 'test', 'production').default('develop')
	})
	.unknown(true)
	.options({ abortEarly: false })
	.label('Env Vars');
