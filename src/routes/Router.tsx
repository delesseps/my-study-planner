import React from "react";
import { createGlobalStyle } from "styled-components";
import { Switch, Route, Redirect } from "react-router";
import Dashboard from "./Dashboard";
import Loading from "components/Loading";
import { breakpoints } from "theme";
import { Cookies, withCookies } from "react-cookie";

import { connect } from "react-redux";
import { ApplicationState } from "store/types";
import IUserConfig from "interfaces/IUserConfig";

const SignIn = React.lazy(() => import("routes/SignIn"));
const SignUp = React.lazy(() => import("routes/SignUp"));
const Window404 = React.lazy(() => import("routes/Route404"));
const ForgotPassword = React.lazy(() => import("routes/ForgotPassword"));
const ChangePassword = React.lazy(() => import("routes/ChangePassword"));

const LinkGoogleAccount = React.lazy(() => import("routes/LinkGoogleAccount"));

interface IRouterProps {
  cookies: Cookies;
  config?: IUserConfig;
}

const Router: React.FC<IRouterProps> = ({ cookies, config }) => {
  return (
    <React.Fragment>
      <CSSReset config={config} />
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
          <Route
            path="/dashboard"
            render={props => {
              return cookies.get("IS_LOGGED_IN") ? (
                <Dashboard />
              ) : (
                <Redirect to="/signin" />
              );
            }}
          />
          <Route
            path="/signin"
            exact
            render={props =>
              cookies.get("IS_LOGGED_IN") ? (
                <Redirect to="/dashboard" />
              ) : (
                <SignIn />
              )
            }
          />
          <Route
            path="/signup"
            exact
            render={props =>
              cookies.get("IS_LOGGED_IN") ? (
                <Redirect to="/dashboard" />
              ) : (
                <SignUp />
              )
            }
          />
          <Route
            path="/forgot_password"
            exact
            render={props =>
              cookies.get("IS_LOGGED_IN") ? (
                <Redirect to="/dashboard" />
              ) : (
                <ForgotPassword />
              )
            }
          />
          <Route
            path="/change_password/:token"
            exact
            render={props =>
              cookies.get("IS_LOGGED_IN") ? (
                <Redirect to="/dashboard" />
              ) : (
                <ChangePassword {...props} />
              )
            }
          />
          <Route
            path="/link/google/:token/:email"
            exact
            render={props =>
              cookies.get("IS_LOGGED_IN") ? (
                <Redirect to="/dashboard" />
              ) : (
                <LinkGoogleAccount {...props} />
              )
            }
          />
          <Route
            path="/404"
            exact
            render={() =>
              config && config.darkMode ? <Window404 white /> : <Window404 />
            }
          />
          <Redirect to="/404" />
        </Switch>
      </React.Suspense>
    </React.Fragment>
  );
};

