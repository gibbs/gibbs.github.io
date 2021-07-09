const config = require('../config.js')
const fs = require('fs')
const path = require('path')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const { HtmlValidate } = require('html-validate')
const chai = require('chai')
chai.use(require('chai-http'))

const convertXML = require('xml-js')

const expect = chai.expect
const assert = chai.assert
const request = chai.request(config.url)

/**
 * Get URL fixtures from the sitemap
 *
 * @return {object}
 */
function getURLFixtures () {
  const sitemapPath = path.join(__dirname, '/../../public/sitemap.xml')
  const sitemap = convertXML.xml2js(fs.readFileSync(sitemapPath, 'utf8'), {
    compact: true,
    spaces: 4
  })

  return sitemap.urlset.url
}

const urls = getURLFixtures()

for (const key in urls) {
  const url = new URL(urls[key].loc._text)

  const htmlvalidate = new HtmlValidate({
    extends: [
      'htmlvalidate:recommended'
    ],
    rules: {
      'no-trailing-whitespace': 'off'
    }
  })

  let error, response

  describe(`Validate ${url.pathname}`, function () {
    before('should load', (done) => {
      request.get(url.pathname).end((err, res) => {
        error = err
        response = res
        done()
      })
    })

    it('should exist', () => {
      assert.equal(error, null)
    })

    it('should return 200', () => {
      expect(response).to.have.status(200)
    })

    it('should be valid HTML', () => {
      const validation = htmlvalidate.validateString(response.text)
      assert.equal(validation.valid, true, validation.valid ? null : JSON.stringify(validation.results[0].messages, null, 4))
      assert.equal(validation.errorCount, 0, `Error count: ${validation.errorCount}`)
    })

    it('should contain JSON Linked Data', () => {
      // Create the document object
      const document = new JSDOM(response.text)

      // Query JSON+LD
      const selector = document.window.document.querySelector('script[type="application/ld+json"]')

      // Assert JSON+LD exists
      assert.equal(selector === null, false)
    })
  })
}
