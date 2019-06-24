import React from "react";
import { createGlobalStyle } from "styled-components";
import { Switch, Route, Redirect } from "react-router";
import App from "./App";
import Loading from "components/Loading/Loading";
import { breakpoints } from "styled";
import { withCookies, Cookies } from "react-cookie";

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
    color: ${props => props.theme.fontColors.black};
    background-color: ${props => props.theme.backgroundColor};
  }

  *::-webkit-scrollbar {
    background-color:#fff;
    width:14px
  }
  
  *::-webkit-scrollbar-track {
    background-color:#fff
  }

 
  *::-webkit-scrollbar-thumb {
    background-color:#babac0;
    border-radius:16px;
    border:4px solid #fff
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
                <App />
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

export default withCookies(Router);
