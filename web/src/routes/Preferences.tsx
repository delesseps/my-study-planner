import React from 'react'
import styled from 'styled-components'
import {List, Switch} from 'antd'

import {IUserConfig} from 'constants/interfaces'
import {breakpoints} from 'theme'
import {useConfig} from 'features/user/user-hooks'

const appearanceSettings = [
  {
    name: 'Dark Mode',
    description: 'Make My Study Planner cooler for your eyes.',
    action: 'DARK_MODE',
    configProperty: 'darkMode',
  },
]

const Preferences: React.FC = () => {
  const {config, change} = useConfig()

  const handleChange = (action: string) => (
    checked: boolean,
    event: MouseEvent,
  ) => {
    const newConfig: IUserConfig = config

    switch (action) {
      case 'DARK_MODE':
        newConfig.darkMode = checked
        // newConfig.darkMode
        //   ? less.modifyVars(darkVars)
        //   : less.modifyVars(lightVars)
        return change(newConfig)
      default:
    }
  }

  return (
    <Wrapper>
      <Title>Appearance</Title>
      <StyledList
        bordered
        itemLayout="horizontal"
        dataSource={appearanceSettings}
        renderItem={(setting: any) => (
          <List.Item
            actions={[
              <Switch
                checked={config[setting.configProperty]}
                onChange={handleChange(setting.action)}
              />,
            ]}
          >
            <List.Item.Meta
              title={<Name>{setting.name}</Name>}
              description={<Description>{setting.description}</Description>}
            />
          </List.Item>
        )}
      />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  width: 60rem;

  @media only screen and (max-width: ${breakpoints.bpMobileL}) {
    width: 100%;
  }

  justify-content: center;
  align-items: center;

  margin-top: 8rem;
`

const Title = styled.h4`
  font-weight: 500;
  align-self: flex-start;

  letter-spacing: 1px;
  margin: 0;
  margin-bottom: 1rem;

  @media only screen and (max-width: ${breakpoints.bpMobileL}) {
    margin-left: 1rem;
  }

  color: ${props => props.theme.fontColors.textRgba(0.8)};
`

const StyledList = styled(List)`
  min-width: 100%;
  background-color: ${props => props.theme.panelBackgroundColor};

  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`

const Name = styled.span`
  color: ${props => props.theme.fontColors.textRgba(0.8)};
`

const Description = styled.span`
  color: ${props => props.theme.fontColors.textRgba(0.6)};
`

export default Preferences
