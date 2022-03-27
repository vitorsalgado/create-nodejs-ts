#!/usr/bin/env node

/**
 * This is a sample HTTP server.
 * Replace this with your implementation.
 */

import 'dotenv/config'
import { createServer, IncomingMessage, ServerResponse } from 'http'
import { Config } from './config.js'

const requestListener = (request: IncomingMessage, response: ServerResponse) => {
  response.writeHead(200)
  response.end('Hello, World!')
}

const server = createServer(requestListener)

server.listen(Config.port)
