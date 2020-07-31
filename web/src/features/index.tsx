import * as React from 'react'
import {CookiesProvider} from 'react-cookie'
import {ReactQueryConfigProvider} from 'react-query'
import {Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import ReactGA from 'react-ga'

import {AuthProvider} from './auth/auth-context'
import {gaTrackingID} from 'constants/site'

const queryConfig = {}

const history = createBrowserHistory()

export const initGA = () => {
  ReactGA.initialize(gaTrackingID)
}

history.listen(location => {
  ReactGA.set({page: location.pathname}) // Update the user's current page
  ReactGA.pageview(location.pathname) // Record a pageview for the given page
})

const AppProviders: React.FC = ({children}) => {
  React.useEffect(() => {
    //@ts-ignore
    if (!window.GA_INITIALIZED && process.env.NODE_ENV !== 'development') {
      initGA()
      //@ts-ignore
      window.GA_INITIALIZED = true
    }
  }, [])

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router history={history}>
        <CookiesProvider>
          <AuthProvider>{children}</AuthProvider>
        </CookiesProvider>
      </Router>
    </ReactQueryConfigProvider>
  )
}

export {AppProviders}
