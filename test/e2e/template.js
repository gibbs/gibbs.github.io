describe('Template and Layout', () => {
  it('Should change colour preferences on click', (browser) => {
    const context = browser.page.home()

    context.navigate()
      .waitForElementVisible('body')
      .waitForElementPresent('html[data-dark-mode]')
      .assert.visible('@colourPreferenceSwitcher')

    context.getAttribute('html', 'data-dark-mode', (result) => {
      context
        .click('@colourPreferenceSwitcher')
        .assert.not.attributeEquals('html', 'data-dark-mode', result.value)
    })
  })

  it('Should always display template elements', (browser) => {
    const context = browser.page.home()

    context.navigate()
      .waitForElementVisible('body')
      .assert.visible('@header')
      .assert.visible('@navigation')
      .assert.visible('@content')
      .assert.visible('@footer')
      .assert.visible('@copyright')
  })
})
