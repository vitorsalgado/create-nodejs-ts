/* eslint-disable global-require */

'use strict'

const Package = require('../../package.json')

describe('Config', () => {
  it('should correctly load configuration', () => {
    const conf = require('./')

    expect(conf.env).toEqual(process.env.NODE_ENV)
    expect(conf.isProduction).toBeFalsy()
    expect(conf.isTest).toBeTruthy()
    expect(conf.version).toEqual(Package.version)
  })
})
