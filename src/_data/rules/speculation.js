/**
 * Speculation rules
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API
 */
const speculation = {
  prerender: [
    {
      eagerness: 'eager',
      source: 'list',
      urls: [
        '/',
        '/projects/',
        '/tools/'
      ]
    }, {
      eagerness: 'moderate',
      where: {
        and: [
          { href_matches: '/*' },
          { not: { selector_matches: '.npr' } },
          { not: { selector_matches: '[rel~=nofollow]' } }
        ]
      }
    }
  ]
}

module.exports = JSON.stringify(speculation)
