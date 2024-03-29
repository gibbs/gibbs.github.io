module.exports = {
  type: 'object',
  properties: {
    archived: {
      type: ['string', 'boolean']
    },
    anchor: {
      type: 'string'
    },
    badges: {
      type: 'array',
      properties: {
        text: {
          type: 'string'
        },
        src: {
          type: 'string'
        },
        url: {
          type: 'string'
        }
      },
      required: ['text', 'src', 'url']
    },
    changeFreq: {
      type: 'string',
      enum: ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']
    },
    date: {
      type: 'string'
    },
    description: {
      type: 'string',
      minLength: 50,
      maxLength: 160
    },
    heading: {
      type: 'string'
    },
    image: {
      type: 'object',
      properties: {
        src: {
          type: 'string'
        },
        caption: {
          type: 'string'
        }
      },
      required: ['src', 'caption']
    },
    jsonld: {
      type: 'object'
    },
    layout: {
      type: 'string'
    },
    metatag: {
      type: 'object'
    },
    permalink: {
      type: 'string'
    },
    summary: {
      type: 'string'
    },
    tags: {
      type: 'array'
    },
    title: {
      type: 'string',
      maxLength: 60
    },
    uri: {
      type: 'string'
    }
  },
  required: ['title', 'description']
}
