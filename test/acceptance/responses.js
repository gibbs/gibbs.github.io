const config = require('../config.js')
const { before, describe, it } = require('mocha')

const chai = require('chai')
chai.use(require('chai-http'))

const expect = chai.expect
const assert = chai.assert
const request = chai.request(config.url)

/*
 * Test that a 404 page is setup and behaving as expected
 */
describe('404 page', () => {
  let error, response

  before('should load', (done) => {
    request.get('/404-error-test').end((err, res) => {
      error = err
      response = res
      done()
    })
  })

  it('exists', () => {
    assert.equal(error, null)
  })

  it('has a 404 response code', () => {
    expect(response).to.have.status(404)
  })

  it('contains a 404 message', () => {
    // @FIXME This should be improved - why are we depending on this string?
    expect(response.text).to.match(/404 Not Found/)
  })
})
