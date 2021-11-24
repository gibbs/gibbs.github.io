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
  year: (new Date()).getFullYear()
}
