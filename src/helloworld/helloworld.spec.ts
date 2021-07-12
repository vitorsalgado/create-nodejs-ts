import '@app/utils/log'

import Supertest from 'supertest'
import { AppServer } from '@app/server'
import { provideConfig } from '@app/utils/config'
import { modifyConfigForTest } from '@app/utils/testing/config'

describe('Hello World', function () {
  const application = new AppServer(modifyConfigForTest(provideConfig()))

  beforeAll(async () => application.buildAndStart())
  afterAll(() => application.close())

  it('should return 200 with "hello world" as JSON', function () {
    return Supertest(application.server())
      .get('/')
      .expect(200)
      .expect(({ body }) => expect(body).toEqual({ hello: 'world' }))
  })
})
