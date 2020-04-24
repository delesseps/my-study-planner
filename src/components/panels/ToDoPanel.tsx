import React from "react";
import styled from "styled-components";
import { Button, Empty } from "antd";
import { ApplicationState } from "store/types";
import { connect, useDispatch } from "react-redux";
import IToDo from "constants/interfaces/IToDo";
import { toDoDrawer } from "store/actions";
import { ToDoDrawer } from "components/drawers";
import { ToDoCard } from "components/cards";

const mapStateToProps = (state: ApplicationState) => ({
  toDos: state.reducer.user.toDos,
});

interface IEvaluationProps {
  toDos?: IToDo[];
}

const ToDo: React.FunctionComponent<IEvaluationProps> = ({ toDos }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toDoDrawer());
  };

  return (
    <React.Fragment>
      <Header>
        <Title>To-Dos</Title>
        <Button onClick={handleClick} type="primary">
          NEW TO-DO
        </Button>
        <ToDoDrawer />
      </Header>
      <Content>
        {toDos?.filter((toDo) => !toDo.done).length ? (
          toDos.map(
            (toDo, i) =>
              !toDo.done && <ToDoCard index={i} key={toDo._id} toDo={toDo} />
          )
        ) : (
          <StyledEmpty description="No To-Dos" />
        )}
      </Content>
    </React.Fragment>
  );
};

const Header = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.fontColors.textRgba(0.1)};
`;

const Title = styled.h3`
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;

  color: ${(props) => props.theme.fontColors.textRgba(0.8)};
`;

const Content = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const StyledEmpty = styled(Empty)`
  && {
    margin-top: auto;
    margin-bottom: auto;
  }
`;

export default connect(mapStateToProps, null)(ToDo);
