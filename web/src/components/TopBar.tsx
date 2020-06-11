import React from 'react'
import {useHistory} from 'react-router-dom'
import {useToggle} from 'react-use'
import styled from 'styled-components'
import {Avatar, Dropdown, Menu, Popover, Empty} from 'antd'
import {Link} from 'react-router-dom'
import {
  CaretDownOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  BellOutlined,
} from '@ant-design/icons'

import {UserProfile} from 'components/modals'
import IUser from 'constants/interfaces/IUser'
import {breakpoints} from 'theme'
import {useAuth} from 'features/auth/auth-context'
import {ReactComponent as Logo} from 'assets/logo.svg'

interface ITopBarProps {
  loading?: boolean
  user?: IUser
}

const TopBar: React.FC<ITopBarProps> = ({loading}) => {
  const {push} = useHistory()
  const {user, logout} = useAuth()
  const [showProfile, toggleProfile] = useToggle(false)
  const [showNotifications, toggleNotifications] = useToggle(false)

  const handleSignOut = () => {
    logout()
  }

  const handleHomeClick = () => {
    push('/dashboard')
  }

  const userOptions = (
    <Menu>
      <Menu.Item>
        <MenuButton onClick={toggleProfile}>
          <UserOutlined aria-hidden />
          Profile
        </MenuButton>
      </Menu.Item>
      <Menu.Item>
        <StyledLink to="/dashboard/preferences">
          <MenuButtonLink>
            <SettingOutlined aria-hidden />
            Preferences
          </MenuButtonLink>
        </StyledLink>
      </Menu.Item>
      <Menu.Item>
        <MenuButton onClick={handleSignOut}>
          <LogoutOutlined aria-hidden />
          Logout
        </MenuButton>
      </Menu.Item>
    </Menu>
  )

  return (
    <Wrapper>
      <UserProfile
        user={user as IUser}
        visible={showProfile}
        setVisible={toggleProfile}
      />
      <LogoBox onClick={handleHomeClick}>
        <StyledLogo />
        <Title>My Study Planner</Title>
      </LogoBox>
      <UserBox>
        <Popover
          content={
            <StyledEmpty
              description={'No notifications'}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          }
          trigger="click"
          visible={showNotifications}
          onVisibleChange={toggleNotifications}
        >
          <BellIcon />
        </Popover>
        <Avatar
          shape="square"
          size={60}
          icon={<UserOutlined />}
          src={user?.picture}
        />
        <UserInfoBox>
          <UserDropdown placement="bottomRight" overlay={userOptions}>
            <Name data-testid="user-dropdown" onClick={e => e.preventDefault()}>
              {user.name} <CaretIcon aria-hidden />
            </Name>
          </UserDropdown>
          <Role>{user.role === 'user' ? 'Student' : 'Administrator'}</Role>
        </UserInfoBox>
      </UserBox>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: ${breakpoints.bpMobileL}) {
    padding: 0 1.5rem;
  }
`

const LogoBox = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
`

const StyledLogo = styled(Logo)`
  width: 5rem;
  height: 5rem;

  margin-right: 1.5rem;
`

const Title = styled.h2`
  margin-bottom: 0.8rem;
  font-weight: 600;
  letter-spacing: 1px;

  color: ${props => props.theme.fontColors.textRgba(0.8)};

  @media only screen and (max-width: ${breakpoints.bpMobileL}) {
    display: none;
  }
`

const UserBox = styled.div`
  display: flex;
  align-items: center;
`

const BellIcon = styled(BellOutlined)`
  font-size: 2.3rem;
  margin-right: 3.5rem;

  @media only screen and (max-width: ${breakpoints.bpMobileL}) {
    margin-right: 2rem;
  }

  && {
    color: ${props => props.theme.fontColors.textRgba(0.8)};
  }
`

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 1.5rem;
`

const UserDropdown = styled(Dropdown)`
  display: flex;
  align-items: center;
`

const Name = styled.a`
  font-weight: 500;
  font-size: 1.6rem;
  margin: 0;
  cursor: pointer;

  & i {
    margin-left: 0.4rem;
    font-size: 1.2rem;
  }

  color: ${props => props.theme.fontColors.textRgba(0.9)};
`

const CaretIcon = styled(CaretDownOutlined)`
  svg {
    width: 1.4rem;
    margin-left: 0.5rem;
  }
`

const Role = styled.p`
  font-weight: 500;
  letter-spacing: 1px;
  margin: 0;
  font-size: 1.4rem;

  color: ${props => props.theme.fontColors.textRgba(0.6)};
`

const MenuButton = styled.a`
  & svg {
    margin-right: 2rem;
  }

  &:hover {
    color: ${({theme}) => theme.fontColors.textRgba(0.85)} !important;
  }
`

const MenuButtonLink = styled.p`
  color: ${({theme}) => theme.fontColors.textRgba(0.85)};
  margin: 0;
  & svg {
    margin-right: 2rem;
  }
`

const StyledLink = styled(Link)`
  & > a {
    color: inherit;

    &:hover {
      color: inherit;
    }
  }
`

const StyledEmpty = styled(Empty)`
  && {
    width: 20rem;
    color: ${props => props.theme.fontColors.textRgba(0.8)};
  }
`

export default TopBar
