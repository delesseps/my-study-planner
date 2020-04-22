import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Loading from "components/Loading";
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

const mapStateToProps = (state: ApplicationState) => ({
  config: state.reducer.user.configuration,
});

const UnAuthenticatedApp: React.FC<IRouterProps> = ({ cookies, config }) => {
  return (
    <React.Fragment>
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/signin" />} />

          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/forgot_password" exact component={ForgotPassword} />
          <Route
            path="/change_password/:token"
            exact
            render={(props) => <ChangePassword {...props} />}
          />
          <Route
            path="/link/google/:token/:email"
            exact
            render={(props) => <LinkGoogleAccount {...props} />}
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

export default connect(mapStateToProps, null)(withCookies(UnAuthenticatedApp));
