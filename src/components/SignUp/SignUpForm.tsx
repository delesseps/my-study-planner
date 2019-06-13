import React, { useState } from "react";
import { Form, Button, Input, Icon, Alert } from "antd";
import { WrappedFormUtils } from "antd/lib/form/Form";
import styled from "styled-components";
import { Dispatch } from "redux";
import { signUp } from "store/effects";
import ISignUpCredentials from "interfaces/ISignUpCredentials";
import { connect } from "react-redux";
import { breakpoints } from "styled";
import { ApplicationState } from "store/types";
import IRequestError from "interfaces/IRequestError";
import FadeIn from "components/FadeIn/FadeIn";

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
  color: ${props => props.theme.fontColors.black};
`;

const SubHeading = styled.h3`
  font-weight: 600;
  color: ${props => props.theme.fontColors.blackRgba(0.6)};
`;

const mapStateToProps = (state: ApplicationState) => {
  return {
    loading: state.reducer.loading.signUp,
    error: state.reducer.error.signUp
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    signUp: (credentials: ISignUpCredentials) =>
      dispatch<any>(signUp(credentials))
  };
};

interface ISignUpFormProps {
  form: WrappedFormUtils;
  signUp: Function;
  loading: boolean;
  error: IRequestError;
}

const SignUpForm: React.FC<ISignUpFormProps> = ({
  form,
  signUp,
  loading,
  error
}) => {
  const { getFieldDecorator } = form;
  const [confirmDirty, setConfirmDirty] = useState<Boolean | any>(false);

  const handleSubmit = (e: React.FormEvent, form: WrappedFormUtils): void => {
    e.preventDefault();
    form.validateFields((err, credentials: ISignUpCredentials) => {
      if (!err) {
        signUp(credentials);
      }
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
      {error && (
        <FadeIn>
          <Form.Item>
            <Alert
              message="User already exists. Please try again with a different email."
              type="error"
              showIcon
            />
          </Form.Item>
        </FadeIn>
      )}
      <Form.Item label="Full name">
        {getFieldDecorator("name", {
          rules: [
            { required: true, message: "Please input your full name!" },
            {
              type: "email",
              message: "The input is not valid E-mail!"
            }
          ]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="John Doe"
          />
        )}
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
        <Button loading={loading} type="primary" size="large" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

const wrappedSignInForm = Form.create()(SignUpForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(wrappedSignInForm);
