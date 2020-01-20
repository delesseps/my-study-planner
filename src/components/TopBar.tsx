import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "assets/logo.svg";
import { Icon, Avatar, Dropdown, Menu, Skeleton, Popover, Empty } from "antd";
import { ApplicationState } from "store/types";
import { connect, useDispatch } from "react-redux";
import { signOut } from "store/effects";
import { UserProfile } from "components/modals";
import IUser from "interfaces/IUser";
import { Link } from "react-router-dom";
import { breakpoints } from "theme";
import { push } from "connected-react-router";
import { useToggle } from "react-use";

const mapStateToProps = (state: ApplicationState) => ({
  loading: state.reducer.loading.user,
  user: state.reducer.user
});

interface ITopBarProps {
  loading?: boolean;
  user?: IUser;
}

const TopBar: React.FC<ITopBarProps> = ({ loading, user }) => {
  const dispatch = useDispatch();
  const [showProfile, toggleProfile] = useToggle(false);
  const [showNotifications, toggleNotifications] = useToggle(false);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const handleHomeClick = () => {
    dispatch(push("/dashboard"));
  };

  const userOptions = (
    <Menu>
      <Menu.Item>
        <MenuButton onClick={toggleProfile}>
          <Icon type="user" />
          Profile
        </MenuButton>
      </Menu.Item>
      <Menu.Item>
        <StyledLink to="/dashboard/preferences">
          <MenuButtonLink>
            <Icon type="setting" />
            Preferences
          </MenuButtonLink>
        </StyledLink>
      </Menu.Item>
      <Menu.Item>
        <MenuButton onClick={handleSignOut}>
          <Icon type="logout" />
          Logout
        </MenuButton>
      </Menu.Item>
    </Menu>
  );

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
              description={"No notifications"}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          }
          trigger="click"
          visible={showNotifications}
          onVisibleChange={toggleNotifications}
        >
          <StyledIcon type="bell" />
        </Popover>
        <Avatar
          shape="square"
          size={60}
          icon="user"
          src={user && user.picture}
        />
        <UserInfoBox>
          <StyledSkeleton
            loading={loading}
            title={{ width: 120 }}
            paragraph={{ rows: 1, width: 60 }}
          >
            <NameCaretWrapper placement="bottomRight" overlay={userOptions}>
              <Name>
                {user && user.name} <Icon type="caret-down" />
              </Name>
            </NameCaretWrapper>
            <Role>
              {user && user.role === "user" ? "Student" : "Administrator"}
            </Role>
          </StyledSkeleton>
        </UserInfoBox>
      </UserBox>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: ${breakpoints.bpMobileL}) {
    padding: 0 1.5rem;
  }
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
`;

const StyledLogo = styled(Logo)`
  width: 5rem;
  height: 5rem;

  margin-right: 1.5rem;
`;

const Title = styled.h2`
  margin-bottom: 0.8rem;
  font-weight: 600;
  letter-spacing: 1px;

  color: ${props => props.theme.fontColors.textRgba(0.8)};

  @media only screen and (max-width: ${breakpoints.bpMobileL}) {
    display: none;
  }
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  font-size: 2.3rem;
  margin-right: 3.5rem;

  @media only screen and (max-width: ${breakpoints.bpMobileL}) {
    margin-right: 2rem;
  }

  && {
    color: ${props => props.theme.fontColors.textRgba(0.8)};
  }
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 1.5rem;
`;

const NameCaretWrapper = styled(Dropdown)`
  display: flex;
  align-items: center;
`;

const Name = styled.p`
  font-weight: 500;
  font-size: 1.6rem;
  margin: 0;
  cursor: pointer;

  & i {
    margin-left: 0.4rem;
    font-size: 1.2rem;
  }

  color: ${props => props.theme.fontColors.textRgba(0.9)};
`;

const Role = styled.p`
  font-weight: 500;
  letter-spacing: 1px;
  margin: 0;
  font-size: 1.4rem;

  color: ${props => props.theme.fontColors.textRgba(0.6)};
`;

const MenuButton = styled.a`
  & i {
    margin-right: 2rem;
  }
`;

const MenuButtonLink = styled.p`
  margin: 0;
  & i {
    margin-right: 2rem;
  }
`;

const StyledLink = styled(Link)`
  & > a {
    color: inherit;

    &:hover {
      color: inherit;
    }
  }
`;

const StyledSkeleton = styled(Skeleton)`
  &&& .ant-skeleton-paragraph {
    margin-top: 0;
  }
`;

const StyledEmpty = styled(Empty)`
  && {
    width: 20rem;
    color: ${props => props.theme.fontColors.textRgba(0.8)};
  }
`;

export default connect(mapStateToProps, null)(TopBar);
