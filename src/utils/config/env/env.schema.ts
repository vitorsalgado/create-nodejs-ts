import Joi from 'joi'

const ConfigurationsSchema = Joi.object({
  // Runtime
  NODE_ENV: Joi.string().default('production'),

  // Server
  PORT: Joi.number().default(3000),
  SERVER_HOST: Joi.string().default('::'),
  SERVER_LOG_ENABLED: Joi.boolean().default(false)
}).unknown()

export const parseConfigurations = (source: unknown): any => Joi.attempt(source, ConfigurationsSchema)
