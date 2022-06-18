const config = require('../config.js')
const { before, describe, it } = require('mocha')

const chai = require('chai')
chai.use(require('chai-http'))

const expect = chai.expect
const assert = chai.assert
const request = chai.request(config.url)

/*
 * Check that a robots.txt text file has been created with explicit "allow"
 * and "disallow" instructions
 */
describe('Robots.txt file', () => {
  let error, response

  before('should load', (done) => {
    request.get('/robots.txt').end((err, res) => {
      error = err
      response = res
      done()
    })
  })

  it('exists', () => {
    assert.equal(error, null)
    expect(response).to.have.status(200)
  })

  it('has the correct content-type', () => {
    expect(response).to.have.header('content-type', /^text\/plain/)
  })

  it('contains explicit allow and disallow instructions', () => {
    expect(response.text).to.match(/Allow:/)
    expect(response.text).to.match(/Disallow:/)
  })

  it('contains a sitemap reference', () => {
    expect(response.text).to.match(/Sitemap:/)
  })
})
