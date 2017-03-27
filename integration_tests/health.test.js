'use strict';

const SuperTest = require('supertest');
const Server = require('../src/server');

describe('GET /health', () => {
	let server;

	beforeAll(() => Server().then(koaServer => { server = koaServer; }));

	afterAll(() => server.close());

	test('should response with 204', () =>
		SuperTest(server).get('/health')
			.expect(204));
});
