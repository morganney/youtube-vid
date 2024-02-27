import { expect, it, describe, beforeAll } from 'vitest'

import { YouTube } from '../src/youTube/element.js'
import { YoutubeVid } from '../src/youtubeVid/element.js'

describe('youtube-vid', () => {
  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  beforeAll(() => {
    window.customElements.define('you-tube', YouTube)
    window.customElements.define('youtube-vid', YoutubeVid)
  })

  it('renders a youtube video as a custom html element', async () => {
    const vid = document.createElement('youtube-vid')
    const icon = document.createElement('span')
    const title = document.createElement('title')
    const iconTxt = document.createTextNode('🎹')
    const titleTxt = document.createTextNode('Test Title')

    icon.setAttribute('slot', 'icon')
    icon.appendChild(iconTxt)
    title.setAttribute('slot', 'title')
    title.appendChild(titleTxt)

    vid.setAttribute('id', 'qQIO3pBFfXI')
    vid.appendChild(icon)
    vid.appendChild(title)

    document.body.appendChild(vid)

    const vidNode = document.body.querySelector('youtube-vid')
    const detailsNode = vidNode?.shadowRoot?.querySelector('details')

    expect(vidNode instanceof YoutubeVid).toBeTruthy()
    expect(detailsNode).toBeDefined()

    const summary = detailsNode?.querySelector('summary')
    const iconSlot = summary?.querySelector('slot[name="icon"]') as HTMLSlotElement
    const titleSlot = summary?.querySelector('slot[name="title"]') as HTMLSlotElement

    expect(iconSlot?.assignedNodes()[0].textContent).toBe('🎹')
    expect(titleSlot?.assignedNodes()[0].textContent).toBe('Test Title')

    detailsNode?.setAttribute('open', 'true')

    await wait(150)

    const ytNode = detailsNode?.querySelector('you-tube')
    const iframeNode = ytNode?.shadowRoot?.querySelector('iframe')

    expect(ytNode instanceof YouTube).toBeTruthy()
    expect(iframeNode).toBeDefined()

    detailsNode?.removeAttribute('open')

    await wait(150)

    expect(detailsNode?.querySelector('you-tube')).toBe(null)

    expect(detailsNode?.style.getPropertyValue('width')).toBe('100%')
    vid.setAttribute('width', '')
    expect(detailsNode?.style.getPropertyValue('width')).toBe('100%')
    vid.setAttribute('width', '500px')
    expect(detailsNode?.style.getPropertyValue('width')).toBe('500px')
    vid.setAttribute('width', '')
    // Will use the oldValue when one is there
    expect(detailsNode?.style.getPropertyValue('width')).toBe('500px')
  })
})
