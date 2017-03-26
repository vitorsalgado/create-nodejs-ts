'use strict';

require('dotenv').config({ silent: true });

const Server = require('./src/server');

Server.start()
	.then(console.log(`started and listening on port ${process.env.PORT}`))
	.catch(err => {
		console.log(err);
		process.exit(1);
	});
