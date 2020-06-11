import React from 'react'
import {Switch, Route, Redirect} from 'react-router'
import {ThemeProvider} from 'styled-components'

import {IUserConfig} from 'constants/interfaces'
import {Loading} from 'components'
import {GlobalStyle, lightTheme} from 'theme'

const SignIn = React.lazy(() => import('routes/SignIn'))
const SignUp = React.lazy(() => import('routes/SignUp'))
const Window404 = React.lazy(() => import('routes/Route404'))
const ForgotPassword = React.lazy(() => import('routes/ForgotPassword'))
const ChangePassword = React.lazy(() => import('routes/ChangePassword'))
const LinkGoogleAccount = React.lazy(() => import('routes/LinkGoogleAccount'))

interface IRouterProps {
  config?: IUserConfig
}

const UnAuthenticatedApp: React.FC<IRouterProps> = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />

      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/signin" />} />
          <Route
            path="/dashboard"
            exact
            render={() => <Redirect to="/signin" />}
          />

          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/forgot_password" exact component={ForgotPassword} />
          <Route
            path="/change_password/:token"
            exact
            render={props => <ChangePassword {...props} />}
          />
          <Route
            path="/link/google/:token/:email"
            exact
            render={props => <LinkGoogleAccount {...props} />}
          />
          <Route path="/404" exact render={() => <Window404 />} />
          <Redirect to="/404" />
        </Switch>
      </React.Suspense>
    </ThemeProvider>
  )
}

export default UnAuthenticatedApp
