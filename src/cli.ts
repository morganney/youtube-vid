#!/usr/bin/env node

import { cwd } from 'node:process'
import { parseArgs } from 'node:util'
import { isAbsolute, join } from 'node:path'

import { copyAssetsToWebRoot } from './copyAssets.js'

const defaultRoot = join(cwd(), 'dist')
const log = (color = '\x1b[30m', msg = '') => {
  // eslint-disable-next-line no-console
  console.log(`${color}%s\x1b[0m`, msg)
}
const logError = log.bind(null, '\x1b[31m')
const init = (args?: string[]) => {
  let webroot: string = ''

  try {
    const { values } = parseArgs({
      args,
      options: {
        webroot: {
          type: 'string',
          short: 'r',
          default: 'dist',
        },
      },
    })

    webroot = values?.webroot ?? ''
  } catch (err) {
    if (err instanceof Error) {
      logError(err.message)
    }
  }

  return webroot
}
const copyStatics = async () => {
  const root = init()
  const text = 'youtube-vid assets copied to'

  if (!root) {
    await copyAssetsToWebRoot(defaultRoot)
    log(`${text} ${defaultRoot}`)
  } else if (isAbsolute(root)) {
    await copyAssetsToWebRoot(root)
    log(`${text} ${root}`)
  } else {
    const path = join(cwd(), root)

    await copyAssetsToWebRoot(path)
    log(`${text} ${path}`)
  }
}

copyStatics()
