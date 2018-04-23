/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable global-require */
/* eslint-disable security/detect-non-literal-require */

'use strict'

const FileSystem = require('fs')
const { take } = require('../../fp')

module.exports.readDirRecursively = (root, fileFilter, acc = []) =>
  FileSystem
    .readdirSync(root)
    .map(directory => `${root}/${directory}`)
    .map(file =>
      take(file)
        .on(isDirectory, x => acc.concat(exports.readDirRecursively(x, fileFilter, acc)))
        .on(fileFilter, x => acc.concat(require(x)))
        .otherwise(() => acc))
    .filter(notEmpty)
    .reduce((a, b) => a.concat(b), [])

const isDirectory = value =>
  take(value)
    .map(FileSystem.statSync)
    .on(stat => stat && stat.isDirectory(), () => true)
    .otherwise(() => false)

const notEmpty = arr => arr && arr.length > 0
