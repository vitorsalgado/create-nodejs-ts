'use strict';

const Joi = require('joi');
const SwaggerConfig = require('../../swagger.config.json');

const DEFINITIONS_MAP = new Map();

const TYPE_ARRAY = 'array';
const TYPE_OBJECT = 'object';

module.exports.buildDocumentation = (routes, path) => {
	const paths = {};
	const definitions = {};

	routes.forEach(route => {
		const path = paths[route.path] = paths[route.path] || {};

		const operation = path[route.method] = {
			tags: route.tags,
			summary: sanitizeStr(route.summary),
			description: sanitizeStr(route.description),
			operationId: sanitizeStr(route.id)
		};

		operation.tags.forEach(tag => {
			if (!SwaggerConfig.tags.some(x => x.name === tag)) {
				throw new Error(
					`Route ${route.path} does not contain a valid tag! All tags set in route definition must match tags defined in swagger.config.json file.`);
			}
		});

		if (!SwaggerConfig.produces && route.produces) {
			operation.produces = route.produces;
		}

		if (!SwaggerConfig.consumes && route.consumes) {
			operation.consumes = route.consumes;
		}

		operation.parameters = Object.keys(route.request)
			.map(key => {return { key: key, value: route.request[key] }})
			.map(pair => {
				console.log('[SWAGGER]', pair.value.schema.describe());
				return pair;
			})
			.map(pair => buildParameter(pair.value.schema, pair.key));
	});

	DEFINITIONS_MAP.forEach((v, k) => definitions[k] = v);

	SwaggerConfig.paths = paths;
	SwaggerConfig.definitions = definitions;

	return SwaggerConfig;
};

const buildParameter = (schema, target) => {
	const described = schema.describe();

	let parameter = {
		in: target,
		required: schema.flags && schema.flags.presence && schema.flags.presence === 'required'
	};

	Object.assign(parameter, parseSchema(described, target, described.label));

	return parameter;
};

const parseSchema = (schema, target, name) => {
	const isInBody = target === 'body';

	let parameter = {
		description: schema.description || '',
		example: schema.example || '',
		notes: schema.notes || ''
	};

	if (name) {
		parameter.name = name;
	}

	if (!isInBody) {
		parameter.type = schema.type;
	}

	if (schema.valids && schema.valids.length) {
		const filtered = schema.valids.filter(x => x);

		if (filtered && filtered.length) {
			parameter.enum = filtered;
		}
	}

	if (schema.type === TYPE_ARRAY) {
		parameter = parseArray(parameter, target, schema);
	}

	return parameter;
};

const parseArray = (parameter, target, schema) => {
	const firstItem = schema.items[0];

	if (firstItem.type === TYPE_OBJECT) {
		buildDefinition(firstItem, target);

		parameter.schema = {
			type: TYPE_ARRAY,
			items: {
				'$ref': buildRef(firstItem.label)
			}
		};
	} else {
		parameter.items = parseSchema(firstItem, target);
	}

	parameter.minItems = getArgByName(schema.rules, 'min');
	parameter.maxItems = getArgByName(schema.rules, 'max');

	if (target === 'query' || target === 'formData') {
		parameter.collectionFormat = 'multi';
	}

	return parameter;
};

const buildDefinition = (schema, target) => {
	validate(schema);

	if (DEFINITIONS_MAP.has(schema.label)) {
		return;
	}

	const required = [];
	const optional = [];

	const definition = {
		type: TYPE_OBJECT,
		properties: Object.keys(schema.children)
			.map(key => { return { key: key, value: schema.children[key] }})
			.map(pair => parseSchema(pair.value, target, pair.key))
	};

	DEFINITIONS_MAP.set(schema.label, definition);
};

const getArgByName = (array, name) => {
	if (Array.isArray(array)) {
		let i = array.length;

		while (i--) {
			if (array[i].name === name) {
				return array[i].arg;
			}
		}
	}

	return undefined;
};

const buildRef = (definition) => `#/definitions/${definition}`;

const validate = (schema) => {
	if (!schema.label || schema.label === '') {
		throw new Error('Label is undefined!');
	}
};

const sanitizeStr = str => str || '';