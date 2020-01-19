import React, { useEffect } from "react";
import { FadeIn, Loading, Sidebar, TopBar } from "components";
import { connect, useDispatch } from "react-redux";
import { ApplicationState } from "store/types";
import { Switch, Route, Redirect } from "react-router";
import { breakpoints } from "styled";
import { requestUser, signOut } from "store/effects";
import { initializePush } from "firebase/initialize";
import IRequestError from "interfaces/IRequestError";
import IUser from "interfaces/IUser";
import styled from "styled-components";
import { Alert } from "antd";
import { Schedule } from "routes";

const Home = React.lazy(() => import("routes/Home"));
const Preferences = React.lazy(() => import("routes/Preferences"));

interface IDashboardProps {
  error: IRequestError | undefined;
  user: IUser;
}

const Dashboard: React.FC<IDashboardProps> = ({ error, user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    initializePush();
  }, []);

  useEffect(() => {
    dispatch(requestUser());
  }, [dispatch]);

  useEffect(() => {
    if (error && error.status === 401) dispatch(signOut());
  }, [error, dispatch]);

  return (
    <FadeIn>
      <Wrapper>
        <Sider>
          <Sidebar />
        </Sider>
        <Content>
          {!user.verified && (
            <EmailVerificationError
              message="Check your email and activate your account!"
              banner
              closable
            />
          )}
          <TopBar />
          <React.Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/dashboard" exact component={Home} />
              <Route
                path="/dashboard/Preferences"
                exact
                component={Preferences}
              />
              <Route path="/dashboard/schedule" exact component={Schedule} />
              <Redirect to="/dashboard" />
            </Switch>
          </React.Suspense>
        </Content>
      </Wrapper>
    </FadeIn>
  );
};

const Wrapper = styled.main`
  display: flex;

  @media only screen and (max-width: ${breakpoints.bpMedium}) {
    flex-direction: column;
  }

  background-color: ${props => props.theme.backgroundColor};
`;

const EmailVerificationError = styled(Alert)`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  z-index: 100;
`;

const Sider = styled.section`
  flex: 1;
  min-height: 100vh;

  @media only screen and (max-width: ${breakpoints.bpMedium}) {
    min-height: auto;
    width: 100%;
    z-index: 1000;

    position: fixed;
    bottom: 0;
  }
`;

const Content = styled.section`
  flex: 0 0 92%;
  padding: 4rem 6rem;

  position: relative;

  @media only screen and (max-width: ${breakpoints.bpLargest}) {
    padding: 4rem 4rem;
  }

  @media only screen and (max-width: ${breakpoints.bpMedium}) {
    flex: 1;
    min-height: 100vh;
  }

  @media only screen and (max-width: ${breakpoints.bpMobileL}) {
    padding: 4rem 1rem 9rem 1rem;
  }

  @media only screen and (max-width: ${breakpoints.bpMobileS}) {
    padding: 4rem 0.2rem 10rem 0.2rem;
  }
`;

const mapStateToProps = (state: ApplicationState) => ({
  user: state.reducer.user,
  error: state.reducer.error.user
});

export default connect(mapStateToProps)(Dashboard);
