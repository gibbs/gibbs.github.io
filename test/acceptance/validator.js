const config = require('../config.js')
const { before, describe, it } = require('mocha')
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
  const sitemapPath = path.join(__dirname, '/../../docs/sitemap.xml')
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
    elements: [
      'html5'
    ],
    extends: [
      'html-validate:recommended'
    ],
    rules: {
      'no-trailing-whitespace': 'off',
      'no-raw-characters': ['off', {
        relaxed: true
      }],
      'no-autoplay': ['off', {
        exclude: ['video']
      }]
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

    it('should return an OK response code', () => {
      expect(response).to.have.status(200)
    })

    it('should contain content', () => {
      const document = new JSDOM(response.text)
      const selector = document.window.document.querySelector('#content')

      // Assert not empty
      assert.isTrue(selector.textContent.replace(/[\n\r]+|[\s]{2,}/g, '').trim() !== '')
    })

    it('should have a suitable title less than 60 characters', () => {
      const document = new JSDOM(response.text)
      const selector = document.window.document.querySelector('title')

      // Assert description exists
      assert.equal(selector === null, false)
      assert.isTrue(selector.textContent.length <= 60)
    })

    it('should not have new lines in title', () => {
      const document = new JSDOM(response.text)
      const selector = document.window.document.querySelector('title')

      assert.equal(selector.text.indexOf('\n') === -1, true)
    })

    it('should have a suitable meta description between 50 and 160 characters', () => {
      const document = new JSDOM(response.text)
      const selector = document.window.document.querySelector('meta[name="description"]')

      // Assert description exists
      assert.equal(selector === null, false)
      assert.isAtLeast(selector.content.length, 50)
      assert.isAtMost(selector.content.length, 160)
    })

    it('should not contain meta description new lines', () => {
      const document = new JSDOM(response.text)
      const selector = document.window.document.querySelector('meta[name="description"]')

      assert.equal(selector.content.indexOf('\n') === -1, true)
    })

    it('should be valid HTML', () => {
      const validation = htmlvalidate.validateString(response.text)
      assert.equal(validation.valid, true, validation.valid ? null : JSON.stringify(validation.results[0].messages, null, 4))
      assert.equal(validation.errorCount, 0, `Error count: ${validation.errorCount}`)
    })

    it('should contain parsable JSON-LD', () => {
      const document = new JSDOM(response.text)
      const selector = document.window.document.querySelector('script[type="application/ld+json"]')

      // Assert JSON+LD exists
      assert.equal(selector === null, false)
      assert.isObject(JSON.parse(selector.textContent))
      assert.isTrue(Object.keys(JSON.parse(selector.textContent)).length > 0)
    })
  })
}
