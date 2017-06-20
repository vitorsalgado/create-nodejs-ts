'use strict';

const Joi = require('joi');
const BadRequest = require('../http/httpErrors').BadRequest;

module.exports.validate = (schema, target) => (ctx, next) => {
	const result = Joi.validate(ctx[target], schema);

	if (result && result.error) {
		const issues = result.error.details.map((detail) => {
			return {
				code: detail.context.code,
				field: detail.context.key,
				message: detail.message
			};
		});

		throw new BadRequest(issues);
	}

	return next();
};
