const site = require('../_data/site')
const meta = require('../_data/meta')

/**
 * Return basic JSON+LD
 *
 * @param {string} value
 */
function jsonld (value) {
  const json = {
    '@context': 'https://schema.org',
    url: site.url,
    ...value
  }

  return JSON.stringify(json, null, site.environment === 'production' ? 0 : 2)
}

/**
 * Return Schema.org BlogPosting JSON+LD
 *
 * @param {string} value
 */
function jsonldBlog (value) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    url: site.url,
    copyrightYear: site.year,
    copyrightHolder: meta.author.name,
    inLanguage: meta.language,
    mainEntityOfPage: true,
    creator: {
      '@type': 'Person',
      name: meta.author.name,
      url: site.url
    },
    author: {
      '@type': 'Person',
      name: meta.author.name,
      url: site.url
    },
    ...value
  }

  return JSON.stringify(json, null, site.environment === 'production' ? 0 : 2)
}

module.exports = (config) => {
  config.addFilter('limit', (list, limit) => list.slice(0, limit))
  config.addFilter('toJSONLD', jsonld)
  config.addFilter('toJSONLDBlog', jsonldBlog)
}
