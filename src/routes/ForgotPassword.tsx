import * as React from "react";
import { ReactComponent as Logo } from "assets/logo.svg";
import { ReactComponent as SentMessage } from "assets/message_sent.svg";
import styled from "styled-components";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { Form, Button, Input, Icon, Alert } from "antd";
import { Link } from "react-router-dom";
import { recoverPasswordRequest } from "services";
import { FadeIn } from "components";

interface IResetPasswordProps {
  form: WrappedFormUtils;
}

const ForgotPassword: React.FunctionComponent<IResetPasswordProps> = ({
  form
}) => {
  const { getFieldDecorator } = form;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [oauthError, setOauthError] = React.useState(false);

  const handleSubmit = (e: React.FormEvent, form: WrappedFormUtils): void => {
    e.preventDefault();

    setLoading(true);
    setError(false);

    form.validateFields((err, { email }: { email: string }) => {
      if (!err) {
        SendRequest(email);
      } else {
        setLoading(false);
      }
    });
  };

  const SendRequest = async (email: string) => {
    try {
      const response = await recoverPasswordRequest(email);

      if (!response) {
        throw new Error(response);
      }

      setLoading(false);
      setSuccess(true);
    } catch (e) {
      if (e.response.status === 400) {
        setOauthError(true);
        return setLoading(false);
      }

      setLoading(false);
      setError(true);
    }
  };

  return (
    <FadeIn>
      <Wrapper>
        <LogoBox>
          <StyledLogo />
          <Title>My Study Planner</Title>
        </LogoBox>
        {error && (
          <StyledError
            message="Error sending recovery link, is this the right email?"
            type="error"
            showIcon
          />
        )}
        {oauthError && (
          <StyledError
            message="Google linked accounts can not recover a password!"
            type="error"
            showIcon
          />
        )}
        <Card>
          <CardTitle>Reset Password</CardTitle>
          <CardBody>
            {success
              ? "Successfuly sent! Please check your email!"
              : "Please enter your email address below and we'll send you a link to reset your password"}
          </CardBody>
          {success ? (
            <SentMessage />
          ) : (
            <StyledForm layout="vertical" onSubmit={e => handleSubmit(e, form)}>
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [
                    { required: true, message: "Please input your email!" },
                    {
                      type: "email",
                      message: "The input is not valid E-mail!"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Email address"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  loading={loading}
                  block
                  type="primary"
                  size="large"
                  htmlType="submit"
                >
                  Reset Password
                </Button>
              </Form.Item>
            </StyledForm>
          )}
          <LinkWrapper>
            <StyledLink to="/signin">Sign in</StyledLink>
            <h2>or</h2>
            <StyledLink to="/signup">Sign up</StyledLink>
          </LinkWrapper>
        </Card>
      </Wrapper>
    </FadeIn>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 4rem 0;

  min-height: 100vh;

  background-color: ${props => props.theme.colors.main};
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 8rem;
`;

const StyledLogo = styled(Logo)`
  width: 5rem;
  height: 5rem;

  fill: white;

  margin-right: 1rem;
`;

const Title = styled.h1`
  font-weight: 600;
  margin-bottom: 0;
  color: white;
`;

const StyledError = styled(Alert)`
  margin-bottom: 1rem;
`;

const Card = styled.div`
  background-color: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 2rem 4rem;

  width: 44rem;

  border-radius: 6px;

  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);

  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const CardTitle = styled.h2`
  font-weight: 300;
  font-size: 2.4rem;
  color: ${props => props.theme.colors.main};
`;

const CardBody = styled.h4`
  font-weight: 400;
  color: rgba(39, 39, 39, 0.7);

  && {
    margin-bottom: 3rem;
  }
`;

const StyledForm = styled(Form)`
  width: 100%;
  && {
    margin-bottom: 0;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  & h2 {
    color: rgba(39, 39, 39, 0.6);
    margin-bottom: 0;

    font-size: 1.5rem;
  }

  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

const StyledLink = styled(Link)`
  font-size: 1.6rem;
`;

const wrappedForgotPassword = Form.create()(ForgotPassword);

export default wrappedForgotPassword;
