'use strict';

function RouteBuilder () {
	this.route = {};
	this.route.response = {};
	this.route.request = {};

	this.get = (path) => {
		this.route.method = 'get';
		this.route.path = path;

		return this;
	};

	this.post = (path) => {
		this.route.method = 'post';
		this.route.path = path;

		return this;
	};

	this.put = (path) => {
		this.route.method = 'put';
		this.route.path = path;

		return this;
	};

	this.del = (path) => {
		this.route.method = 'delete';
		this.route.path = path;

		return this;
	};

	this.tags = (...tags) => {
		this.route.tags = tags;

		return this;
	};

	this.description = (desc) => {
		this.route.description = desc;

		return this;
	};

	this.handledBy = (handler) => {
		this.route.handler = handler;

		return this;
	};

	this.queryStr = (schema) => {
		this.route.request.query = this.route.request.query || {};
		this.route.request.query = schema;

		return this;
	};

	this.headers = (schema) => {
		this.route.request.headers = this.route.request.headers || {};
		this.route.request.headers = schema;

		return this;
	};

	this.params = (schema) => {
		this.route.request.params = this.route.request.params || {};
		this.route.request.params = schema;

		return this;
	};

	this.withResponse = (status, description, schema) => {
		this.route.response[status] = {};
		this.route.response[status].description = description;
		this.route.response[status].schema = schema;

		return this;
	};

	this.build = () => this.route;
}

module.exports = new RouteBuilder();
