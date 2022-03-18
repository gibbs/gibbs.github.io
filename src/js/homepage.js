import { format, formatISO, parseISO } from 'date-fns'
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

const githubLanguages = require('./utils/github-language-colors')

document.addEventListener('DOMContentLoaded', () => {
  getLatestActivity()
})

function getLatestActivity () {
  // eslint-disable-next-line no-undef
  const url = new URL(APP_SERVICE_URL.replace(/\/+$/, '') + '/data/activity-feed.json').toString()

  fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      setInsightsFeed(data.insights)
      setActivityFeed(data.activity)
    })
}

function setInsightsFeed (data) {
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

  const totals = { count: 0, bytes: 0 }

  // Get totals
  for (const i in data.usage) {
    totals.count += data.usage[i].count
    totals.bytes += data.usage[i].bytes
  }

  // Get popularity/workload
  const chartData = {
    popularity: {
      labels: [],
      datasets: [{
        label: 'Language Popularity',
        data: [],
        backgroundColor: []
      }]
    },
    workload: {
      labels: [],
      datasets: [{
        label: 'Language Usage',
        data: [],
        backgroundColor: []
      }]
    }
  }

  for (const i in data.usage) {
    const languageKey = data.usage[i].name.toLowerCase().replace(' ', '-')

    // Add labels
    chartData.popularity.labels.push(data.usage[i].name)
    chartData.workload.labels.push(data.usage[i].name)

    // Add values
    chartData.popularity.datasets[0].data.push((data.usage[i].count / totals.count * 100))
    chartData.workload.datasets[0].data.push((data.usage[i].bytes / totals.bytes * 100))

    // Add background colours
    if (languageKey in githubLanguages) {
      chartData.popularity.datasets[0].backgroundColor.push(githubLanguages[languageKey])
      chartData.workload.datasets[0].backgroundColor.push(githubLanguages[languageKey])
    }
  }

  // Popularity chart
  const chartPopularity = new Chart(document.getElementById('insights_popularity'), {
    type: 'bar',
    data: chartData.popularity,
    options: {
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (item) => `${item.formattedValue}%`
          }
        }
      }
    }
  })

  // Workload chart
  const chartWorkload = new Chart(document.getElementById('insights_workload'), {
    type: 'pie',
    data: chartData.workload,
    options: {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (item) => `${item.label} ${item.formattedValue}%`
          }
        }
      }
    }
  })

  // Draw charts
  chartPopularity.draw()
  chartWorkload.draw()
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
