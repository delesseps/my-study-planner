import React from "react";
import IUser from "interfaces/IUser";
import { ApplicationState } from "store/types";
import { connect } from "react-redux";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;

  color: ${props => props.theme.fontColors.blackRgba(0.8)};
`;

const Subtitle = styled.h5`
  font-weight: 500;
  letter-spacing: 1px;
  margin-bottom: 0rem;

  color: ${props => props.theme.fontColors.blackRgba(0.5)};
`;

const Count = styled.h1`
  font-weight: 300;
  font-size: 5.9rem;
  position: absolute;
  margin-bottom: 0;

  bottom: 0;
  right: 2rem;

  color: ${props => props.theme.fontColors.blackRgba(0.8)};
`;

const mapStateToProps = (state: ApplicationState) => {
  return {
    user: state.reducer.user
  };
};

interface ICounterProps {
  homework?: boolean;
  user: IUser;
}

const Counter: React.FC<ICounterProps> = ({ user, homework }) => {
  return (
    <>
      <Header>
        <Title>{homework ? "Homework" : "Evaluations"}</Title>
        <Subtitle>This week</Subtitle>
      </Header>
      <Count>{homework ? user.homework.length : user.evaluations.length}</Count>
    </>
  );
};

export default connect(
  mapStateToProps,
  null
)(Counter);
