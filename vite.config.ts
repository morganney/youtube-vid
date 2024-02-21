import { defineConfig } from 'vite'

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
})
