import React from 'react'
import styled, {keyframes, css} from 'styled-components'
import {HomeOutlined, CalendarOutlined, BookOutlined} from '@ant-design/icons'
import {NavLink} from 'react-router-dom'
import {breakpoints} from 'theme'

const Sidebar: React.FC = () => {
  return (
    <Styles.Wrapper>
      <Styles.Item activeClassName="active" caseSensitive to="/dashboard">
        <Styles.HomeIcon aria-hidden />
        <Styles.Text>Home</Styles.Text>
      </Styles.Item>
      <Styles.Item activeClassName="active" to="/schedule">
        <Styles.CalendarIcon aria-hidden />
        <Styles.Text>Schedule</Styles.Text>
      </Styles.Item>
      <Styles.Item activeClassName="active" to="/courses">
        <Styles.CoursesIcon aria-hidden />
        <Styles.Text>Courses</Styles.Text>
      </Styles.Item>
    </Styles.Wrapper>
  )
}

const animations = {
  fadeIn: keyframes`
   from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,
  fadeInUp: keyframes`
    0% {
      transform: translateY(10%);      
    }

    100% {
      transform: translateY(0);     
    }
`,
  fadeInUpText: keyframes`
    0% {
      transform: translateY(50%);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
`,
}

const Shared = {
  Icon: css`
    font-size: 2.6rem;
    margin-bottom: 0.7rem;

    & svg {
      fill: ${props => props.theme.fontColors.textRgba(0.8)};
    }
  `,
}

const Styles = {
  Wrapper: styled.nav`
    background-color: ${props => props.theme.sidebarBackgroundColor};
    height: 100%;
    width: 8%;
    border-right: 2px solid ${props => props.theme.fontColors.textRgba(0.1)};

    position: fixed;

    @media only screen and (max-width: ${breakpoints.bpMedium}) {
      bottom: 0;

      height: auto;
      width: 100vw;

      position: fixed;

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
        animation: ${animations.fadeInUpText} ease-out 0.3s;
        margin-bottom: -1.3rem;

        @media only screen and (max-width: ${breakpoints.bpMedium}) {
          color: ${props => props.theme.colors.main};
        }
      }

      & i {
        animation: ${animations.fadeInUp} ease-out 0.3s;

        @media only screen and (max-width: ${breakpoints.bpMedium}) {
          & > svg {
            fill: ${props => props.theme.colors.main};
          }
        }
      }

      position: relative;
    }

    .active::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-right: 0.5rem solid ${props => props.theme.colors.main};

      animation: ${animations.fadeIn} 0.5s;

      @media only screen and (max-width: ${breakpoints.bpMedium}) {
        display: none;
      }
    }

    & p {
      display: none;
    }
  `,
  Item: styled(NavLink)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 9.5rem;

    @media only screen and (max-width: ${breakpoints.bpMedium}) {
      height: 5rem;
    }
  `,
  HomeIcon: styled(HomeOutlined)`
    ${Shared.Icon}
  `,
  CalendarIcon: styled(CalendarOutlined)`
    ${Shared.Icon}
  `,
  CoursesIcon: styled(BookOutlined)`
    ${Shared.Icon}
  `,
  Text: styled.p`
    text-transform: uppercase;
    text-align: center;
    font-size: 1.2rem;

    font-weight: 500;
    color: ${props => props.theme.fontColors.textRgba(0.8)};

    margin: 0;
  `,
}

export default Sidebar
