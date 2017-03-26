'use strict';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const FORMAT = 'sha1';

module.exports.createSalt = () => crypto.randomBytes(32).toString('base64');

module.exports.createPasswordHash = (password, salt) => crypto.createHmac(FORMAT, salt).update(password).digest('hex');

module.exports.sign = (id) =>
	jwt.sign({id: id}, process.env.TOKEN_SECRET, {expiresIn: parseInt(process.env.TOKEN_EXPIRES_AT)});

module.exports.validateToken = (token) => new Promise((resolve, reject) =>
	jwt.verify(token, process.env.TOKEN_SECRET, {}, (err, decoded) => {
		if (err) {
			return reject(err);
		}

		return resolve(decoded);
	})
);
