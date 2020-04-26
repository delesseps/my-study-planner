import React from "react";
import styled from "styled-components";
import { Button, Empty } from "antd";

import { ToDoDrawer } from "components/drawers";
import { ToDoCard } from "components/cards";
import { useToDo } from "features/toDo/toDo-hooks";
import { useToggle } from "react-use";

const ToDo: React.FC = () => {
  const [openDrawer, toggleDrawer] = useToggle(false);
  const { toDos } = useToDo();

  const handleClick = () => {
    toggleDrawer(true);
  };

  return (
    <React.Fragment>
      <Header>
        <Title>To-Dos</Title>
        <Button onClick={handleClick} type="primary">
          NEW TO-DO
        </Button>
        <ToDoDrawer visible={openDrawer} setVisible={toggleDrawer} />
      </Header>
      <Content>
        {toDos.filter((toDo) => !toDo.done).length ? (
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

export default ToDo;
