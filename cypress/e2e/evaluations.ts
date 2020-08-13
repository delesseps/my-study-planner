import {buildEvaluation} from '../support/generate'
import {yyyymmdd, determinePriority} from '../support/utils'

describe('Evaluation', () => {
  before(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
    })
  })

  it('should add evaluations', () => {
    cy.createUser().then(user => {
      const evaluation = buildEvaluation()

      cy.visit('/').closeWelcome()

      cy.findByRole('button', {name: /new evaluation/i}).click()
      cy.findByLabelText(/course name/i).type(evaluation.subject)

      cy.findByRole('radio', {
        name: new RegExp(evaluation.evaluationType, 'i'),
      }).click({
        force: true,
      })
      cy.findByRole('radio', {name: new RegExp(evaluation.urgency, 'i')}).click(
        {
          force: true,
        },
      )

      cy.findByLabelText(/description/i).type(evaluation.description)
      cy.findByTestId(/date-picker/i).click()
      cy.findAllByText(new Date().getDate().toString()).click({
        multiple: true,
        force: true,
      })
      cy.findByRole('button', {name: /add evaluation/i}).click()

      cy.findByTestId('evaluations-cards').within(() => {
        cy.findByText(user.name)
        cy.findByText(/today/i)
        cy.findByRole('heading', {
          name: `${evaluation.evaluationType}: ${evaluation.subject}`,
        })
        cy.findByText(
          new RegExp(determinePriority(evaluation.urgency) as string),
        )
      })

      cy.findByTestId(/evaluation-count/i).should('have.text', 1)
      cy.findByText(new RegExp(`start studying for ${evaluation.subject}`, 'i'))
    })
  })

  it('should edit evaluation', () => {
    cy.createUser()
      .addEvaluation()
      .then(evaluation => {
        const newEvaluation = buildEvaluation()
        console.log(evaluation)
        cy.visit('/').closeWelcome()
        cy.findByRole('button', {name: /Open edit evaluation drawer/i}).click()

        cy.findByLabelText(/course name/i)
          .clear()
          .type(newEvaluation.subject)

        cy.findByRole('radio', {
          name: new RegExp(newEvaluation.evaluationType, 'i'),
        }).click({
          force: true,
        })
        cy.findByRole('radio', {
          name: new RegExp(newEvaluation.urgency, 'i'),
        }).click({
          force: true,
        })

        cy.findByLabelText(/description/i)
          .clear()
          .type(newEvaluation.description)

        cy.findByRole('button', {name: /^edit evaluation$/i}).click()

        cy.findByTestId('evaluations-cards').within(() => {
          cy.findByText(evaluation.createdBy.name)
          cy.findByText(/today/i)
          cy.findByRole('heading', {
            name: `${newEvaluation.evaluationType}: ${newEvaluation.subject}`,
          })
          cy.findByText(
            new RegExp(determinePriority(newEvaluation.urgency) as string),
          )
        })
      })
  })

  it('should mark evaluation as done', () => {
    cy.createUser()
      .addEvaluation()
      .then(evaluation => {
        cy.visit('/').closeWelcome()
        cy.findByLabelText(/mark .* as done/i).click()
        cy.findByText(/great job/i)
        cy.findByRole('heading', {
          name: `${evaluation.evaluationType} : ${evaluation.subject}`,
        }).should('not.exist')
        cy.findByText(/no.* evaluations/i)
        cy.findByTestId(/user-dropdown/i).trigger('mouseover')
        cy.findByRole('menuitem', {name: /profile/i}).click()
        cy.findByTestId(/done-evaluation-count/).should('have.text', 1)
      })
  })

  it('should remove evaluation', () => {
    cy.createUser()
      .addEvaluation()
      .then(evaluation => {
        cy.visit('/').closeWelcome()
        cy.findByLabelText(/delete evaluation/i).click()
        cy.findByRole('button', {name: /yes/i}).click()
        cy.findByRole('heading', {
          name: `${evaluation.evaluationType} : ${evaluation.subject}`,
        }).should('not.exist')
        cy.findByText(/no.* evaluations/i)

        cy.findByTestId(/evaluation-count/i).should('have.text', 0)
        cy.findByText(
          new RegExp(`start studying for ${evaluation.subject}`, 'i'),
        ).should('not.exist')
      })
  })
})
