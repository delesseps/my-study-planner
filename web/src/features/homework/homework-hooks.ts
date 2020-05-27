import {useMemo} from 'react'
import {useMutation, queryCache} from 'react-query'

import {useAuth} from 'features/auth/auth-context'
import * as homeworkService from './homework-service'
import IUser from 'constants/interfaces/IUser'
import {message} from 'antd'

export function useHomework() {
  const {user} = useAuth()

  const edit = useMutation(homeworkService.edit, {
    onSuccess: (data, {index}) => {
      queryCache.setQueryData(['user'], (previous: IUser) => {
        const newHomework = [...previous.homework]

        if (!index) {
          index = previous.homework.findIndex(elem => data._id === elem._id)
        }

        newHomework[index] = data

        return {
          ...previous,
          homework: newHomework,
        }
      })

      message.success(
        data.done ? 'Great Job!' : 'Successfully edited homework!',
      )
    },
    onError: () => {
      message.error('Error editing homework. Please try again.')
    },
  })

  const add = useMutation(homeworkService.add, {
    onSuccess: data => {
      queryCache.setQueryData(['user'], (previous: IUser) => {
        const newHomework = [...previous.homework, data]
        newHomework.sort(
          (a: any, b: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime(),
        )

        return {
          ...previous,
          homework: newHomework,
        }
      })

      message.success('Successfully added homework!')
    },
    onError: () => {
      message.error('Error adding homework. Please try again.')
    },
  })

  const remove = useMutation(homeworkService.remove, {
    onSuccess: (data, {index}) => {
      queryCache.setQueryData(['user'], (previous: IUser) => {
        const newHomework = [...previous.homework]
        newHomework.splice(index, 1)

        return {
          ...previous,
          homework: newHomework,
        }
      })

      message.success('Successfully removed homework!')
    },
    onError: () => {
      message.error('Error removing homework. Please try again.')
    },
  })

  const homework = useMemo(() => user.homework, [user.homework])

  return {homework, edit, add, remove}
}
