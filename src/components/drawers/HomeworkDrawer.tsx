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
import { homeworkDrawer } from "store/actions";
import IHomework from "interfaces/IHomework";
import { addHomework, editHomework } from "store/effects";

const { TextArea } = Input;

interface IHomeworkDrawerProps extends FormComponentProps {
  visible?: boolean;
  loading?: boolean;

  //Edit optional Props
  visibleEdit?: boolean;
  homework?: IHomework;
  setVisibleEdit?: Function;
  index?: number;
}

const HomeworkDrawer: React.FC<IHomeworkDrawerProps> = ({
  form,
  visible = false,
  loading = false,
  visibleEdit,
  setVisibleEdit,
  homework,
  index
}) => {
  const { getFieldDecorator } = form;
  const dispatch = useDispatch();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values: IHomework) => {
      if (!err) {
        if (homework && setVisibleEdit && typeof index === "number") {
          values._id = homework._id;
          return dispatch(editHomework(values, index, setVisibleEdit));
        }

        dispatch(addHomework(values));
      }
    });
  };

  const onClose = () => {
    setVisibleEdit ? setVisibleEdit(false) : dispatch(homeworkDrawer());
  };

  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current < moment().startOf("day");
  };

  return (
    <Drawer
      destroyOnClose={true}
      title={homework ? "Edit homework" : "Add new homework"}
      onClose={onClose}
      visible={homework ? visibleEdit : visible}
      width={300}
    >
      <Form onSubmit={handleSubmit} layout="vertical">
        <Form.Item label={<span>Course name</span>}>
          {getFieldDecorator("subject", {
            initialValue: homework && homework.subject,
            rules: [
              {
                required: true,
                message: "Please input the course name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Urgency &nbsp;
              <Tooltip title="How important is this homework for you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("urgency", {
            initialValue: homework && homework.urgency,
            rules: [
              {
                required: true,
                message: "Please select how urgent is your homework!"
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
            initialValue: homework && homework.description,
            rules: [
              {
                required: false,
                whitespace: true
              }
            ]
          })(
            <TextArea
              placeholder="Input details about the homework. E.g. pages to read, number of exercises, ..."
              autosize
            />
          )}
        </Form.Item>
        <Form.Item label="Date">
          {getFieldDecorator("date", {
            initialValue: homework && moment(homework.date),
            rules: [
              {
                type: "object",
                required: true,
                message: "Please select time!"
              }
            ]
          })(<DatePicker autoFocus={false} disabledDate={disabledDate} />)}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            {homework ? "Edit Homework" : "Add Homework"}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const wrappedEvaluationDrawer = Form.create<IHomeworkDrawerProps>()(
  HomeworkDrawer
);

const mapStateToProps = (state: ApplicationState) => {
  return {
    visible: state.reducer.drawer.homework,
    loading: state.reducer.loading.homework
  };
};

export default connect(
  mapStateToProps,
  null
)(wrappedEvaluationDrawer);
