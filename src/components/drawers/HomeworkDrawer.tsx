import React from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Drawer, DatePicker, Input, Tooltip, Button, Radio, Form } from "antd";
import moment from "moment";
import { ApplicationState } from "store/types";
import { connect, useDispatch } from "react-redux";
import { homeworkDrawer } from "store/actions";
import IHomework from "interfaces/IHomework";
import { addHomework, editHomework } from "store/effects";

const { TextArea } = Input;

interface IHomeworkDrawerProps {
  visible?: boolean;
  loading?: boolean;

  //Edit optional Props
  visibleEdit?: boolean;
  homework?: IHomework;
  setVisibleEdit?: Function;
  index?: number;
}

const HomeworkDrawer: React.FC<IHomeworkDrawerProps> = ({
  visible = false,
  loading = false,
  visibleEdit,
  setVisibleEdit,
  homework,
  index
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (homework && setVisibleEdit && typeof index === "number") {
        values._id = homework._id;
        return dispatch(
          editHomework(values as IHomework, index, setVisibleEdit)
        );
      }

      dispatch(addHomework(values as IHomework));
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
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          subject: homework?.subject,
          urgency: homework?.urgency,
          description: homework?.description,
          date: homework && moment(homework.date)
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
              message: "Please select how urgent is your homework!"
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
              message: "Please select time!"
            }
          ]}
          label="Date"
        >
          <DatePicker autoFocus={false} disabledDate={disabledDate} />
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

const mapStateToProps = (state: ApplicationState) => {
  return {
    visible: state.reducer.drawer.homework,
    loading: state.reducer.loading.homework
  };
};

export default connect(mapStateToProps, null)(HomeworkDrawer);
