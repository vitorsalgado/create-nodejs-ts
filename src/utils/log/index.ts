import Pino from 'pino'

const level = process.env.NODE_ENV === 'test' ? 'silent' : process.env.LOG_LEVEL || 'info'
const isPretty = process.env.LOG_PRETTY === 'true'

const Logger: Pino.Logger = Pino({
  level,
  prettyPrint: isPretty
    ? {
        colorize: true,
        messageFormat: '{msg}',
        translateTime: 'SYS:standard',
        ignore: 'hostname,time'
      }
    : false
})

export default Logger
