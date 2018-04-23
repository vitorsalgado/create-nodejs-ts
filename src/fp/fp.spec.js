'use strict'

const { compose, pipe, take, def, valueOr, maybe, curry, any } = require('./')

describe('Functional', () => {
  it('"pipe" should pipe all functions from left to right', () => {
    const f1 = (val) => `${val}:value1`
    const f2 = (val) => `${val}:value2`

    const result = pipe(f1, f2)

    expect(result('FUNCTIONAL')).toEqual('FUNCTIONAL:value1:value2')
  })

  it('"compose" should compose all functions from right to left', () => {
    const f1 = (val) => `${val}:value1`
    const f2 = (val) => `${val}:value2`

    const result = compose(f1, f2)

    expect(result('FUNCTIONAL')).toEqual('FUNCTIONAL:value2:value1')
  })

  it('"take" should take a value and execute the function if predicate passes', () => {
    const on = jest.fn()
    const otherwise = jest.fn()

    take('test')
      .on(x => x === 'test', on)
      .otherwise(otherwise)

    expect(on).toHaveBeenCalled()
    expect(otherwise).not.toHaveBeenCalled()
  })

  it('"take" should execute the following "on" if the previous ones fails', () => {
    const on1 = jest.fn()
    const on2 = jest.fn()
    const on3 = jest.fn()
    const otherwise = jest.fn()

    take('test2')
      .on(x => x === 'test', on1)
      .on(x => x === 'test1', on2)
      .on(x => x === 'test2', on3)
      .otherwise(otherwise)

    expect(on1).not.toHaveBeenCalled()
    expect(on2).not.toHaveBeenCalled()
    expect(on3).toHaveBeenCalled()
    expect(otherwise).not.toHaveBeenCalled()
  })

  it('"take" should execute the "otherwise" if no predicate passes', () => {
    const on1 = jest.fn()
    const on2 = jest.fn()
    const on3 = jest.fn()
    const otherwise = jest.fn()

    take('test4')
      .on(x => x === 'test1', on1)
      .on(x => x === 'test2', on2)
      .on(x => x === 'test3', on3)
      .otherwise(otherwise)

    expect(on1).not.toHaveBeenCalled()
    expect(on2).not.toHaveBeenCalled()
    expect(on3).not.toHaveBeenCalled()
    expect(otherwise).toHaveBeenCalled()
  })

  it('"maybe" should wrap a provided value', () => {
    const m = maybe(undefined)

    expect(m).toBeDefined()
    expect(m.value()).toBeUndefined()
    expect(m.isPresent()).toBeFalsy()
  })

  it('"valueOr" should validate provided value and return a default if value is null or undefined', () => {
    expect(valueOr('test', 'fallback')).toEqual('test')
    expect(valueOr(null, 'fallback')).toEqual('fallback')
    expect(valueOr(undefined, 'oi')).toEqual('oi')
  })

  it('"def" should check if value is null or undefined', () => {
    expect(def('test')).toBeTruthy()
    expect(def(null)).toBeFalsy()
    expect(def(undefined)).toBeFalsy()
  })

  it('"curry" should reduce a function of multiple arguments into a function with one argument', () => {
    const add = (a, b) => a + b
    const add10 = curry(add)(10)

    expect(add10(2)).toEqual(12)
  })

  it('"any" should validate if any function evaluates to TRUE with the provided context', () => {
    const is401 = err => err.status === 401
    const is404 = err => err.status === 404

    const err = { status: 401 }

    const res = any(is404, is401)(err)
    const res2 = [is401(err), is404(err)].some(f => f)

    expect(res).toBeTruthy()
    expect(res2).toBeTruthy()
  })
})
