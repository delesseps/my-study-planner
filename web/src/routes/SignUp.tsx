import React from 'react'
import styled from 'styled-components'
import {Divider} from 'antd'
import {OAuthButtons, BannerAuth, FadeIn, SignUpForm} from 'components'
import {ReactComponent as Logo} from 'assets/logo.svg'
import {Link} from 'react-router-dom'
import {breakpoints} from 'theme'

const SignUp: React.FC = () => {
  return (
    <FadeIn>
      <Wrapper>
        <LeftSection>
          <StyledLogo />
          <BannerAuth />
        </LeftSection>
        <RightSection>
          <RightSectionWrapper>
            <SignUpForm />
            <Divider>Or</Divider>
            <OAuthButtons />
            <SignIn>
              Already have an account? <Link to="/signin">Sign In</Link>
            </SignIn>
          </RightSectionWrapper>
        </RightSection>
      </Wrapper>
    </FadeIn>
  )
}

const Wrapper = styled.main`
  display: flex;
  flex: 1;

  @media only screen and (max-width: ${breakpoints.bpMedium}) {
    flex-direction: column-reverse;
  }
`

const LeftSection = styled.section`
  min-height: 100vh;
  flex: 0 0 45%;
  padding: 2rem;
  background: linear-gradient(
    163.41deg,
    ${props => props.theme.colors.main} 8.66%,
    rgba(2, 240, 251, 0) 207.55%
  );

  display: flex;
  flex-direction: column;

  @media only screen and (max-width: ${breakpoints.bpLargest}) {
    padding: 2rem;
  }
`

const StyledLogo = styled(Logo)`
  fill: #fff;
  width: 5rem;
  height: 5rem;
  cursor: pointer;

  @media only screen and (max-width: ${breakpoints.bpLargest}) {
    margin-bottom: 3rem;
  }
`

const RightSection = styled.section`
  min-height: 100vh;
  flex: 0 0 55%;
  background-color: white;
  padding: 2rem 6rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: ${breakpoints.bpMedium}) {
    min-height: 90vh;
  }

  @media only screen and (max-width: ${breakpoints.bpLargest}) {
    padding: 3rem 0;

    & .ant-divider.ant-divider-horizontal {
      margin: 0;
    }
  }
`

const RightSectionWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SignIn = styled.h4`
  font-weight: 400;
  color: ${props => props.theme.fontColors.textRgba(0.8)};
  margin-top: 5rem;

  @media only screen and (max-width: ${breakpoints.bpLargest}) {
    margin-top: 5rem;
  }

  & a {
    cursor: pointer;
    color: ${props => props.theme.colors.main};

    &:hover {
      text-decoration: underline;
    }
  }
`

export default SignUp
