import '@testing-library/cypress/add-commands'
import './commands'

Cypress.on('uncaught:exception', err => {
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    // returning false here prevents Cypress from
    // failing the test
    return false
  }
})
