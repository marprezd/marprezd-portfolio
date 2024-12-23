function buildPatreonAuthURL(params: { [x: string]: string | number | boolean }) {
  // Base authorization endpoint
  const baseUrl = 'https://www.patreon.com/oauth2/authorize'

  // Stringify parameters
  const queryString = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')

  return `${baseUrl}?response_type=code&${queryString}`
}

export default buildPatreonAuthURL
