module.exports = () => {
  const form = document.getElementById('pwgen_generator')
  const result = document.getElementById('pwgen_result')
  const options = document.getElementById('pwgen_options')

  document.getElementById('pwgen_options_toggle').addEventListener('click', (el) => {
    // Yeah...
    options.classList[options.classList.contains('hidden') ? 'remove' : 'add']('hidden')
    el.target.textContent = (el.target.textContent === 'More' ? 'Less' : 'More')
  })

  form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    // Get the form data
    const formData = new FormData(ev.target)

    // Disable form elements (visual cue)
    form.querySelectorAll('button[type=submit]').forEach((el) => {
      el.setAttribute('disabled', 'disabled')
    })

    // eslint-disable-next-line no-undef
    const url = new URL(APP_SERVICE_URL.replace(/\/+$/, '') + '/tool/pwgen').toString()

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
        result.innerHTML = data.success ? data.output.replace(/\n/g, '<br>') : data.message
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
