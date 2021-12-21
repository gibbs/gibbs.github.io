const config = require('../config.js')
const { before, describe, it } = require('mocha')

const chai = require('chai')
chai.use(require('chai-http'))

const RSSParser = require('rss-parser')

const expect = chai.expect
const assert = chai.assert
const request = chai.request(config.url)

/*
 * Test Atom/RSS feed
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
 * Test JSON feed
 */
describe('JSON feed', () => {
  let error, response

  before('should load', (done) => {
    request.get('/feed.json').end((err, res) => {
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
    expect(response).to.have.header('content-type', /application\/json/)
  })

  it('is a parsable feed', () => {
    JSON.parse(response.text)
  })
})
