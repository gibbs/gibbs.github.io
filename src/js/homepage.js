document.addEventListener('DOMContentLoaded', () => {
  const $insight = document.querySelector('#insights')

  if (!window.Worker) {
    // Hide the loading element
    $insight.classList = 'hidden'

    return
  }

  let insightElementVisible = false
  let insightData = {}

  // eslint-disable-next-line no-undef
  const worker = new Worker(new URL('./homepage/worker.js', import.meta.url))

  // Message the worker to process the feed data
  worker.postMessage({
    type: 'getActivityFeed'
  })

  // Worker messages
  worker.onmessage = (e) => {
    if (typeof e.data === 'object' && e.data.type === 'insights') {
      insightData = e.data.data

      if (insightElementVisible) {
        renderInsights(insightData)
      }
    }
  }

  // Insights intersection observer
  const insightsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        insightElementVisible = true

        // If data is already available use it
        if (Object.keys(insightData).length) {
          renderInsights(insightData)
        }

        observer.disconnect()
      }
    })
  })

  insightsObserver.observe($insight)

  /**
   * Render the insights
   *
   * @param {object} The feed data
   */
  function renderInsights (data) {
    const template = document.querySelector('#hompage_insights').content.cloneNode(true)

    // Elements
    const $languages = template.querySelector('#insights_languages')
    const $timeline = template.querySelector('.timeline__activity:first-of-type')
    const $fragment = new DocumentFragment()

    // Activity feed commits
    for (const group in data.activity.commits) {
      // Timeline group element
      const $group = document.createElement('div')
      $group.className = 'timeline__group'

      // Timeline date element
      const $date = document.createElement('div')
      $date.className = 'timeline__date'
      $date.textContent = group

      // Timeline entries element
      const $entries = document.createElement('ol')
      $entries.className = 'timeline__entries'
      $entries.innerHTML = data.activity.entries[group]

      // Append children to group
      $group.appendChild($date)
      $group.appendChild($entries)

      // Append group to fragment
      $fragment.appendChild($group)
    }

    $timeline.prepend($fragment)

    // Insights languages
    for (const i in data.insights.languages) {
      const language = data.insights.languages[i]
      const $item = document.createElement('li')
      $item.classList = `insight--language gh-language gh-language--${language.toLowerCase().replace(' ', '-')}`
      $item.appendChild(document.createTextNode(language))

      // Append the list item
      $languages.appendChild($item)
    }

    // Clear the insight HTML
    $insight.innerHTML = ''

    // Append the timeline
    $insight.append(template)

    // Insights charts
    const chartPopularity = new Chart(document.querySelector('#insights_popularity'), data.insights.popularity)
    const chartWorkload = new Chart(document.querySelector('#insights_workload'), data.insights.workload)

    // Draw charts
    chartPopularity.draw()
    chartWorkload.draw()
  }
})
