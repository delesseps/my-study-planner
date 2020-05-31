import {buildHomework} from '../support/generate'

function yyyymmdd(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

function determinePriority(urgency) {
  switch (urgency) {
    case 'chill':
      return 'Low Priority'
    case 'normal':
      return 'Medium Priority'
    case 'important':
      return 'High Priority'
    default:
  }
}

describe('Homework', () => {
  it('should add homework', () => {
    cy.createUser().then(user => {
      const homework = buildHomework()

      cy.visit('/').closeWelcome()
      cy.findByRole('button', {name: /new homework/i}).click()
      cy.findByLabelText(/course name/i).type(homework.subject)
      cy.findByRole('radio', {name: new RegExp(homework.urgency, 'i')}).click({
        force: true,
      })
      cy.findByLabelText(/description/i).type(homework.description)
      cy.findByTestId(/date-picker/i).click()
      cy.findAllByRole('cell', {name: yyyymmdd(new Date())}).click({
        multiple: true,
        force: true,
      })
      cy.findByRole('button', {name: /add homework/i}).click()

      cy.findByTestId('homework-cards').within(() => {
        cy.findByText(user.name)
        cy.findByText(/today/i)
        cy.findByText(homework.subject)
        cy.findByText(new RegExp(determinePriority(homework.urgency)))
      })
    })
  })

  it('should remove homework', () => {
    cy.createUser()
      .addHomework()
      .then(homework => {
        cy.visit('/').closeWelcome()
        cy.findByLabelText(/delete homework/i).click()
        cy.findByRole('button', {name: /yes/i}).click()
        cy.findAllByText(homework.subject).should('not.exist')
      })
  })
})
