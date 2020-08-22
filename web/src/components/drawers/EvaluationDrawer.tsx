import React from 'react'
import {QuestionCircleOutlined} from '@ant-design/icons'
import {Drawer, DatePicker, Input, Tooltip, Button, Radio, Form} from 'antd'
import moment from 'moment'

import IEvaluation from 'constants/interfaces/IEvaluation'
import {useEvaluations} from 'features/evaluation/evaluation-hooks'
import {CourseAutocomplete} from 'components'

interface IEvaluationDrawerProps {
  visible: boolean
  setVisible: Function

  //Edit optional Props
  evaluation?: IEvaluation
  index?: number
}

const EvaluationDrawer: React.FC<IEvaluationDrawerProps> = ({
  visible = false,
  setVisible,
  evaluation,
  index,
}) => {
  const [form] = Form.useForm()
  const {
    add: [
      addEvaluationMutate,
      {status: addEvaluationStatus, reset: addEvaluationReset},
    ],
    edit: [
      editEvaluationMutate,
      {status: editEvaluationStatus, reset: editEvaluationReset},
    ],
  } = useEvaluations()

  const [availableCourses, setAvailableCourses] = React.useState<
    Record<string, string>
  >({})
  const [showAddToCourse, setShowAddToCourse] = React.useState(false)

  const status = evaluation ? editEvaluationStatus : addEvaluationStatus
  const canLink = (!evaluation || !evaluation.linked) && showAddToCourse

  const handleSubmit = () => {
    form.validateFields().then(values => {
      values.course =
        values.shouldAddToCourse === 'yes'
          ? availableCourses[values.courseName]
          : undefined
      values.shouldAddToCourse = undefined

      const newEvaluation: IEvaluation = {
        ...values,
        name: values.courseName,
        courseName: undefined,
      } as any

      if (evaluation && typeof index === 'number') {
        newEvaluation._id = evaluation._id
        return editEvaluationMutate({evaluation: newEvaluation, index})
      }

      addEvaluationMutate(newEvaluation)
    })
  }

  const onClose = React.useCallback(() => {
    addEvaluationReset()
    editEvaluationReset()
    setShowAddToCourse(false)
    form.resetFields()
    setVisible(false)
  }, [addEvaluationReset, editEvaluationReset, setVisible, form])

  React.useEffect(() => {
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
      const subject = form.getFieldValue('courseName')

      if (availableCourses[subject]) {
        setShowAddToCourse(true)
      } else {
        setShowAddToCourse(false)
      }
    }
  }

  return (
    <Drawer
      destroyOnClose={true}
      title={evaluation ? 'Edit evaluation' : 'Add new evaluation'}
      onClose={onClose}
      visible={visible}
      width={300}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          courseName: evaluation?.name,
          evaluationType: evaluation?.evaluationType,
          urgency: evaluation?.urgency,
          description: evaluation?.description,
          date: evaluation && moment(evaluation.date),
          shouldAddToCourse: 'yes',
        }}
        layout="vertical"
        onFieldsChange={handleFieldChange}
      >
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
            disabled={evaluation?.linked}
            setAvailableCourses={setAvailableCourses}
          />
        </Form.Item>
        {canLink && (
          <Form.Item
            name="shouldAddToCourse"
            label={
              <span>
                Add to Course &nbsp;
                <Tooltip title="Add the evaluation to the course. If there are course members, it will be public for them.">
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
          label="Evaluation"
          name="evaluationType"
          rules={[{required: true, message: 'Please select an evaluation!'}]}
        >
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="quiz">Quiz</Radio.Button>
            <Radio.Button value="test">Test</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label={
            <span>
              Urgency &nbsp;
              <Tooltip title="How important is this evaluation for you?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          name="urgency"
          rules={[
            {
              required: true,
              message: 'Please select how urgent is your evaluation!',
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
            placeholder="Input details about the evaluation. E.g. pages to read, good sources, ..."
            autoSize
          />
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              type: 'object',
              required: true,
              message: 'Please select time!',
            },
          ]}
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
            {evaluation ? 'Edit Evaluation' : 'Add Evaluation'}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default EvaluationDrawer
