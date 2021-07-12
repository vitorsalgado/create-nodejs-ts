import { Configurations } from '@app/utils/config/configurations'

export interface ConfigurationsFactory {
  parseAndBuild(): Configurations
}
