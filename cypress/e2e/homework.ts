import {buildHomework} from '../support/generate'
import {determinePriority} from '../support/utils'

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
      cy.findAllByText(new Date().getDate().toString()).click({
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
        cy.findByText(new RegExp(determinePriority(homework.urgency) as string))
      })

      cy.findByTestId(/homework-count/i).should('have.text', 1)
      cy.findByText(new RegExp(`start working on ${homework.subject}`, 'i'))
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
          cy.findByText(
            new RegExp(determinePriority(newHomework.urgency) as string),
          )
        })
      })
  })

  it('should mark homework as done', () => {
    cy.createUser()
      .addHomework()
      .then(homework => {
        cy.visit('/').closeWelcome()
        cy.findByLabelText(/mark .* as done/i).click()
        cy.findByText(/great job/i)
        cy.findByText(new RegExp(homework.subject, 'g')).should('not.exist')
        cy.findByText(/no.* homework/i)
        cy.findByTestId(/user-dropdown/i).trigger('mouseover')
        cy.findByRole('menuitem', {name: /profile/i}).click()
        cy.findByTestId(/done-homework-count/).should('have.text', 1)
      })
  })

  it('should remove homework', () => {
    cy.createUser()
      .addHomework()
      .then(homework => {
        cy.visit('/').closeWelcome()
        cy.findByLabelText(/delete homework/i).click()
        cy.findByRole('button', {name: /yes/i}).click()
        cy.findByText(new RegExp(homework.subject, 'g')).should('not.exist')
        cy.findByText(/no.* homework/i)

        cy.findByTestId(/homework-count/i).should('have.text', 0)
        cy.findByText(
          new RegExp(`start working on ${homework.subject}`, 'i'),
        ).should('not.exist')
      })
  })
})