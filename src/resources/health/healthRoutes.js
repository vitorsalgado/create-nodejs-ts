'use strict';

const Joi = require('joi');

const HealthController = require('./healthController');
const HealthSchema = require('../../schemas/healthSchema');

const health = {
	tags: ['system'],
	path: '/health',
	handler: HealthController.check,
	request: {
		query: {
			validate: true,
			schema: Joi.array().items(Joi.object({
				id: Joi.number().required().min(10).example(15),
				inner: Joi.object({ innerName: Joi.string().description('inner string test').required() }),
				name: Joi.string().default('defautl valeu').required().description('test description').valid('', null).meta({ code: 'UNKNOW_INDENTIFIER_00' }),
				arr: Joi.array().items(Joi.string().description('inner array str').required()).description('array descx')
			}).label('Inner LAbel')).label('label').description('test obj desc').required()
		}
	},
	response: {
		200: {
			description: 'Success',
			schema: HealthSchema
		}
	}
};

module.exports = [health];
