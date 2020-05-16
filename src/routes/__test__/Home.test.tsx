import React from 'react'

import IUser from 'constants/interfaces/IUser'
import {ICourse} from 'constants/interfaces'
import {
  loginAsUser,
  render,
  waitForElementToBeRemoved,
  screen,
} from 'test/test-utils'
import App from 'app/App'

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
})
