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

const Wrapper = styled.main`
  display: flex;
`;

const Sider = styled.section`
  flex: 0 0 8%;
`;

const Content = styled.section`
  flex: 0 0 92%;
  padding: 4rem 6rem;
`;

interface IHomeProps {
  requestUser: Function;
  signOut: Function;
  error: IRequestError | undefined;
}

const Home: React.FC<IHomeProps> = ({ error, requestUser, signOut }) => {
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
        </Content>
      </Wrapper>
    </FadeIn>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
