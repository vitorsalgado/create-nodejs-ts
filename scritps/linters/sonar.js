#!/usr/bin/env node

/* eslint-disable no-console */
/* eslint-disable fp/no-unused-expression */

'use strict'

const Sonar = require('sonarjs')
const Path = require('path')
const { check } = require('../../src/fp')

const sources = Path.resolve('src')

const runSonarJS = () =>
  Sonar.analyze(sources, { onStart, onEnd })
    .then(issues =>
      check(issues)
        .on(noIssues, () => process.exit(0))
        .otherwise(() => logAndExit(issues)))

const noIssues = x => x.length === 0

const onStart = () => console.log('Analysis started')

const onEnd = () => console.log('Analysis finished\n')

const formatMsg = issue =>
  `${lineDelimiter()}\n
Severity: ${issue.severity}
Title: ${issue.title}
Action: ${issue.message}
File: ${issue.file}
Line: ${issue.pos.line}
Column: ${issue.pos.column}\n`

const lineDelimiter = () => Array(100).map(x => '-').join()

const logAndExit = issues => {
  console.log(`Found issue(s): ${issues.length}\n${issues.map(formatMsg)}`)
  return process.exit(1)
}

runSonarJS()
