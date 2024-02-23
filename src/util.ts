const getBaseUrl = (moduleUrl: string, moduleName: string) => {
  const url = new URL(moduleUrl)
  const baseParam = url.searchParams.get('base')
  const pathPrefix = url.pathname.split(`${moduleName}/element.js`)[0] ?? '/'

  if (baseParam) {
    return baseParam
  }

  if (/^file/.test(url.protocol)) {
    return '/'
  }

  return `${url.origin}${pathPrefix}`
}

export { getBaseUrl }
