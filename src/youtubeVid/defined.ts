const define = async () => {
  const name = 'youtube-vid'

  if (!customElements.get('you-tube')) {
    await import('../youTube/defined.js')
  }

  if (!customElements.get(name)) {
    const { YoutubeVid } = await import('./element.js')

    customElements.define(name, YoutubeVid)
  }

  const ctor = await customElements.whenDefined(name)

  return ctor
}

export default await define()
