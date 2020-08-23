import IEvaluation from '../../types/IEvaluation'
import {buildEvaluation} from '../generate'
import IUser from '../../types/IUser'
import {determinePriority} from '../utils'

Cypress.Commands.add(
  'addEvaluation',
  (overrides: Partial<IEvaluation> = {}) => {
    //@ts-ignore
    const evaluation = buildEvaluation({overrides})
    cy.request({
      url: `${Cypress.env('api_url')}/evaluation/add`,
      method: 'POST',
      body: {
        date: evaluation.date,
        description: evaluation.description,
        name: evaluation.name,
        urgency: evaluation.urgency,
        evaluationType: evaluation.evaluationType,
        course: evaluation.course._id,
      },
    }).then(res => ({...evaluation, ...res.body.evaluation}))
  },
)

Cypress.Commands.add(
  'fillAddEvaluationDrawer',
  (
    {name, urgency, description, evaluationType}: IEvaluation,
    additionalActions?: () => void,
  ) => {
    cy.findByRole('button', {name: /new evaluation/i}).click()

    cy.findByLabelText(/course name/i).type(name)

    cy.findByRole('radio', {
      name: new RegExp(evaluationType, 'i'),
    }).click({
      force: true,
    })

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

    cy.findByRole('button', {name: /add evaluation/i}).click()
  },
)

Cypress.Commands.add(
  'fillEditEvaluationDrawer',
  (
    {name, evaluationType, urgency, description}: IEvaluation,
    additionalActions?: () => void,
  ) => {
    cy.findByRole('button', {name: /Open edit evaluation drawer/i}).click()

    cy.findByLabelText(/course name/i)
      .clear()
      .type(name)

    cy.findByRole('radio', {
      name: new RegExp(evaluationType, 'i'),
    }).click({
      force: true,
    })
    cy.findByRole('radio', {
      name: new RegExp(urgency, 'i'),
    }).click({
      force: true,
    })

    cy.findByLabelText(/description/i)
      .clear()
      .type(description)

    additionalActions && additionalActions()

    cy.findByRole('button', {name: /^edit evaluation$/i}).click()
  },
)

Cypress.Commands.add(
  'assertEvaluationCard',
  (user: IUser, {name, urgency, evaluationType}: IEvaluation) => {
    cy.findByTestId('evaluations-cards').within(() => {
      cy.findByText(user.name).should('exist')

      cy.findByText(/today/i).should('exist')

      cy.findByRole('heading', {
        name: evaluationType,
      }).should('exist')

      cy.findByRole('heading', {
        name: name,
      }).should('exist')

      cy.findByText(new RegExp(determinePriority(urgency) as string)).should(
        'exist',
      )
    })
  },
)
