import React from 'react'

import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
  mockAxios,
} from 'test/test-utils'
import {SignInForm} from 'components'

describe('SignInForm', () => {
  afterEach(() => {
    mockAxios.reset()
  })

  it('renders correctly', () => {
    const {asFragment} = render(<SignInForm />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('will display errors when empty', async () => {
    const {getByTestId, getByText} = render(<SignInForm />)
    fireEvent.click(getByTestId('submit'))
    await waitFor(() => getByText('Please input your email!'))
    await waitFor(() => getByText('Please input your password!'))
  })

  it('will display invalid email', async () => {
    const {getByLabelText, getByText} = render(<SignInForm />)

    fireEvent.change(getByLabelText('E-mail'), {target: {value: 'test@'}})
    await waitFor(() => getByText('The input is not valid E-mail!'))

    fireEvent.change(getByLabelText('E-mail'), {
      target: {value: 'test@test.com'},
    })
    await waitForElementToBeRemoved(() =>
      getByText('The input is not valid E-mail!'),
    )
  })

  it('will submit form', () => {
    const {getByLabelText, queryByText, getByTestId} = render(<SignInForm />)
    mockAxios.onPost('/auth/signin').reply(200, {user: {}})

    fireEvent.change(getByLabelText('E-mail'), {
      target: {value: 'test@test.com'},
    })
    fireEvent.change(getByLabelText('Password'), {target: {value: 'test'}})

    fireEvent.click(getByTestId('submit'))

    expect(queryByText('Incorrect e-mail or password.')).toBeNull()
  })

  it('will display incorrect credentials', async () => {
    const {getByLabelText, getByText, getByTestId} = render(<SignInForm />)
    mockAxios
      .onPost('/auth/signin')
      .reply(400, {errors: {message: 'Invalid Password'}})

    fireEvent.change(getByLabelText('E-mail'), {
      target: {value: 'test@test.com'},
    })
    fireEvent.change(getByLabelText('Password'), {target: {value: 'test'}})

    fireEvent.click(getByTestId('submit'))

    await waitFor(() => getByText('Incorrect e-mail or password.'))
  })
})
