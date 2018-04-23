/* eslint-disable fp/no-rest-parameters */
/* eslint-disable fp/no-unused-expression */

'use strict'

module.exports.valueOr = (value, def) => value || def

module.exports.any = (...fn) => x => fn.some(f => f(x))

module.exports.all = (...fn) => x => fn.every(f => f(x))

module.exports.def = x => !!x

module.exports.pipe = (...fn) => x => fn.reduce((prev, next) => next(prev(x)))

module.exports.compose = (...fn) => x => fn.reduceRight((prev, next) => next(prev(x)))

module.exports.maybe = x =>
  ({
    isPresent: () => !!x,
    map: fn => exports.maybe(fn(x)),
    value: () => x,
    valueOrDefault: def => exports.valueOr(x, def)
  })

module.exports.curry = f => a => b => f(a, b)

module.exports.tap = exports.peak = fn => x => {
  fn(x)
  return x
}

module.exports.flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? exports.flatten(b) : b), [])

module.exports.not = fn => x => !fn(x)

module.exports.take = exports.check = x =>
  ({
    on: (pred, fn) => (pred(x) ? checked(fn(x)) : exports.take(x)),
    otherwise: fn => fn(x),
    map: fn => exports.take(fn(x)),
    fold: () => x
  })

const checked = x => ({ on: () => checked(x), otherwise: () => x, map: fn => checked(fn(x)), fold: () => x })
