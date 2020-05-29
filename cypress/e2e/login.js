import {buildUser} from '../support/generate'

describe('Login', () => {
  beforeEach(() => {
    cy.unregisterServiceWorkers()
  })

  it('should login', () => {
    cy.createUser().then(user => {
      cy.clearCookies().visit('/signin')
      cy.findByLabelText(/e-mail/i).type(user.email)
      cy.findByLabelText(/password/i).type(user.password)
      cy.findByRole('button', {name: /sign in/i}).click()
      cy.assertDashboardHome()
    })
  })

  it('should show error: account does not exist error', () => {
    const user = buildUser()

    cy.visit('/signin')
    cy.findByLabelText(/e-mail/i).type(user.email)
    cy.findByLabelText(/password/i).type(user.password)
    cy.findByRole('button', {name: /sign in/i}).click()
    cy.findByText(/The user does not exist.* please create an account/i)
  })

  it('should show error: incorrect e-mail or password', () => {
    cy.createUser().then(user => {
      cy.clearCookies().visit('/signin')
      cy.findByLabelText(/e-mail/i).type(user.email)
      cy.findByLabelText(/password/i).type(user.password + '12')
      cy.findByRole('button', {name: /sign in/i}).click()
      cy.findByText(/incorrect e-mail or password/i)
    })
  })

  it('should show error: server error', () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: `${Cypress.env('api_url')}/auth/signin`,
      status: 500,
      response: {},
    })

    cy.createUser().then(user => {
      cy.clearCookies().visit('/signin')
      cy.findByLabelText(/e-mail/i).type(user.email)
      cy.findByLabelText(/password/i).type(user.password + '12')
      cy.findByRole('button', {name: /sign in/i}).click()
      cy.findByText(/server error/i)
    })
  })

  it('should set cookie with 30 day expire date', () => {
    const expiresBefore = new Date()
    expiresBefore.setTime(expiresBefore.getTime() + 30 * 24 * 60 * 60 * 1000) //Expires in 30 days
    const expiryBeforeTime = expiresBefore.getTime() / 1000

    cy.createUser().then(async user => {
      cy.clearCookies().visit('/signin')
      cy.findByLabelText(/e-mail/i).type(user.email)
      cy.findByLabelText(/password/i).type(user.password)
      cy.findByText(/Remember me/i).click()
      cy.findByRole('button', {name: /sign in/i}).click()

      cy.assertDashboardHome()

      cy.getCookie('connect.sid')
        .should('have.property', 'expiry')
        .then(expiry => {
          const expiresAfter = new Date()
          expiresAfter.setTime(
            expiresAfter.getTime() + 30 * 24 * 60 * 60 * 1000,
          )
          const expiryAfterTime = expiresAfter.getTime() / 1000

          expect(expiry).to.be.greaterThan(expiryBeforeTime)
          expect(expiry).to.be.lessThan(expiryAfterTime)
        })

      cy.getCookie('connect.sid')
        .should('have.property', 'expiry')
        .then(expiry => {
          const expiresAfter = new Date()
          expiresAfter.setTime(
            expiresAfter.getTime() + 30 * 24 * 60 * 60 * 1000,
          )
          const expiryAfterTime = expiresAfter.getTime() / 1000

          expect(expiry).to.be.greaterThan(expiryBeforeTime)
          expect(expiry).to.be.lessThan(expiryAfterTime)
        })

      Cypress.Cookies.debug()
    })
  })
})
