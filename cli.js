/* eslint-disable security/detect-child-process,no-console */

'use strict';

const Package = require('./package.json');

const Program = require('commander');
const FileSystem = require('fs');
const RL = require('readline');
const Stream = require('stream');
const Path = require('path');

const argv = process.argv;

if (argv.length <= 2) {
	argv.push('--help');
}

const VERSION = Package.version;

Program
	.version(VERSION)
	.description('Utilities CLI Tool for development and Ci/Cd workflow');

Program
	.command('version')
	.description('get package version')
	.action(() => process.stdout.write(VERSION));

Program
	.command('changelog')
	.description('get changelog entry for latest version and parse to Slack Markdown format')
	.action(() => {
		const inputStream = FileSystem.createReadStream(Path.resolve('./CHANGELOG.md'));
		const readInterface = RL.createInterface(inputStream, new Stream());

		let latestChangelog = '';
		let titleEntries = 0;

		const lineToBreak = 3;
		const currentVersionEntry = 2;

		readInterface.on('line', (line) => {
			let parsedLine = '';

			if (line.startsWith('## ')) {
				titleEntries++;
			}

			if (titleEntries === lineToBreak) {
				return readInterface.close();
			}

			if (titleEntries === currentVersionEntry && line.startsWith('## ')) {
				const version = line.substring(line.indexOf('[') + 1, line.lastIndexOf(']')).trim();

				if (version !== VERSION) {
					throw new Error(`Version ${VERSION} does not have an entry in CHANGELOG.md yet!`);
				}
			}

			if (line.startsWith('#')) {
				parsedLine = `*${line.replace('### ', '').replace('## ', '').replace('# ', '')}*\n`;
			} else if (line.startsWith('- ')) {
				parsedLine = `${line.replace('- ', '• ')}\n`;
			} else {
				parsedLine = `${line}\n`;
			}

			latestChangelog += parsedLine;
		});

		readInterface.on('close', () => console.log(latestChangelog));
	});

Program.parse(argv);
