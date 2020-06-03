import {buildUser, buildHomework} from './generate'

Cypress.Commands.add('createUser', (overrides = {}) => {
  const user = buildUser({overrides})
  cy.request({
    url: `${Cypress.env('api_url')}/auth/signup`,
    method: 'POST',
    body: {email: user.email, name: user.name, password: user.password},
  }).then(res => ({...res.body.user, ...user}))
})

Cypress.Commands.add('addHomework', (overrides = {}) => {
  const homework = buildHomework({overrides})
  cy.request({
    url: `${Cypress.env('api_url')}/homework/add`,
    method: 'POST',
    body: {
      date: homework.date,
      description: homework.description,
      subject: homework.subject,
      urgency: homework.urgency,
    },
  }).then(res => ({...res.body.homework, ...homework}))
})

Cypress.Commands.add('getUserEmail', email => {
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
