import {ICourse} from '../../types'
import {toTitleCase} from '../utils'
import {buildCourse} from '../generate'

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
