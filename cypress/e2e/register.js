import {buildUser} from '../support/generate'
import {decodeQuotedPrintable} from '../support/utils'

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

  it('should send and confirm email', () => {
    cy.createUser().then(user => {
      cy.visit('/dashboard').closeWelcome()

      cy.getUserEmail(user.email).then(email => {
        const headers = email.Content.Headers
        const body = email.Content.Body
        const matchLinkHrefReg = /<a[^>]* href=3D"(?<link>[^"]*)"/g
        const confirmLink = matchLinkHrefReg.exec(body).groups.link

        expect(headers.From[0]).to.eql(
          'My Study Planner <mystudyplanner.noreply@jfelix.info>',
        )
        expect(headers.Subject[0]).to.eql('Welcome to My Study Planner!!')
        expect(headers.To[0]).to.eql(user.email.toLowerCase())

        cy.request({
          url: decodeQuotedPrintable(confirmLink),
          method: 'GET',
        })
        cy.reload()
          .findByText(/Check your email and activate your account.*/i)
          .should('not.exist')
      })
    })
  })
})
