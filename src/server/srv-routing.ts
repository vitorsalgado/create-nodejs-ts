import { Server } from 'http'
import { FastifyInstance } from 'fastify'
import { HelloWorldRoutes } from '@app/helloworld'

export function configureRoutes(fastify: FastifyInstance<Server>): void {
  fastify.route(HelloWorldRoutes.Health)
}
