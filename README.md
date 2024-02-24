# [`<youtube-vid>`](https://www.npmjs.com/package/youtube-vid)

[![NPM version](https://img.shields.io/npm/v/youtube-vid.svg)](https://www.npmjs.com/package/youtube-vid)

[HTML custom element](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) for rendering a YouTube video with a heading, icon and accordion behavior via the native [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) element.

## CDN Example

It's simple to get up and started from a CDN. Just drop the `<script>` element in your page's HTML file and you're all set.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>youtube-vid CDN Demo</title>
    <meta name="description" content="HTML custom element for a youtube video." />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=2.0"
    />
    <script
      type="module"
      src="https://unpkg.com/youtube-vid/dist/youtubeVid/defined.js"
    ></script>
  </head>
  <body>
    <main>
      <youtube-vid id="qQIO3pBFfXI" width="50%">
        <span slot="icon">🎹</span>
        <span slot="title">In Too Deep &mdash; Genesis</span>
      </youtube-vid>
    </main>
  </body>
</html>
```

## NPM Example

First install the package.

```
npm install youtube-vid
```

Now create a page that loads one of the packages exports, ideally the `defined` subpath to register the custom element with the browser. For example, in Next.js the page might look like:

```js
'use client'

import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    const loadYtv = async () => {
      await import('youtube-vid/defined')
    }

    loadYtv()
  }, [])

  return (
    <youtube-vid id="abc123">
      <span slot="icon">🎵</span>
      <span slot="title">Video Title</span>
    </youtub-vid>
  )
}
```

Finally, create an npm script to copy the static html and css assets to your web server's root directory. `youtube-vid` includes a bin script called `ytvcp` to help with this.

For example, with Next.js you can copy the static assets to the `public` directory and they will be served from the web root as expected by the elements that load them.

```json
"scripts": {
  "prebuild": "ytvcp --webroot ./public"
}
```

So if your page using `youtube-vid` is hosted at https://my.nextjs.app/page the static html and css for the elements will be served at a path relative to '/'.

## Attributes

- `id` the id of the YouTube video to load.
- `width` the css width of the element, defaults to `100%`.

```html
<youtube-vid id="abc123" width="300px">
  <span slot="icon">📺</span>
  <span slot="title">Video Title</span>
</youtube-vid>
```
