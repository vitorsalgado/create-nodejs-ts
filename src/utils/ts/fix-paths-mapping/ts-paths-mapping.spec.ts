describe('TypeScript Paths Mapping Fix', function () {
  describe('Reading from src/', function () {
    it('should allow usage of @app/ when DIST_MODE is 0', async function () {
      await import('./index')

      const config = await import('@app/utils/config')
      expect(config.provideConfig().runtime.isTest).toBeTruthy()
    })
  })

  describe('Reading from dist/', function () {
    it('should allow usage of @app/ when DIST_MODE is 1 (True)', async function () {
      process.env.DIST_MODE = '1'

      await import('./index')

      const config = await import('@app/utils/config')
      expect(config.provideConfig().runtime.isTest).toBeTruthy()

      process.env.DIST_MODE = undefined
    })
  })
})
