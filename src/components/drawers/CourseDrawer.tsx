import React, {useEffect, useCallback, useState, useMemo} from 'react'
import {Drawer, Input, Button, Form, Select, TimePicker} from 'antd'
import moment from 'moment'

import {Weekdays, ICourse, ISchedule} from 'constants/interfaces'
import {toTitleCase, hhmmss} from 'utils'
import {useAddCourse, useEditCourse} from 'features/course/course-hooks'

interface ICourseDrawerProps {
  visible: boolean
  setVisible: Function

  //Edit optional Props
  course?: ICourse
  index?: number
}

/*
  Convert object to : 

  [WEEKDAY]: {
    time: [momentDate, momentDate],
    classroom: ""
  }
*/
function normalizeWeekday(schedule: ISchedule) {
  const weekday: Record<string, any> = {}

  for (const entry of Object.entries(schedule)) {
    const entryValue = entry[1]

    if (entryValue) {
      const [day] = entry

      weekday[day] = {
        time: [
          moment(hhmmss(entryValue.start), 'HH:mm:ss'),
          moment(hhmmss(entryValue.end), 'HH:mm:ss'),
        ],
        classroom: entryValue.classroom,
      }
    }
  }

  return weekday
}

function getSchedule(course?: ICourse) {
  return function () {
    const schedule = course?.schedule
    if (schedule) return Object.keys(schedule)
    return []
  }
}

const CourseDrawer: React.FC<ICourseDrawerProps> = ({
  visible = false,
  setVisible,
  course,
  index,
}) => {
  const [form] = Form.useForm()
  const [selectedDays, setSelectedDays] = useState<string[]>(
    getSchedule(course),
  )

  const [
    addCourse,
    {status: addCourseStatus, reset: resetAddCourse},
  ] = useAddCourse()
  const [
    editCourse,
    {status: editCourseStatus, reset: resetEditCourse},
  ] = useEditCourse()

  const status = course ? editCourseStatus : addCourseStatus

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const schedule: Record<string, any> = {}

      // Convert range moment date to seconds
      values.weekday.forEach((day: string) => {
        const {
          classroom,
          time: [start, end],
        } = values[day]

        const dayValue = {
          classroom,
          start: start.diff(moment().startOf('day'), 'seconds'),
          end: end.diff(moment().startOf('day'), 'seconds'),
        }

        schedule[day] = dayValue
      })

      const newCourse = {name: values.course, schedule}

      if (course && typeof index === 'number') {
        return editCourse({
          course: {
            ...course,
            ...newCourse,
          },
          index,
        })
      }

      addCourse(newCourse)
    })
  }

  const onClose = useCallback(() => {
    resetAddCourse()
    resetEditCourse()
    form.resetFields()
    setVisible(false)
  }, [setVisible, resetAddCourse, resetEditCourse, form])

  const handleSelectedDayChange = (days: string[]) => {
    setSelectedDays(days)
  }

  useEffect(() => {
    // Close drawer after successful operation
    if (status === 'success') onClose()
  }, [status, onClose])

  useEffect(() => {
    setSelectedDays(getSchedule(course))
  }, [visible, setSelectedDays, course])

  const weekday = useMemo(() => {
    const schedule = course?.schedule

    if (schedule)
      return {...normalizeWeekday(schedule), days: Object.keys(schedule)}

    return undefined
  }, [course])

  return (
    <Drawer
      destroyOnClose={true}
      title={course ? 'Edit course' : 'Add new course'}
      onClose={onClose}
      visible={visible}
      width={300}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          ...weekday,
          course: course?.name,
          weekday: weekday?.days,
        }}
        layout="vertical"
      >
        <Form.Item
          name="course"
          rules={[
            {
              required: true,
              message: 'Please input the course name!',
              whitespace: true,
            },
          ]}
          label={<span>Course name</span>}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="weekday"
          label={<span>Repeats</span>}
          rules={[
            {
              required: true,
              message: 'Please input at least one day!',
              type: 'array',
            },
          ]}
        >
          <Select
            onChange={handleSelectedDayChange}
            mode="multiple"
            placeholder="Select day(s) of the week"
          >
            {Object.keys(Weekdays).map(key => (
              <Select.Option key={key} value={(Weekdays as any)[key]}>
                {toTitleCase(key)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {!!selectedDays?.length &&
          selectedDays.map(day => (
            <Form.Item key={day} label={<b>{toTitleCase(day)}</b>}>
              <Form.Item
                name={[day, 'time']}
                rules={[
                  {
                    type: 'array',
                    required: true,
                    message: 'Please select time!',
                  },
                ]}
              >
                {/* 
              // @ts-ignore */}
                <TimePicker.RangePicker
                  use12Hours
                  format="HH:mm"
                  minuteStep={15}
                />
              </Form.Item>

              <Form.Item
                name={[day, 'classroom']}
                rules={[
                  {
                    required: true,
                    message: 'Please input the classroom!',
                    whitespace: true,
                  },
                ]}
                noStyle
              >
                <Input placeholder="Classroom" />
              </Form.Item>
            </Form.Item>
          ))}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={status === 'loading'}
            disabled={status === 'loading' || status === 'success'}
          >
            {course ? 'Edit Course' : 'Add Course'}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default CourseDrawer
