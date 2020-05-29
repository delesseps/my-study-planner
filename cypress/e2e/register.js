import {buildUser} from '../support/generate'

describe('Register', () => {
  beforeEach(() => {
    cy.unregisterServiceWorkers()
  })

  it('should register', () => {
    const user = buildUser()

    cy.visit('/signup')
    cy.findByLabelText(/full name/i).type(user.name)
    cy.findByLabelText(/e-mail/i).type(user.email)
    cy.findByLabelText('Password').type(user.password)
    cy.findByLabelText(/confirm password/i).type(user.password)
    cy.findByRole('button', {name: /sign up/i}).click()
    cy.assertDashboardHome()
  })

  it('should show error: account already exists', () => {
    cy.createUser().then(user => {
      cy.clearCookies().visit('/signup')
      cy.findByLabelText(/full name/i).type(user.name)
      cy.findByLabelText(/e-mail/i).type(user.email)
      cy.findByLabelText('Password').type(user.password)
      cy.findByLabelText(/confirm password/i).type(user.password)
      cy.findByRole('button', {name: /sign up/i}).click()
      cy.findByText(/user already exists/i)
    })
  })

  it('should show error: server error', () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: `${Cypress.env('api_url')}/auth/signup`,
      status: 500,
      response: {},
    })

    const user = buildUser()

    cy.visit('/signup')
    cy.findByLabelText(/full name/i).type(user.name)
    cy.findByLabelText(/e-mail/i).type(user.email)
    cy.findByLabelText('Password').type(user.password)
    cy.findByLabelText(/confirm password/i).type(user.password)
    cy.findByRole('button', {name: /sign up/i}).click()
    cy.findByText(/server error/i)
  })
})
