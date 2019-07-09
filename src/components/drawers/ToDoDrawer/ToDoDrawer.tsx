import React from "react";
import { Drawer, Form, Input, Tooltip, Icon, Button, Radio } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import { ApplicationState } from "store/types";
import { connect, useDispatch } from "react-redux";
import { toDoDrawer } from "store/actions";
import IHomework from "interfaces/IHomework";

interface IToDoDrawerProps extends FormComponentProps {
  visible: boolean;
  loading: boolean;
  index?: number;
}

const ToDoDrawer: React.FC<IToDoDrawerProps> = ({ form, visible, loading }) => {
  const { getFieldDecorator } = form;
  const dispatch = useDispatch();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values: IHomework) => {
      if (!err) {
      }
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
      <Form onSubmit={handleSubmit} layout="vertical">
        <Form.Item label={<span>Task name</span>}>
          {getFieldDecorator("task", {
            rules: [
              {
                required: true,
                message: "Please input the task name!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Urgency &nbsp;
              <Tooltip title="How important is this task for you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("urgency", {
            rules: [
              {
                required: true,
                message: "Please select how urgent is your to-do!"
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

const wrappedToDoDrawer = Form.create<IToDoDrawerProps>()(ToDoDrawer);

const mapStateToProps = (state: ApplicationState) => {
  return {
    visible: state.reducer.drawer.toDo,
    loading: state.reducer.loading.toDo
  };
};

export default connect(
  mapStateToProps,
  null
)(wrappedToDoDrawer);
