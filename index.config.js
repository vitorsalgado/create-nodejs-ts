'use strict'

const Config = require('./src/config')

module.exports = {
  apps: [
    {
      name: 'nodejs-starter',
      script: 'index.js',
      instances: Config.application.instances,
      exec_mode: 'cluster',
      restart_delay: 3000,
      max_memory_restart: Config.application.maxMemoryRestart,
      merge_logs: true
    }
  ]
}
