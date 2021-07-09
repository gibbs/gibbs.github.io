const site = require('../../_data/site.js')
const fs = require('fs')
const postcss = require('postcss')
const CleanCSS = require('clean-css')
const css = fs.readFileSync(path.join(site.path.src, '/assets/css/main.css'), 'utf8')

async function parseCSS() {

}

module.exports = (config) {
  config.addFilter('css', function(code) {
    return new CleanCSS({}).minify(code).styles;
  })
}
