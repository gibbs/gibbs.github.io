module.exports = () => {
  const form = document.getElementById('dig_form')
  const result = document.getElementById('dig_result')
  const records = document.getElementById('dig_records')

  form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    // Get the form data
    const formData = new FormData(ev.target)

    // Clear any previous results
    result.innerHTML = '&nbsp;'
    result.classList = 'result'

    // Disable form elements (visual cue)
    form.querySelectorAll('button').forEach((el) => {
      el.setAttribute('disabled', 'disabled')
    })

    // Remove previously invalid classes
    form.querySelectorAll('.is-invalid').forEach((el) => {
      el.classList.remove('is-invalid')
    })

    // eslint-disable-next-line no-undef
    const url = new URL(APP_SERVICE_URL.replace(/\/+$/, '') + '/tool/dig').toString()

    // Results template
    const template = records.content.cloneNode(true)
    const command = template.getElementById('dig_command')
    const table = template.getElementById('dig_table')
    const tableBody = table.getElementsByTagName('tbody')[0]

    // Send request
    fetch(url, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        accept: 'application/json'
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.output.length === 0) {
          table.classList = 'hidden'
          result.classList = 'result alert alert--info'
          result.textContent = 'No results returned'
        }

        // Set the dig command
        command.textContent = data.command

        // Add dig record rows
        data.output.forEach((result) => {
          const row = tableBody.insertRow(-1)
          const colName = row.insertCell(0)
          const colTTL = row.insertCell(1)
          const colType = row.insertCell(2)
          const colValue = row.insertCell(3)

          colName.innerHTML = result.name
          colTTL.innerHTML = result.ttl
          colType.innerHTML = result.tag
          colValue.innerHTML = result.value
        })

        result.appendChild(template)
      })
      .catch((error) => {
        result.classList = 'result alert alert--danger'
        result.textContent = `Request failed. ${error}`
      })
      .finally(() => {
        form.querySelectorAll('button').forEach((el) => {
          el.removeAttribute('disabled')
        })
      })
  })
}
