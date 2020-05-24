import React from 'react'

import IUser from 'constants/interfaces/IUser'
import {ICourse} from 'constants/interfaces'
import {
  loginAsUser,
  render,
  waitForElementToBeRemoved,
  screen,
  mockAxios,
} from 'test/test-utils'
import App from 'app/App'
import {
  buildUser,
  buildHomework,
  buildEvaluation,
  buildToDo,
} from 'test/generate'
import userEvent from '@testing-library/user-event'

async function renderHome({
  user,
  courses,
}: {user?: IUser; courses?: ICourse[]} = {}) {
  if (user === undefined) {
    user = await loginAsUser()
  } else {
    await loginAsUser(user)
  }

  const utils = render(<App />, {route: '/'})

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

describe('Counter Panel', () => {
  test('renders home screen', async () => {
    const {user} = await renderHome()

    expect(screen.getAllByText('Homework').length).toBe(2)
    expect(screen.getAllByText('Evaluations').length).toBe(2)
    screen.getByText('To-Dos')

    screen.getByText(user.name)
  })

  test('renders first sign in and can close it', async () => {
    mockAxios.onPost('/user/welcome').reply(200, 'success')
    const user = buildUser({firstSignIn: true})
    await renderHome({user})

    screen.getByRole('heading', {name: /welcome to my study planner alpha!/i})

    userEvent.click(screen.getByRole('button', {name: /get started/i}))

    expect(screen.queryByText(/welcome to my study planner alpha!/i)).toBeNull()
  })

  test('renders home screen with homework, evaluations and to-dos', async () => {
    const nextWeekDate = new Date()
    nextWeekDate.setDate(nextWeekDate.getDate() + 7)

    const pastWeekDate = new Date()
    pastWeekDate.setDate(pastWeekDate.getDate() - 7)

    const user = buildUser()
    const homework = [
      buildHomework({date: pastWeekDate.toISOString()}),
      buildHomework({
        date: nextWeekDate.toISOString(),
      }),
      buildHomework({date: new Date().toISOString()}),
      buildHomework({date: new Date().toISOString()}),
    ]
    const evaluations = [buildEvaluation()]
    const toDos = [buildToDo()]

    user.evaluations = evaluations
    user.homework = homework
    user.toDos = toDos

    await renderHome({user})

    homework.map(({subject}) => {
      screen.getByText(`Start working on ${subject}`)
      screen.getByText(subject)
    })

    screen.getByText(`Start studying for ${evaluations[0].subject}`)
    screen.getByRole('heading', {
      name: `${evaluations[0].evaluationType} : ${evaluations[0].subject}`,
    })

    screen.getByText(toDos[0].task)

    // 1 evaluation this week
    expect(screen.getByTestId('evaluation-count')).toHaveTextContent(/1/i)

    // 2 homework this week
    expect(screen.getByTestId('homework-count')).toHaveTextContent(/2/i)
  })
})
