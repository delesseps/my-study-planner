describe('Preferences', () => {
  it('should change to dark mode', () => {
    cy.createUser().then(user => {
      cy.visit('/dashboard/preferences').closeWelcome()
      cy.get("body[data-theme='light']").should('exist')
      cy.findByRole('switch', {name: /trigger dark mode/i}).click()
      cy.get("body[data-theme='dark']").should('exist')
    })
  })
})
