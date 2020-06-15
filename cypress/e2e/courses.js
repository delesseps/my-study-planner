import {buildCourse} from '../support/generate'

describe('Courses', () => {
  it('should show current courses', () => {
    const courses = [buildCourse(), buildCourse()]

    cy.createUser().addCourse(courses[0]).addCourse(courses[1])

    cy.visit('/courses').closeWelcome()
    cy.findByText(courses[0].name)
    cy.findByText(courses[1].name)
  })
})
