const setup = require('../setup.js')
const path = require('path')

const chai = require('chai')
chai.use(require('chai-http'))

const RSSParser = require('rss-parser')
const xsd = require('libxmljs2-xsd')

const expect = chai.expect
const assert = chai.assert
const request = chai.request(setup.url)

/*
 * Check that a robots.txt text file has been created with explicit "allow"
 * and "disallow" instructions
 */
describe('Robots.txt file', function () {
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
 * The favicon should exist for legacy purposes. They can still be used by some
 * applications such as Atom feed readers. In addition this can reduce the
 * number of unnecessary 404 responses logged.
 */
describe('Atom feed', () => {
  let error, response

  before('should load', (done) => {
    request.get('/feed.xml').end((err, res) => {
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
    expect(response).to.have.header('content-type', /text\/xml/)
  })

  it('is a valid feed', () => {
    const parser = new RSSParser()

    parser.parseString(response.text, (err) => {
      assert.equal(err, null)
    })
  })
})

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

  it('exists', () => {
    assert.equal(error, null)
    expect(response).to.have.status(200)
  })

  it('has the correct content-type', () => {
    expect(response).to.have.header('content-type', /text\/xml/)
  })

  it('is a valid sitemap', () => {
    const schemaPath = path.join(__dirname, 'fixtures/sitemap.xsd')
    const schema = xsd.parseFile(schemaPath)
    const errors = schema.validate(response.text)

    assert.equal(errors, null)
  })
})
