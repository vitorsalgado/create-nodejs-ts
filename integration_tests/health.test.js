'use strict';

const SuperTest = require('supertest');
const Server = require('../src/server');

describe('GET /health', () => {
	beforeAll(() => Server.start());

	afterAll(() => Server.stop());

	it('Should respond with 200', () =>
		SuperTest(Server.get()).get('/health')
			.expect(200));
});
