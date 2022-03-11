const fs = require('fs')
const frontmatter = require('gray-matter')
const glob = require('glob')
const path = require('path')
const schemaValidator = require('jsonschema')

const defaultSchema = require('./default.schema.js')

glob(path.join(__dirname, '../content/**/*.md'), {}, (err, paths) => {
  if (err) {
    throw Error(err)
  }

  paths.forEach(filepath => {
    const parts = path.parse(filepath)
    const file = fs.readFileSync(filepath).toString()
    const matter = frontmatter(file)
    const section = path.basename(path.dirname(filepath))
    const schema = defaultSchema

    if (section === 'blog') {
      schema.required = [
        'anchor', 'date', 'description', 'heading', 'jsonld', 'summary',
        'tags', 'uri', 'title'
      ]
    } else if (section === 'projects') {
      schema.required = [
        'anchor', 'date', 'description', 'jsonld', 'summary',
        'tags', 'uri', 'title'
      ]
    } else {
      schema.required = [
        'description', 'title'
      ]
    }

    const validate = schemaValidator.validate(matter.data, schema)

    if (validate.errors.length) {
      throw Error(`${parts.base} - ${validate.errors}`)
    }
  })
})
