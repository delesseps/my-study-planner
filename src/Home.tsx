import React, { useEffect } from "react";
import FadeIn from "components/FadeIn/FadeIn";
import { Dispatch } from "redux";
import { requestUser } from "store/effects";
import { connect } from "react-redux";
import { ApplicationState } from "store/types";
import styled from "styled-components";
import Sidebar from "components/Sidebar/Sidebar";
import TopBar from "components/TopBar/TopBar";

const mapStateToProps = (state: ApplicationState) => {
  return {
    isLoading: state.reducer.loading,
    user: state.reducer.user
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    requestUser: () => dispatch<any>(requestUser())
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
}

const Home: React.FC<IHomeProps> = ({ requestUser }) => {
  useEffect(() => {
    requestUser();
  }, [requestUser]);

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
