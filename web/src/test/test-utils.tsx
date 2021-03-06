import React, {ReactElement} from 'react'
import * as rtl from '@testing-library/react'
import {ReactQueryConfigProvider} from 'react-query'
import {AuthProvider} from 'features/auth/auth-context'
import {ThemeProvider, DefaultTheme} from 'styled-components'
import {Router} from 'react-router-dom'
import {createMemoryHistory, MemoryHistory} from 'history'
import MockAdapter from 'axios-mock-adapter'
import 'jest-styled-components'

import {lightTheme} from 'theme'
import {buildUser} from './generate'
import {agent} from 'utils'
import {domain} from 'constants/site'
import IUser from 'constants/interfaces/IUser'

export const mockAxios = new MockAdapter(agent)

const queryConfig = {
  retry: 0,
}

interface renderOptions {
  route?: string
  initialEntries?: string[]
  history?: MemoryHistory
  theme?: DefaultTheme

  [x: string]: any
}

const customRender = (
  ui: ReactElement<any>,
  {
    route = '/',
    initialEntries = [route],
    history = createMemoryHistory({initialEntries}),
    theme = lightTheme,
    ...rest
  }: renderOptions = {},
) => {
  const Wrapper: React.FC = ({children}) => {
    return (
      <ReactQueryConfigProvider config={queryConfig}>
        <Router history={history}>
          <AuthProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </AuthProvider>
        </Router>
      </ReactQueryConfigProvider>
    )
  }

  return {
    ...rtl.render(ui, {
      wrapper: Wrapper,
      ...rest,
    }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  }
}

async function loginAsUser(user: IUser = buildUser()) {
  function setCookie(name: string, value: any, domain: string) {
    document.cookie = `${name}=${value};domain=${domain}`
    //@ts-ignore
    global.document = {}
  }

  setCookie('IS_LOGGED_IN', true, domain)

  mockAxios.onGet('/user/current').reply(200, {user})

  return user
}

async function waitForElementToBeRemoved(...args: any) {
  try {
    // @ts-ignore
    await rtl.waitForElementToBeRemoved(...args)
  } catch (error) {
    // @ts-ignore
    rtl.screen.debug()
    throw error
  }
}

export * from '@testing-library/react'
export {customRender as render, waitForElementToBeRemoved, loginAsUser}
