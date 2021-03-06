import React from 'react'
import styled from 'styled-components'
import {Button} from 'antd'

import {ReactComponent as GoogleLogo} from 'assets/google_logo.svg'

const OAuthButtons = ({type}: {type?: string}) => {
  return (
    <Wrapper>
      <GoogleButton
        size="large"
        href={
          process.env.NODE_ENV === 'production'
            ? 'https://msp-api.jfelix.info/api/auth/google/'
            : 'http://localhost:3001/api/auth/google'
        }
      >
        <StyledGoogleLogo />
        {type === 'signin' ? 'Sign in with Google' : 'Sign up with Google'}
      </GoogleButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 2.4rem;
`

const GoogleButton = styled(Button)`
  && {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 0;
  }
`

const StyledGoogleLogo = styled(GoogleLogo)`
  width: 24px;
  margin-right: 1.2rem;
`

export default OAuthButtons
