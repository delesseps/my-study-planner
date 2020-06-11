import {buildCourse} from '../support/generate'
import {toTitleCase, hhmmss} from '../support/utils'

async function selectTime(time) {
  const formattedTime = hhmmss(time)
  const minutes = formattedTime.slice(3)
  let hours = formattedTime.slice(0, 2)
  let period = 'AM'

  // Covert to 12 hour format
  if (parseInt(hours, 10) > 12) {
    period = 'PM'
    hours = (parseInt(hours, 10) - 12).toString().padStart(2, '0')
  }

  cy.findAllByText(hours).click({multiple: true, force: true})
  cy.findAllByText(minutes).click({multiple: true, force: true})
  cy.findAllByText(period).click({multiple: true, force: true})
}

describe('Schedule', () => {
  it('should add course', () => {
    cy.createUser().then(user => {
      const course = buildCourse()

      const days = Object.keys(course.schedule)

      cy.visit('/schedule').closeWelcome()
      cy.findByLabelText(/open add course drawer/i).click()
      cy.findByLabelText(/course name/i).type(course.name)

      cy.findByLabelText(/repeats/i).click({force: true})

      cy.findByText(toTitleCase(days[0])).click()
      cy.findByText(toTitleCase(days[1])).click()

      cy.findByLabelText(/course name/i).click()

      cy.findAllByTestId('course-range-picker').each(async (el, index) => {
        const classSchedule = course.schedule[days[index]]

        cy.wrap(el).find('input').first().click({force: true})
        await selectTime(classSchedule.start)

        cy.wrap(el).find('input').last().click({force: true})
        await selectTime(classSchedule.end)

        cy.findAllByText(/ok/i).click({force: true, multiple: true})
      })

      cy.document()
        .findAllByLabelText('Classroom')
        .each((el, index) => {
          const classSchedule = course.schedule[days[index]]

          cy.wrap(el).type(classSchedule.classroom)
        })

      cy.document()
        .findByRole('button', {name: /^add course$/i})
        .click()
      cy.findByText(/successfully added course!/i)

      let day = days[0]
      let classSchedule = course.schedule[day]
      let dayToChangeInto = toTitleCase(day.slice(0, 3))

      cy.findByText(dayToChangeInto).click()
      cy.findByText(course.name)
      cy.findByText(hhmmss(classSchedule.start))
      cy.findByText(hhmmss(classSchedule.end))

      day = days[1]
      classSchedule = course.schedule[day]
      dayToChangeInto = toTitleCase(day.slice(0, 3))

      cy.findByText(dayToChangeInto).click()
      cy.findByText(course.name)
      cy.findByText(hhmmss(classSchedule.start))
      cy.findByText(hhmmss(classSchedule.end))
    })
  })
})
