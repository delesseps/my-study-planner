import * as React from "react";
import { ReactComponent as Logo } from "assets/logo.svg";
import styled from "styled-components";
import { Section404 } from "components";

interface I404Props {
  white?: boolean;
}

const Window404: React.FunctionComponent<I404Props> = ({ white }) => {
  return (
    <Wrapper>
      <LogoBox>
        <StyledLogo />
        <LogoTitle>My Study Planner</LogoTitle>
      </LogoBox>
      <Section404 white={white} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;

  padding: 2rem;

  background-color: ${props => props.theme.backgroundColor};
`;

const StyledLogo = styled(Logo)`
  width: 5rem;
  height: 5rem;

  margin-right: 1.5rem;
`;

const LogoTitle = styled.h2`
  margin-bottom: 0.8rem;
  font-weight: 400;
  letter-spacing: 1px;

  color: ${props => props.theme.fontColors.text};
`;

export default Window404;
