'use strict';

const Request = require('request-promise');
const Chokidar = require('chokidar');

const watcher = Chokidar.watch('./data', { ignored: /[/\\]\./, persistent: true, ignoreInitial: true });

const onFileChange = (event, path) => {

	const valid = path && path.length > 5 && path.substr(path.length - 5) === '.json';

	if (!valid) {
		return;
	}

	console.log('File change detected. Reseting Wiremock mappings ...');

	const options = {
		url: 'http://wiremock:3000/__admin/mappings/reset',
		method: 'POST',
		json: true
	};

	Request(options)
		.then(() => console.log('Wiremock mappings reseted!'))
		.catch(() => console.log('Wiremock is unavailable now!'));
};

watcher
	.on('add', (path) => onFileChange('add', path))
	.on('change', (path) => onFileChange('change', path))
	.on('unlink', (path) => onFileChange('unlink', path));

console.log('Wiremock Reloader ready');
