const config = require('../config.js')
const { describe, it } = require('mocha')

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
