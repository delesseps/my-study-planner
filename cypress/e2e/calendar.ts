describe('Calendar', () => {
  it('should show homework in calendar', () => {
    const tommorrowDate = new Date()
    tommorrowDate.setDate(tommorrowDate.getDate() + 1)

    cy.createUser()
      .addHomework({date: tommorrowDate.toISOString()})
      .then(homework => {
        cy.visit('/').closeWelcome()

        cy.findByTestId(
          `ant-picker-date-day-${tommorrowDate.getDate()}`,
        ).click()

        cy.findByText(new RegExp(`Homework: ${homework.subject}`, 'i')).should(
          'exist',
        )
        cy.findByTestId(`ant-picker-date-urgency-${homework.urgency}`).should(
          'exist',
        )
        cy.findByText(new RegExp(`HW: ${homework.subject}`, 'i')).should(
          'exist',
        )
      })
  })

  it('should show evaluation in calendar', () => {
    const tommorrowDate = new Date()
    tommorrowDate.setDate(tommorrowDate.getDate() + 1)

    cy.createUser()
      .addEvaluation({date: tommorrowDate.toISOString()})
      .then(evaluation => {
        cy.visit('/').closeWelcome()

        cy.findByTestId(
          `ant-picker-date-day-${tommorrowDate.getDate()}`,
        ).click()

        cy.findAllByText(
          new RegExp(
            `${evaluation.evaluationType}: ${evaluation.subject}`,
            'i',
          ),
        ).should('exist')
        cy.findByTestId(`ant-picker-date-urgency-${evaluation.urgency}`).should(
          'exist',
        )
        cy.findAllByText(
          new RegExp(
            `${evaluation.evaluationType}: ${evaluation.subject}`,
            'i',
          ),
        ).should('exist')
      })
  })
})
