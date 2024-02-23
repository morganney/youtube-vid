import { resolve, join } from 'node:path'
import { readdir, readFile, writeFile } from 'node:fs/promises'

import { defineConfig } from 'vite'
import { minify } from 'html-minifier-terser'
import CleanCss from 'clean-css'

const out = resolve('dist')
const cleanCss = new CleanCss()

export default defineConfig({
  build: {
    outDir: 'dist',
    target: 'esnext',
    lib: {
      formats: ['es'],
      entry: ['src/youTube/element.ts', 'src/youtubeVid/element.ts'],
    },
    rollupOptions: {
      input: {
        'youTube/element.min': 'src/youTube/element.ts',
        'youtubeVid/element.min': 'src/youtubeVid/element.ts',
      },
    },
    minify: 'esbuild',
    emptyOutDir: false,
  },
  plugins: [
    {
      name: 'my-copy',
      writeBundle: {
        order: 'post',
        handler: async () => {
          const dirents = await readdir(resolve('src'), { withFileTypes: true })

          for (const dirent of dirents) {
            if (dirent.isDirectory()) {
              for (const file of ['template.html', 'styles.css']) {
                let contents = await readFile(join(dirent.path, dirent.name, file), {
                  encoding: 'utf-8',
                })

                if (/\.css$/.test(file)) {
                  contents = cleanCss.minify(contents).styles
                }

                if (/\.html$/.test(file)) {
                  contents = await minify(contents, {
                    collapseWhitespace: true,
                    removeComments: true,
                  })
                }

                await writeFile(join(out, dirent.name, file), contents)
              }
            }
          }
        },
      },
    },
  ],
})
