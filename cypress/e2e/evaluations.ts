import {buildEvaluation} from '../support/generate'

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

      cy.fillAddEvaluationDrawer(evaluation)
      cy.assertEvaluationCard(user, evaluation)

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

        cy.fillEditEvaluationDrawer(newEvaluation)
        cy.assertEvaluationCard(
          {name: evaluation.createdBy.name},
          newEvaluation,
        )
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

        cy.fillAddEvaluationDrawer({...evaluation, name: course.name})
        cy.assertEvaluationCard(user, {
          ...evaluation,
          name: course.name,
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

          cy.assertEvaluationCard(
            {name: evaluation.createdBy.name},
            {...evaluation, name: course.name},
          )
        })
      })
  })

  it('should allow to link an evaluation to a course on edit', () => {
    cy.createUser()
      .addCourse()
      .then(course => {
        cy.addEvaluation().then(evaluation => {
          cy.visit('/').closeWelcome()

          cy.fillEditEvaluationDrawer({...evaluation, name: course.name})
          cy.assertEvaluationCard(
            {name: evaluation.createdBy.name},
            {...evaluation, name: course.name},
          )

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

  it('should not link evaluation when addToCourse is "no" in add course', () => {
    cy.createUser().then(user => {
      cy.addCourse().then(course => {
        const evaluation = buildEvaluation()
        cy.visit('/').closeWelcome()

        cy.fillAddEvaluationDrawer({...evaluation, name: course.name}, () => {
          cy.findByRole('radio', {
            name: /^no$/i,
          }).click({force: true})
        })

        cy.assertEvaluationCard(
          {name: user.name},
          {...evaluation, name: course.name},
        )

        cy.visit('/courses')
        cy.findByText(/view course/i).click()

        cy.findByTestId('feature-evaluations').within(() => {
          cy.findByText(/0/).should('exist')
        })
      })
    })
  })

  it('should not link evaluation when addToCourse is "no" in edit course', () => {
    cy.createUser()
      .addCourse()
      .then(course => {
        cy.addEvaluation().then(evaluation => {
          cy.visit('/').closeWelcome()

          cy.fillEditEvaluationDrawer(
            {...evaluation, name: course.name},
            () => {
              cy.findByRole('radio', {
                name: /^no$/i,
              }).click({force: true})
            },
          )
          cy.assertEvaluationCard(
            {name: evaluation.createdBy.name},
            {...evaluation, name: course.name},
          )
          cy.visit('/courses')
          cy.findByText(/view course/i).click()

          cy.findByTestId('feature-evaluations').within(() => {
            cy.findByText(/0/).should('exist')
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
