module.exports = () => {
  const form = document.getElementById('uuid_generator')
  const result = document.getElementById('uuid_result')

  form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    // Get the form data
    const formData = new FormData(ev.target)

    // Clear any previous results
    result.innerHTML = '&nbsp;'

    // Disable form elements (visual cue)
    form.querySelectorAll('button').forEach((el) => {
      el.setAttribute('disabled', 'disabled')
    })

    // eslint-disable-next-line no-undef
    const url = new URL(APP_SERVICE_URL.replace(/\/+$/, '') + '/tool/uuidgen').toString()

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
        result.classList = `result alert alert--${data.success ? 'success' : 'warning'}`
        result.textContent = data.success ? data.output : data.message
      })
      .catch((error) => {
        result.classList = 'result alert alert--danger'
        result.textContent = `Failed: ${error}`
      })
      .finally(() => {
        form.querySelectorAll('button').forEach((el) => {
          el.removeAttribute('disabled')
        })
      })
  })
}
