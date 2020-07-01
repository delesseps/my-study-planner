import React from 'react'
import {Routes, Route, Navigate} from 'react-router'
import {ThemeProvider} from 'styled-components'

import {IUserConfig} from 'constants/interfaces'
import {Loading} from 'components'
import {GlobalStyle, lightTheme} from 'theme'
import {useThemeSwitcher} from 'theme/antd/theme-switcher'

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
  const {status} = useThemeSwitcher()

  if (status === 'LOADING') {
    return <Loading />
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />

      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/dashboard" element={<Navigate to="/signin" />} />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/change_password/:token" element={<ChangePassword />} />
          <Route
            path="/link/google/:token/:email"
            element={<LinkGoogleAccount />}
          />
          <Route path="/404" element={<Window404 />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </React.Suspense>
    </ThemeProvider>
  )
}

export default UnAuthenticatedApp
