import '@testing-library/cypress/add-commands'
import './commands'

Cypress.on('window:load', async window => {
  // Get webApp iframe
  const docIframe = window.parent.document.getElementById(
    "Your App: 'my-study-planner'",
  )

  if (docIframe) {
    const webAppWindow = docIframe.contentWindow

    // Get current cypress server thats started
    const server = Cypress.state().server
    if (server) {
      // bind server to our webApp window
      server.bindTo(webAppWindow)
    }
  }
})
