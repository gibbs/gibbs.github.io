/**
 * Content security policies
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP
 */
const resources = require('./resources')
const directives = {
  'upgrade-insecure-requests': '',
  'base-uri': "'self'",
  'child-src': "'none'",
  'connect-src': `'self' ${resources.app.src}`,
  'default-src': "'self'",
  'font-src': "'self' data:",
  'form-action': "'self'",
  'frame-src': "'none'",
  'img-src': "'self' https://github.com/gibbs/ https://img.shields.io/ data:",
  'manifest-src': "'self'",
  'media-src': "'self'",
  'object-src': "'self'",
  'script-src': `'self' 'unsafe-inline' ${resources['chart.js'].src}`,
  'style-src': "'self' 'unsafe-inline'",
  'worker-src': "'self'"
}

if (process.env.APP_ENV !== 'production') {
  directives['script-src'] = `'self' 'unsafe-eval' 'unsafe-inline' ${resources['chart.js'].src}`
}

module.exports = Object.keys(directives).map(key => `${key} ${directives[key]}`).join('; ')
