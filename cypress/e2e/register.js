import {buildUser} from '../support/generate'

describe('Register', () => {
  it('should login', () => {
    const user = buildUser()

    cy.visit('/signup')
    cy.findByLabelText(/full name/i).type(user.name)
    cy.findByLabelText(/e-mail/i).type(user.email)
    cy.findByLabelText('Password').type(user.password)
    cy.findByLabelText(/confirm password/i).type(user.password)
    cy.findByRole('button', {name: /sign up/i}).click()
    cy.assertDashboardHome()
  })
})
