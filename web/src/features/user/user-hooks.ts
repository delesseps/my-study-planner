import {useMemo} from 'react'

import {useMutation, queryCache} from 'react-query'

import * as userService from './user-service'
import IUser from 'constants/interfaces/IUser'
import {useAuth} from 'features/auth/auth-context'

export function useProfilePicture() {
  const {user} = useAuth()

  const [change] = useMutation(userService.uploadProfilePicture, {
    onMutate: image => {
      const previousUserData = queryCache.getQueryData('user') as IUser

      queryCache.setQueryData('user', (previous: IUser) => ({
        ...previous,
        picture: image,
      }))

      return () => queryCache.setQueryData('user', previousUserData)
    },
    onError: (err, previousUserData, rollback: any) => rollback(),
    onSettled: () => {
      queryCache.refetchQueries('user')
    },
  })

  const picture = useMemo(() => user.picture, [user.picture])

  return {picture, change}
}

export function useConfig() {
  const {user} = useAuth()

  const [change] = useMutation(userService.changeConfig, {
    onMutate: config => {
      const previousUserData = queryCache.getQueryData('user') as IUser

      queryCache.setQueryData('user', (previous: IUser) => ({
        ...previous,
        configuration: config,
      }))

      return () => queryCache.setQueryData('user', previousUserData)
    },
    onError: (err, previousUserData, rollback: any) => rollback(),
    onSettled: () => {
      queryCache.refetchQueries('user')
    },
  })

  const config = useMemo(() => user.configuration, [user.configuration])

  return {config, change}
}

export function useUserModal() {
  const {user} = useAuth()

  const close = useMutation(userService.closeWelcomeModal, {
    onMutate: config => {
      const previousUserData = queryCache.getQueryData('user') as IUser

      queryCache.setQueryData('user', (previous: IUser) => ({
        ...previous,
        firstSignIn: false,
      }))

      return () => queryCache.setQueryData('user', previousUserData)
    },
    onError: (err, previousUserData, rollback: any) => rollback(),
    onSettled: () => {
      queryCache.refetchQueries('user')
    },
  })

  const hasModal = useMemo(() => Boolean(user.firstSignIn), [user.firstSignIn])

  return {hasModal, close}
}
