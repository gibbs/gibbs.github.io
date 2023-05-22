if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
  })
}

window.addEventListener && window.addEventListener('load', () => {
  const systemDarkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
  let userDarkPreference = JSON.parse(window.sessionStorage.getItem('theme')) ?? systemDarkPreference

  // Set initial theme preference
  document.documentElement.setAttribute('data-dark-mode', userDarkPreference)

  // Set dark theme
  function setDarkPreference (preference) {
    window.sessionStorage.setItem('theme', preference)
    document.documentElement.setAttribute('data-dark-mode', preference)
  }

  // Set the initial dark preference
  setDarkPreference(userDarkPreference)

  document.getElementById('change_theme_preference').addEventListener('click', () => {
    setDarkPreference(userDarkPreference = !userDarkPreference)
  }, false)
})

console.log('%c sudo rm -rf /', 'color: red')
