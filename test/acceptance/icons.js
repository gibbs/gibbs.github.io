const config = require('../config.js')
const { before, describe, it } = require('mocha')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const probe = require('probe-image-size')

const chai = require('chai')
chai.use(require('chai-http'))

const expect = chai.expect
const assert = chai.assert
const request = chai.request(config.url)

/*
 * The favicon should exist for legacy purposes. They can still be used by some
 * applications such as feed readers. In addition this can reduce the number of
 * unnecessary 404 responses logged.
 */
describe('Favicon .ico', () => {
  it('exists and is valid', (done) => {
    request.get('/favicon.ico').end((err, res) => {
      assert.equal(err, null)
      expect(res).to.have.status(200)
      expect(res).to.have.header('content-type', /image\/x-icon/)
      done()
    })
  })
})

/*
 * Apple touch icon for iOS home screens
 */
describe('Apple Touch Icon', () => {
  let error, response

  before('should load', (done) => {
    request.get('/').end((err, res) => {
      error = err
      response = res
      done()
    })
  })

  it('exists', () => {
    assert.equal(error, null)
  })

  it('loads and is valid', async () => {
    const document = new JSDOM(response.text)
    const selector = document.window.document.querySelector('link[rel="apple-touch-icon"]')
    const url = selector.getAttribute('href')

    request.get(url.replace(config.url, '')).end((err, res) => {
      assert.equal(err, null)
      expect(res).to.have.status(200)
      expect(res).to.have.header('content-type', /image\/png/)
    })

    const dimensions = await probe(url)

    // Assert dimensions are 180x180
    assert.equal(dimensions.width, 180)
    assert.equal(dimensions.height, 180)
  })
})
