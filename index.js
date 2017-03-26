'use strict';

require('dotenv').config({ silent: true });

const Server = require('./src/server');

Server.start()
	.then(console.log('started'))
	.catch(err => {
		console.log(err);
		process.exit(1);
	});
