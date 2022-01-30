import { format, formatISO, parseISO } from 'date-fns'

document.addEventListener('DOMContentLoaded', () => {
  getLatestActivity()
})

function getLatestActivity () {
  const url = new URL('https://api.github.com/search/commits?') + new URLSearchParams({
    q: 'author:gibbs is:public',
    sort: 'author-date',
    order: 'desc',
    page: 1,
    per_page: 8
  }).toString()

  fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      setActivityFeed(data)
    })
}

function setActivityFeed (data) {
  const commits = {}

  for (const i in data.items) {
    const item = data.items[i]
    const group = format(parseISO(item.commit.author.date), 'MMM do yyyy')

    if (!(group in commits)) {
      commits[group] = []
    }

    commits[group].push({
      avatar: item.author.avatar_url,
      author: item.author.login,
      repository: {
        name: item.repository.name,
        url: item.repository.html_url
      },
      commit: {
        date: format(parseISO(item.commit.author.date), 'E do LLL yyyy HH:mm O'),
        datetime: formatISO(parseISO(item.commit.author.date)),
        timestamp: item.commit.author.date,
        message: item.commit.message,
        hash: item.sha.slice(0, 8),
        url: item.html_url
      }
    })
  }

  // Get the first activity timeline
  const $timeline = document.getElementsByClassName('timeline__activity')[0]
  const $fragment = new DocumentFragment()

  for (const group in commits) {
    const $group = document.createElement('div')
    $group.className = 'timeline__group'

    const $date = document.createElement('div')
    $date.className = 'timeline__date'
    $date.textContent = group

    const $entries = document.createElement('ol')
    $entries.className = 'timeline__entries'

    let timelineEntries = ''

    // This is ugly but the alternative is worse
    commits[group].forEach(item => {
      timelineEntries += `<li class="timeline__entry">
        <div class="timeline__information">
          <p class="timeline__entry-heading">${item.commit.message.replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/(<br\s*\/?>){2,}/gi, '<br>')}</p>

          <p class="timeline__authored">
            <a href="${item.repository.url}">${item.repository.name}</a>
          </p>
        </div>
        <div class="timeline__actions">
          <a class="button timeline__hash-button" href="${item.commit.url}">
            ${item.commit.hash}
          </a>
        </div>
      </li>`
    })

    // Add the timeline list items
    $entries.innerHTML = timelineEntries

    // Append children to group
    $group.appendChild($date)
    $group.appendChild($entries)

    // Append group to fragment
    $fragment.appendChild($group)
  }

  $timeline.prepend($fragment)
}
