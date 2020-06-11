import React from 'react'
import {useCourses} from 'features/course/course-hooks'
import {AutoComplete, Input} from 'antd'
import styled from 'styled-components'

const CourseAutoComplete = (props: any) => {
  const {data: courses} = useCourses()
  const autocompleteCourses = React.useMemo(() => {
    if (courses === undefined || !courses.length) {
      return []
    }

    const autocomplete: {
      label: string | React.ReactNode
      options: {key: string; value: string}[]
    } = {
      label: <Styles.Label>My Courses</Styles.Label>,
      options: [],
    }

    if (courses)
      autocomplete.options = courses.map(course => ({
        key: course._id,
        value: course.name,
      }))

    return [autocomplete]
  }, [courses])
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
      {...props}
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
