const setup = require('../setup.js')

const chai = require('chai')
chai.use(require('chai-http'))

const expect = chai.expect
const assert = chai.assert
const request = chai.request(setup.url)

/*
 * Check a web app manifest exists with valid icon URLs
 */
describe('Web app manifest', function () {
  let error, response

  before('should load', (done) => {
    request.get('/manifest.webmanifest').end((err, res) => {
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
    expect(response).to.have.header('content-type', /^application\/manifest\+json/)
  })

  it('is valid JSON', () => {
    let valid = false

    try {
      JSON.parse(response.text)
      valid = true
    } catch (e) {
      valid = false
    }

    assert.equal(valid, true)
  })

  it('has accessible URLs', () => {
    const manifest = JSON.parse(response.text)

    for (const key in manifest.icons) {
      const url = new URL(manifest.icons[key].src)

      chai.request(setup.url).get(url.pathname).end((err, res) => {
        assert.equal(err, null)
        expect(res).to.have.status(200, `Failed to get ${manifest.icons[key].src}`)
      })
    }
  })
})
