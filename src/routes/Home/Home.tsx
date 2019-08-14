/**
 *
 * @TODO:
 * - Make component responsive
 *
 */

import React from "react";
import styled from "styled-components";
import FadeIn from "components/FadeIn/FadeIn";
import { breakpoints } from "styled";
import CounterPanel from "components/panels/CounterPanel/CounterPanel";
import EvaluationPanel from "components/panels/EvaluationPanel/EvaluationPanel";
import HomeworkPanel from "components/panels/HomeworkPanel/HomeworkPanel";
import ToDoPanel from "components/panels/ToDoPanel/ToDoPanel";
import RecommendedActionsPanel from "components/panels/RecommendedActionsPanel/RecommendedActionsPanel";
import CalendarPanel from "components/panels/CalendarPanel/CalendarPanel";
import WelcomeModal from "components/modals/WelcomeModal/WelcomeModal";

const HomeSchedulePanel = React.lazy(() =>
  import("../../components/panels/HomeSchedulePanel/HomeSchedulePanel")
);

const panelTheme = `border-radius: 4px;`;

const Wrapper = styled.section`
  display: grid;
  margin-top: 6rem;
  grid-gap: 3rem;
  grid-template-areas:
    "left right ractions"
    "schedule schedule calendar"
    "todo homework evaluation ";
  grid-template-columns: repeat(3, 0.5fr);
`;

const CounterPanelLeft = styled.div`
  box-shadow: ${props => props.theme.shadow1};
  height: 13rem;
  position: relative;

  padding: 2rem 2.6rem;
  background-color: ${props => props.theme.panelBackgroundColor};

  ${panelTheme};

  grid-area: left;
`;

const CounterPanelRight = styled.div`
  ${panelTheme};
  box-shadow: ${props => props.theme.shadow1};
  height: 13rem;
  position: relative;
  background-color: ${props => props.theme.panelBackgroundColor};

  padding: 2rem 2.6rem;

  grid-area: right;
`;

const CalendarPanelWrapper = styled.div`
  max-height: 40rem;
  align-self: start;

  background-color: #fff;
  border-radius: 4px;
  box-shadow: ${props => props.theme.shadow1};
  background-color: ${props => props.theme.panelBackgroundColor};

  grid-area: calendar;
  grid-row: auto;
`;

const HomeSchedulePanelWrapper = styled.div`
  height: 48.9rem;
  margin-top: -17rem;
  padding: 2rem 2.6rem;
  background-color: ${props => props.theme.panelBackgroundColor};

  grid-area: schedule;

  ${panelTheme};
  box-shadow: ${props => props.theme.shadow1};
  padding: 1rem;

  @media only screen and (max-width: ${breakpoints.bpLargest}) {
    height: 56.9rem;
  }
`;

const RecommendedActionsPanelWrapper = styled.div`
  ${panelTheme};
  box-shadow: ${props => props.theme.shadow1};
  height: 30rem;
  overflow-y: auto;
  background-color: ${props => props.theme.panelBackgroundColor};

  display: flex;
  flex-direction: column;

  grid-area: ractions;
  grid-row: auto;
`;

const ToDoPanelWrapper = styled.div`
  ${panelTheme};

  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.panelBackgroundColor};

  box-shadow: ${props => props.theme.shadow1};
  min-height: 30rem;
  max-height: 60rem;

  overflow-y: auto;

  grid-area: todo;
`;

const HomeworkPanelWrapper = styled.div`
  ${panelTheme};

  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.panelBackgroundColor};

  box-shadow: ${props => props.theme.shadow1};
  min-height: 30rem;
  max-height: 60rem;

  overflow-y: auto;

  grid-area: homework;
`;

const EvaluationPanelWrapper = styled.div`
  ${panelTheme};

  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.panelBackgroundColor};

  box-shadow: ${props => props.theme.shadow1};
  min-height: 30rem;
  max-height: 60rem;

  overflow-y: auto;

  grid-area: evaluation;
`;

const Home: React.FC = props => {
  return (
    <FadeIn>
      <Wrapper>
        <WelcomeModal />
        <CounterPanelLeft>
          <CounterPanel homework />
        </CounterPanelLeft>
        <CounterPanelRight>
          <CounterPanel />
        </CounterPanelRight>

        <HomeSchedulePanelWrapper>
          <HomeSchedulePanel />
        </HomeSchedulePanelWrapper>

        <ToDoPanelWrapper>
          <ToDoPanel />
        </ToDoPanelWrapper>

        <HomeworkPanelWrapper>
          <HomeworkPanel />
        </HomeworkPanelWrapper>

        <EvaluationPanelWrapper>
          <EvaluationPanel />
        </EvaluationPanelWrapper>

        <RecommendedActionsPanelWrapper>
          <RecommendedActionsPanel />
        </RecommendedActionsPanelWrapper>

        <CalendarPanelWrapper>
          <CalendarPanel />
        </CalendarPanelWrapper>
      </Wrapper>
    </FadeIn>
  );
};

export default Home;
