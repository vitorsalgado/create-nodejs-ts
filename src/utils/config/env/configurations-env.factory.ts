import { parseConfigurations } from '@app/utils/config'
import { Configurations } from '@app/utils/config/configurations'
import { ConfigurationsFactory } from '@app/utils/config/configurations.factory'

export class EnvConfigurationsFactory implements ConfigurationsFactory {
  parseAndBuild(): Configurations {
    const env = parseConfigurations(process.env)

    return {
      runtime: { isTest: env.NODE_ENV === 'test' },
      server: { port: env.PORT, host: env.SERVER_HOST, loggerEnabled: env.SERVER_LOG_ENABLED }
    }
  }
}
