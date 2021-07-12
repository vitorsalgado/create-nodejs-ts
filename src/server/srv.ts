import { Server } from 'http'
import Fastify, { FastifyInstance } from 'fastify'
import { Configurations } from '@app/utils/config'
import { GracefulShutdownPlugin } from '@app/server/plugins/shutdown'
import Logger from '@app/utils/log'
import { configureRoutes } from '@app/server/srv-routing'

export class AppServer {
  private readonly fastifyApp: FastifyInstance
  private readonly port: number
  private readonly host: string

  constructor(private readonly configurations: Configurations) {
    this.port = configurations.server.port
    this.host = configurations.server.host
    this.fastifyApp = Fastify<Server>({ logger: this.configurations.server.loggerEnabled })
  }

  build(): FastifyInstance {
    this.fastifyApp.register(GracefulShutdownPlugin)

    configureRoutes(this.fastifyApp)

    return this.fastifyApp
  }

  server(): Server {
    return this.fastifyApp.server
  }

  async start(): Promise<void> {
    await this.fastifyApp.ready()

    return this.fastifyApp
      .listen(this.port, this.host)
      .then(addr => Logger.info(`Server online on: ${addr}`))
      .catch(err => {
        Logger.error(err)
        process.exit(1)
      })
  }

  async buildAndStart(): Promise<FastifyInstance> {
    await this.build()
    await this.start()

    return this.fastifyApp
  }

  async close(): Promise<void> {
    return this.fastifyApp.close()
  }
}
