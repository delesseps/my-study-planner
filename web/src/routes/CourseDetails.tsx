import React from 'react'
import {useParams} from 'react-router'
import {useCourse} from 'features/course/course-hooks'

interface Props {}

const CourseDetails = (props: Props) => {
  const {id} = useParams()
  const {status, data} = useCourse(id)

  // TODO: handle error when fetching
  // TODO: Show loading with skeleton

  return (
    <div>
      <h1>{data?.name}</h1>
    </div>
  )
}

export default CourseDetails
