import React from "react";
import { Form, Button, Input, Icon, Checkbox } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import styled from "styled-components";

const StyledForm = styled(Form)`
  width: 100%;
`;

const Heading = styled.h1`
  font-weight: bold;
  font-size: 3.6rem;
  color: ${props => props.theme.fontColors.black};
`;

const SubHeading = styled.h3`
  font-weight: 600;
  color: ${props => props.theme.fontColors.blackRgba(0.6)};
`;

const OptionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ForgotPassword = styled.p`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

interface ISignInFormProps {
  form: WrappedFormUtils;
}

const handleSubmit = (e: React.FormEvent, form: WrappedFormUtils): void => {
  e.preventDefault();
  form.validateFields((err, values: { email: string; password: string }) => {
    if (!err) {
      console.log("Received values of form: ", values);
    }
  });
};

const SignInForm: React.FC<ISignInFormProps> = ({ form }) => {
  const { getFieldDecorator } = form;

  return (
    <StyledForm layout="vertical" onSubmit={e => handleSubmit(e, form)}>
      <Form.Item>
        <Heading>Welcome back</Heading>
        <SubHeading>Continue where you left off</SubHeading>
      </Form.Item>
      <Form.Item label="Email">
        {getFieldDecorator("email", {
          rules: [{ required: true, message: "Please input your email!" }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="john.doe@gmail.com"
          />
        )}
      </Form.Item>
      <Form.Item label="Password">
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
        <OptionsWrapper>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <ForgotPassword>Forgot password?</ForgotPassword>
        </OptionsWrapper>
      </Form.Item>
      <Form.Item>
        <Button type="primary" size="large" htmlType="submit">
          Sign In
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

const wrappedSignInForm = Form.create()(SignInForm);

export default wrappedSignInForm;
