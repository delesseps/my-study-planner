import React from "react";
import { createGlobalStyle } from "styled-components";
import { Switch, Route, Redirect } from "react-router";
import Home from "./Home";
import Loading from "components/Loading/Loading";
import { breakpoints } from "styled";

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
`;

const App: React.FC = () => {
  return (
    <div className="App">
      <CSSReset />
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/404" exact component={Window404} />
          <Redirect to="/404" />
        </Switch>
      </React.Suspense>
    </div>
  );
};

export default App;
