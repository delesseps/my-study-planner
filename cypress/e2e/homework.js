import {buildHomework} from '../support/generate'
import {yyyymmdd, determinePriority} from '../support/utils'

describe('Homework', () => {
  before(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
  })

  beforeEach(() => {
    cy.unregisterServiceWorkers()
  })

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
        cy.findByRole('heading', {
          name: homework.subject,
        })
        cy.findByText(new RegExp(determinePriority(homework.urgency)))
      })
    })
  })

  it('should edit homework', () => {
    cy.createUser()
      .addHomework()
      .then(homework => {
        const newHomework = buildHomework()

        cy.visit('/').closeWelcome()
        cy.findByRole('button', {name: /Open edit homework drawer/i}).click()

        cy.findByLabelText(/course name/i)
          .clear()
          .type(newHomework.subject)

        cy.findByRole('radio', {
          name: new RegExp(newHomework.urgency, 'i'),
        }).click({
          force: true,
        })

        cy.findByLabelText(/description/i)
          .clear()
          .type(newHomework.description)

        cy.findByRole('button', {name: /^edit homework$/i}).click()

        cy.findByTestId('homework-cards').within(() => {
          cy.findByText(homework.createdBy.name)
          cy.findByText(/today/i)
          cy.findByRole('heading', {
            name: newHomework.subject,
          })
          cy.findByText(new RegExp(determinePriority(newHomework.urgency)))
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
        cy.findByText(homework.subject).should('not.exist')
        cy.findByText(/No.* Homework/i)
      })
  })
})
