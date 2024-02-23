import { fileURLToPath } from 'node:url'
import { dirname, resolve, extname } from 'node:path'
import { readdir, stat, cp } from 'node:fs/promises'

const filename = fileURLToPath(import.meta.url)
const directory = dirname(filename)
const dest = resolve(directory, '../dist')
const copyAssets = async (from = resolve(directory), to = dest, preserve = true) => {
  const files = await readdir(from)

  for (const file of files) {
    const path = resolve(from, file)
    const stats = await stat(path)
    const parts = path.split('dist/')
    // Includes directory (element name)
    const asset = parts[1]

    if (stats.isFile()) {
      const extension = extname(path)

      if (extension === '.css' || extension === '.html') {
        await cp(path, resolve(to, asset ?? file), { recursive: true })
      }
    } else {
      await copyAssets(path, preserve ? resolve(to, file) : to)
    }
  }
}
const copyAssetsToWebRoot = async (root: string) => {
  await copyAssets(resolve(directory), root, false)
}

export { copyAssetsToWebRoot, copyAssets }
