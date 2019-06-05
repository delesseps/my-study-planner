import React from "react";
import { Form, Button, Input, Icon } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";

interface ISignInFormProps {
  form: WrappedFormUtils;
}

const handleSubmit = (e: React.FormEvent, form: WrappedFormUtils): void => {
  e.preventDefault();
  form.validateFields((err, values) => {
    if (!err) {
      console.log("Received values of form: ", values);
    }
  });
};

const SignInForm: React.FC<ISignInFormProps> = ({ form }) => {
  const { getFieldDecorator } = form;

  return (
    <Form onSubmit={e => handleSubmit(e, form)} className="login-form">
      <Form.Item>
        {getFieldDecorator("username", {
          rules: [{ required: true, message: "Please input your username!" }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("password", {
          rules: [{ required: true, message: "Please input your Password!" }]
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item>
        <a className="login-form-forgot" href="">
          Forgot password
        </a>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

const wrappedSignInForm = Form.create()(SignInForm);

export default wrappedSignInForm;
