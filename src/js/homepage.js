import {
  Chart,
  ArcElement,
  BarElement,
  BarController,
  PieController,
  CategoryScale,
  LinearScale,
  Tooltip
} from 'chart.js'

Chart.register(
  ArcElement,
  BarElement,
  BarController,
  PieController,
  CategoryScale,
  LinearScale,
  Tooltip
)

function populateInsightsFeed (data) {
  const $languages = document.getElementById('insights_languages')

  // Languages
  for (const i in data.languages) {
    const language = data.languages[i]
    const $item = document.createElement('li')
    $item.classList = `insight--language github--language github--language__${language.toLowerCase().replace(' ', '-')}`
    $item.appendChild(document.createTextNode(language))

    // Append the list item
    $languages.appendChild($item)
  }

  const chartPopularity = new Chart(document.getElementById('insights_popularity'), data.popularity)
  const chartWorkload = new Chart(document.getElementById('insights_workload'), data.workload)

  // Draw charts
  chartPopularity.draw()
  chartWorkload.draw()
}

function populateActivityFeed (commits) {
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
        </div>
        <div class="timeline__repository">
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

if (window.Worker) {
  // eslint-disable-next-line no-undef
  const homepageWorker = new Worker(new URL('./homepage/worker.js', import.meta.url))

  document.addEventListener('DOMContentLoaded', () => {
    homepageWorker.postMessage({
      type: 'getActivityFeed'
    })
  })

  homepageWorker.onmessage = (ev) => {
    if (typeof ev.data === 'object') {
      if (ev.data.type === 'commits') {
        populateActivityFeed(ev.data.data)
      }

      if (ev.data.type === 'insights') {
        populateInsightsFeed(ev.data.data)
      }
    }
  }
}
