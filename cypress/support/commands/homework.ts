import IHomework from '../../types/IHomework'
import IUser from '../../types/IUser'
import {determinePriority} from '../utils'
import {buildHomework} from '../generate'

Cypress.Commands.add('addHomework', (overrides: Partial<IHomework> = {}) => {
  //@ts-ignore
  const homework = buildHomework({overrides})

  cy.request({
    url: `${Cypress.env('api_url')}/homework/add`,
    method: 'POST',
    body: {
      date: homework.date,
      description: homework.description,
      name: homework.name,
      urgency: homework.urgency,
      course: {
        name: homework.course.name,
        details: homework.course.details?._id,
      },
    },
  }).then(res => ({...homework, ...res.body.homework}))
})

Cypress.Commands.add(
  'fillAddHomeworkDrawer',
  (
    {name, course, urgency, description}: IHomework,
    additionalActions?: () => void,
  ) => {
    cy.findByRole('button', {name: /new homework/i}).click()

    cy.findByLabelText(/Name/).type(name)
    cy.findByLabelText(/course name/i).type(course.name)
    cy.findByRole('radio', {name: new RegExp(urgency, 'i')}).click({
      force: true,
    })
    cy.findByLabelText(/description/i).type(description)
    cy.findByTestId(/date-picker/i).click()
    cy.findAllByText(new Date().getDate().toString()).click({
      multiple: true,
      force: true,
    })

    additionalActions && additionalActions()

    cy.findByRole('button', {name: /add homework/i}).click()
  },
)

Cypress.Commands.add(
  'fillEditHomeworkDrawer',
  (
    {name, course, urgency, description}: IHomework,
    additionalActions?: () => void,
  ) => {
    cy.findByRole('button', {name: /Open edit homework drawer/i}).click()

    cy.findByLabelText(/Name/).clear().type(name)

    cy.findByLabelText(/course name/i)
      .clear()
      .type(course.name)

    cy.findByRole('radio', {
      name: new RegExp(urgency, 'i'),
    }).click({
      force: true,
    })

    cy.findByLabelText(/description/i)
      .clear()
      .type(description)

    cy.findAllByText(new Date().getDate().toString()).click({
      multiple: true,
      force: true,
    })

    additionalActions && additionalActions()

    cy.findByRole('button', {name: /^edit homework$/i}).click()
  },
)

Cypress.Commands.add(
  'assertHomeworkCard',
  (user: IUser, {name, course, urgency}: IHomework) => {
    cy.findByTestId('homework-cards').within(() => {
      cy.findByText(user.name).should('exist')

      cy.findByText(/today/i).should('exist')

      cy.findByRole('heading', {
        name: name,
      }).should('exist')

      cy.findByRole('heading', {
        name: course.name,
      }).should('exist')

      cy.findByText(new RegExp(determinePriority(urgency) as string)).should(
        'exist',
      )
    })
  },
)
