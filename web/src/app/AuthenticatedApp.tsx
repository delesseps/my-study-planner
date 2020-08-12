import React from 'react'
import {Routes, Route, Navigate} from 'react-router'
import {Alert} from 'antd'
import styled, {ThemeProvider} from 'styled-components'
import {ErrorBoundary} from 'react-error-boundary'

import {
  FadeIn,
  Loading,
  Navigation,
  TopBar,
  FullPageErrorFallback,
} from 'components'
import {breakpoints, lightTheme, darkTheme, GlobalStyle} from 'theme'
import {initializePush} from 'firebase/initialize'
import {useConfig} from 'features/user/user-hooks'
import {useAuth} from 'features/auth/auth-context'
import {useThemeSwitcher} from 'react-css-theme-switcher'
import {CourseDetails} from 'routes'

const Home = React.lazy(() => import('routes/Home'))
const Schedule = React.lazy(() => import('routes/Schedule'))
const Preferences = React.lazy(() => import('routes/Preferences'))
const Courses = React.lazy(() => import('routes/Courses'))

const WelcomeModal = React.lazy(() => import('../components/modals/Welcome'))

const AuthenticatedApp: React.FC = () => {
  const {user} = useAuth()
  const {config} = useConfig()
  const {themes, switcher, status} = useThemeSwitcher()

  React.useEffect(() => {
    initializePush()
  }, [])

  React.useEffect(() => {
    config.darkMode
      ? switcher({
          theme: themes.dark,
        })
      : switcher({
          theme: themes.light,
        })
  }, [config.darkMode, themes, switcher])

  if (status === 'loading') {
    return <Loading />
  }

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <ThemeProvider theme={config.darkMode ? darkTheme : lightTheme}>
        <GlobalStyle config={config} />

        <FadeIn>
          <Wrapper>
            <Navigation />
            <Content>
              {user.firstSignIn && <WelcomeModal />}
              {!user.verified && (
                <EmailVerificationError
                  message="Check your email and activate your account!"
                  banner
                  closable
                />
              )}
              <TopBar />

              <React.Suspense fallback={<Loading />}>
                <AppRoutes />
              </React.Suspense>
            </Content>
          </Wrapper>
        </FadeIn>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/course/:id" element={<CourseDetails />} />
      <Route path="/dashboard/Preferences" element={<Preferences />} />
      <Route path="*" element={<Navigate replace to="/dashboard" />} />
    </Routes>
  )
}

const Wrapper = styled.div`
  display: flex;

  @media only screen and (max-width: ${breakpoints.bpMedium}) {
    flex-direction: column;
  }

  background-color: ${props => props.theme.backgroundColor};
`

const EmailVerificationError = styled(Alert)`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  z-index: 100;
`

const Content = styled.main`
  flex: 1;
  padding: 4rem 6rem;

  position: relative;

  @media only screen and (max-width: ${breakpoints.bpLargest}) {
    padding: 4rem 4rem;
  }

  @media only screen and (max-width: ${breakpoints.bpMedium}) {
    flex: 1;
    min-height: 100vh;
  }

  @media only screen and (max-width: ${breakpoints.bpMobileL}) {
    padding: 4rem 1rem 9rem 1rem;
  }

  @media only screen and (max-width: ${breakpoints.bpMobileS}) {
    padding: 4rem 0.2rem 10rem 0.2rem;
  }
`

export default AuthenticatedApp
