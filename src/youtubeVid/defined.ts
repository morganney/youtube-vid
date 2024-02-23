import { getBaseUrl } from '../util.js'

const define = async () => {
  const name = 'youtube-vid'
  const base = getBaseUrl(import.meta.url)

  if (!customElements.get('you-tube')) {
    await import(`../youTube/defined.js?base=${base}`)
  }

  if (!customElements.get(name)) {
    const { YoutubeVid } = await import(`./element.js?base=${base}`)

    customElements.define(name, YoutubeVid)
  }

  const ctor = await customElements.whenDefined(name)

  return ctor
}

export default await define()
