import {decodeQuotedPrintable} from '../support/utils'

describe('Change Password', () => {
  it.only('should change password', () => {
    cy.createUser().then(user => {
      cy.clearCookies().visit('/forgot_password')
      cy.findByLabelText(/E-mail/i).type(user.email)
      cy.findByRole('button', {name: /reset password/i}).click()
      cy.findByText(/reset password/i)

      cy.getUserEmail(user.email).then(email => {
        const newPassword = 'NEW_PASSWORD'

        const headers = email.Content.Headers
        const body = email.Content.Body
        const matchLinkHrefReg = /<a[^>]*href=3D"(?<link>[^"]*)"/g
        const resetPasswordLink = decodeQuotedPrintable(
          matchLinkHrefReg.exec(body).groups.link,
        )
        expect(headers.From[0]).to.eql(
          'My Study Planner <mystudyplanner.noreply@gmail.com>',
        )
        expect(headers.Subject[0]).to.eql(
          'My Study Planner recover password link',
        )
        expect(headers.To[0]).to.eql(user.email.toLowerCase())

        cy.visit(resetPasswordLink)

        cy.wait(1)
        cy.findByLabelText(/^new password$/i).type(newPassword)
        cy.findByLabelText(/confirm new password/i).type(newPassword)
        cy.findByRole('button', {name: /reset password/i}).click()

        cy.findByRole('link', {name: /sign in/i}).click()

        cy.findByLabelText(/e-mail/i).type(user.email)
        cy.findByLabelText(/password/i).type(newPassword)
        cy.findByRole('button', {name: /sign in/i}).click()
        cy.assertDashboardHome()
      })
    })
  })
})
