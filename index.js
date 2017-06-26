'use strict';

require('dotenv').config();

const FileSystem = require('fs');
const Path = require('path');

const Config = require('./src/config');
const Server = require('./src/server');

/*
 Print application banner and configuration on Stdout
 */
const banner = FileSystem.readFileSync(Path.resolve('banner.txt'));

console.log(banner.toString());

console.log(`Version:  	${Config.version}`);
console.log(`Env: 		${Config.environment}`);
console.log(`Trace:		${Config.isTraceEnabled ? 'On' : 'Off'}\n\n`);

const closeServer = () => {
	Server.stop();
	process.exit(0);
};

process.on('SIGTERM', () => closeServer());

process.on('SIGINT', () => closeServer());

Promise.all(
	[
		Config.ensureConfiguration()
	])
	.then(() => Server.start())
	.catch(err => console.error(err));
