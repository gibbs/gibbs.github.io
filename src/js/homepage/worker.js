import { format, formatISO, parseISO } from 'date-fns'

const githubLanguages = require('../utils/github-language-colors')

onmessage = (ev) => {
  if (ev.data.type === 'getActivityFeed') {
    getLatestActivity()
  }
}

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
  const chartPopularityData = {
    type: 'bar',
    data: chartData.popularity,
    options: {
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false
        }
      }
    }
  }

  // Workload chart
  const chartWorkloadData = {
    type: 'pie',
    data: chartData.workload,
    options: {
      plugins: {
        legend: {
          display: false
        }
      }
    }
  }

  postMessage({
    type: 'insights',
    data: {
      languages: data.languages,
      workload: chartWorkloadData,
      popularity: chartPopularityData
    }
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

  postMessage({ type: 'commits', data: commits })
}
