import React from "react";
import styled from "styled-components";
import { DeleteOutlined } from "@ant-design/icons";
import { Badge, Checkbox, Popconfirm, Tooltip } from "antd";

import { determineColor } from "utils";
import { useToDo } from "features/toDo/toDo-hooks";
import IToDo from "constants/interfaces/IToDo";

interface IToDoCardProps {
  toDo: IToDo;
  index: number;
}

const ToDoCard: React.FC<IToDoCardProps> = ({ toDo, index }) => {
  const {
    remove: [removeMutate],
    edit: [editMutate],
  } = useToDo();

  const handleDeleteClick = () => {
    removeMutate({ id: toDo._id, index });
  };

  const handleDoneClick = () => {
    toDo.done = true;
    editMutate({ toDo, index });
  };

  return (
    <Wrapper>
      <RowWrapper>
        <Badge color={determineColor(toDo.urgency)} />
        <TaskTitle>{toDo.task}</TaskTitle>
      </RowWrapper>
      <RowWrapper>
        <Action>
          <Tooltip title="Delete" mouseEnterDelay={0.4}>
            <Popconfirm
              title="Are you sure to delete this to-do?"
              arrowPointAtCenter={true}
              okText="Yes"
              cancelText="No"
              onConfirm={handleDeleteClick}
            >
              <DeleteIcon />
            </Popconfirm>
          </Tooltip>
        </Action>
        <Action>
          <Tooltip title="Done" mouseEnterDelay={0.4}>
            <Checkbox onChange={handleDoneClick} />
          </Tooltip>
        </Action>
      </RowWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 2rem 2rem;

  border-top: 0.5px solid ${(props) => props.theme.fontColors.textRgba(0.2)};
  border-bottom: 0.5px solid ${(props) => props.theme.fontColors.textRgba(0.2)};

  width: 100%;
`;

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Action = styled.button`
  border: none;
  background: transparent;

  outline: none;
`;

const TaskTitle = styled.h3`
  text-transform: capitalize;
  margin-bottom: 0;
  font-weight: 400;

  letter-spacing: 1px;
  font-size: 1.7rem;
  color: ${(props) => props.theme.fontColors.textRgba(0.8)};
`;

const DeleteIcon = styled(DeleteOutlined)`
  cursor: pointer;
  font-size: 1.9rem;
  transition: 0.1s;
  margin-right: 1.5rem;

  &:hover {
    color: ${(props) => props.theme.colors.main};
  }
`;

export default ToDoCard;
