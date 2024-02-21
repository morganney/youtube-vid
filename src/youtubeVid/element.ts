import { getBaseUrl } from '../util.js'

const initYoutubeVid = async () => {
  const [html, css] = await Promise.all([
    fetch(`${getBaseUrl(import.meta.url)}youtubeVid/template.html`).then(resp =>
      resp.text(),
    ),
    fetch(`${getBaseUrl(import.meta.url)}youtubeVid/styles.css`).then(resp =>
      resp.text(),
    ),
  ])
  const parser = new DOMParser()
  const template = parser
    .parseFromString(html, 'text/html')
    .querySelector('template') as HTMLTemplateElement
  const style = document.createElement('style')

  style.textContent = css
  template.content.prepend(style)

  return class YoutubeVid extends HTMLElement {
    constructor() {
      super()
      const shadow = this.attachShadow({ mode: 'open' })

      shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
      const shadowRoot = this.shadowRoot

      if (shadowRoot) {
        const details = shadowRoot.querySelector('details') as HTMLDetailsElement

        details.addEventListener(
          'toggle',
          evt => {
            const details = evt.target as HTMLDetailsElement

            if (details.open) {
              const youtube = document.createElement('you-tube')

              youtube.setAttribute('data-id', this.id)
              details.appendChild(youtube)
            } else {
              const youtube = shadowRoot.querySelector(`you-tube[data-id="${this.id}"]`)

              if (youtube) {
                youtube.remove()
              }
            }
          },
          false,
        )
      }
    }
  }
}

export const YoutubeVid = await initYoutubeVid()
