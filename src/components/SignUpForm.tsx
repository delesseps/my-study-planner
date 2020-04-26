import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Alert, Form } from "antd";
import styled from "styled-components";
import { AxiosError } from "axios";

import ISignUpCredentials from "constants/interfaces/ISignUpCredentials";
import { breakpoints } from "theme";
import { FadeIn } from "components";
import { useAuth } from "features/auth/auth-context";

const SignUpForm: React.FC = () => {
  const [form] = Form.useForm();
  const [confirmDirty, setConfirmDirty] = useState<Boolean | any>(false);
  const {
    register: [registerMutate, { status, error }],
  } = useAuth();

  const handleSubmit = (): void => {
    form.validateFields().then((credentials) => {
      registerMutate(credentials as ISignUpCredentials);
    });
  };

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
      form.validateFields(["confirm"]);
    }
    callback();
  };

  const errorCode = (error as AxiosError)?.response?.status;

  return (
    <StyledForm form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item>
        <Heading>Hello, Student</Heading>
        <SubHeading>
          Enter your details and start your journey with us
        </SubHeading>
      </Form.Item>
      {errorCode && (
        <FadeIn>
          <Form.Item>
            <Alert
              message="User already exists. Please try again with a different email."
              type="error"
              showIcon
              closable
            />
          </Form.Item>
        </FadeIn>
      )}
      <Form.Item
        label="Full Name"
        name="name"
        rules={[{ required: true, message: "Please input your full name!" }]}
      >
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="John Doe"
        />
      </Form.Item>
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="john.doe@gmail.com"
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          {
            validator: validateToNextPassword,
          },
          {
            min: 6,
            message: "Password must have a minimum of 6 characters.",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirm"
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          {
            validator: compareToFirstPassword,
          },
          {
            min: 6,
            message: "Password must have a minimum of 6 characters.",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="Confirm password"
          onBlur={handleConfirmBlur}
        />
      </Form.Item>
      <Form.Item>
        <Button
          data-testid="submit"
          loading={status === "loading"}
          type="primary"
          size="large"
          htmlType="submit"
        >
          Sign Up
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

const StyledForm = styled(Form)`
  width: 100%;

  @media only screen and (max-width: ${breakpoints.bpLargest}) {
    & .ant-form-item {
      margin-bottom: 0.8rem;
    }
  }
`;

const Heading = styled.h1`
  font-weight: bold;
  font-size: 3.6rem;
  color: ${(props) => props.theme.fontColors.text};
`;

const SubHeading = styled.h3`
  font-weight: 600;
  color: ${(props) => props.theme.fontColors.textRgba(0.6)};
`;

export default SignUpForm;
