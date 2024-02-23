# youtube-vid

HTML custom element for rendering a YouTube video with a heading, icon and accordion behavior via the native `<detail>` element.

## CDN Example

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
      src="https://cdn.jsdelivr.net/npm/youtube-vid/dist/youtubeVid/defined.js"
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

@TODO
