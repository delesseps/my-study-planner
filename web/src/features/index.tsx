import * as React from 'react'
import {CookiesProvider} from 'react-cookie'
import {BrowserRouter} from 'react-router-dom'
import ReactGA from 'react-ga'

import {AuthProvider} from './auth/auth-context'
import {gaTrackingID} from 'constants/site'
import {ThemeSwitcherProvider} from 'react-css-theme-switcher'

export const initGA = () => {
  ReactGA.initialize(gaTrackingID)
}

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
}

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
    <BrowserRouter>
      <CookiesProvider>
        <ThemeSwitcherProvider
          themeMap={themes}
          insertionPoint={'theme-insertion-point'}
          defaultTheme="light"
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeSwitcherProvider>
      </CookiesProvider>
    </BrowserRouter>
  )
}

export {AppProviders}
