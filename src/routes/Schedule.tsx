import React, {useState, useCallback, useMemo} from 'react'
import styled, {keyframes, DefaultTheme} from 'styled-components'
import QueueAnim from 'rc-queue-anim'
import {Button, Skeleton, Tooltip, Popconfirm, Empty} from 'antd'
import {
  EnvironmentOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import {useWindowSize} from 'react-use'

import {Weekdays, ICourse} from 'constants/interfaces/course'
import {useCourses, useDeleteCourse} from 'features/course/course-hooks'
import {hhmmss, toTitleCase} from 'utils'
import {breakpoints} from 'theme'

const CourseDrawer = React.lazy(() => import('components/drawers/CourseDrawer'))

const days = ([...Object.values(Weekdays)] as any) as Weekdays[]

const Schedule: React.FC = () => {
  const [openDrawer, toggleDrawer] = useState(false)
  const {width} = useWindowSize()

  const [currentDay, setCurrentDay] = useState<Weekdays>(
    days[new Date().getDay()],
  )

  const WeekdayTab = useCallback(
    ({day, children}: {day: Weekdays; children: string}) => {
      const changeDay = (day: Weekdays) => () => {
        setCurrentDay(day)
      }

      return (
        <Styles.Tab
          className={currentDay === day ? 'active' : ''}
          data-testid={currentDay === day ? 'active' : ''}
          onClick={changeDay(day)}
        >
          {children}
        </Styles.Tab>
      )
    },
    [currentDay],
  )
  const isMobile = width <= 425
  return (
    <Styles.Wrapper>
      <CourseDrawer visible={openDrawer} setVisible={toggleDrawer} />
      <Styles.Tabs>
        {days.map(day => (
          <WeekdayTab key={day} day={day}>
            {isMobile
              ? toTitleCase(day).slice(0, 2)
              : toTitleCase(day).slice(0, 3)}
          </WeekdayTab>
        ))}
      </Styles.Tabs>
      <Courses currentDay={currentDay} />
      <Button
        key={'add-button'}
        aria-label="Add course"
        data-testid="add-course"
        type="primary"
        shape="circle"
        onClick={() => toggleDrawer(true)}
        icon={<PlusOutlined />}
        size="large"
      />
    </Styles.Wrapper>
  )
}

const Courses = ({currentDay}: {currentDay: Weekdays}) => {
  const {data: courses, status} = useCourses()

  const currentDayCourses = useMemo(() => {
    return courses
      ?.sort((a, b) => {
        const scheduleA = a.schedule[currentDay]
        const scheduleB = b.schedule[currentDay]

        if (scheduleA && scheduleB) {
          return scheduleA.start - scheduleB.start
        }

        return 0
      })
      .filter(course => course.schedule[currentDay])
  }, [currentDay, courses])

  if (status === 'loading') {
    return (
      <Placeholder.Wrapper data-testid="course-skeleton">
        <Placeholder.Item active />
        <Placeholder.Item active />
      </Placeholder.Wrapper>
    )
  }

  if (!currentDayCourses?.length) {
    return (
      <Card.Empty
        description={
          <span>
            <b>No courses found.</b> <br /> Start adding by clicking the plus
            sign below.
          </span>
        }
      />
    )
  }

  return (
    <Styles.Body>
      {currentDayCourses?.map((course, courseIndex) => {
        if (course.schedule[currentDay]) {
          return (
            <Course
              key={course._id}
              index={courseIndex}
              course={course}
              currentDay={currentDay}
            />
          )
        }
      })}
    </Styles.Body>
  )
}

interface CourseProps {
  index: number
  course: ICourse
  currentDay: Weekdays
}

const Course = React.forwardRef<any, CourseProps>(
  ({index, course, currentDay}, ref) => {
    const [openDrawer, toggleDrawer] = useState(false)
    const [deleteCourse] = useDeleteCourse()

    const handleDeleteCourse = (index: number, id: string) => () => {
      deleteCourse({index, id})
    }

    const handleEditClick = () => {
      toggleDrawer(true)
    }

    const {_id, name, schedule} = course
    const {start, end} = {
      start: schedule[currentDay]?.start,
      end: schedule[currentDay]?.end,
    }
    const startTime = start && hhmmss(start)
    const endTime = end && hhmmss(end)

    return (
      <Card.Wrapper ref={ref}>
        <CourseDrawer
          visible={openDrawer}
          setVisible={toggleDrawer}
          course={course}
          index={index}
        />
        <Card.Schedule>
          <time>
            <b>{startTime}</b>
          </time>
          <b>-</b>
          <time>
            <b>{endTime}</b>
          </time>
        </Card.Schedule>
        <Card.Content>
          <Card.Actions>
            <Tooltip title="Edit" mouseEnterDelay={0.4}>
              <Card.Action
                aria-label="Edit course"
                data-testid="edit-course"
                onClick={handleEditClick}
              >
                <Card.EditIcon />
              </Card.Action>
            </Tooltip>

            <Popconfirm
              title="Are you sure to delete this course?"
              arrowPointAtCenter={true}
              placement="topRight"
              okText="Yes"
              cancelText="No"
              onConfirm={handleDeleteCourse(index, _id)}
            >
              <Tooltip title="Delete" mouseEnterDelay={0.4}>
                <Card.Action aria-label="Delete course">
                  <Card.DeleteIcon data-testid="delete-course" />
                </Card.Action>
              </Tooltip>
            </Popconfirm>
          </Card.Actions>
          <Card.CourseName>{name}</Card.CourseName>
          <CourseLocation.Wrapper>
            <CourseLocation.Icon />
            <CourseLocation.Classroom>
              {schedule[currentDay]?.classroom}
            </CourseLocation.Classroom>
          </CourseLocation.Wrapper>
        </Card.Content>
      </Card.Wrapper>
    )
  },
)

const animations = {
  active: (theme: DefaultTheme) => keyframes`
  from { 
    background-color: transparent;     
  }
  to { 
    background-color: ${theme.colors.main};   
  }
`,
}

const Styles = {
  Wrapper: styled.section`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    padding-top: 2rem;
    overflow-x: hidden;
  `,
  Tabs: styled.div`
    display: flex;
  `,
  Tab: styled.div<{active?: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 6rem;

    @media only screen and (max-width: ${breakpoints.bpMedium}) {
      font-size: 1.9rem;
      margin: 0 2rem;
    }

    @media only screen and (max-width: ${breakpoints.bpMobileL}) {
      margin: 0 1rem;
      width: 4rem;
    }

    @media only screen and (max-width: ${breakpoints.bpMobileS}) {
      margin: 0 0.5rem;
    }

    padding: 1.3rem 0.7rem;
    margin: 0 3.5rem;

    border-radius: 4px;

    font-size: 2.2rem;
    font-weight: 500;
    color: ${({theme}) => theme.fontColors.text};

    cursor: pointer;

    transition: 0.2s ease-out;

    &:not(.active):hover {
      background-color: ${({theme}) => theme.colors.mainRgba(0.1)};
    }

    &.active {
      color: white;
      animation: ${({theme}) => animations.active(theme)} 0.3s ease-out forwards;
    }
  `,
  Body: styled(QueueAnim)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: 4rem 0;
  `,
}

const Card = {
  Wrapper: styled.div`
    display: flex;
    position: relative;

    border-radius: ${({theme}) => theme.borderRadius};

    background-color: ${({theme}) => theme.panelBackgroundColor};

    width: 47rem;

    @media only screen and (max-width: ${breakpoints.bpMobileM}) {
      width: 95vw;
    }

    box-shadow: ${({theme}) => theme.shadow1};

    &:not(:last-child) {
      margin-bottom: 2.5rem;
    }
  `,
  Schedule: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 2rem 3rem;

    color: white;
    font-weight: 500;
    font-size: 1.2rem;

    border-top-left-radius: ${({theme}) => theme.borderRadius};
    border-bottom-left-radius: ${({theme}) => theme.borderRadius};

    background-color: ${({theme}) => theme.colors.main};
  `,
  Content: styled.div`
    width: 100%;

    padding: 2.5rem 4rem;
  `,
  CourseName: styled.h1`
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: 0.6px;

    @media only screen and (max-width: ${breakpoints.bpMobileS}) {
      font-size: 2rem;
    }

    color: ${({theme}) => theme.fontColors.text};
  `,
  Actions: styled.div`
    position: absolute;

    bottom: 1.3rem;
    right: 1rem;

    & > *:not(:last-child) {
      margin-right: 1rem;
    }
  `,
  Action: styled.button`
    border: none;
    background: transparent;

    outline: none;
  `,
  EditIcon: styled(EditOutlined)`
    cursor: pointer;
    font-size: 1.9rem;
    transition: color 0.1s;

    &:hover {
      color: ${props => props.theme.colors.main};
    }
  `,
  DeleteIcon: styled(DeleteOutlined)`
    cursor: pointer;
    font-size: 1.9rem;
    transition: color 0.1s;

    &:hover {
      color: ${props => props.theme.colors.main};
    }
  `,

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

const CourseLocation = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;

    & > *:not(:last-child) {
      margin-right: 0.6rem;
    }
  `,
  Classroom: styled.span`
    font-size: 1.2rem;
    letter-spacing: 0.6px;
    font-weight: 600;
    text-transform: uppercase;
  `,
  Icon: styled(EnvironmentOutlined)`
    font-size: 1.8rem;
  `,
}

export default Schedule
