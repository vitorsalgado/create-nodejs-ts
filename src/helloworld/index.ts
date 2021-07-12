import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify'

export const HelloWorldRoutes = {
  Health: {
    method: 'GET',
    url: '/',
    schema: {
      querystring: {
        name: { type: 'string' },
        excitement: { type: 'integer' }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    },
    async handler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
      await reply.send({ hello: 'world' })
    }
  } as RouteOptions
}
