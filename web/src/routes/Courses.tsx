import React from 'react'
import styled from 'styled-components'
import {Skeleton, Empty, Button} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {getLuminance} from 'polished'
import QueueAnim from 'rc-queue-anim'

import {useCourses} from 'features/course/course-hooks'
import {breakpoints} from 'theme'

const CourseDrawer = React.lazy(() => import('components/drawers/CourseDrawer'))

const coursesColors = [
  '#0068ff',
  '#cf74ff',
  '#ed7071',
  '#fadb39',
  '#985E2B',
  '#ecf1fa',
]

function getColor(text: string) {
  const textCode = text.charCodeAt(0) // Get string ASCII code
  const index = textCode % (coursesColors.length - 1)
  return coursesColors[index]
}

const Courses = () => {
  const {data: courses, status} = useCourses()
  const [openDrawer, toggleDrawer] = React.useState(false)

  if (status === 'loading') {
    return (
      <Placeholder.Wrapper data-testid="course-skeleton">
        <Placeholder.Item active />
        <Placeholder.Item active />
      </Placeholder.Wrapper>
    )
  }

  return (
    <Styles.Wrapper>
      <CourseDrawer visible={openDrawer} setVisible={toggleDrawer} />
      {courses === undefined || !courses.length ? (
        <Card.Empty
          description={
            <span>
              <b>No courses found.</b> <br /> Start adding by clicking the plus
              sign below.
            </span>
          }
        />
      ) : (
        <Styles.Courses duration={[450, 0]} interval={[100, 0]}>
          {courses.map(({_id, name, schedule}) => (
            <Course.Wrapper bgColor={getColor(name)} key={_id}>
              <Course.Header>
                <Course.Name>{name}</Course.Name>
                <Course.Days>
                  {Object.keys(schedule).map(day => (
                    <Course.Day key={day}>{day.toLowerCase()}</Course.Day>
                  ))}
                </Course.Days>
              </Course.Header>
              <Button type="primary">View Course</Button>
            </Course.Wrapper>
          ))}
        </Styles.Courses>
      )}
      <Styles.AddCourse
        key={'add-button'}
        aria-label="Open add course"
        type="primary"
        shape="circle"
        onClick={() => toggleDrawer(true)}
        icon={<PlusOutlined />}
        size="large"
      />
    </Styles.Wrapper>
  )
}

const Styles = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4rem;
  `,
  AddCourse: styled(Button)`
    margin-top: 2rem;
  `,
  Courses: styled(QueueAnim)`
    & > *:not(:last-child) {
      margin-bottom: 2rem;
    }
  `,
}

const Course = {
  Wrapper: styled.div<{bgColor: string}>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 40rem;

    padding: 2.5rem;
    background-color: ${({bgColor}) => bgColor};

    box-shadow: ${({theme}) => theme.shadow1}

    color: ${({bgColor}) => {
      const luminance = getLuminance(bgColor)

      // Determine if text color should be black or white by its luminance
      if (luminance > Math.sqrt(1.05 * 0.05) - 0.05) return '#000'
      else return '#fff'
    }};
    border-radius: 8px;
  `,
  Header: styled.header`
    display: flex;
    flex-direction: column;
    margin-right: 3rem;
  `,
  Name: styled.h1`
    color: inherit;
    font-weight: 900;
    font-size: 1.9rem;
    margin: 0;
  `,
  Days: styled.div`
    display: flex;
    margin-top: 0.5rem;

    & > *:not(:last-child) {
      margin-right: 1rem;
    }
  `,
  Day: styled.p`
    color: inherit;
    text-transform: capitalize;
    margin: 0;
  `,
}

const Card = {
  Empty: styled(Empty)`
    margin: 4rem 0;

    color: ${({theme}) => theme.fontColors.textRgba(0.8)};
  `,
}

const Placeholder = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    margin: 4rem 0;
    align-items: center;
  `,
  Item: styled(Skeleton.Button)`
    &&& {
      width: 47rem;
    }

    min-height: 12rem;

    @media only screen and (max-width: ${breakpoints.bpMobileM}) {
      &&& {
        width: 100%;
      }
    }

    @media only screen and (max-width: ${breakpoints.bpMobileS}) {
      &&& {
        width: 95vw;
      }
    }

    &:not(:last-child) {
      margin-bottom: 2.5rem;
    }
  `,
}

export default Courses
