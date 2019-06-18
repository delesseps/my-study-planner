import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "assets/logo.svg";
import { Icon, Avatar, Dropdown, Menu, Skeleton } from "antd";
import { ApplicationState } from "store/types";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { signOut } from "store/effects";

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLogo = styled(Logo)`
  width: 5rem;
  height: 5rem;

  margin-right: 1.5rem;
`;

const Title = styled.h2`
  margin-bottom: 0.8rem;
  font-weight: 400;
  letter-spacing: 1px;

  color: ${props => props.theme.fontColors.blackRgba(0.8)};
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  font-size: 2.3rem;
  margin-right: 3.5rem;
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

  color: ${props => props.theme.fontColors.blackRgba(0.9)};
`;

const Role = styled.p`
  font-weight: 500;
  letter-spacing: 1px;
  margin: 0;
  font-size: 1.4rem;

  color: ${props => props.theme.fontColors.blackRgba(0.6)};
`;

const MenuButton = styled.a`
  & i {
    margin-right: 2rem;
  }
`;

const StyledSkeleton = styled(Skeleton)`
  &&& .ant-skeleton-paragraph {
    margin-top: 0;
  }
`;

const mapStateToProps = (state: ApplicationState) => {
  return {
    loading: state.reducer.loading.user,
    name: state.reducer.user.name,
    role: state.reducer.user.role,
    picture: state.reducer.user.picture
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    signOut: () => dispatch<any>(signOut())
  };
};

interface ITopBarProps {
  loading: boolean;
  name: string;
  role: string;
  signOut: Function;
  picture: string;
}

const TopBar: React.FC<ITopBarProps> = ({
  loading,
  name,
  role,
  signOut,
  picture
}) => {
  const handleSignOut = () => {
    signOut();
  };

  const userOptions = (
    <Menu>
      <Menu.Item>
        <MenuButton>
          <Icon type="user" />
          Profile
        </MenuButton>
      </Menu.Item>
      <Menu.Item>
        <MenuButton>
          <Icon type="setting" />
          Preferences
        </MenuButton>
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
      <LogoBox>
        <StyledLogo />
        <Title>My Study Planner</Title>
      </LogoBox>
      <UserBox>
        <StyledIcon type="bell" />
        <Avatar shape="square" size={60} icon="user" src={picture} />
        <UserInfoBox>
          <StyledSkeleton
            loading={loading}
            title={{ width: 120 }}
            paragraph={{ rows: 1, width: 60 }}
          >
            <NameCaretWrapper placement="bottomRight" overlay={userOptions}>
              <Name>
                {name} <Icon type="caret-down" />
              </Name>
            </NameCaretWrapper>
            <Role>{role === "user" ? "Student" : "Administrator"}</Role>
          </StyledSkeleton>
        </UserInfoBox>
      </UserBox>
    </Wrapper>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar);
