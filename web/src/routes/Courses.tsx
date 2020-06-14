import React from 'react'
import styled from 'styled-components'
import {Skeleton, Empty, Button} from 'antd'
import {PlusOutlined} from '@ant-design/icons'

import {useCourses} from 'features/course/course-hooks'
import {breakpoints} from 'theme'

const CourseDrawer = React.lazy(() => import('components/drawers/CourseDrawer'))

interface Props {}

const Courses = (props: Props) => {
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
        courses.map(course => <div>{course.name}</div>)
      )}
      <Button
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
