Cypress.Commands.add('closeWelcome', () => {
  cy.findByRole('button', {name: /get started/i}).click()
})

Cypress.Commands.add('assertDashboardHome', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/dashboard`)
})

Cypress.Commands.add('unregisterServiceWorkers', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then(registrations => registrations.forEach(reg => reg.unregister()))
  }
})

export default () => {}
