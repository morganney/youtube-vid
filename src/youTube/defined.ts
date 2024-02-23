const define = async () => {
  const name = 'you-tube'

  if (!customElements.get(name)) {
    const { YouTube } = await import('./element.js')

    customElements.define(name, YouTube)
  }

  const ctor = await customElements.whenDefined(name)

  return ctor
}

export default await define()
