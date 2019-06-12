import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "assets/logo.svg";
import { Icon, Avatar } from "antd";
import { ApplicationState } from "store/types";
import { connect } from "react-redux";

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

const NameCaretWrapper = styled.div`
  display: flex;
  align-items: center;
  & i {
    margin-top: 0.5rem;
    font-size: 1.2rem;
  }
`;

const Name = styled.p`
  font-weight: 500;
  margin: 0 0.4rem 0 0;
  font-size: 1.6rem;

  color: ${props => props.theme.fontColors.blackRgba(0.9)};
`;

const Role = styled.p`
  font-weight: 500;
  letter-spacing: 1px;
  margin: 0;

  color: ${props => props.theme.fontColors.blackRgba(0.6)};
`;

const mapStateToProps = (state: ApplicationState) => {
  return {
    name: state.reducer.user.name,
    role: state.reducer.user.role
  };
};

interface ITopBarProps {
  name: string;
  role: string;
}

const TopBar: React.FC<ITopBarProps> = ({ name, role }) => {
  return (
    <Wrapper>
      <LogoBox>
        <StyledLogo />
        <Title>My Study Planner</Title>
      </LogoBox>
      <UserBox>
        <StyledIcon type="bell" />
        <Avatar shape="square" size={60} icon="user" />
        <UserInfoBox>
          <NameCaretWrapper>
            <Name>{name}</Name>
            <Icon type="caret-down" />
          </NameCaretWrapper>
          <Role>{role === "user" ? "Student" : "Administrator"}</Role>
        </UserInfoBox>
      </UserBox>
    </Wrapper>
  );
};

export default connect(
  mapStateToProps,
  null
)(TopBar);
