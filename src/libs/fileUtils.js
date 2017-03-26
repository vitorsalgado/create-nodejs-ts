'use strict';

const FileSystem = require('fs');

const readDirRecursively = (dir, predicate) => {
	let results = [];
	const directories = FileSystem.readdirSync(dir);

	directories.forEach((file) => {
		file = dir + '/' + file;

		const stat = FileSystem.statSync(file);

		if (stat && stat.isDirectory()) {
			results = results.concat(readDirRecursively(file, predicate));
		} else if (predicate(file)) {
			results.push(require(file));
		}
	});

	return results;
};

module.exports.readDirRecursively = readDirRecursively;
