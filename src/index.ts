#!/usr/bin/env node

/**
 * This is a sample HTTP server.
 * Replace this with your implementation.
 */

import 'dotenv/config'
import { createServer, IncomingMessage, ServerResponse } from 'http'

const Port = parseInt(process.env.PORT || '8080')

const requestListener = (request: IncomingMessage, response: ServerResponse) => {
  response.writeHead(200)
  response.end('Hello, World!')
}

const server = createServer(requestListener)

server.listen(Port)
