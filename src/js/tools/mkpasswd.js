module.exports = () => {
  const form = document.getElementById('mkpasswd_generator')
  const result = document.getElementById('mkpasswd_result')

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

    // Remove previously invalid classes
    form.querySelectorAll('.is-invalid').forEach((el) => {
      el.classList.remove('is-invalid')
    })

    // eslint-disable-next-line no-undef
    const url = new URL(APP_SERVICE_URL.replace(/\/+$/, '') + '/tool/mkpasswd').toString()

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

        if (data.errors) {
          Object.keys(data.errors).forEach((field) => {
            document.getElementById(field).classList.add('is-invalid')
          })
        }
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

  // Method type changes
  document.getElementById('method').addEventListener('change', (ev) => {
    const salt = document.getElementById('salt')
    const rounds = document.getElementById('rounds')

    // Form helper text
    form.querySelectorAll('.form-helper:not(.all)').forEach((el) => {
      el.classList.remove('form-helper--active')

      if (ev.target.value in el.dataset) {
        el.textContent = el.dataset[ev.target.value]
        el.classList.add('form-helper--active')
      }
    })

    // scrypt
    if (ev.target.value === 'scrypt') {
      // Disable salt field
      salt.value = ''
      salt.setAttribute('disabled', 'disabled')

      // Set rounds field
      rounds.value = 0
      rounds.setAttribute('max', 11)
    }

    // Other methods (share more in common)
    if (['md5crypt', 'sha512crypt', 'sha256crypt'].includes(ev.target.value)) {
      // Enable salt field
      salt.removeAttribute('disabled')
      salt.setAttribute('minlength', 8)

      // sha256/512
      if (ev.target.value !== 'md5crypt') {
        salt.setAttribute('maxlength', 16)

        // Enable rounds field
        rounds.removeAttribute('disabled')
        rounds.setAttribute('steps', 1000)
        rounds.setAttribute('max', 1000000)

        // Set rounds to 0 if unset
        rounds.value = rounds.value || 0
      }

      // md5crypt
      if (ev.target.value === 'md5crypt') {
        salt.setAttribute('maxlength', 8)

        // Disable rounds field
        rounds.value = ''
        rounds.setAttribute('disabled', 'disabled')
      }
    }
  })
}
