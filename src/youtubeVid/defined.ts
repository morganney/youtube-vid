import { getBaseUrl } from '../util.js'

const define = async () => {
  const name = 'youtube-vid'
  const base = getBaseUrl(import.meta.url)
  const { YoutubeVid } = await import(`./element.js?base=${base}`)

  if (!customElements.get(name)) {
    customElements.define(name, YoutubeVid)
  }

  const ctor = await customElements.whenDefined(name)

  return ctor
}

export default await define()
