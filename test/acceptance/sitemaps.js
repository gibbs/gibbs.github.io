const config = require('../config.js')
const { before, describe, it } = require('mocha')
// const path = require('path')

const chai = require('chai')
chai.use(require('chai-http'))

// const xsd = require('libxmljs2-xsd')

const expect = chai.expect
const assert = chai.assert
const request = chai.request(config.url)

/*
 * Check that a valid sitemap is available
 */
describe('Sitemap', () => {
  let error, response

  before('should load', (done) => {
    request.get('/sitemap.xml').end((err, res) => {
      error = err
      response = res
      done()
    })
  })

  it('exists and returns a 200 status code', () => {
    assert.equal(error, null)
    expect(response).to.have.status(200)
  })

  it('has the correct content-type', () => {
    expect(response).to.have.header('content-type', /text\/xml/)
  })

  /* it('is a valid sitemap', () => {
    const schemaPath = path.join(__dirname, 'fixtures/sitemap.xsd')
    const schema = xsd.parseFile(schemaPath)
    const errors = schema.validate(response.text)

    assert.equal(errors, null)
  }) */
})
