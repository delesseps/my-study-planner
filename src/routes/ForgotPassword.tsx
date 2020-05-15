import * as React from 'react'
import styled from 'styled-components'
import {UserOutlined} from '@ant-design/icons'
import {Button, Input, Alert, Form} from 'antd'
import {Link} from 'react-router-dom'

import {FadeIn} from 'components'
import {usePasswordChange} from 'features/auth/auth-context'
import {ReactComponent as Logo} from 'assets/logo.svg'
import {ReactComponent as SentMessage} from 'assets/message_sent.svg'
import {AxiosError} from 'axios'

const ForgotPassword: React.FunctionComponent = () => {
  const [form] = Form.useForm()
  const {
    request: [requestChange, {status, error}],
  } = usePasswordChange()

  const handleSubmit = (): void => {
    form.validateFields().then(value => SendRequest(value.email))
  }

  const SendRequest = async (email: string) => {
    requestChange(email)
  }

  const success = status === 'success'
  const errorObject = error as AxiosError
  const errorCode = errorObject?.response?.status

  return (
    <FadeIn>
      <Wrapper>
        <LogoBox>
          <StyledLogo />
          <Title>My Study Planner</Title>
        </LogoBox>
        {errorCode && errorCode !== 400 && (
          <StyledError
            message="Error sending recovery link, is this the right email?"
            type="error"
            showIcon
          />
        )}
        {errorCode === 400 && (
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
              ? 'Successfuly sent! Please check your email!'
              : "Please enter your email address below and we'll send you a link to reset your password"}
          </CardBody>
          {success ? (
            <SentMessage />
          ) : (
            <StyledForm form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                name="email"
                rules={[
                  {required: true, message: 'Please input your email!'},
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
                  placeholder="Email address"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={status === 'loading' || status === 'success'}
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
  )
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 4rem 0;

  min-height: 100vh;

  background-color: ${props => props.theme.colors.main};
`

const LogoBox = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 8rem;
`

const StyledLogo = styled(Logo)`
  width: 5rem;
  height: 5rem;

  fill: white;

  margin-right: 1rem;
`

const Title = styled.h1`
  font-weight: 600;
  margin-bottom: 0;
  color: white;
`

const StyledError = styled(Alert)`
  margin-bottom: 1rem;
`

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
`

const CardTitle = styled.h2`
  font-weight: 300;
  font-size: 2.4rem;
  color: ${props => props.theme.colors.main};
`

const CardBody = styled.h4`
  font-weight: 400;
  color: rgba(39, 39, 39, 0.7);

  && {
    margin-bottom: 3rem;
  }
`

const StyledForm = styled(Form)`
  width: 100%;
  && {
    margin-bottom: 0;
  }
`

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
`

const StyledLink = styled(Link)`
  font-size: 1.6rem;
`

export default ForgotPassword
