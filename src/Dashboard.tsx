import React, { useEffect } from "react";
import FadeIn from "components/FadeIn/FadeIn";
import { Dispatch } from "redux";
import { requestUser, signOut } from "store/effects";
import { connect } from "react-redux";
import { ApplicationState } from "store/types";
import styled from "styled-components";
import Sidebar from "components/Sidebar/Sidebar";
import TopBar from "components/TopBar/TopBar";
import IRequestError from "interfaces/IRequestError";
import { Switch, Route } from "react-router";
import Loading from "components/Loading/Loading";
import { breakpoints } from "styled";

const Home = React.lazy(() => import("Routes/Home/Home"));
const Schedule = React.lazy(() => import("Routes/Schedule/Schedule"));
const FriendsClasses = React.lazy(() =>
  import("Routes/FriendsClasses/FriendsClasses")
);
const Grades = React.lazy(() => import("Routes/Grades/Grades"));
const Intranet = React.lazy(() => import("components/Intranet/Intranet"));
const Preferences = React.lazy(() =>
  import("components/Preferences/Preferences")
);

const Wrapper = styled.main`
  display: flex;
  background-color: ${props => props.theme.backgroundColor};
`;

const Sider = styled.section`
  flex: 1;
  min-height: 100vh;
`;

const Content = styled.section`
  flex: 0 0 92%;
  padding: 4rem 6rem;

  position: relative;

  @media only screen and (max-width: ${breakpoints.bpLargest}) {
    padding: 4rem 4rem;
  }
`;
interface IDashboardProps {
  requestUser: Function;
  signOut: Function;
  error: IRequestError | undefined;
}

const Dashboard: React.FC<IDashboardProps> = ({
  error,
  requestUser,
  signOut
}) => {
  useEffect(() => {
    requestUser();
  }, [requestUser]);

  useEffect(() => {
    if (error && error.status === 401) signOut();
  }, [error, signOut]);

  return (
    <FadeIn>
      <Wrapper>
        <Sider>
          <Sidebar />
        </Sider>
        <Content>
          <TopBar />

          <React.Suspense fallback={<Loading />}>
            <Switch>
              <Route path="/dashboard" exact component={Home} />
              <Route path="/dashboard/intranet" exact component={Intranet} />
              <Route path="/dashboard/grades" exact component={Grades} />
              <Route
                path="/dashboard/friends-classes"
                exact
                component={FriendsClasses}
              />
              <Route path="/dashboard/schedule" exact component={Schedule} />
              <Route
                path="/dashboard/Preferences"
                exact
                component={Preferences}
              />
            </Switch>
          </React.Suspense>
        </Content>
      </Wrapper>
    </FadeIn>
  );
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    error: state.reducer.error.user
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    requestUser: () => dispatch<any>(requestUser()),
    signOut: () => dispatch<any>(signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
