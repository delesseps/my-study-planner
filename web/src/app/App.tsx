import * as React from 'react'
import ReactGA from 'react-ga'

import {Loading} from 'components'
import {useAuth} from 'features/auth/auth-context'
import {useLocation} from 'react-router'
import {useThemeSwitcher} from 'react-css-theme-switcher'

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'))
const UnAuthenticatedApp = React.lazy(() => import('./UnAuthenticatedApp'))

const App: React.FC = () => {
  const {user} = useAuth()
  const location = useLocation()
  const {themes, switcher} = useThemeSwitcher()

  React.useEffect(() => {
    //@ts-ignore
    if (window.GA_INITIALIZED) {
      ReactGA.set({page: location.pathname}) // Update the user's current page
      ReactGA.pageview(location.pathname) // Record a pageview for the given page
    }
  }, [location])

  React.useEffect(() => {
    if (user === undefined) switcher({theme: themes.light})
  }, [user, themes, switcher])

  return (
    <React.Suspense fallback={<Loading />}>
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </React.Suspense>
  )
}

export default App
