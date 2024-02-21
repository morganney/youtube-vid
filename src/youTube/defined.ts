import { getBaseUrl } from '../util.js'

const define = async () => {
  const name = 'you-tube'
  const base = getBaseUrl(import.meta.url)
  const { YouTube } = await import(`./element.js?base=${base}`)

  if (!customElements.get(name)) {
    customElements.define(name, YouTube)
  }

  const ctor = await customElements.whenDefined(name)

  return ctor
}

export default await define()
