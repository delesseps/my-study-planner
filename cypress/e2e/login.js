describe('Login', () => {
  it('should login', () => {
    cy.createUser().then(user => {
      cy.clearCookies().visit('/signin')
      cy.findByLabelText(/e-mail/i).type(user.email)
      cy.findByLabelText(/password/i).type(user.password)
      cy.findByRole('button', {name: /sign in/i}).click()
      cy.assertDashboardHome()
    })
  })
})
