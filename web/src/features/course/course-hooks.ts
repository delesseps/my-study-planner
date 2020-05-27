import {useQuery, useMutation, queryCache} from 'react-query'
import {message} from 'antd'

import * as courseService from './course-service'
import {ICourse} from 'constants/interfaces'

const courseQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
  useErrorBoundary: true,
}

export function useCourses() {
  const data = useQuery(['course'], courseService.get, courseQueryConfig)
  return data
}

export function useCourse(courseId: string) {
  const data = useQuery(
    ['course', {courseId}],
    courseService.getById,
    courseQueryConfig,
  )
  return data
}

export function useAddCourse() {
  return useMutation(courseService.add, {
    onSuccess: data => {
      queryCache.setQueryData(['course'], (previous: ICourse[]) => {
        const newCourses = [...previous, data]
        return newCourses
      })

      message.success('Successfully added course!')
    },
    onError: () => {
      message.error('Error adding course. Please try again.')
    },
  })
}

export function useDeleteCourse() {
  return useMutation(courseService.remove, {
    onMutate: ({id}) => {
      const previousCourses = queryCache.getQueryData('course') as ICourse

      queryCache.setQueryData(['course'], (previous: ICourse[]) => {
        const newCourses = [...previous]
        const index = newCourses.findIndex(course => course._id === id)

        newCourses.splice(index, 1)

        return newCourses
      })

      return () => queryCache.setQueryData('course', previousCourses)
    },
    onSuccess: () => {
      message.success('Successfully removed course!')
    },
    onError: (err, previousUserData, rollback: any) => {
      rollback()
      message.error('Error removing course. Please try again.')
    },
    onSettled: () => {
      queryCache.refetchQueries('course')
    },
  })
}

export function useEditCourse() {
  return useMutation(courseService.edit, {
    onSuccess: (data, {course: {_id: id}}) => {
      queryCache.setQueryData(['course'], (previous: ICourse[]) => {
        const newCourses = [...previous]
        const index = newCourses.findIndex(course => course._id === id)

        newCourses[index] = data

        return newCourses
      })

      message.success('Successfully edited course!')
    },
    onError: () => {
      message.error('Error editing course. Please try again.')
    },
  })
}
