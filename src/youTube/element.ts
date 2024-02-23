const initYouTube = async () => {
  const url = new URL(import.meta.url)
  const base = `${url.origin}${url.pathname.split('youTube/element.js')[0] ?? '/'}`
  const [html, css] = await Promise.all([
    fetch(`${base}youTube/template.html`).then(resp => resp.text()),
    fetch(`${base}youTube/styles.css`).then(resp => resp.text()),
  ])
  const parser = new DOMParser()
  const template = parser
    .parseFromString(html, 'text/html')
    .querySelector('template') as HTMLTemplateElement
  const style = document.createElement('style')

  style.textContent = css
  template.content.prepend(style)

  return class YouTube extends HTMLElement {
    constructor() {
      super()
      const shadow = this.attachShadow({ mode: 'open' })

      shadow.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
      const shadowRoot = this.shadowRoot

      if (shadowRoot) {
        const iframe = shadowRoot.querySelector('iframe') as HTMLIFrameElement

        iframe.setAttribute('src', `https://www.youtube.com/embed/${this.dataset.id}`)
      }
    }
  }
}

export const YouTube = await initYouTube()
