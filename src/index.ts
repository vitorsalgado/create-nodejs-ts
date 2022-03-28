#!/usr/bin/env node

/**
 * This is a sample HTTP server.
 * Replace this with your implementation.
 */

import 'dotenv/config'
import { createServer, IncomingMessage, ServerResponse } from 'http'
import { Config } from './config.js'

const requestListener = (request: IncomingMessage, response: ServerResponse) => {
  response.setHeader('content-type', 'text/plain;charset=utf8')
  response.writeHead(200, 'OK')
  response.end('Olá, Hola, Hello!')
}

const server = createServer(requestListener)

server.listen(Config.port)

// eslint-disable-next-line no-console
console.log(`Listening on port: ${Config.port}`)
