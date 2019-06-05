import React from "react";
import { createGlobalStyle } from "styled-components";
import { Switch, Route, Redirect } from "react-router";
import SignIn from "components/SignIn/SignIn";
import Window404 from "components/404/Window404";

const CSSReset = createGlobalStyle`
  * {
    margin: 0; 
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%; /*1rem = 10px*/
    box-sizing: border-box;
  }

  body {
    font-size: 1.4rem;
  }
`;

const App: React.FC = () => {
  return (
    <div className="App">
      <CSSReset />
      <Switch>
        <Route path="/signin" exact component={SignIn} />
        <Route path="/404" exact component={Window404} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
};

export default App;
