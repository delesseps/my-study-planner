import React from "react";
import { createGlobalStyle } from "styled-components";
import { Switch, Route, Redirect } from "react-router";
import Dashboard from "./Dashboard";
import Loading from "components/Loading/Loading";
import { breakpoints } from "styled";
import { Cookies, withCookies } from "react-cookie";

import { connect } from "react-redux";
import { ApplicationState } from "store/types";

const SignIn = React.lazy(() => import("components/SignIn/SignIn"));
const SignUp = React.lazy(() => import("components/SignUp/SignUp"));
const Window404 = React.lazy(() => import("components/404/Window404"));

const CSSReset = createGlobalStyle`
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
    background-color: ${props => props.theme.backgroundColor};    
    color: ${props => props.theme.fontColors.textRgba(0.65)} ;    

    /*ANTD OVERRIDES*/
    & .ant-fullcalendar-column-header-inner, .ant-fullcalendar-value, .ant-popover-message  {
      color: ${props => props.theme.fontColors.textRgba(0.65)};
    }

     & .ant-calendar-header a {
      color: ${props => props.theme.fontColors.textRgba(0.65)} !important;
     }

    & .ant-fullcalendar-last-month-cell .ant-fullcalendar-value,
    .ant-fullcalendar-next-month-btn-day .ant-fullcalendar-value, 
    .ant-calendar-disabled-cell .ant-calendar-date, 
    .ant-calendar-next-month-btn-day .ant-calendar-date {
      color: ${props => props.theme.fontColors.textRgba(0.25)};
    }

    & .ant-calendar-disabled-cell .ant-calendar-date {
      background-color: ${props => props.theme.backgroundColor};
    }

    & .ant-select-selection, .ant-radio-button-wrapper {
      background-color: ${props => props.theme.panelBackgroundColor};
      color: ${props => props.theme.fontColors.text};
    }

    & .ant-drawer-content, .ant-drawer-header, .ant-input, .ant-select-dropdown, 
    .ant-dropdown-menu, .ant-popover-inner, .ant-modal-content, .ant-calendar{
      background-color: ${props => props.theme.panelBackgroundColor};          
    }

    & .has-error .ant-input {
      background-color: ${props => props.theme.panelBackgroundColor};   

      &:hover {
        background-color: ${props => props.theme.panelBackgroundColor};   
      } 
    }

    & .ant-drawer-title, .ant-form-item-required > label, .ant-form-item-label > label, 
    .ant-input, .ant-select-dropdown-menu-item,.ant-dropdown-menu-item > a, .ant-drawer-close,
    .ant-modal-confirm-body .ant-modal-confirm-title h3, .ant-modal-confirm-body .ant-modal-confirm-title h5, 
    .ant-modal-confirm-content p, .ant-calendar-body, .ant-calendar-date, .ant-calendar-picker div > i{
      color: ${props => props.theme.fontColors.textRgba(0.85)};
    }

    & .ant-drawer-close {
      color: ${props => props.theme.fontColors.textRgba(0.65)};

      &:hover { 
       color: ${props => props.theme.fontColors.text};
      }
    }

    & .ant-select-dropdown-menu-item-active:not(.ant-select-dropdown-menu-item-disabled), .ant-select-dropdown-menu-item-selected {
      background-color: ${props => props.theme.hoverColor};
    }

    & .ant-fullcalendar-value, .ant-dropdown-menu-item, 
    .ant-select-dropdown-menu-item:not(.ant-select-dropdown-menu-item-disabled), 
    .ant-calendar-date {
      &:hover {
        background-color: ${props => props.theme.hoverColor};
      }
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

const Router = ({ cookies }: { cookies: Cookies }) => {
  return (
    <React.Fragment>
      <CSSReset />
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
          <Route path="/404" exact component={Window404} />
          <Redirect to="/404" />
        </Switch>
      </React.Suspense>
    </React.Fragment>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  error: state.reducer.error.user
});

export default connect(
  mapStateToProps,
  null
)(withCookies(Router));