const CSSReset = createGlobalStyle<{ config?: IUserConfig }>`
  * {
    margin: 0; 
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%; /*1rem = 10px*/
    box-sizing: border-box;

    @media only screen and (max-width: ${breakpoints.bpLargest}) {
      font-size: 50%;
    }
  }  

  body {
    font-size: 1.4rem;      
    background-color: ${props => props.theme.backgroundColor} !important;    
    color: ${props => props.theme.fontColors.textRgba(0.65)} !important;    

    @media only screen and (max-width: ${breakpoints.bpMobileL}) {
      #appzi-launch-button-dba9fa3a-fe42-4320-8ea4-78392d421de8  {
        bottom: 60px;     
        right: 10px;    
      } 

      .ant-calendar-input  {
        display: none
      }
    }

    @media only screen and (max-width: ${breakpoints.bpMedium}) {
      #appzi-launch-button-dba9fa3a-fe42-4320-8ea4-78392d421de8  {
        bottom: 70px;     
        right: 10px;    
      } 
    }

    /*ANTD OVERRIDES*/
    & .ant-picker-column-header, .ant-picker-date-value, .ant-popover-message {
      color: ${props => props.theme.fontColors.textRgba(0.65)};
    }

    .ant-picker-content th {
      color: ${props => props.theme.fontColors.textRgba(0.65)} !important;
    }

    & .ant-picker-last-month-cell .ant-picker-date-value,
    .ant-picker-next-month-btn-day .ant-picker-date-value, 
    .ant-calendar-disabled-cell .ant-calendar-date, 
    .ant-calendar-next-month-btn-day .ant-calendar-date, 
    .ant-picker-cell-inner .ant-picker-calendar-date-value,
    .ant-picker-cell .ant-picker-cell-inner{
      color: ${props => props.theme.fontColors.textRgba(0.25)};
    }    

    .ant-picker-cell.ant-picker-cell-disabled::before {
      background-color: ${props => props.config?.darkMode && "#4a4a4a"};
    }

    .ant-select-item.ant-select-item-option.ant-select-item-option-selected 
    .ant-select-item-option-content {
      color: ${props => props.config?.darkMode && "rgba(39, 39, 39, 0.85)"};
    }

    .ant-picker-input input {
      color: ${props => props.config?.darkMode && "rgba(255, 255, 255, 0.85)"};
    }

    .ant-drawer .ant-picker-clear {
      background-color: ${props => props.theme.panelBackgroundColor};

      svg {
        color: ${props => props.theme.fontColors.textRgba(0.85)};
      }
    }

    & .ant-calendar-disabled-cell .ant-calendar-date {
      background-color: ${props => props.theme.backgroundColor};
    }      

    .ant-select-selection, .ant-select-selector, .ant-radio-button-wrapper
    ,.ant-calendar-date-input-wrap, 
    .ant-picker {
      background-color: ${props => props.theme.panelBackgroundColor} !important;
      color: ${props => props.theme.fontColors.text};
    }

    .ant-picker-suffix {
      color: ${props => props.theme.fontColors.text};  
    }

    & .ant-drawer-content, .ant-drawer-header, .ant-input, .ant-select-dropdown, 
    .ant-dropdown-menu, .ant-popover-inner, .ant-modal-content, .ant-picker-calendar
    ,.ant-picker-calendar .ant-picker-panel {
      background-color: ${props => props.theme.panelBackgroundColor};          
    }

    .ant-picker-panel {
      background-color: ${({ theme }) => theme.panelBackgroundColor} !important;
    } 

    & .ant-popover-placement-top > .ant-popover-content .ant-popover-arrow
     {
      border-bottom-color: ${props => props.theme.panelBackgroundColor};
      border-right-color: ${props => props.theme.panelBackgroundColor};
    }

    .ant-popover-placement-bottom > .ant-popover-content .ant-popover-arrow {
      border-top-color: ${props => props.theme.panelBackgroundColor};
      border-left-color: ${props => props.theme.panelBackgroundColor};
    }

    .ant-select-arrow svg {
      color: ${props => props.theme.fontColors.text}; 
    }    

    & .has-error .ant-input {
      background-color: ${props => props.theme.panelBackgroundColor};   

      &:hover {
        background-color: ${props => props.theme.panelBackgroundColor};   
      } 
    }

    .ant-radio-button-wrapper-checked {
      background: ${({ theme }) => theme.colors.main} !important;

      span {
        color: rgba(255, 255, 255, 0.85);
      }
    }   

    & .ant-drawer-title, .ant-form-item-required > label, .ant-form-item-label > label, 
    .ant-input, .ant-dropdown-menu-item,.ant-dropdown-menu-item > a, .ant-drawer-close,
    .ant-modal-confirm-body .ant-modal-confirm-title h3, .ant-modal-confirm-body .ant-modal-confirm-title h5, 
    .ant-modal-confirm-content p, .ant-calendar-body, .ant-calendar-date, .ant-calendar-picker div > i, 
    .ant-select-item-option-content, .ant-picker-month-btn, .ant-picker-year-btn, 
    .ant-picker-cell.ant-picker-cell-in-view .ant-picker-cell-inner {
      color: ${props => props.theme.fontColors.textRgba(0.85)};
    }    

    .ant-picker-header button {
      color: ${props => props.theme.fontColors.textRgba(0.85)};

      &:hover {
        color: ${({ theme }) => theme.hoverColor};
      }
    }

    & .ant-drawer-close {
      color: ${props => props.theme.fontColors.textRgba(0.65)};

      &:hover { 
       color: ${props => props.theme.fontColors.text};
      }
    }

    & .ant-dropdown-menu-item-active:not(.ant-dropdown-menu-item-disabled), 
    .ant-dropdown-menu-item-selected,
    .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
      background-color: ${props => props.theme.hoverColor};
    }

    & .ant-picker-date-value, .ant-dropdown-menu-item, 
    .ant-select-dropdown-menu-item:not(.ant-select-dropdown-menu-item-disabled), 
    .ant-picker-calendar-date,
    .ant-select-item .ant-select-item-option .ant-select-item-option-active {
      &:hover {
        background-color: ${props => props.theme.hoverColor};
      }
    }

    .ant-picker-cell:hover:not(.ant-picker-cell-selected):not(.ant-picker-cell-range-start):not(.ant-picker-cell-range-end):not(.ant-picker-cell-range-hover-start):not(.ant-picker-cell-range-hover-end) .ant-picker-cell-inner {
      background: ${props => props.theme.hoverColor};
    }

    & .ant-popover-buttons button:first-child  {
      background-color: transparent;
      color: ${props => props.theme.fontColors.textRgba(0.85)};

      &:hover {
        color: ${props => props.theme.colors.main};
      }
    }

    & .ant-calendar-picker-clear {
      background-color: ${props => props.theme.panelBackgroundColor};   

      &:hover {
        color: ${props => props.theme.colors.main};
      }
    }

    & .ant-checkbox-inner {
      background-color: transparent;
    }

    /*REACT-BIG-CALENDAR OVERRIDES*/
    & .rbc-today {
      background-color: ${props => props.theme.bigCalendarCurrentDay};
    }

    & .rbc-toolbar .rbc-btn-group .rbc-active {      
      color: ${props => props.theme.colors.main}; 

      &:hover, &:focus {
        color: ${props => props.theme.colors.main}; 
      }
    }

    & .rbc-toolbar button {
      color: ${props => props.theme.fontColors.textRgba(0.85)};
    }
  }

  *::-webkit-scrollbar {
    background-color: ${props => props.theme.scrollbarBackgroundColor};
    width:14px
  }
  
  *::-webkit-scrollbar-track {
    background-color: ${props => props.theme.scrollbarBackgroundColor};
  }

 
  *::-webkit-scrollbar-thumb {
    background-color:#babac0;
    border-radius:16px;
    border:4px solid ${props => props.theme.scrollbarBackgroundColor}
  }

  *::-webkit-scrollbar-button {display:none}
`;

const mapStateToProps = (state: ApplicationState) => ({
  config: state.reducer.user.configuration
});

export default connect(mapStateToProps, null)(withCookies(Router));
