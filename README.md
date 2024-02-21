# youtube-vid

HTML custom element for rendering a YouTube video with a heading, icon and accordion behavior via the native `<detail>` element.

## CDN Example

Note, if the CDN strips URL query parameters [like unpkg](https://github.com/mjackson/unpkg/issues/348), then it can't be used. Otherwise, the custom element's HTML and CSS assets will be loaded from a path relative to the current hostname.

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
    <script type="module">
      const base = 'https://cdn.jsdelivr.net/npm/youtube-vid/dist/'

      await import(`${base}youTube/defined.js?base=${base}`)
      await import(`${base}youtubeVid/defined.js?base=${base}`)
    </script>
  </head>
  <body>
    <main>
      <youtube-vid id="qQIO3pBFfXI">
        <span slot="icon">🎹</span>
        <span slot="title">In Too Deep &mdash; Genesis</span>
      </youtube-vid>
    </main>
  </body>
</html>
```

TODO:

- replace the `public/` dir with a copy util that also transforms the css/html via minification.
