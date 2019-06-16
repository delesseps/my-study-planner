import React from "react";
import styled from "styled-components";
import { Calendar } from "antd";
import Counter from "./panels/Counter/Counter";
import FadeIn from "components/FadeIn/FadeIn";
import { breakpoints } from "styled";

const HomeSchedule = React.lazy(() => import("./HomeSchedule"));

const panelTheme = `background-color: #fff; border-radius: 4px; padding: 2rem 2.6rem;`;

const Wrapper = styled.section`
  display: grid;
  margin-top: 8rem;
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
  ${panelTheme};

  grid-area: left;
`;

const CounterPanelRight = styled.div`
  ${panelTheme};
  box-shadow: ${props => props.theme.shadow1};
  height: 13rem;
  position: relative;

  grid-area: right;
`;

const RecommendedActionsPanel = styled.div`
  ${panelTheme};
  box-shadow: ${props => props.theme.shadow1};
  height: 30rem;
  overflow-y: auto;

  grid-area: ractions;
  grid-row: auto;
`;

const CalendarPanel = styled.div`
  max-height: 40rem;
  align-self: start;

  background-color: #fff;
  border-radius: 4px;
  box-shadow: ${props => props.theme.shadow1};

  grid-area: calendar;
  grid-row: auto;
`;

const HomeSchedulePanel = styled.div`
  height: 48.9rem;
  margin-top: -17rem;
  grid-area: schedule;

  ${panelTheme};
  box-shadow: ${props => props.theme.shadow1};
  padding: 1rem;

  @media only screen and (max-width: ${breakpoints.bpLargest}) {
    height: 56.9rem;
  }
`;

const ToDoPanel = styled.div`
  ${panelTheme};

  box-shadow: ${props => props.theme.shadow1};
  min-height: 30rem;

  overflow-y: auto;

  grid-area: todo;
`;

const HomeworkPanel = styled.div`
  ${panelTheme};

  box-shadow: ${props => props.theme.shadow1};
  min-height: 30rem;

  overflow-y: auto;

  grid-area: homework;
`;

const EvaluationPanel = styled.div`
  ${panelTheme};

  box-shadow: ${props => props.theme.shadow1};
  min-height: 30rem;

  overflow-y: auto;

  grid-area: evaluation;
`;

const Home: React.FC = props => {
  return (
    <FadeIn>
      <Wrapper>
        <CounterPanelLeft>
          <Counter homework />
        </CounterPanelLeft>
        <CounterPanelRight>
          <Counter />
        </CounterPanelRight>

        <HomeSchedulePanel>
          <HomeSchedule />
        </HomeSchedulePanel>
        <ToDoPanel />

        <HomeworkPanel />

        <EvaluationPanel />

        <RecommendedActionsPanel />
        <CalendarPanel>
          <Calendar fullscreen={false} />
        </CalendarPanel>
      </Wrapper>
    </FadeIn>
  );
};

export default Home;
