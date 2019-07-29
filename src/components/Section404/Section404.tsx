import * as React from "react";

import { ReactComponent as SVG404White } from "assets/404-white.svg";
import { ReactComponent as SVG404 } from "assets/404.svg";

import styled from "styled-components";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const Wrapper = styled.section`
  display: flex;

  flex: 1;

  justify-content: space-around;
  margin-top: 6rem;

  background-color: ${props => props.theme.backgroundColor};
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  margin-bottom: 20rem;

  color: ${props => props.theme.fontColors.text};

  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-weight: 500;
  font-size: 9.6rem;

  text-transform: uppercase;

  color: inherit;
`;

const Text = styled.h2`
  margin: 0;
  width: 35rem;
  font-weight: 400;
  text-align: center;

  color: inherit;
`;

const StyledButton = styled(Button)`
  width: 12rem;
  margin-top: 2rem;
`;

const StyledSVG = styled(SVG404)`
  width: 100rem;
  margin-bottom: 17rem;
`;

const StyledSVGWhite = styled(SVG404White)`
  width: 100rem;
  margin-bottom: 17rem;
`;

interface I404Props {
  white?: boolean;
}

const Section404: React.FunctionComponent<I404Props> = ({ white }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(push("/signin"));
  };

  return (
    <Wrapper>
      <LeftWrapper>
        <Title>Oops...</Title>
        <Text>Looks like the page you are looking for doesn't exist!</Text>
        <StyledButton onClick={handleClick} size="large" type="primary">
          GO BACK
        </StyledButton>
      </LeftWrapper>
      {white ? <StyledSVGWhite /> : <StyledSVG />}
    </Wrapper>
  );
};

export default Section404;
