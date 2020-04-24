import React from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Drawer, Input, Tooltip, Button, Radio, Form } from "antd";
import { ApplicationState } from "store/types";
import { connect, useDispatch } from "react-redux";
import { toDoDrawer } from "store/actions";
import { addToDo } from "store/effects";
import IToDo from "constants/interfaces/IToDo";

interface IToDoDrawerProps {
  visible?: boolean;
  loading?: boolean;
  index?: number;
}

const ToDoDrawer: React.FC<IToDoDrawerProps> = ({
  visible = false,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      dispatch(addToDo(values as IToDo));
    });
  };

  const onClose = () => {
    dispatch(toDoDrawer());
  };

  return (
    <Drawer
      destroyOnClose={true}
      title={"Add new to-do"}
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
              message: "Please input the task name!",
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
              message: "Please select how urgent is your to-do!",
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
            loading={loading}
            disabled={loading}
          >
            Add To-Do
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    visible: state.reducer.drawer.toDo,
    loading: state.reducer.loading.toDo,
  };
};

export default connect(mapStateToProps, null)(ToDoDrawer);
