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

      cy.findByLabelText(/Name/).type(homework.name)
      cy.findByLabelText(/course name/i).type(homework.course.name)
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
          name: homework.name,
        })
        cy.findByRole('heading', {
          name: homework.course.name,
        })
        cy.findByText(new RegExp(determinePriority(homework.urgency) as string))
      })

      cy.findByTestId(/homework-count/i).should('have.text', 1)
      cy.findByText(new RegExp(`start working on ${homework.name}`, 'i'))
    })
  })

  it('should edit homework with non-linked course', () => {
    cy.createUser()
      .addHomework()
      .then(homework => {
        const newHomework = buildHomework()

        cy.visit('/').closeWelcome()
        cy.findByRole('button', {name: /Open edit homework drawer/i}).click()

        cy.findByLabelText(/Name/).clear().type(newHomework.name)
        cy.findByLabelText(/course name/i)
          .clear()
          .type(newHomework.course.name)

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
            name: newHomework.name,
          })
          cy.findByRole('heading', {
            name: newHomework.course.name,
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
        cy.findByText(new RegExp(homework.name, 'g')).should('not.exist')
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
        cy.findByText(new RegExp(homework.name, 'g')).should('not.exist')
        cy.findByText(/no.* homework/i)

        cy.findByTestId(/homework-count/i).should('have.text', 0)
        cy.findByText(
          new RegExp(`start working on ${homework.name}`, 'i'),
        ).should('not.exist')
      })
  })
})

describe('Linked Homework', () => {
  it('should allow homework to be added to course', () => {
    cy.createUser().then(user => {
      cy.addCourse().then(course => {
        const homework = buildHomework()

        cy.visit('/').closeWelcome()
        cy.findByRole('button', {name: /new homework/i}).click()

        cy.findByLabelText(/Name/).type(homework.name)
        cy.findByLabelText(/course name/i).type(course.name)
        cy.findByRole('radio', {name: new RegExp(homework.urgency, 'i')}).click(
          {
            force: true,
          },
        )
        cy.findByLabelText(/description/i).type(homework.description)
        cy.findByTestId(/date-picker/i).click()
        cy.findAllByText(new Date().getDate().toString()).click({
          multiple: true,
          force: true,
        })

        cy.findByRole('button', {name: /add homework/i}).click()

        cy.findByTestId('homework-cards').within(() => {
          cy.findByText(user.name).should('exist')

          cy.findByText(/today/i).should('exist')

          cy.findByRole('heading', {
            name: homework.name,
          }).should('exist')

          cy.findByRole('heading', {
            name: course.name,
          }).should('exist')

          cy.findByText(
            new RegExp(determinePriority(homework.urgency) as string),
          ).should('exist')
        })

        cy.visit('/courses')
        cy.findByText(/view course/i).click()

        cy.findByTestId('feature-homework').within(() => {
          cy.findByText(/1/).should('exist')
        })

        // TODO: test for homework in tab
      })
    })
  })

  it('should edit linked homework', () => {
    cy.createUser()
      .addCourse()
      .then(course => {
        cy.addHomework({course: {name: '', details: course}}).then(homework => {
          const newHomework = buildHomework()

          cy.visit('/').closeWelcome()
          cy.findByRole('button', {name: /Open edit homework drawer/i}).click()

          cy.findByLabelText(/Name/).clear().type(newHomework.name)

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
            cy.findByText(homework.createdBy.name).should('exist')

            cy.findByText(/today/i).should('exist')

            cy.findByRole('heading', {
              name: newHomework.name,
            }).should('exist')

            cy.findByRole('heading', {
              name: course.name,
            }).should('exist')

            cy.findByText(
              new RegExp(determinePriority(newHomework.urgency) as string),
            ).should('exist')
          })
        })
      })
  })

  it('should allow to link a homework to a course on edit', () => {
    cy.createUser()
      .addCourse()
      .then(course => {
        cy.addHomework().then(homework => {
          cy.visit('/').closeWelcome()
          cy.findByRole('button', {
            name: /Open edit homework drawer/i,
          }).click()

          cy.findByLabelText(/^name$/i)
            .clear()
            .type(homework.name)

          cy.findByLabelText(/course name/i)
            .clear()
            .type(course.name)

          cy.findByRole('button', {name: /^edit homework$/i}).click()

          cy.findByTestId('homework-cards').within(() => {
            cy.findByText(homework.createdBy.name).should('exist')

            cy.findByText(/today/i).should('exist')

            cy.findByRole('heading', {
              name: homework.name,
            }).should('exist')

            cy.findByRole('heading', {
              name: course.name,
            }).should('exist')

            cy.findByText(
              new RegExp(determinePriority(homework.urgency) as string),
            ).should('exist')
          })

          cy.findByRole('button', {
            name: /Open edit homework drawer/i,
          }).click()
          cy.findByLabelText(/course name/i).should('be.disabled')

          cy.visit('/courses')
          cy.findByText(/view course/i).click()

          cy.findByTestId('feature-homework').within(() => {
            cy.findByText(/1/).should('exist')
          })
        })
      })
  })

  it('should disable "Course Name" input when homework is linked', () => {
    cy.createUser()
      .addCourse()
      .then(course => {
        cy.addHomework({course: {name: '', details: course}})

        cy.visit('/').closeWelcome()
        cy.findByRole('button', {name: /Open edit homework drawer/i}).click()

        cy.findByLabelText(/course name/i).should('be.disabled')
      })
  })
})
