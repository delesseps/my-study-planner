import React, { useEffect } from "react";
import { ReactComponent as Logo } from "assets/logo.svg";
import { ReactComponent as ChangePasswordDone } from "assets/change_password_done.svg";
import { LockOutlined } from "@ant-design/icons";
import { Button, Input, message, Form } from "antd";
import { Link, match } from "react-router-dom";
import { FadeIn, Loading } from "components";
import { recoverPasswordTokenConfirmation, changePassword } from "services";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import styled from "styled-components";

interface IChangePasswordProps {
  match: match<{ email: string; token: string }>;
}

const ChangePassword: React.FunctionComponent<IChangePasswordProps> = ({
  match
}) => {
  const [form] = Form.useForm();
  const [confirmDirty, setConfirmDirty] = React.useState<Boolean | any>(false);
  const dispatch = useDispatch();

  const [requestLoading, setRequestLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);

  useEffect(() => {
    const confirmToken = async () => {
      try {
        const response = await recoverPasswordTokenConfirmation(
          match.params.token
        );

        if (!response) {
          throw new Error(response);
        }

        setLoading(false);
      } catch (e) {
        message.error("Invalid link");
        dispatch(push("/forgot_password"));
      }
    };

    confirmToken();
  }, [dispatch, match.params.token]);

  const handleSubmit = (): void => {
    setRequestLoading(true);

    form
      .validateFields()
      .then(credentials => SendRequest(credentials.password))
      .catch(() => setRequestLoading(false));
  };

  const SendRequest = async (password: string) => {
    try {
      const response = await changePassword(match.params.token, password);

      if (!response) {
        throw new Error(response);
      }

      setRequestLoading(false);
      setSuccess(true);
    } catch (e) {
      message.error("An error has occured please try again!");
      dispatch(push("/forgot_password"));
    }
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

  if (loading) {
    return <Loading />;
  } else {
    return (
      <FadeIn>
        <Wrapper>
          <LogoBox>
            <StyledLogo />
            <Title>My Study Planner</Title>
          </LogoBox>
          <Card>
            <CardTitle>Change Password</CardTitle>
            <CardBody>
              {success
                ? "Successfuly changed password!"
                : "Please enter your new password."}
            </CardBody>
            {success ? (
              <ChangePasswordDone />
            ) : (
              <StyledForm form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!"
                    },
                    {
                      validator: validateToNextPassword
                    },
                    {
                      min: 6,
                      message: "Password must have a minimum of 6 characters."
                    }
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={
                      <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="New password"
                  />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!"
                    },
                    {
                      validator: compareToFirstPassword
                    },
                    {
                      min: 6,
                      message: "Password must have a minimum of 6 characters."
                    }
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={
                      <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Confirm new password"
                    onBlur={handleConfirmBlur}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    loading={requestLoading}
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

            <StyledLink to="/signin">Sign in</StyledLink>
          </Card>
        </Wrapper>
      </FadeIn>
    );
  }
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

const StyledLink = styled(Link)`
  font-size: 1.6rem;
`;

export default ChangePassword;
