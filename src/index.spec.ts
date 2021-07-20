/**
 * This is a sample test suite.
 * Replace this with your implementation.
 */

import { spawn } from 'child_process'
import Path from 'path'

describe('Example Test', function () {
  it('should init without errors', async function () {
    process.env.PORT = '0'

    const index = Path.resolve(__dirname, 'index.ts')
    const proc = await spawn('ts-node', [index])

    expect(proc.pid).toBeDefined()

    process.kill(proc.pid || 0, 'SIGTERM')
  })
})
