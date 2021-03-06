import React from 'react'
import {Modal, Button} from 'antd'
import styled from 'styled-components'

import {ReactComponent as Welcome} from 'assets/welcome.svg'
import {breakpoints} from 'theme'
import {useUserModal} from 'features/user/user-hooks'

const WelcomeModal: React.FC = () => {
  const {
    hasModal,
    close: [closeModal, {status}],
  } = useUserModal()

  const handleClose = () => {
    closeModal()
  }

  return (
    <StyledModal
      style={{
        position: 'relative',
      }}
      visible={hasModal}
      footer={null}
      onCancel={handleClose}
      destroyOnClose
    >
      <Banner>
        <StyledWelcome />
      </Banner>
      <TextWrapper>
        <Title>Welcome to My Study Planner Alpha!</Title>
        <Subtitle>
          Help me build a better experience for your student life!
        </Subtitle>
        <Body>
          Until all features are built, you can give feedback for the ones that
          you do not like, or bugs you find along the way. Also, feel free to
          suggest new ideas! Without further ado, Start your journey in My Study
          Planner!
        </Body>
        <Button
          onClick={handleClose}
          loading={status === 'loading'}
          size="large"
          type="primary"
        >
          Get Started
        </Button>
      </TextWrapper>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  @media only screen and (max-width: ${breakpoints.bpMobileL}) {
    && {
      top: 0;
      margin: 0;
      padding: 0;
      min-height: 100vh;
    }
  }

  & .ant-modal-content {
    background-color: ${props => props.theme.backgroundColor};
    border-radius: 10px;
    overflow: hidden;
    width: 65rem;

    @media only screen and (max-width: ${breakpoints.bpMobileL}) {
      width: 100vw;
      height: 100vh;
      border-radius: 0;
    }
  }

  & .ant-modal-close-icon {
    color: rgba(255, 255, 255, 0.8);
    transition: 0.15s;

    &:hover {
      color: white;
    }
  }

  .ant-modal-body {
    padding-top: 0;
    padding-right: 0;
    padding-left: 0;

    @media only screen and (max-width: ${breakpoints.bpMobileL}) {
      width: 100vw;
      height: 100vh;
    }
  }

  border-radius: 9px;
`

const Banner = styled.div`
  width: 100%;
  display: flex;

  justify-content: center;

  background-color: ${props => props.theme.colors.main};

  padding: 2rem 0 1rem 0;
`

const StyledWelcome = styled(Welcome)`
  width: 35rem;
  height: auto;
`

const TextWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  overflow: hidden;

  padding: 3rem;
  padding-bottom: 0;

  & > *:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  @media only screen and (max-width: ${breakpoints.bpMobileL}) {
    height: 70%;
    justify-content: space-around;
  }
`

const Title = styled.h1`
  color: ${props => props.theme.fontColors.textRgba(0.8)};
  margin: 0;
  letter-spacing: 1px;
  font-weight: 800;

  font-size: 3rem;

  @media only screen and (max-width: ${breakpoints.bpMobileL}) {
    text-align: center;
  }
`

const Subtitle = styled.h2`
  color: ${props => props.theme.fontColors.textRgba(0.7)};
  font-weight: 600;
  font-size: 1.8rem;

  margin: 0;

  @media only screen and (max-width: ${breakpoints.bpMobileL}) {
    text-align: center;
  }

  && {
    margin-bottom: 2rem;
  }
`

const Body = styled.p`
  color: ${props => props.theme.fontColors.textRgba(0.6)};
  margin: 0;
  line-height: 34px;
  text-align: center;
  font-size: 1.5rem;

  && {
    margin-bottom: 2.5rem;
  }
`

export default WelcomeModal
