import React from 'react'

import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
  mockAxios,
} from 'test/test-utils'
import {SignUpForm} from 'components'

describe('SignUpForm', () => {
  afterEach(() => {
    mockAxios.reset()
  })

  it('renders correctly', () => {
    const {asFragment} = render(<SignUpForm />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('will display errors when empty', async () => {
    const {getByTestId, getByText} = render(<SignUpForm />)
    fireEvent.click(getByTestId('submit'))

    await waitFor(() => getByText('Please input your full name!'))
    await waitFor(() => getByText('Please input your email!'))
    await waitFor(() => getByText('Please input your password!'))
    await waitFor(() => getByText('Please confirm your password!'))
  })

  it('will display invalid email', async () => {
    const {getByLabelText, getByText} = render(<SignUpForm />)

    fireEvent.change(getByLabelText('E-mail'), {target: {value: 'test@'}})
    await waitFor(() => getByText('The input is not valid E-mail!'))
  })

  it('will display error on passwords', async () => {
    const {getByLabelText, getByText} = render(<SignUpForm />)

    const passwordField = getByLabelText('Password')
    const confirmPasswordField = getByLabelText('Confirm Password')

    fireEvent.input(passwordField, {target: {value: 'asd'}})
    await waitFor(() =>
      getByText('Password must have a minimum of 6 characters.'),
    )

    fireEvent.input(passwordField, {
      target: {value: 'asd123'},
    })
    fireEvent.input(confirmPasswordField, {
      target: {value: 'asd'},
    })

    await waitFor(() => getByText(/^The passwords do not match!$/))
    getByText(/^Password must have a minimum of 6 characters.$/)

    fireEvent.input(confirmPasswordField, {
      target: {value: 'asd1234'},
    })
    await waitFor(() => getByText('The passwords do not match!'))

    fireEvent.input(confirmPasswordField, {
      target: {value: 'asd123'},
    })

    await waitForElementToBeRemoved(() =>
      getByText('The passwords do not match!'),
    )
  })

  it('will submit when filled', () => {
    const {queryByText, getByLabelText, getByTestId} = render(<SignUpForm />)

    mockAxios.onPost('auth/signup').reply(200, {user: {}})

    fireEvent.change(getByLabelText('Full Name'), {
      target: {value: 'test'},
    })
    fireEvent.change(getByLabelText('E-mail'), {
      target: {value: 'test@test.com'},
    })
    fireEvent.change(getByLabelText('Password'), {
      target: {value: 'test123'},
    })
    fireEvent.change(getByLabelText('Confirm Password'), {
      target: {value: 'test123'},
    })

    fireEvent.click(getByTestId('submit'))

    expect(
      queryByText(
        'User already exists. Please try again with a different email.',
      ),
    ).toBeNull()
  })

  it('will display error when account exists', async () => {
    const {getByText, getByLabelText, getByTestId} = render(<SignUpForm />)

    mockAxios.onPost('auth/signup').reply(500, {
      errors: {
        message:
          'E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "" }',
      },
    })

    fireEvent.change(getByLabelText('Full Name'), {
      target: {value: 'test'},
    })
    fireEvent.change(getByLabelText('E-mail'), {
      target: {value: 'test@test.com'},
    })
    fireEvent.change(getByLabelText('Password'), {
      target: {value: 'test123'},
    })
    fireEvent.change(getByLabelText('Confirm Password'), {
      target: {value: 'test123'},
    })

    fireEvent.click(getByTestId('submit'))

    await waitFor(() =>
      getByText(
        'User already exists. Please try again with a different email.',
      ),
    )
  })
})
