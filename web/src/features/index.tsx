import * as React from 'react'
import {CookiesProvider} from 'react-cookie'
import {ReactQueryConfigProvider} from 'react-query'
import {BrowserRouter} from 'react-router-dom'
import ReactGA from 'react-ga'

import {AuthProvider} from './auth/auth-context'
import {gaTrackingID} from 'constants/site'

const queryConfig = {}

export const initGA = () => {
  ReactGA.initialize(gaTrackingID)
}

const AppProviders: React.FC = ({children}) => {
  React.useEffect(() => {
    //@ts-ignore
    if (!window.GA_INITIALIZED) {
      initGA()
      //@ts-ignore
      window.GA_INITIALIZED = true
    }
  }, [])

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <BrowserRouter>
        <CookiesProvider>
          <AuthProvider>{children}</AuthProvider>
        </CookiesProvider>
      </BrowserRouter>
    </ReactQueryConfigProvider>
  )
}

export {AppProviders}
