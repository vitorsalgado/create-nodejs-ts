'use strict';

const SuperTest = require('supertest');
const Server = require('../src/server');

describe('GET /health', () => {
	beforeAll(() => Server.start());

	afterAll(() => Server.stop());

	test('should response with 204', () =>
		SuperTest(Server.get()).get('/health')
			.expect(204));
});
