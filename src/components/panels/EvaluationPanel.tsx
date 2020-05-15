import React from 'react'
import styled from 'styled-components'
import {Button, Empty} from 'antd'
import {useToggle} from 'react-use'

import {EvaluationCard} from 'components/cards'
import IEvaluation from 'constants/interfaces/IEvaluation'
import {useEvaluations} from 'features/evaluation/evaluation-hooks'

const EvaluationDrawer = React.lazy(() =>
  import('components/drawers/EvaluationDrawer'),
)

interface IEvaluationProps {
  evaluations?: IEvaluation[]
}

const Evaluation: React.FC<IEvaluationProps> = () => {
  const [openDrawer, toggleDrawer] = useToggle(false)
  const {evaluations} = useEvaluations()

  const handleClick = () => {
    toggleDrawer(true)
  }

  return (
    <React.Fragment>
      <Header>
        <Title>Evaluations</Title>
        <Button onClick={handleClick} type="primary">
          NEW EVALUATION
        </Button>
        <EvaluationDrawer visible={openDrawer} setVisible={toggleDrawer} />
      </Header>
      <Content>
        {evaluations?.filter(evaluation => !evaluation.done).length ? (
          evaluations.map(
            (evaluation, i) =>
              !evaluation.done && (
                <EvaluationCard
                  index={i}
                  key={evaluation._id}
                  evaluation={evaluation}
                />
              ),
          )
        ) : (
          <StyledEmpty description="No Evaluations" />
        )}
      </Content>
    </React.Fragment>
  )
}

const Header = styled.div`
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

  & > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`

const StyledEmpty = styled(Empty)`
  && {
    margin-top: auto;
    margin-bottom: auto;
  }
`

export default Evaluation
