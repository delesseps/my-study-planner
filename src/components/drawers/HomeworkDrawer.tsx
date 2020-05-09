import React, { useEffect, useCallback } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Drawer, DatePicker, Input, Tooltip, Button, Radio, Form } from "antd";
import moment from "moment";

import IHomework from "constants/interfaces/IHomework";
import { useHomework } from "features/homework/homework-hooks";

interface IHomeworkDrawerProps {
  visible: boolean;
  setVisible: Function;

  //Edit optional Props
  homework?: IHomework;
  index?: number;
}

const HomeworkDrawer: React.FC<IHomeworkDrawerProps> = ({
  visible,
  setVisible,
  homework,
  index,
}) => {
  const [form] = Form.useForm();
  const {
    add: [addHomework, { status: addHomeworkStatus, reset: addHomeworkReset }],
    edit: [
      editHomework,
      { status: editHomeworkStatus, reset: editHomeworkReset },
    ],
  } = useHomework();

  const status = homework ? editHomeworkStatus : addHomeworkStatus;

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const newHomework: IHomework = { ...values } as any;

      if (homework && typeof index === "number") {
        newHomework._id = homework._id;
        return editHomework({ homework: newHomework, index });
      }

      addHomework(newHomework);
    });
  };

  const onClose = useCallback(() => {
    addHomeworkReset();
    editHomeworkReset();
    form.resetFields();
    setVisible(false);
  }, [addHomeworkReset, editHomeworkReset, setVisible, form]);

  useEffect(() => {
    // Close drawer after successful operation
    if (status === "success") onClose();
  }, [status, onClose]);

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current < moment().startOf("day");
  };

  return (
    <Drawer
      destroyOnClose={true}
      title={homework ? "Edit homework" : "Add new homework"}
      onClose={onClose}
      visible={visible}
      width={300}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          subject: homework?.subject,
          urgency: homework?.urgency,
          description: homework?.description,
          date: homework && moment(homework.date),
        }}
        layout="vertical"
      >
        <Form.Item
          name="subject"
          rules={[
            {
              required: true,
              message: "Please input the course name!",
              whitespace: true,
            },
          ]}
          label={<span>Course name</span>}
        >
          <Input />
        </Form.Item>
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
              message: "Please select how urgent is your homework!",
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
              type: "object",
              required: true,
              message: "Please select time!",
            },
          ]}
          label="Date"
        >
          <DatePicker autoFocus={false} disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={status === "loading"}
            disabled={status === "loading" || status === "success"}
          >
            {homework ? "Edit Homework" : "Add Homework"}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default HomeworkDrawer;
