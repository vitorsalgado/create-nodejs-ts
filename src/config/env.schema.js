'use strict'

/**
 * Environment variables schema and data transformation.
 * This should be used instead of direct calling process.env.
 * @module EnvVars
 */

const Joi = require('joi')

/**
 * Environment variables schema
 * @enum
 * @readonly
 */
module.exports = Joi.object(
  {
    /**
     * Application runtime environment
     * @const NODE_ENV
     * @type {string}
     * @default development
     * */
    NODE_ENV: Joi.string().allow('development', 'test', 'production').default('production'),

    /**
     * Number of cluster nodes that PM2 should start
     * @const CLUSTER_INSTANCES
     * @type {number}
     * @default 0
     */
    SERVER_CLUSTER_INSTANCES: Joi.number().default(0),

    /**
     * Amount of memory that server will reach before PM2 restart it
     * @const SERVER_MAX_MEMORY_BEFORE_RESTART
     * @type {string}
     * @default 1G
     */
    SERVER_MAX_MEMORY_BEFORE_RESTART: Joi.string().default('1G')
  })
  .unknown(true)
  .options({ abortEarly: false })
  .label('Env Vars')
