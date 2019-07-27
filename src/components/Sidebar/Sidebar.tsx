import React from "react";
import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import { Icon } from "antd";

const fadeIn = keyframes`
   from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeInUp = keyframes`
    0% {
      transform: translateY(10%);      
    }

    100% {
      transform: translateY(0);     
    }
`;

const fadeInUpText = keyframes`
    0% {
      transform: translateY(50%);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
`;

const Wrapper = styled.nav`
  background-color: ${props => props.theme.sidebarBackgroundColor};
  height: 100%;
  width: 8%;
  border-right: 2px solid ${props => props.theme.fontColors.textRgba(0.1)};

  position: fixed;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > a:not(:last-child) {
    margin-bottom: 3.5rem;
  }

  & .active {
    & p {
      display: initial;
      animation: ${fadeInUpText} ease-out 0.3s;
      margin-bottom: -1.3rem;
    }

    & i {
      animation: ${fadeInUp} ease-out 0.3s;
    }

    position: relative;
  }

  & .active::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-right: 0.5rem solid ${props => props.theme.colors.main};

    animation: ${fadeIn} 0.5s;
  }

  & p {
    display: none;
  }
`;

const Item = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 9.5rem;
`;

const StyledIcon = styled(Icon)`
  font-size: 2.6rem;
  margin-bottom: 0.7rem;

  & svg {
    fill: ${props => props.theme.fontColors.textRgba(0.8)};
  }
`;

const Text = styled.p`
  text-transform: uppercase;
  text-align: center;
  font-size: 1.2rem;

  font-weight: 500;
  color: ${props => props.theme.fontColors.textRgba(0.8)};

  margin: 0;
`;

const Sidebar: React.FC = props => {
  return (
    <Wrapper>
      <Item activeClassName="active" to="/dashboard" exact>
        <StyledIcon type="home" />
        <Text>Home</Text>
      </Item>     
      <Item activeClassName="active" to="/dashboard/grades">
        <StyledIcon type="bar-chart" />
        <Text>Grades</Text>
      </Item>
      <Item activeClassName="active" to="/dashboard/friends-classes">
        <StyledIcon type="team" />
        <Text>Friends and classes</Text>
      </Item>
      <Item activeClassName="active" to="/dashboard/schedule">
        <StyledIcon type="calendar" />
        <Text>Calendar</Text>
      </Item>
    </Wrapper>
  );
};

export default Sidebar;
