import React, {useEffect, useCallback} from 'react'
import {QuestionCircleOutlined} from '@ant-design/icons'
import {Drawer, Input, Tooltip, Button, Radio, Form} from 'antd'

import IToDo from 'constants/interfaces/IToDo'
import {useToDo} from 'features/toDo/toDo-hooks'

interface IToDoDrawerProps {
  visible: boolean
  setVisible: Function
}

const ToDoDrawer: React.FC<IToDoDrawerProps> = ({visible, setVisible}) => {
  const [form] = Form.useForm()
  const {
    add: [toDoMutate, {reset: toDoMutateReset, status}],
  } = useToDo()

  const handleSubmit = () => {
    form.validateFields().then(values => {
      toDoMutate(values as IToDo)
    })
  }

  const onClose = useCallback(() => {
    toDoMutateReset()
    form.resetFields()
    setVisible(false)
  }, [setVisible, form, toDoMutateReset])

  useEffect(() => {
    // Close drawer after successful operation
    if (status === 'success') onClose()
  }, [status, onClose])

  return (
    <Drawer
      destroyOnClose={true}
      title={'Add new to-do'}
      onClose={onClose}
      visible={visible}
      width={300}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="task"
          rules={[
            {
              required: true,
              message: 'Please input the task name!',
              whitespace: true,
            },
          ]}
          label={<span>Task name</span>}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <span>
              Urgency &nbsp;
              <Tooltip title="How important is this task for you?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          name="urgency"
          rules={[
            {
              required: true,
              message: 'Please select how urgent is your to-do!',
            },
          ]}
        >
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="chill">Chill</Radio.Button>
            <Radio.Button value="normal">Normal</Radio.Button>
            <Radio.Button value="important">Important</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={status === 'loading'}
            disabled={status === 'loading' || status === 'success'}
          >
            Add To-Do
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default ToDoDrawer
