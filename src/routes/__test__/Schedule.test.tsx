import React from 'react'

import IUser from 'constants/interfaces/IUser'
import {ICourse, Weekdays} from 'constants/interfaces'
import {
  loginAsUser,
  render,
  waitForElementToBeRemoved,
  screen,
  mockAxios,
  fireEvent,
} from 'test/test-utils'
import App from 'app/App'
import {buildCourse} from 'test/generate'
import {toTitleCase, hhmmss} from 'utils'

async function renderSchedule({
  user,
  courses,
}: {user?: IUser; courses?: ICourse[]} = {}) {
  if (user === undefined) {
    user = await loginAsUser()
  } else {
    await loginAsUser(user)
  }

  if (courses === undefined) {
    courses = [buildCourse()]
  }

  mockAxios.onGet('/course').reply(200, {course: courses})

  const utils = render(<App />, {route: '/schedule'})

  await waitForElementToBeRemoved(
    () => screen.queryByTestId('full-page-loader'),
    {timeout: 4000},
  )

  return {
    ...utils,
    user,
    courses,
  }
}

const days = ([...Object.values(Weekdays)] as any) as Weekdays[]

describe('Schedule Route', () => {
  test('renders schedule with current day tab', async () => {
    const {getByTestId} = await renderSchedule()

    let day = getByTestId('active').innerHTML
    const currentDay = toTitleCase(days[new Date().getDay()].slice(0, 3))
    expect(day).toBe(currentDay)
  })

  test('changes tab and can see courses of that day', async () => {
    const {getByTestId, getByText, courses} = await renderSchedule()

    const course = courses[0]
    const days = Object.keys(course.schedule)
    const day = days[0] as Weekdays

    const dayToChangeInto = toTitleCase(day.slice(0, 3))

    fireEvent.click(getByText(dayToChangeInto))

    const selectedDay = getByTestId('active').innerHTML
    expect(selectedDay).toBe(dayToChangeInto)

    const currentDaySchedule = course.schedule[day]

    await screen.findByText(course.name)
    await screen.findByText(currentDaySchedule!.classroom)
    await screen.findByText(hhmmss(currentDaySchedule!.start))
    await screen.findByText(hhmmss(currentDaySchedule!.end))
  })

  test('can delete course', async () => {
    mockAxios.onDelete('/course/delete').reply(200)
    const {courses} = await renderSchedule()

    const course = courses[0]
    const days = Object.keys(course.schedule)
    const day = days[0] as Weekdays
    const dayToChangeInto = toTitleCase(day.slice(0, 3))

    fireEvent.click(screen.getByText(dayToChangeInto))

    await screen.findByTestId('delete-course')
    fireEvent.click(await screen.findByTestId('delete-course'))

    // Confirm popover
    await screen.findByText('Yes')
    fireEvent.click(screen.getByText('Yes'))

    screen.getByText('No courses found.')
  })
})
