import React from "react";
import {
  Drawer,
  Form,
  DatePicker,
  Input,
  Tooltip,
  Icon,
  Button,
  Radio
} from "antd";
import moment from "moment";
import { FormComponentProps } from "antd/lib/form/Form";
import { ApplicationState } from "store/types";
import { connect, useDispatch } from "react-redux";
import { evaluationDrawer } from "store/actions";
import { addEvaluation } from "store/effects";
import IEvaluation from "interfaces/IEvaluation";

const { TextArea } = Input;

interface IAddEvaluationProps extends FormComponentProps {
  visible: boolean;
  loading: boolean;
}

const AddEvaluation: React.FC<IAddEvaluationProps> = ({
  form,
  visible,
  loading
}) => {
  const { getFieldDecorator } = form;
  const dispatch = useDispatch();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values: IEvaluation) => {
      if (!err) {
        dispatch(addEvaluation(values));
      }
    });
  };

  const onClose = () => {
    dispatch(evaluationDrawer());
  };

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current < moment().endOf("day");
  };

  return (
    <Drawer
      destroyOnClose={true}
      title="Add new evaluation"
      onClose={onClose}
      visible={visible}
      width={300}
    >
      <Form onSubmit={handleSubmit} layout="vertical">
        <Form.Item label={<span>Course name</span>}>
          {getFieldDecorator("subject", {
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
            rules: [{ required: true, message: "Please select an evaluation!" }]
          })(
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="quiz">Quiz</Radio.Button>
              <Radio.Button value="test">Test</Radio.Button>
            </Radio.Group>
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
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="chill">Chill</Radio.Button>
              <Radio.Button value="normal">Normal</Radio.Button>
              <Radio.Button value="important">Important</Radio.Button>
            </Radio.Group>
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
          {getFieldDecorator("date", {
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
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Evaluation
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const wrappedAddEvaluation = Form.create()(AddEvaluation);

const mapStateToProps = (state: ApplicationState) => {
  return {
    visible: state.reducer.drawer.evaluation,
    loading: state.reducer.loading.evaluation
  };
};

export default connect(
  mapStateToProps,
  null
)(wrappedAddEvaluation);
