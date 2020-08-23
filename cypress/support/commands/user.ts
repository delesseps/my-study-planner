import IUser from '../../types/IUser'
import {buildUser} from '../generate'

Cypress.Commands.add('createUser', (overrides: Partial<IUser> = {}) => {
  //@ts-ignore
  const user = buildUser({overrides})
  cy.request({
    url: `${Cypress.env('api_url')}/auth/signup`,
    method: 'POST',
    body: {email: user.email, name: user.name, password: user.password},
  }).then(res => ({...res.body.user, ...user}))
})

Cypress.Commands.add('getUserEmail', (email: string) => {
  cy.request({
    url: `http://localhost:8025/api/v2/search?kind=to&query=${email}`,
    method: 'GET',
  }).then(res => res.body.items[0])
})
