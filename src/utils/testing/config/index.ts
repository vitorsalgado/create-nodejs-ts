import { Configurations } from '@app/utils/config'

export function modifyConfigForTest(configurations: Configurations): Configurations {
  configurations.server.port = 0

  return configurations
}
