import {buildEvaluation} from '../support/generate'
import {determinePriority} from '../support/utils'

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
      cy.findByLabelText(/course name/i).type(evaluation.name)

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
          name: evaluation.evaluationType,
        })
        cy.findByRole('heading', {
          name: evaluation.name,
        })
        cy.findByText(
          new RegExp(determinePriority(evaluation.urgency) as string),
        )
      })

      cy.findByTestId(/evaluation-count/i).should('have.text', 1)
      cy.findByText(new RegExp(`start studying for ${evaluation.name}`, 'i'))
    })
  })

  it('should edit evaluation', () => {
    cy.createUser()
      .addEvaluation()
      .then(evaluation => {
        const newEvaluation = buildEvaluation()

        cy.visit('/').closeWelcome()
        cy.findByRole('button', {name: /Open edit evaluation drawer/i}).click()

        cy.findByLabelText(/course name/i)
          .clear()
          .type(newEvaluation.name)

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
            name: newEvaluation.evaluationType,
          })
          cy.findByRole('heading', {
            name: newEvaluation.name,
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
          name: evaluation.evaluationType,
        }).should('not.exist')
        cy.findByRole('heading', {
          name: evaluation.name,
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
          name: evaluation.evaluationType,
        }).should('not.exist')
        cy.findByRole('heading', {
          name: evaluation.name,
        }).should('not.exist')
        cy.findByText(/no.* evaluations/i)

        cy.findByTestId(/evaluation-count/i).should('have.text', 0)
        cy.findByText(
          new RegExp(`start studying for ${evaluation.name}`, 'i'),
        ).should('not.exist')
      })
  })
})

describe('Linked Evaluations', () => {
  it('should allow evaluations to be linked to course and be displayed in course details route', () => {
    cy.createUser().then(user => {
      cy.addCourse().then(course => {
        const evaluation = buildEvaluation()

        cy.visit('/').closeWelcome()
        cy.findByRole('button', {name: /new evaluation/i}).click()
        cy.findByLabelText(/course name/i).type(course.name)

        cy.findByRole('radio', {
          name: new RegExp(evaluation.evaluationType, 'i'),
        }).click({
          force: true,
        })
        cy.findByRole('radio', {
          name: new RegExp(evaluation.urgency, 'i'),
        }).click({
          force: true,
        })

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
            name: evaluation.evaluationType,
          })
          cy.findByRole('heading', {
            name: course.name,
          })
          cy.findByText(
            new RegExp(determinePriority(evaluation.urgency) as string),
          )
        })

        cy.visit('/courses')
        cy.findByText(/view course/i).click()

        cy.findByTestId('feature-evaluations').within(() => {
          cy.findByText(/1/).should('exist')
        })

        // TODO: test for evaluation in tab
      })
    })
  })

  it('should edit linked evaluation', () => {
    cy.createUser()
      .addCourse()
      .then(course => {
        cy.addEvaluation({name: course.name, course}).then(evaluation => {
          const newEvaluation = buildEvaluation()

          cy.visit('/').closeWelcome()
          cy.findByRole('button', {
            name: /Open edit evaluation drawer/i,
          }).click()

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
            cy.findByText(evaluation.createdBy.name).should('exist')

            cy.findByText(/today/i).should('exist')

            cy.findByRole('heading', {
              name: newEvaluation.evaluationType,
            }).should('exist')

            cy.findByRole('heading', {
              name: course.name,
            }).should('exist')

            cy.findByText(
              new RegExp(determinePriority(newEvaluation.urgency) as string),
            ).should('exist')
          })
        })
      })
  })

  it('should allow to link an evaluation to a course on edit', () => {
    cy.createUser()
      .addCourse()
      .then(course => {
        cy.addEvaluation().then(evaluation => {
          cy.visit('/').closeWelcome()
          cy.findByRole('button', {
            name: /Open edit evaluation drawer/i,
          }).click()

          cy.findByLabelText(/course name/i)
            .clear()
            .type(course.name)

          cy.findByRole('button', {name: /^edit evaluation$/i}).click()

          cy.findByTestId('evaluations-cards').within(() => {
            cy.findByText(evaluation.createdBy.name).should('exist')

            cy.findByText(/today/i).should('exist')

            cy.findByRole('heading', {
              name: evaluation.evaluationType,
            }).should('exist')

            cy.findByRole('heading', {
              name: course.name,
            }).should('exist')

            cy.findByText(
              new RegExp(determinePriority(evaluation.urgency) as string),
            ).should('exist')
          })

          cy.findByRole('button', {
            name: /Open edit evaluation drawer/i,
          }).click()
          cy.findByLabelText(/course name/i).should('be.disabled')

          cy.visit('/courses')
          cy.findByText(/view course/i).click()

          cy.findByTestId('feature-evaluations').within(() => {
            cy.findByText(/1/).should('exist')
          })
        })
      })
  })

  it('should disable "Course Name" input when course is linked', () => {
    cy.createUser()
      .addCourse()
      .then(course => {
        cy.addEvaluation({name: course.name, course: course})

        cy.visit('/').closeWelcome()
        cy.findByRole('button', {name: /Open edit evaluation drawer/i}).click()

        cy.findByLabelText(/course name/i).should('be.disabled')
      })
  })
})
