import React, {useMemo, useContext, useCallback} from 'react'
import {useCookies} from 'react-cookie'
import {
  useQuery,
  useMutation,
  queryCache,
  MutateFunction,
  MutationResult,
} from 'react-query'
import {AxiosResponse, AxiosError} from 'axios'

import {Loading, FullPageErrorFallback} from 'components'
import * as authService from './auth-service'
import IUser from 'constants/interfaces/IUser'
import {domain} from 'constants/site'
import ISignInCredentials from 'constants/interfaces/ISignInCredentials'
import ISignUpCredentials from 'constants/interfaces/ISignUpCredentials'

export interface IAuthContext {
  user: IUser
  login: [
    MutateFunction<AxiosResponse<IUser>, ISignInCredentials>,
    MutationResult<AxiosResponse<IUser>>,
  ]
  register: [
    MutateFunction<AxiosResponse<IUser>, ISignUpCredentials>,
    MutationResult<AxiosResponse<IUser>>,
  ]
  logout: () => Promise<any>
}

const AuthContext = React.createContext<IAuthContext | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export function AuthProvider(props: any) {
  const [{IS_LOGGED_IN: isLoggedIn}, setCookie, removeCookie] = useCookies([
    'IS_LOGGED_IN',
  ])

  const {data, status, error} = useQuery(
    isLoggedIn ? 'user' : null,
    authService.getUser,
    {
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60 * 60,
      retry: (failureCount, error) => {
        const errorCode = (error as AxiosError)?.response?.status

        if (errorCode === 401) {
          logout().then(() =>
            window.location.assign((window.location as unknown) as any),
          )
        }

        if (failureCount < 3) {
          return true // Keep trying
        }

        return false
      },
    },
  )

  const login = useMutation(authService.login, {
    onSuccess: (data, {remember}) => {
      queryCache.setQueryData(['user'], data)

      const expires = new Date()
      expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000) //Expires in 30 days
      setCookie('IS_LOGGED_IN', true, {
        ...(remember && {expires}),
        httpOnly: false,
        domain,
      })
    },
  })

  const register = useMutation(authService.register, {
    onSuccess: data => {
      queryCache.setQueryData(['user'], data)

      setCookie('IS_LOGGED_IN', true, {
        httpOnly: false,
        domain,
      })
    },
  })

  const logout = useCallback(
    () =>
      authService.logout().finally(() => {
        removeCookie('IS_LOGGED_IN', {path: '/', domain})
        queryCache.clear()
      }),
    [removeCookie],
  )

  const user = data
  const value = useMemo(() => ({user, login, logout, register}), [
    user,
    login,
    logout,
    register,
  ])

  if (status === 'loading') {
    return <Loading />
  }

  if (status === 'error') {
    return <FullPageErrorFallback requestError={error as AxiosError} />
  }

  return <AuthContext.Provider value={value} {...props} />
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(
      'To use `useAuth`, component must be within a Auth provider',
    )
  }
  return context
}

export function usePasswordChange() {
  const request = useMutation(authService.requestChangePassword)
  const confirmToken = useMutation(authService.changePasswordTokenConfirmation)
  const change = useMutation(authService.changePassword)

  return {request, confirmToken, change}
}
