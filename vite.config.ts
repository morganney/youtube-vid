import { env } from 'node:process'
import { resolve, join } from 'node:path'
import { readdir, readFile, writeFile } from 'node:fs/promises'

import { defineConfig } from 'vite'
import { minify } from 'html-minifier-terser'
import CleanCss from 'clean-css'

const out = resolve('dist')
const cleanCss = new CleanCss()
const getMinifiedStatic = async (contents: string, name: string) => {
  if (/\.css$/.test(name)) {
    return cleanCss.minify(contents).styles
  }

  if (/\.html$/.test(name)) {
    const html = await minify(contents, {
      collapseWhitespace: true,
      removeComments: true,
    })

    return html
  }

  return contents
}
export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      include: ['src/you*'],
    },
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
    lib: {
      formats: ['es'],
      entry: ['src/youTube/element.ts', 'src/youtubeVid/element.ts'],
    },
    rollupOptions: {
      input: {
        'youTube/element': 'src/youTube/element.ts',
        'youtubeVid/element': 'src/youtubeVid/element.ts',
      },
    },
    minify: 'esbuild',
    emptyOutDir: false,
  },
  plugins: [
    {
      name: 'ytv-copy',
      writeBundle: {
        order: 'post',
        /**
         * Copy statics over for supporting lazy loading alternative. (TODO)
         */
        handler: async () => {
          const dirents = await readdir(resolve('src'), { withFileTypes: true })

          for (const dirent of dirents) {
            if (dirent.isFile() && /(\.css|\.html)$/.test(dirent.name)) {
              let contents = await readFile(join(dirent.path, dirent.name), {
                encoding: 'utf-8',
              })

              contents = await getMinifiedStatic(contents, dirent.name)

              await writeFile(join(out, dirent.name), contents)
            }

            if (dirent.isDirectory()) {
              for (const file of ['template.html', 'styles.css']) {
                let contents = await readFile(join(dirent.path, dirent.name, file), {
                  encoding: 'utf-8',
                })

                contents = await getMinifiedStatic(contents, file)

                await writeFile(join(out, dirent.name, file), contents)
              }
            }

            if (env.YTV_DEPLOY) {
              const cdnHost = 'unpkg.com'
              let index = await readFile(resolve('index.html'), { encoding: 'utf-8' })
              const cdn = index
                .replace(
                  /(link|script)(.+\s)(href|src)="(\/src\/)/g,
                  `$1$2$3="https://${cdnHost}/youtube-vid/dist/`,
                )
                .replace('defined.ts', 'defined.js')

              index = index
                .replace(/(link|script)(.+\s)(href|src)="(\/src\/)/g, `$1$2$3="./`)
                .replace('defined.ts', 'defined.js')

              await writeFile(join(out, 'index.html'), index)
              await writeFile(join(out, 'cdn.html'), cdn)
            }
          }
        },
      },
    },
  ],
})
