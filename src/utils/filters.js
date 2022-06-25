const site = require('../_data/site')
const meta = require('../_data/meta')
const { DateTime } = require('luxon')

/**
 * Return local date
 *
 * @param {string} date
 */
function postDateFilter (date) {
  return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_FULL)
}

/**
 * Return basic JSON+LD
 *
 * @param {string} value
 */
function jsonldFilter (value) {
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
function jsonldBlogFilter (value) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    url: site.url,
    copyrightYear: site.year,
    copyrightHolder: meta.author.name,
    inLanguage: meta.language,
    mainEntityOfPage: true,
    sameAs: [
      meta.links.github.url,
      meta.links.twitter.url
    ],
    author: {
      '@type': 'Person',
      name: meta.author.name,
      url: site.url
    },
    creator: {
      '@type': 'Person',
      name: meta.author.name,
      url: site.url
    },
    publisher: {
      '@type': 'Person',
      name: meta.author.name,
      url: site.url
    },
    ...value
  }

  return JSON.stringify(json, null, site.environment === 'production' ? 0 : 2)
}

/**
 * Primary Tag Filter
 *
 * @param {array} tags
 * @returns mixed
 */
function primaryTagFilter (tags) {
  if (tags.length >= 2) {
    return tags.slice(1, 2)
  }

  return tags
}

module.exports = (config) => {
  config.addFilter('limit', (list, limit, start = 0) => list.slice(start, limit))
  config.addFilter('toJSONLD', jsonldFilter)
  config.addFilter('postDate', postDateFilter)
  config.addFilter('primaryTag', primaryTagFilter)
  config.addFilter('toJSONLDBlog', jsonldBlogFilter)
}
