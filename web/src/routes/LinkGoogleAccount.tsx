import * as React from 'react'
import styled from 'styled-components'
import {Button, message} from 'antd'

import {useLinkAccount} from 'features/link-account/link-account-hooks'
import {AxiosError} from 'axios'
import {FadeIn, Loading} from 'components'
import {ReactComponent as Logo} from 'assets/logo.svg'
import {ReactComponent as Done} from 'assets/change_password_done.svg'
import {useParams, useNavigate} from 'react-router'

const LinkGoogleAccount: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()

  const {
    googleTokenConfirmation: [
      confirmToken,
      {status: tokenConfirmationStatus, error: tokenConfirmationError},
    ],
    googleAccountLink: [linkAccount, {status: linkStatus, error: linkError}],
  } = useLinkAccount()

  React.useEffect(() => {
    confirmToken(params.token)
  }, [params.token, confirmToken])

  React.useEffect(() => {
    const error = tokenConfirmationError as AxiosError
    const errorCode = error?.response?.status

    if (errorCode) {
      message.error('Invalid link')
      navigate('/signin')
    }

    if (!errorCode && error) {
      throw new Error(error.toString())
    }
  }, [tokenConfirmationError, navigate])

  React.useEffect(() => {
    const error = linkError as AxiosError
    const errorCode = error?.response?.status

    if (errorCode) {
      message.error('An error has occured please try again!')
      navigate('/signin')
    }

    if (!errorCode && error) {
      throw new Error(error.toString())
    }
  }, [linkError, navigate])

  const handleLinkClick = async () => {
    const {token, email} = params
    linkAccount({token, email})
  }

  const handleRedirectClick = () => {
    navigate('/signin')
  }

  const linkSuccess = linkStatus === 'success'
  const linkLoading = linkStatus === 'loading' || linkSuccess

  if (tokenConfirmationStatus === 'loading') {
    return <Loading />
  } else {
    return (
      <FadeIn>
        <Wrapper>
          <LogoBox>
            <StyledLogo />
            <Title>My Study Planner</Title>
          </LogoBox>
          <Card>
            <CardTitle>Link account to Google</CardTitle>
            <CardBody>
              {linkSuccess
                ? 'Successfully linked account!'
                : 'To continue through Google you must link your account. This action can not be undone!'}
            </CardBody>
            {linkSuccess ? (
              <Done />
            ) : (
              <CardButtonsWrapper>
                <Button
                  loading={linkLoading}
                  onClick={handleLinkClick}
                  size="large"
                  type="primary"
                >
                  Link
                </Button>
                <Button onClick={handleRedirectClick} size="large">
                  Cancel
                </Button>
              </CardButtonsWrapper>
            )}
            {linkSuccess && (
              <Button type="primary" onClick={handleRedirectClick} size="large">
                Sign in
              </Button>
            )}
          </Card>
        </Wrapper>
      </FadeIn>
    )
  }
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
  text-align: center;

  && {
    margin-bottom: 3rem;
  }
`

const CardButtonsWrapper = styled.div`
  & > *:not(:last-child) {
    margin-right: 1.5rem;
  }
`

export default LinkGoogleAccount
