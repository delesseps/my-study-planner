import React from 'react'
import styled from 'styled-components'
import {Empty} from 'antd'

import moment from 'moment'

import {determinePriorityNumber, determinePriorityDateNumber} from 'utils'
import {RecommendedActionCard} from 'components/cards'
import IEvaluation from 'constants/interfaces/IEvaluation'
import IHomework from 'constants/interfaces/IHomework'
import {useEvaluations} from 'features/evaluation/evaluation-hooks'
import {useHomework} from 'features/homework/homework-hooks'
import {useAuth} from 'features/auth/auth-context'

const RecommendedActionsPanel: React.FC = () => {
  const {evaluations} = useEvaluations()
  const {homework} = useHomework()
  const {user} = useAuth()

  const recommendedActions = React.useMemo(() => {
    const userAssignments = [...evaluations, ...homework]

    return userAssignments
      .sort(
        (a, b) =>
          determinePriorityNumber(b.urgency) +
          determinePriorityDateNumber(moment(b.date)) -
          (determinePriorityNumber(a.urgency) +
            determinePriorityDateNumber(moment(a.date))),
      )
      .filter(
        (assignment: IEvaluation | IHomework) =>
          !assignment.done.includes(user._id),
      )
  }, [evaluations, homework, user._id])

  return (
    <section>
      <Header>
        <Title>Recommended Actions</Title>
      </Header>
      <Content>
        {recommendedActions.length ? (
          recommendedActions.map((assignment: IEvaluation | IHomework) => (
            <RecommendedActionCard
              key={assignment._id}
              assignment={assignment}
            />
          ))
        ) : (
          <StyledEmpty description="No Recomendations" />
        )}
      </Content>
    </section>
  )
}

const Header = styled.header`
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.fontColors.textRgba(0.1)};
`

const Title = styled.h3`
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;

  color: ${props => props.theme.fontColors.textRgba(0.8)};
`

const Content = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`

const StyledEmpty = styled(Empty)`
  && {
    margin-top: auto;
    margin-bottom: auto;
  }
`

export default RecommendedActionsPanel
