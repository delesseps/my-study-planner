import {useMemo} from 'react'
import {useMutation, queryCache} from 'react-query'
import {message} from 'antd'

import {useAuth} from 'features/auth/auth-context'
import * as evaluationService from './evaluation-service'
import IUser from 'constants/interfaces/IUser'

export function useEvaluations() {
  const {user} = useAuth()

  const edit = useMutation(evaluationService.edit, {
    onSuccess: (data, {index}) => {
      queryCache.setQueryData<IUser>(['user'], previous => {
        if (previous) {
          const newEvaluations = [...previous.evaluations]

          if (!index) {
            index = previous.evaluations.findIndex(
              elem => data._id === elem._id,
            )
          }

          newEvaluations[index] = data

          return {
            ...previous,
            evaluations: newEvaluations,
          }
        }
      })

      message.success('Successfully edited evaluation!')
    },
    onError: () => {
      message.error('Error editing evaluation. Please try again.')
    },
  })

  const add = useMutation(evaluationService.add, {
    onSuccess: data => {
      queryCache.setQueryData<IUser>(['user'], previous => {
        if (previous) {
          const newEvaluations = [...previous.evaluations, data]
          newEvaluations.sort(
            (a: any, b: any) =>
              new Date(a.date).getTime() - new Date(b.date).getTime(),
          )

          return {
            ...previous,
            evaluations: newEvaluations,
          }
        }
      })

      message.success('Successfully added evaluation!')
    },
    onError: () => {
      message.error('Error adding evaluation. Please try again.')
    },
  })

  const remove = useMutation(evaluationService.remove, {
    onSuccess: (data, {index}) => {
      queryCache.setQueryData<IUser>(['user'], previous => {
        if (previous) {
          const newEvaluations = [...previous.evaluations]
          newEvaluations.splice(index, 1)

          return {
            ...previous,
            evaluations: newEvaluations,
          }
        }
      })

      message.success('Successfully removed evaluation!')
    },
    onError: () => {
      message.error('Error removing evaluation. Please try again.')
    },
  })

  const evaluations = useMemo(() => user.evaluations, [user.evaluations])

  return {evaluations, edit, add, remove}
}

export function useEvaluationMarkAsDone() {
  return useMutation(evaluationService.markAsDone, {
    onSuccess: (data, {index}) => {
      queryCache.setQueryData<IUser>(['user'], previous => {
        if (previous) {
          const newEvaluations = [...previous.evaluations]

          if (!index) {
            index = previous.evaluations.findIndex(
              elem => data._id === elem._id,
            )
          }

          newEvaluations[index] = data

          return {
            ...previous,
            evaluations: newEvaluations,
          }
        }
      })

      message.success('Great Job!')
    },
    onError: () => {
      message.error('Error marking evaluation as done. Please try again.')
    },
  })
}
