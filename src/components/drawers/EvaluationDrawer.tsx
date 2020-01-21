import React from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Drawer, DatePicker, Input, Tooltip, Button, Radio, Form } from "antd";
import moment from "moment";
import { ApplicationState } from "store/types";
import { connect, useDispatch } from "react-redux";
import { addEvaluation, editEvaluation } from "store/effects";
import IEvaluation from "interfaces/IEvaluation";
import { evaluationDrawer } from "store/actions";

const { TextArea } = Input;

interface IEvaluationDrawerProps {
  visible?: boolean;
  loading?: boolean;

  //Edit optional Props
  visibleEdit?: boolean;
  evaluation?: IEvaluation;
  setVisibleEdit?: Function;
  index?: number;
}

const EvaluationDrawer: React.FC<IEvaluationDrawerProps> = ({
  visible = false,
  loading = false,
  visibleEdit,
  setVisibleEdit,
  evaluation,
  index
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (evaluation && setVisibleEdit && typeof index === "number") {
        values._id = evaluation._id;
        return dispatch(
          editEvaluation(values as IEvaluation, index, setVisibleEdit)
        );
      }

      dispatch(addEvaluation(values as IEvaluation));
    });
  };

  const onClose = () => {
    setVisibleEdit ? setVisibleEdit(false) : dispatch(evaluationDrawer());
  };

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current < moment().startOf("day");
  };

  return (
    <Drawer
      destroyOnClose={true}
      title={evaluation ? "Edit evaluation" : "Add new evaluation"}
      onClose={onClose}
      visible={evaluation ? visibleEdit : visible}
      width={300}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          subject: evaluation?.subject,
          evaluationType: evaluation?.evaluationType,
          urgency: evaluation?.urgency,
          description: evaluation?.description,
          date: evaluation && moment(evaluation.date)
        }}
        layout="vertical"
      >
        <Form.Item
          name="subject"
          rules={[
            {
              required: true,
              message: "Please input the course name!",
              whitespace: true
            }
          ]}
          label={<span>Course name</span>}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Evaluation"
          name="evaluationType"
          rules={[{ required: true, message: "Please select an evaluation!" }]}
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
              message: "Please select how urgent is your evaluation!"
            }
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
              whitespace: true
            }
          ]}
          label={<span>Description</span>}
        >
          <TextArea
            placeholder="Input details about the evaluation. E.g. pages to read, good sources, ..."
            autoSize
          />
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              type: "object",
              required: true,
              message: "Please select time!"
            }
          ]}
        >
          <DatePicker disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            {evaluation ? "Edit Evaluation" : "Add Evaluation"}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    visible: state.reducer.drawer.evaluation,
    loading: state.reducer.loading.evaluation
  };
};

export default connect(mapStateToProps, null)(EvaluationDrawer);
