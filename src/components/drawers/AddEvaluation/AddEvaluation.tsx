import React, { useState } from "react";
import {
  Drawer,
  Form,
  DatePicker,
  Input,
  Select,
  Tooltip,
  Icon,
  Button
} from "antd";
import moment from "moment";
import { WrappedFormUtils } from "antd/lib/form/Form";

const { Option } = Select;
const { TextArea } = Input;

interface IAddEvaluationProps {
  form: WrappedFormUtils;
}

const AddEvaluation: React.FunctionComponent<IAddEvaluationProps> = ({
  form
}) => {
  const [visible, setVisible] = useState(false);
  const { getFieldDecorator } = form;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      }
    });
  };

  const onClose = () => {
    setVisible(false);
  };

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };

  return (
    <div>
      <Drawer title="Add new evaluation" onClose={onClose} visible={visible}>
        <Form onSubmit={handleSubmit} layout="vertical">
          <Form.Item label={<span>Course name</span>}>
            {getFieldDecorator("courseName", {
              rules: [
                {
                  required: true,
                  message: "Please input the course name!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Evaluation">
            {getFieldDecorator("evaluationType", {
              rules: [
                { required: true, message: "Please select an evaluation!" }
              ]
            })(
              <Select placeholder="Select an evaluation type">
                <Option value="Quiz">Quiz</Option>
                <Option value="Test">Test</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Urgency &nbsp;
                <Tooltip title="How important is this evaluation for you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("urgency", {
              rules: [
                {
                  required: true,
                  message: "Please select how urgent is your evaluation!"
                }
              ]
            })(
              <Select placeholder="Select the urgency">
                <Option value="chill">Chill</Option>
                <Option value="normal">Normal</Option>
                <Option value="important">Important</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label={<span>Description</span>}>
            {getFieldDecorator("description", {
              rules: [
                {
                  required: false,
                  whitespace: true
                }
              ]
            })(
              <TextArea
                placeholder="Input details about the evaluation. E.g. pages to read, good sources, ..."
                autosize
              />
            )}
          </Form.Item>
          <Form.Item label="Date">
            {getFieldDecorator("datePicker", {
              rules: [
                {
                  type: "object",
                  required: true,
                  message: "Please select time!"
                }
              ]
            })(<DatePicker disabledDate={disabledDate} />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Evaluation
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default AddEvaluation;
