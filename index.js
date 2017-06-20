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
console.log(`Trace:		${Config.isTraceEnabled ? 'On' : 'Off'}`);

const closeServer = () => {
	Server.stop();
	process.exit(0);
};

process.on('SIGTERM', () => closeServer());

process.on('SIGINT', () => closeServer());

Server.start();

console.log(`server started and is listening on port ${process.env.PORT}`);
