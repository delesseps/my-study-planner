import React, { useState } from "react";
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

interface ISignUpFormProps {
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

const SignUpForm: React.FC<ISignUpFormProps> = ({ form }) => {
  const { getFieldDecorator } = form;
  const [confirmDirty, setConfirmDirty] = useState<Boolean | any>(false);

  const handleConfirmBlur = (e: React.BaseSyntheticEvent) => {
    const value = e.target.value;
    setConfirmDirty({ confirmDirty: confirmDirty || !!value });
  };

  const compareToFirstPassword = (
    rule: any,
    value: string,
    callback: Function
  ) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("The passwords do not match!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (
    rule: any,
    value: string,
    callback: Function
  ) => {
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  return (
    <StyledForm layout="vertical" onSubmit={e => handleSubmit(e, form)}>
      <Form.Item>
        <Heading>Hello, Student</Heading>
        <SubHeading>
          Enter your details and start your journey with us
        </SubHeading>
      </Form.Item>
      <Form.Item label="E-mail">
        {getFieldDecorator("email", {
          rules: [{ required: true, message: "Please input your email!" }]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="john.doe@gmail.com"
          />
        )}
      </Form.Item>
      <Form.Item label="Password" hasFeedback>
        {getFieldDecorator("password", {
          rules: [
            {
              required: true,
              message: "Please input your password!"
            },
            {
              validator: validateToNextPassword
            }
          ]
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        )}
      </Form.Item>
      <Form.Item label="Confirm Password" hasFeedback>
        {getFieldDecorator("confirm", {
          rules: [
            {
              required: true,
              message: "Please confirm your password!"
            },
            {
              validator: compareToFirstPassword
            }
          ]
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Confirm password"
            onBlur={handleConfirmBlur}
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" size="large" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

const wrappedSignInForm = Form.create()(SignUpForm);

export default wrappedSignInForm;
