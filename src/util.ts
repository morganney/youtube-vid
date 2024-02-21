export const getBaseUrl = (moduleUrl: string) => {
  const url = new URL(moduleUrl)

  return url.searchParams.get('base') ?? ''
}
