/* eslint-disable security/detect-child-process,no-console */

'use strict';

const Package = require('./package.json');
const exec = require('child_process').exec;

describe('Cli Tool', () => {
	it('should return package.json version when "version" is called', (done) => {
		exec('node cli version', (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual(Package.version);
			done();
		});
	});

	it('should return the last changelog entry without errors when "changelog" is called', (done) => {
		exec('node cli changelog', (err, data) => {
			expect(err).toBeNull();
			expect(data).toEqual(expect.stringContaining(Package.version));
			done();
		});
	});
});
