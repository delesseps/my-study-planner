import React from 'react'
import styled, {keyframes, css} from 'styled-components'
import {HomeOutlined, CalendarOutlined, BookOutlined} from '@ant-design/icons'
import {NavLink, Link} from 'react-router-dom'

import {ReactComponent as LogoSVG} from 'assets/logo.svg'
import {breakpoints} from 'theme'

const Navigation: React.FC = () => {
  return (
    <Styles.Wrapper>
      <Logo.Wrapper to="/dashboard">
        <Logo.Icon aria-hidden />
        <Logo.Text>My Study Planner</Logo.Text>
      </Logo.Wrapper>
      <Nav.Wrapper>
        <Nav.Item activeClassName="active" to="/dashboard">
          <Nav.HomeIcon aria-hidden />
          <Nav.Text>Home</Nav.Text>
        </Nav.Item>
        <Nav.Item activeClassName="active" to="/schedule">
          <Nav.CalendarIcon aria-hidden />
          <Nav.Text>Schedule</Nav.Text>
        </Nav.Item>
        <Nav.Item activeClassName="active" to="/courses">
          <Nav.CoursesIcon aria-hidden />
          <Nav.Text>Courses</Nav.Text>
        </Nav.Item>
      </Nav.Wrapper>
    </Styles.Wrapper>
  )
}

const Styles = {
  Wrapper: styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 3rem 1.5rem;

    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    min-height: 100vh;
    position: sticky;
    top: 0;

    background-color: ${props => props.theme.navigationBackgroundColor};
    height: 100%;
    min-width: 22rem;

    @media only screen and (max-width: ${breakpoints.bpMedium}) {
      min-height: auto;
      width: 100vw;
      z-index: 1000;

      top: unset;
      position: fixed;
      bottom: 0;
      height: 0;
    }
  `,
}

const Logo = {
  Wrapper: styled(Link)`
    display: flex;
    align-items: center;
    width: 100%;

    padding: 0 2rem;
    padding-bottom: 1rem;

    cursor: pointer;

    @media only screen and (max-width: ${breakpoints.bpMedium}) {
      display: none;
    }
  `,

  Icon: styled(LogoSVG)`
    width: 3.5rem;
    height: 3.5rem;
    margin-bottom: 0.6rem;
  `,

  Text: styled.h2`
    font-weight: 600;
    letter-spacing: 1px;
    font-size: 1.8rem;
    margin-left: 1rem;

    color: ${props => props.theme.fontColors.textRgba(0.9)};
  `,
}

const Nav = {
  Wrapper: styled.nav`
    border-radius: 10px;
    height: 100%;
    width: 100%;

    padding: 1rem 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: ${breakpoints.bpMedium}) {
      bottom: 0;

      height: auto;
      width: 100vw;

      position: fixed;

      border-right: none;
      border-top: 1px solid ${props => props.theme.fontColors.textRgba(0.1)};
      padding: 1rem 0;
      background-color: ${props => props.theme.navigationBackgroundColor};

      flex-direction: row;
    }

    & > a:not(:last-child) {
      margin-bottom: 2rem;

      @media only screen and (max-width: ${breakpoints.bpMedium}) {
        margin-bottom: 0;
      }
    }
  `,
  Item: styled(NavLink)`
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    border-radius: 5px;

    color: ${props => props.theme.fontColors.textRgba(0.7)};

    width: 100%;

    @media only screen and (max-width: ${breakpoints.bpMedium}) {
      height: 5rem;
    }

    &.active {
      background-color: ${({theme}) => theme.colors.mainRgba(0.1)};
      color: ${props => props.theme.colors.main};

      & > svg {
        fill: currentColor;
      }
    }
  `,
  HomeIcon: styled(HomeOutlined)`
    font-size: 2.6rem;
  `,
  CalendarIcon: styled(CalendarOutlined)`
    font-size: 2.6rem;
  `,
  CoursesIcon: styled(BookOutlined)`
    font-size: 2.6rem;
  `,
  Text: styled.p`
    text-align: center;
    font-size: 1.6rem;
    letter-spacing: 0.2px;

    font-weight: 600;
    color: inherit;

    margin: 0;
    margin-left: 2rem;
  `,
}

export default Navigation
