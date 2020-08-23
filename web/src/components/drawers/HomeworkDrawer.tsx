import React, {useEffect, useCallback} from 'react'
import {QuestionCircleOutlined} from '@ant-design/icons'
import {Drawer, DatePicker, Input, Tooltip, Button, Radio, Form} from 'antd'
import moment from 'moment'

import IHomework from 'constants/interfaces/IHomework'
import {useHomework} from 'features/homework/homework-hooks'
import {CourseAutocomplete} from 'components'

interface IHomeworkDrawerProps {
  visible: boolean
  setVisible: Function

  //Edit optional Props
  homework?: IHomework
  index?: number
}

const HomeworkDrawer: React.FC<IHomeworkDrawerProps> = ({
  visible,
  setVisible,
  homework,
  index,
}) => {
  const [form] = Form.useForm()
  const {
    add: [addHomework, {status: addHomeworkStatus, reset: addHomeworkReset}],
    edit: [
      editHomework,
      {status: editHomeworkStatus, reset: editHomeworkReset},
    ],
  } = useHomework()

  const [availableCourses, setAvailableCourses] = React.useState<
    Record<string, string>
  >({})
  const [showAddToCourse, setShowAddToCourse] = React.useState(false)

  const status = homework ? editHomeworkStatus : addHomeworkStatus
  const canLink = (!homework || !homework.linked) && showAddToCourse

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const isExistingCourse = values.shouldAddToCourse === 'yes'

      values.course = {
        details: isExistingCourse
          ? availableCourses[values.courseName]
          : undefined,
        name: isExistingCourse ? '' : values.courseName,
      }
      values.shouldAddToCourse = undefined

      const newHomework: IHomework = {
        ...values,
        name: values.homeworkName,
        homeworkName: undefined,
        courseName: undefined,
      } as any

      if (homework && typeof index === 'number') {
        newHomework._id = homework._id

        return editHomework({homework: newHomework, index})
      }

      addHomework(newHomework)
    })
  }

  const onClose = useCallback(() => {
    addHomeworkReset()
    editHomeworkReset()
    setShowAddToCourse(false)
    form.resetFields()
    setVisible(false)
  }, [addHomeworkReset, editHomeworkReset, setVisible, form])

  useEffect(() => {
    // Close drawer after successful operation
    if (status === 'success') onClose()
  }, [status, onClose])

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current < moment().startOf('day')
  }

  const handleFieldChange = (changedFields: any) => {
    const fieldName = changedFields[0]?.name[0]

    if (fieldName === 'courseName') {
      const courseName = form.getFieldValue('courseName')

      if (availableCourses[courseName]) {
        setShowAddToCourse(true)
      } else {
        setShowAddToCourse(false)
      }
    }
  }

  return (
    <Drawer
      destroyOnClose={true}
      title={homework ? 'Edit homework' : 'Add new homework'}
      onClose={onClose}
      visible={visible}
      width={300}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          homeworkName: homework?.name,
          courseName: homework?.course.name || homework?.course.details?.name,
          urgency: homework?.urgency,
          description: homework?.description,
          date: homework && moment(homework.date),
          shouldAddToCourse: 'yes',
        }}
        layout="vertical"
        onFieldsChange={handleFieldChange}
      >
        <Form.Item
          name="homeworkName"
          rules={[
            {
              required: true,
              message: 'Please input the name of the homework!',
              whitespace: true,
            },
          ]}
          label={<span>Name</span>}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="courseName"
          rules={[
            {
              required: true,
              message: 'Please input the course name!',
              whitespace: true,
            },
          ]}
          label={<span>Course name</span>}
        >
          <CourseAutocomplete
            disabled={homework?.linked}
            setAvailableCourses={setAvailableCourses}
          />
        </Form.Item>
        {canLink && (
          <Form.Item
            name="shouldAddToCourse"
            label={
              <span>
                Add to Course &nbsp;
                <Tooltip title="Add the homework to the course. If there are course members, it will be public for them.">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={'yes'}>Yes</Radio.Button>
              <Radio.Button value={'no'}>No</Radio.Button>
            </Radio.Group>
          </Form.Item>
        )}
        <Form.Item
          label={
            <span>
              Urgency &nbsp;
              <Tooltip title="How important is this homework for you?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          name="urgency"
          rules={[
            {
              required: true,
              message: 'Please select how urgent is your homework!',
            },
          ]}
        >
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="chill">Chill</Radio.Button>
            <Radio.Button value="normal">Normal</Radio.Button>
            <Radio.Button value="important">Important</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            {
              required: false,
              whitespace: true,
            },
          ]}
          label={<span>Description</span>}
        >
          <Input.TextArea
            placeholder="Input details about the homework. E.g. pages to read, number of exercises, ..."
            autoSize
          />
        </Form.Item>
        <Form.Item
          name="date"
          rules={[
            {
              type: 'object',
              required: true,
              message: 'Please select date!',
            },
          ]}
          label="Date"
        >
          <DatePicker data-testid="date-picker" disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={status === 'loading'}
            disabled={status === 'loading' || status === 'success'}
          >
            {homework ? 'Edit Homework' : 'Add Homework'}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default HomeworkDrawer
