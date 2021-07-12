export interface Configurations {
  runtime: {
    isTest: boolean
  }

  server: {
    port: number
    host: string
    loggerEnabled: boolean
  }
}
