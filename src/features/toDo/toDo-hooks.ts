import {useMemo} from 'react'
import {useMutation, queryCache} from 'react-query'

import {useAuth} from 'features/auth/auth-context'
import * as toDoService from './toDo-service'
import IUser from 'constants/interfaces/IUser'
import {message} from 'antd'

export function useToDo() {
  const {user} = useAuth()

  const edit = useMutation(toDoService.edit, {
    onSuccess: (data, {index}) => {
      queryCache.setQueryData(['user'], (previous: IUser) => {
        const newToDos = [...previous.toDos]
        newToDos[index] = data

        return {
          ...previous,
          toDos: newToDos,
        }
      })

      message.success(data.done ? 'Great Job!' : 'Successfully edited to-do!')
    },
    onError: () => {
      message.error('Error marking to-do as done. Please try again.')
    },
  })

  const add = useMutation(toDoService.add, {
    onSuccess: data => {
      queryCache.setQueryData(['user'], (previous: IUser) => {
        const newToDos = [...previous.toDos, data]

        return {
          ...previous,
          toDos: newToDos,
        }
      })

      message.success('Successfully added to-do!')
    },
    onError: () => {
      message.error('Error adding to-do. Please try again.')
    },
  })

  const remove = useMutation(toDoService.remove, {
    onSuccess: (data, {index}) => {
      queryCache.setQueryData(['user'], (previous: IUser) => {
        const newToDos = [...previous.toDos]
        newToDos.splice(index, 1)

        return {
          ...previous,
          toDos: newToDos,
        }
      })

      message.success('Successfully removed to-do!')
    },
    onError: () => {
      message.error('Error removing to-do. Please try again.')
    },
  })

  const toDos = useMemo(() => user.toDos, [user.toDos])

  return {toDos, edit, add, remove}
}
