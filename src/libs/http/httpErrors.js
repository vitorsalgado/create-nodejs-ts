'use strict';

class BadRequest extends Error {
	constructor (data, message = 'Bad Request') {
		super(message);
		this.status = 400;
		this.data = data;
	}
}

class Unauthorized extends Error {
	constructor (message = 'Unauthorized') {
		super(message);
		this.status = 401;
	}
}

class NotFound extends Error {
	constructor (message = 'Not Found') {
		super(message);
		this.status = 404;
	}
}

module.exports.BadRequest = BadRequest;
module.exports.Unauthorized = Unauthorized;
module.exports.NotFound = NotFound;
