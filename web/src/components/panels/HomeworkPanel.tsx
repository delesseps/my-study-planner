import React from 'react'
import styled from 'styled-components'
import {Button, Empty} from 'antd'
import {useToggle} from 'react-use'

import {HomeworkCard} from 'components/cards'
import {useHomework} from 'features/homework/homework-hooks'
import {useAuth} from 'features/auth/auth-context'

const HomeworkDrawer = React.lazy(() =>
  import('components/drawers/HomeworkDrawer'),
)

const Homework: React.FC = () => {
  const [openDrawer, toggleDrawer] = useToggle(false)
  const {homework} = useHomework()
  const {user} = useAuth()

  const handleClick = () => {
    toggleDrawer(true)
  }

  const filteredHomework = React.useMemo(() => {
    return homework.filter(homework => !homework.done.includes(user._id))
  }, [homework, user._id])

  return (
    <React.Fragment>
      <Header>
        <Title>Homework</Title>
        <Button onClick={handleClick} type="primary">
          NEW HOMEWORK
        </Button>
        <HomeworkDrawer visible={openDrawer} setVisible={toggleDrawer} />
      </Header>
      <Content data-testid="homework-cards">
        {filteredHomework.length ? (
          filteredHomework.map((homework, i) => (
            <HomeworkCard index={i} key={homework._id} homework={homework} />
          ))
        ) : (
          <StyledEmpty description="No Homework" />
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

export default Homework
