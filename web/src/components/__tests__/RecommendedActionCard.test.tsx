import React from 'react'
import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  loginAsUser,
  screen,
  mockAxios,
} from 'test/test-utils'

import {RecommendedActionCard} from 'components/cards'
import IUser from 'constants/interfaces/IUser'
import IHomework from 'constants/interfaces/IHomework'
import IEvaluation from 'constants/interfaces/IEvaluation'
import {buildHomework, buildEvaluation} from 'test/generate'

async function renderCardWithHomework({
  user,
  homework,
}: {
  user?: IUser
  homework?: IHomework
} = {}) {
  if (user === undefined) {
    user = await loginAsUser()
  }

  if (homework === undefined) {
    homework = buildHomework()
  }

  const utils = render(<RecommendedActionCard assignment={homework} />)

  await waitForElementToBeRemoved(
    () => screen.queryByTestId('full-page-loader'),
    {timeout: 4000},
  )

  return {
    ...utils,
    user,
    homework,
  }
}

async function renderCardWithEvaluation({
  user,
  evaluation,
}: {
  user?: IUser
  evaluation?: IEvaluation
} = {}) {
  if (user === undefined) {
    user = await loginAsUser()
  }

  if (evaluation === undefined) {
    evaluation = buildEvaluation()
  }

  const utils = render(<RecommendedActionCard assignment={evaluation} />)

  await waitForElementToBeRemoved(
    () => screen.queryByTestId('full-page-loader'),
    {timeout: 4000},
  )

  return {
    ...utils,
    user,
    evaluation,
  }
}

describe('Recommended action card', () => {
  afterEach(() => {
    mockAxios.reset()
  })

  test('will display homework modal with description', async () => {
    const {getByText, homework} = await renderCardWithHomework()

    fireEvent.click(getByText('View More'))

    await waitFor(() => getByText(homework.subject))
    getByText(`Description: ${homework.description}`)

    fireEvent.click(getByText('OK'))
  })

  test('will display homework modal with no description', async () => {
    const {getByText, homework} = await renderCardWithHomework({
      homework: buildHomework({description: ''}),
    })
    fireEvent.click(getByText('View More'))

    await waitFor(() => getByText(homework.subject))
    getByText('No Description')

    fireEvent.click(getByText('OK'))
  })

  test('will display evaluation modal with description', async () => {
    const {getByText, evaluation} = await renderCardWithEvaluation()

    fireEvent.click(getByText('View More'))

    await waitFor(() => getByText(evaluation.evaluationType))
    getByText(`: ${evaluation.subject}`)
    getByText(`Description: ${evaluation.description}`)

    fireEvent.click(getByText('OK'))
  })

  test('will display evaluation modal with no description', async () => {
    const {getByText, evaluation} = await renderCardWithEvaluation({
      evaluation: buildEvaluation({description: ''}),
    })

    fireEvent.click(getByText('View More'))

    await waitFor(() => getByText(evaluation.evaluationType))
    getByText(`: ${evaluation.subject}`)

    fireEvent.click(getByText('OK'))
  })

  test('marks homework as done', async () => {
    const {homework} = await renderCardWithHomework()

    mockAxios.onPatch('/homework/update').reply(200, {homework: {}})

    fireEvent.click(screen.getByText('Done'))

    waitForElementToBeRemoved(
      screen.getByText(`Start working on ${homework.subject}`),
    ).then()
  })

  test('marks evaluation as done', async () => {
    const {evaluation} = await renderCardWithEvaluation()

    mockAxios.onPatch('evaluation/update').reply(200)

    fireEvent.click(screen.getByText('Done'))

    waitForElementToBeRemoved(
      screen.getByText(`Start studying for ${evaluation.subject}`),
    ).then()
  })
})
