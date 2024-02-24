/* eslint-disable no-console */

import { watch } from 'node:fs'
import { spawnSync } from 'node:child_process'

const ac = new AbortController()
const { signal } = ac
const watcher = watch('src', { signal, recursive: true }, (eventType, filename) => {
  if (filename) {
    console.log(`${eventType} ${filename}. Rebuilding.`)
  }

  spawnSync('npm', ['run', 'build:deploy'])
})

watcher.on('error', error => {
  console.error('watcher error', error)
})
process.on('SIGINT', () => {
  ac.abort()
})
process.on('exit', code => {
  watcher.close()

  if (code !== 0) {
    console.log('watch non-zero exit code: ', code)
  }
})
