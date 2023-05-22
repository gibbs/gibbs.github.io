const path = require('path')
const url = new URL(process.env.APP_URL || 'https://dangibbs.uk')

module.exports = {
  environment: process.env.APP_ENV || 'production',
  path: {
    public: path.join(__dirname, '../../docs/'),
    src: path.join(__dirname, '../../src/')
  },
  url: url.origin,
  host: url.host,
  hostname: url.hostname,
  year: (new Date()).getFullYear(),
  contentSecurity: [
    'upgrade-insecure-requests',
    "default-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' " + [
      url.origin,
      'https://cdn.jsdelivr.net/npm/chart.js'
    ].join(' '),
    "font-src 'self' " + [
      'fonts.gstatic.com',
      'data:'
    ].join(' '),
    'img-src * data:',
    "connect-src 'self' " + [
      url.host,
      '*.' + url.host
    ].join(' '),
    "base-uri 'self'",
    "object-src 'none'",
    "manifest-src 'self'",
    "worker-src 'self'"
  ].join('; ')
}
