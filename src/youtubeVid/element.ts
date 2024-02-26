import html from './template.html?raw'
import css from './styles.css?raw'

const initYoutubeVid = async () => {
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

    static get observedAttributes() {
      return ['width']
    }

    connectedCallback() {
      const shadowRoot = this.shadowRoot

      if (shadowRoot) {
        const details = shadowRoot.querySelector('details') as HTMLDetailsElement
        const attrWidth = this.getAttribute('width')

        details.style.setProperty('width', attrWidth ?? '100%')
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

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      switch (name) {
        case 'width':
          this.shadowRoot
            ?.querySelector('details')
            ?.style.setProperty('width', newValue || oldValue || '100%')
          break
      }
    }
  }
}

export const YoutubeVid = await initYoutubeVid()
