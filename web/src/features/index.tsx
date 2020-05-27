import * as React from 'react'
import {CookiesProvider} from 'react-cookie'
import {ReactQueryConfigProvider} from 'react-query'

import {AuthProvider} from './auth/auth-context'
import {BrowserRouter as Router} from 'react-router-dom'

const queryConfig = {}

const AppProviders: React.FC = ({children}) => (
  <ReactQueryConfigProvider config={queryConfig}>
    <Router>
      <CookiesProvider>
        <AuthProvider>{children}</AuthProvider>
      </CookiesProvider>
    </Router>
  </ReactQueryConfigProvider>
)

export {AppProviders}
