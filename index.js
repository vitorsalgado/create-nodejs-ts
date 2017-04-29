'use strict';

require('dotenv').config({ silent: true });

const Server = require('./src/server');

const closeServer = () => {
	Server.stop();
	process.exit(0);
};

process.on('SIGTERM', () => closeServer());

process.on('SIGINT', () => closeServer());

Server.start();

console.log(`server started and is listening on port ${process.env.PORT}`);
