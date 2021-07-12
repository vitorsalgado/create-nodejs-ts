#!/usr/bin/env node

// Initializing components that needs to be ready before all other.
// ---
// Fix Typescript "paths" mappings
// This import must always be the first one and the import path needs to be relative
import '../../utils/ts/fix-paths-mapping'

import 'dotenv/config'

import { EnvConfigurationsFactory, provideConfig } from '@app/utils/config'
import Logger from '@app/utils/log'
import { AppServer } from '@app/server/srv'

const config = provideConfig(new EnvConfigurationsFactory())

// Handling common NodeJs process events
// ---
process.on('uncaughtException', error => Logger.error(error))
process.on('warning', warning => Logger.warn(warning))
process.on('unhandledRejection', (reason, promise) =>
  Logger.warn(`Unhandled rejection at: ${promise}. Reason: ${reason}`)
)

// Running the application
// ---
const server = new AppServer(config)

server
  .buildAndStart()
  .then(() => Logger.debug('Application initialized'))
  .catch(err => Logger.fatal(err, 'An error occurred during server initialization'))
