import React from 'react'
import {Spin} from 'antd'
import styled, {keyframes} from 'styled-components'

import {LoadingOutlined} from '@ant-design/icons'
import {ReactComponent as Logo} from 'assets/logo.svg'
import {lightTheme} from 'theme'

const Loading: React.FC = () => {
  const antIcon = (
    <LoadingOutlined
      style={{fontSize: 25, color: lightTheme.colors.main}}
      spin
    />
  )

  return (
    <Wrapper data-testid="full-page-loader">
      <StyledLogo />
      <Spin indicator={antIcon} />
    </Wrapper>
  )
}

const fadeInUp = keyframes`
    0% {
      transform: translateY(10%);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: transparent;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & > div {
    animation: ${fadeInUp} 0.8s;
  }
`

const StyledLogo = styled(Logo)`
  width: 5rem;
  height: 5rem;
  margin-bottom: 0.9rem;
  animation: ${fadeInUp} 0.8s;
`

export default Loading
