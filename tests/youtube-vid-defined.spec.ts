import { expect, it, describe } from 'vitest'

describe('youtube-vid defined', () => {
  it('is auto registered with the define subpath export', async () => {
    const { default: ctor } = await import('../src/youtubeVid/defined.js')
    const def = window.customElements.get('youtube-vid')

    expect(def).toBeDefined()
    expect(def === ctor).toBe(true)
  })
})
