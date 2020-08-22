import {
  buildUser,
  buildHomework,
  buildEvaluation,
  buildCourse,
} from './generate'
import {toTitleCase} from './utils'
import {ICourse} from '../types'
import IEvaluation from '../types/IEvaluation'
import IHomework from '../types/IHomework'
import IUser from '../types/IUser'

Cypress.Commands.add('createUser', (overrides: Partial<IUser> = {}) => {
  //@ts-ignore
  const user = buildUser({overrides})
  cy.request({
    url: `${Cypress.env('api_url')}/auth/signup`,
    method: 'POST',
    body: {email: user.email, name: user.name, password: user.password},
  }).then(res => ({...res.body.user, ...user}))
})

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

Cypress.Commands.add('addCourse', (overrides: Partial<ICourse> = {}) => {
  //@ts-ignore
  const course = buildCourse({overrides})

  cy.request({
    url: `${Cypress.env('api_url')}/course/add`,
    method: 'POST',
    body: {
      name: course.name,
      schedule: course.schedule,
    },
  }).then(res => ({...course, ...res.body.course}))
})

Cypress.Commands.add('changeToCourseDay', (day: string) => {
  const dayToChangeInto = toTitleCase(day.slice(0, 3))
  cy.findByText(dayToChangeInto).click()
})

Cypress.Commands.add('getUserEmail', (email: string) => {
  cy.request({
    url: `http://localhost:8025/api/v2/search?kind=to&query=${email}`,
    method: 'GET',
  }).then(res => res.body.items[0])
})

Cypress.Commands.add('closeWelcome', () => {
  cy.findByRole('button', {name: /get started/i}).click()
})

Cypress.Commands.add('assertDashboardHome', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/dashboard`)
})

Cypress.Commands.add('unregisterServiceWorkers', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then(registrations => registrations.forEach(reg => reg.unregister()))
  }
})
