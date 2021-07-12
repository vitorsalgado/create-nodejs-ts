import { EnvConfigurationsFactory } from '@app/utils/config/env'
import { Configurations } from '@app/utils/config/configurations'
import { ConfigurationsFactory } from '@app/utils/config/configurations.factory'

export * from '@app/utils/config/env'
export * from '@app/utils/config/configurations'
export * from '@app/utils/config/configurations.factory'

export const provideConfig = (factory: ConfigurationsFactory = new EnvConfigurationsFactory()): Configurations =>
  factory.parseAndBuild()
