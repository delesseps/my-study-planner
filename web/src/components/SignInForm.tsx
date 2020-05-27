import React from 'react'
import {Link} from 'react-router-dom'
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import {Button, Input, Checkbox, Alert, Form} from 'antd'
import styled from 'styled-components'
import {AxiosError} from 'axios'

import ISignInCredentials from 'constants/interfaces/ISignInCredentials'
import {breakpoints} from 'theme'
import {FadeIn} from 'components'
import {useAuth} from 'features/auth/auth-context'

const errors: Record<string, string> = {
  400: 'Incorrect e-mail or password.',
  404: 'The user does not exist. Please create an account.',
}

const SignInForm: React.FC = () => {
  const [form] = Form.useForm()
  const {
    login: [loginMutate, {status, error}],
  } = useAuth()

  const handleSubmit = (): void => {
    form.validateFields().then(credentials => {
      loginMutate(credentials as ISignInCredentials)
    })
  }

  const errorCode = (error as AxiosError)?.response?.status

  return (
    <StyledForm
      form={form}
      layout="vertical"
      initialValues={{remember: false}}
      onFinish={handleSubmit}
    >
      <Form.Item>
        <Heading>Welcome back</Heading>
        <SubHeading>Continue where you left off</SubHeading>
      </Form.Item>
      {errorCode && (
        <FadeIn>
          <Form.Item>
            <Alert message={errors[errorCode]} type="error" showIcon closable />
          </Form.Item>
        </FadeIn>
      )}
      <Form.Item
        label="E-mail"
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
          placeholder="john.doe@gmail.com"
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{required: true, message: 'Please input your password!'}]}
      >
        <Input.Password
          prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}} />}
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
          loading={status === 'loading'}
          type="primary"
          size="large"
          htmlType="submit"
        >
          Sign In
        </Button>
      </Form.Item>
    </StyledForm>
  )
}

const StyledForm = styled(Form)`
  width: 100%;

  @media only screen and (max-width: ${breakpoints.bpLargest}) {
    & .ant-form-item {
      margin-bottom: 0.8rem;
    }
  }
`

const Heading = styled.h1`
  font-weight: bold;
  font-size: 3.6rem;
  color: ${props => props.theme.fontColors.text};
`

const SubHeading = styled.h3`
  font-weight: 600;
  color: ${props => props.theme.fontColors.textRgba(0.6)};
`

const OptionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: ${breakpoints.bpMobileS}) {
    flex-direction: column;

    & > *:first-child {
      margin-bottom: 1rem;
    }
  }
`

const ForgotPassword = styled(Link)`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export default SignInForm
