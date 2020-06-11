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
  within,
} from 'test/test-utils'
import userEvent from '@testing-library/user-event'
import App from 'app/App'
import {buildCourse} from 'test/generate'
import {toTitleCase, hhmmss} from 'utils'

jest.mock('rc-queue-anim', () => {
  return ({children}: any) => children
})

async function selectTime(input: HTMLInputElement, time: number) {
  const formattedTime = hhmmss(time)
  const minutes = formattedTime.slice(3)
  let hours = formattedTime.slice(0, 2)
  let period = 'AM'

  // Covert to 12 hour format
  if (parseInt(hours, 10) > 12) {
    period = 'PM'
    hours = (parseInt(hours, 10) - 12).toString().padStart(2, '0')
  }

  // Open picker
  userEvent.click(input)

  // ANTD Time Picker
  const pickers = document.querySelectorAll(
    'div.ant-picker-dropdown:not(.ant-picker-dropdown-hidden)',
  )
  const openPicker = pickers[pickers.length - 1] as HTMLDivElement
  const pickerUtils = within(openPicker)

  userEvent.click(await pickerUtils.findByText(hours))
  userEvent.click(await pickerUtils.findByText(minutes))
  userEvent.click(await pickerUtils.findByText(period))
  userEvent.click(await pickerUtils.findByText(/ok/i))
}

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

  test('can add, edit, and delete course', async () => {
    jest.setTimeout(20000)

    const newCourse = buildCourse()
    const editedCourse = {...newCourse, name: 'edited'}

    mockAxios.onPost('/course/add').reply(200, {course: newCourse})
    mockAxios.onPatch('/course/update').reply(200, {course: editedCourse})
    mockAxios.onDelete('/course/delete').reply(200)

    const days = Object.keys(newCourse.schedule)
    const firstClassSchedule = newCourse.schedule[days[0] as Weekdays]
    const secondClassSchedule = newCourse.schedule[days[1] as Weekdays]

    await renderSchedule({courses: []})

    const openCourseDrawer = screen.getByLabelText('Open add course drawer')
    userEvent.click(openCourseDrawer)

    const addCourseButton = screen.getByRole('button', {name: 'Add Course'})

    // Missing fields error check
    userEvent.click(addCourseButton)
    await screen.findByText(/please input the course name!/i)
    await screen.findByText(/please input at least one day!/i)

    userEvent.type(await screen.findByLabelText(/course name/i), newCourse.name)

    const select = await screen.findByLabelText(/repeats/i)
    userEvent.click(select)
    userEvent.click(await screen.findByText(toTitleCase(days[0])))
    userEvent.click(await screen.findByText(toTitleCase(days[1])))

    // Missing fields error check
    userEvent.click(addCourseButton)
    await screen.findAllByText(/Please select time!/i)
    await screen.findAllByText(/Please input the classroom!/i)

    // Add Course
    const rangePickers = screen.getAllByTestId('course-range-picker')
    const firstRangePickerInputs = rangePickers[0].querySelectorAll('input')
    const secondRangePickerInputs = rangePickers[1].querySelectorAll('input')

    await selectTime(firstRangePickerInputs[0], firstClassSchedule!.start)
    await selectTime(firstRangePickerInputs[1], firstClassSchedule!.end)

    await selectTime(secondRangePickerInputs[0], firstClassSchedule!.start)
    await selectTime(secondRangePickerInputs[1], secondClassSchedule!.end)

    const classRoomInputs = screen.getAllByLabelText('Classroom')
    userEvent.type(classRoomInputs[0], firstClassSchedule!.classroom)
    userEvent.type(classRoomInputs[1], secondClassSchedule!.classroom)

    userEvent.click(addCourseButton)

    let day = days[0] as Weekdays
    let dayToChangeInto = toTitleCase(day.slice(0, 3))

    userEvent.click(screen.getByText(dayToChangeInto))

    await screen.findByText(/successfully added course!/i)
    await screen.findByText(newCourse.name)
    await screen.findByText(hhmmss(firstClassSchedule!.start))
    await screen.findByText(hhmmss(firstClassSchedule!.end))

    day = days[1] as Weekdays
    dayToChangeInto = toTitleCase(day.slice(0, 3))
    userEvent.click(screen.getByText(dayToChangeInto))

    await screen.findByText(/successfully added course!/i)
    await screen.findByText(newCourse.name)
    await screen.findByText(hhmmss(secondClassSchedule!.start))
    await screen.findByText(hhmmss(secondClassSchedule!.end))

    // Edit course
    userEvent.click(await screen.findByLabelText(/edit course/i))
    userEvent.type(
      await screen.findByLabelText(/course name/i),
      editedCourse.name,
    )
    userEvent.click(screen.getByRole('button', {name: 'Edit Course'}))
    await screen.findByText(/successfully edited course!/i)
    await screen.findByText(editedCourse.name)

    // Remove course
    userEvent.click(await screen.findByLabelText(/delete course/i))
    userEvent.click(await screen.findByText(/yes/i))
    screen.getByText('No courses found.')
  })
})
