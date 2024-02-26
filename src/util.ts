const getBaseUrl = (moduleUrl: string, moduleName: string) => {
  const url = new URL(moduleUrl)
  const baseParam = url.searchParams.get('base')
  let pathPrefix = url.pathname.split(`${moduleName}/element.js`)[0] ?? '/'

  if (baseParam) {
    return baseParam
  }

  if (/^file/.test(url.protocol)) {
    return '/'
  }

  if (!pathPrefix.endsWith('/')) {
    pathPrefix += '/'
  }

  return `${url.origin}${pathPrefix}`
}
const fetchAssets = async (moduleUrl: string, moduleName: string) => {
  const base = getBaseUrl(moduleUrl, moduleName)

  const [html, css] = await Promise.all([
    fetch(`${base}${moduleName}/template.html`).then(resp => resp.text()),
    fetch(`${base}${moduleName}/styles.css`).then(resp => resp.text()),
  ])

  return { html, css }
}

export { getBaseUrl, fetchAssets }
