import html from './template.html?raw'
import css from './styles.css?raw'

const initYouTube = async () => {
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
