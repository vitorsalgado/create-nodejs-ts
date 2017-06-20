'use strict';

const Mongoose = require('mongoose');

const clients = new Mongoose.Schema({
	key: { type: String, required: true },
	secret: { type: String, required: true },
	name: { type: String, required: true }
});

const claims = new Mongoose.Schema({
	client_id: { type: String, required: true },
	claim: { type: String, required: true },
	description: { type: String, required: true }
});

module.exports.clients = Mongoose.model('Clients', clients);

module.exports.claims = Mongoose.model('Claims', claims);
