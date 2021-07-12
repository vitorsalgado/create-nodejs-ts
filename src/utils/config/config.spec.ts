import { provideConfig } from '@app/utils/config/index'
import { EnvConfigurationsFactory } from '@app/utils/config/env'

describe('Configurations', function () {
  it('should setup with environment variables', function () {
    provideConfig(new EnvConfigurationsFactory())
  })
})
