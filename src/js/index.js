import '~/vanilla-cookieconsent/dist/cookieconsent.js'

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

  // Enable Google Analytics
  function enableAnalytics (consent = false) {
    window.dataLayer = window.dataLayer || []

    function gtag () {
      window.dataLayer.push(arguments)
    }

    gtag('js', new Date())
    gtag('config', 'G-K3R0CR8HLY')
    gtag('consent', 'default', {
      ad_storage: !consent ? 'denied' : 'granted',
      analytics_storage: !consent ? 'denied' : 'granted'
    })
  }

  // Cookie Consent
  const cookieconsent = window.initCookieConsent()

  // Enable analytics
  enableAnalytics(cookieconsent.allowedCategory('analytics'))

  cookieconsent.run({
    auto_language: null,
    current_lang: 'en',
    autoclear_cookies: false,
    cookie_name: 'cookie_consent_preferences',
    cookie_expiration: 365,
    languages: {
      en: {
        consent_modal: {
          title: 'This website uses cookies',
          description: 'This website uses essential cookies to ensure its intended operation and tracking cookies to understand how you interact with it. The latter will be set only after consent.<br><br><button type="button" data-cc="c-settings" class="cc-link">Customise cookie preferences</button>',
          primary_btn: {
            text: 'Accept all',
            role: 'accept_all'
          },
          secondary_btn: {
            text: 'Reject all',
            role: 'accept_necessary'
          }
        },
        settings_modal: {
          title: 'Cookie Preferences',
          save_settings_btn: 'Save',
          accept_all_btn: 'Accept all',
          reject_all_btn: 'Reject all',
          close_btn_label: 'Close',
          cookie_table_headers: [
            { col1: 'Name' },
            { col2: 'Domain' },
            { col3: 'Expiration' },
            { col4: 'Description' }
          ],
          blocks: [
            {
              title: 'Cookie usage',
              description: 'This website uses cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want.'
            }, {
              title: 'Strictly necessary cookies',
              description: 'These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly',
              toggle: {
                value: 'necessary',
                enabled: true,
                readonly: true
              },
              cookie_table: [
                {
                  col1: 'cookie_consent_preferences',
                  col2: 'dangibbs.uk',
                  col3: '1 year',
                  col4: 'Used to remember a users choice about cookie preferences on this website'
                }
              ]
            }, {
              title: 'Performance and Analytics cookies',
              description: 'These cookies allow the website to remember the choices you have made in the past',
              toggle: {
                value: 'analytics',
                enabled: false,
                readonly: false
              },
              cookie_table: [
                {
                  col1: '^_ga',
                  col2: 'google.com',
                  col3: '2 years',
                  col4: 'Used to distinguish users for Analytics',
                  is_regex: true
                },
                {
                  col1: '_gid',
                  col2: 'google.com',
                  col3: '24 hours',
                  col4: 'Used to distinguish users for Analytics'
                }
              ]
            }
          ]
        }
      }
    },
    onAccept: () => {
      enableAnalytics(cookieconsent.allowedCategory('analytics'))
    },
    onChange: (cookie, preference) => {
      if (preference.indexOf('analytics') > -1) {
        enableAnalytics(cookieconsent.allowedCategory('analytics'))
      }
    }
  })

  // Cookie consent preferences
  const preferences = document.getElementsByClassName('cookie-preferences')

  for (const el of preferences) {
    el.addEventListener('click', () => {
      window.initCookieConsent().showSettings(0)
    })
  }
})

console.log('%c sudo rm -rf /', 'color: red')
