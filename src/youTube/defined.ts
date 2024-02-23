import { getBaseUrl } from '../util.js'

const define = async () => {
  const name = 'you-tube'
  const base = getBaseUrl(import.meta.url)

  if (!customElements.get(name)) {
    const { YouTube } = await import(`./element.js?base=${base}`)

    customElements.define(name, YouTube)
  }

  const ctor = await customElements.whenDefined(name)

  return ctor
}

export default await define()
