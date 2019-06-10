import React, { useEffect } from "react";
import { History } from "history";
import FadeIn from "components/FadeIn/FadeIn";
import { Dispatch } from "redux";
import { requestUser } from "store/effects";
import { connect } from "react-redux";
import { ApplicationState } from "store/types";

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

interface IHomeProps {
  history?: History;
  requestUser: Function;
}

const Home: React.FC<IHomeProps> = ({ requestUser }) => {
  useEffect(() => {
    requestUser();
  }, [requestUser]);

  return (
    <FadeIn>
      <div>Home</div>
    </FadeIn>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
