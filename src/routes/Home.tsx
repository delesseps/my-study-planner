import React from 'react'
import styled from 'styled-components'
import {useWindowSize} from 'react-use'

import {FadeIn, Profiler} from 'components'
import {breakpoints} from 'theme'
import {
  CounterPanel,
  EvaluationPanel,
  HomeworkPanel,
  ToDoPanel,
  RecommendedActionsPanel,
  CalendarPanel,
} from 'components/panels'
import {useAuth} from 'features/auth/auth-context'

const HomeSchedulePanel = React.lazy(() =>
  import('../components/panels/HomeSchedulePanel'),
)
const WelcomeModal = React.lazy(() => import('../components/modals/Welcome'))

const Home: React.FC = () => {
  const {user} = useAuth()
  const {width} = useWindowSize()

  const isMobile = width <= 425

  return (
    <Profiler id="Home Screen">
      <FadeIn>
        <Wrapper>
          <WelcomeModal />
          <CounterPanelLeft>
            <CounterPanel user={user} homework />
          </CounterPanelLeft>
          <CounterPanelRight>
            <CounterPanel user={user} />
          </CounterPanelRight>

          {!isMobile && (
            <HomeSchedulePanelWrapper>
              <HomeSchedulePanel />
            </HomeSchedulePanelWrapper>
          )}

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
    </Profiler>
  )
}

const panelTheme = `border-radius: 4px;`

const Wrapper = styled.section`
  display: grid;
  margin-top: 6rem;
  grid-gap: 3rem;
  grid-template-areas:
    'left right ractions'
    'schedule schedule calendar'
    'todo homework evaluation ';
  grid-template-columns: repeat(3, 0.5fr);

  @media only screen and (max-width: ${breakpoints.bpLargeMedium}) {
    grid-template-areas:
      'left right'
      'schedule schedule'
      'evaluation ractions'
      'homework todo'
      'calendar calendar';
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: ${breakpoints.bpMobileL}) {
    grid-template-areas:
      'left '
      'right'
      'calendar'
      'evaluation'
      'homework'
      'ractions'
      'todo'
      'schedule';
    grid-template-columns: 1fr;
  }
`

const CounterPanelLeft = styled.div`
  box-shadow: ${props => props.theme.shadow1};
  height: 13rem;
  position: relative;

  padding: 2rem 2.6rem;
  background-color: ${props => props.theme.panelBackgroundColor};

  ${panelTheme};

  grid-area: left;
`

const CounterPanelRight = styled.div`
  ${panelTheme};
  box-shadow: ${props => props.theme.shadow1};
  height: 13rem;
  position: relative;
  background-color: ${props => props.theme.panelBackgroundColor};

  padding: 2rem 2.6rem;

  grid-area: right;
`

const CalendarPanelWrapper = styled.div`
  align-self: start;

  background-color: #fff;
  border-radius: 4px;
  box-shadow: ${props => props.theme.shadow1};
  background-color: ${props => props.theme.panelBackgroundColor};

  grid-area: calendar;
  grid-row: auto;
`

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

  @media only screen and (max-width: ${breakpoints.bpLargeMedium}) {
    margin-top: 0;
  }
`

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
`

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
`

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
`

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
`

export default Home
