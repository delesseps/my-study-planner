import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Checkbox, Alert, Form } from "antd";
import styled from "styled-components";
import { Dispatch } from "redux";
import { signIn } from "store/effects";
import ISignInCredentials from "interfaces/ISignInCredentials";
import { connect } from "react-redux";
import { breakpoints } from "theme";
import { ApplicationState } from "store/types";
import IRequestError from "interfaces/IRequestError";
import { FadeIn } from "components";
import { Link } from "react-router-dom";

const mapStateToProps = (state: ApplicationState) => {
  return {
    loading: state.reducer.loading.signIn,
    error: state.reducer.error.signIn
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    signIn: (credentials: ISignInCredentials) =>
      dispatch<any>(signIn(credentials))
  };
};

interface ISignInFormProps {
  signIn: Function;
  loading: boolean;
  error: IRequestError | undefined;
}

const SignInForm: React.FC<ISignInFormProps> = ({ signIn, loading, error }) => {
  const [form] = Form.useForm();

  const handleSubmit = (): void => {
    form.validateFields().then(credentials => {
      signIn(credentials as ISignInCredentials);
    });
  };

  return (
    <StyledForm
      form={form}
      layout="vertical"
      initialValues={{ remember: false }}
      onFinish={handleSubmit}
    >
      <Form.Item>
        <Heading>Welcome back</Heading>
        <SubHeading>Continue where you left off</SubHeading>
      </Form.Item>
      {error && (
        <FadeIn>
          <Form.Item>
            <Alert
              message="Incorrect e-mail or password."
              type="error"
              showIcon
              closable
            />
          </Form.Item>
        </FadeIn>
      )}
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          {
            type: "email",
            message: "The input is not valid E-mail!"
          }
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
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked">
        <OptionsWrapper>
          <Checkbox>Remember me</Checkbox>
          <ForgotPassword to="/forgot_password">
            Forgot password?
          </ForgotPassword>
        </OptionsWrapper>
      </Form.Item>
      <Form.Item>
        <Button
          data-testid="submit"
          loading={loading}
          type="primary"
          size="large"
          htmlType="submit"
        >
          Sign In
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
  color: ${props => props.theme.fontColors.text};
`;

const SubHeading = styled.h3`
  font-weight: 600;
  color: ${props => props.theme.fontColors.textRgba(0.6)};
`;

const OptionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: ${breakpoints.bpMobileS}) {
    flex-direction: column;

    & > *:first-child {
      margin-bottom: 1rem;
    }
  }
`;

const ForgotPassword = styled(Link)`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
