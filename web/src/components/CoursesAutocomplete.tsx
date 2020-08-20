import React from 'react'
import {useCourses} from 'features/course/course-hooks'
import {AutoComplete, Input} from 'antd'
import styled from 'styled-components'

interface AutoCompleteOptions {
  label: React.ReactNode
  options: {key: string; value: string}[]
}

interface Props {
  setAvailableCourses: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >
  [x: string]: any
}

const CourseAutoComplete = ({setAvailableCourses, ...rest}: Props) => {
  const {data: courses} = useCourses()
  const [coursesObject, setCoursesObject] = React.useState<
    Record<string, string>
  >({})

  const autocompleteCourses = React.useMemo(() => {
    if (courses === undefined || !courses.length) {
      return []
    }

    const autocomplete: AutoCompleteOptions = {
      label: <Styles.Label>My Courses</Styles.Label>,
      options: [],
    }

    if (courses) {
      const availableCourses: Record<string, string> = {}

      autocomplete.options = courses.map(course => {
        availableCourses[course.name] = course._id

        return {
          key: course._id,
          value: course.name,
        }
      })

      setCoursesObject(availableCourses)
    }

    return [autocomplete]
  }, [courses])

  React.useEffect(() => {
    setAvailableCourses(coursesObject)
  }, [coursesObject, setAvailableCourses])

  return (
    <AutoComplete
      options={autocompleteCourses}
      filterOption={(inputValue, option) => {
        if (option?.value) {
          return (
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          )
        }
      }}
      {...(rest as any)}
    >
      <Styles.Input placeholder="Search or add your own course" />
    </AutoComplete>
  )
}

const Styles = {
  Label: styled.span`
    color: ${({theme}) => theme.fontColors.textRgba(0.8)};
  `,
  Input: styled(Input.Search)`
    background-color: ${({theme}) => theme.panelBackgroundColor};

    & svg {
      fill: ${({theme}) => theme.fontColors.textRgba(0.8)};
    }
  `,
}

export default CourseAutoComplete
