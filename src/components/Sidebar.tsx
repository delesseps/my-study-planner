import React from "react";
import styled, { keyframes } from "styled-components";
import { CalendarOutlined, HomeOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { breakpoints } from "theme";

const Sidebar: React.FC = props => {
  return (
    <Wrapper>
      <Item activeClassName="active" to="/dashboard" exact>
        <HomeIcon />
        <Text>Home</Text>
      </Item>
      <Item activeClassName="active" to="/dashboard/schedule">
        <CalendarIcon />
        <Text>Schedule</Text>
      </Item>
    </Wrapper>
  );
};

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

  @media only screen and (max-width: ${breakpoints.bpMedium}) {
    bottom: 0;
    top: 0;
    height: auto;
    width: 100%;

    position: sticky;

    border-right: none;
    border-top: 1px solid ${props => props.theme.fontColors.textRgba(0.1)};
    padding: 1rem 0;

    flex-direction: row;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > a:not(:last-child) {
    margin-bottom: 3.5rem;

    @media only screen and (max-width: ${breakpoints.bpMedium}) {
      margin-bottom: 0;
    }
  }

  .active {
    & p {
      display: initial;
      animation: ${fadeInUpText} ease-out 0.3s;
      margin-bottom: -1.3rem;

      @media only screen and (max-width: ${breakpoints.bpMedium}) {
        color: ${props => props.theme.colors.main};
      }
    }

    & i {
      animation: ${fadeInUp} ease-out 0.3s;

      @media only screen and (max-width: ${breakpoints.bpMedium}) {
        & > svg {
          fill: ${props => props.theme.colors.main};
        }
      }
    }

    position: relative;
  }

  .active::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-right: 0.5rem solid ${props => props.theme.colors.main};

    animation: ${fadeIn} 0.5s;

    @media only screen and (max-width: ${breakpoints.bpMedium}) {
      display: none;
    }
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

  @media only screen and (max-width: ${breakpoints.bpMedium}) {
    height: 5rem;
  }
`;

const HomeIcon = styled(HomeOutlined)`
  font-size: 2.6rem;
  margin-bottom: 0.7rem;

  & svg {
    fill: ${props => props.theme.fontColors.textRgba(0.8)};
  }
`;

const CalendarIcon = styled(CalendarOutlined)`
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

export default Sidebar;
