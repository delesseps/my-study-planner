import React, { useEffect, useState } from "react";
import IUser from "interfaces/IUser";
import { Modal, Badge, Icon } from "antd";
import styled from "styled-components";
import UploadPicture from "components/UploadPicture/UploadPicture";

const StyledModal = styled(Modal)`
  & .ant-modal-close-icon {
    color: rgba(255, 255, 255, 0.8);
    transition: 0.15s;

    &:hover {
      color: white;
    }
  }
`;

const Wrapper = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Background = styled.div`
  position: absolute;
  background-color: ${props => props.theme.colors.main};
  top: 0;
  left: 0;
  width: 100%;
  height: 18rem;

  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 9rem;
`;

const StyledIcon = styled(Icon)`
  && {
    transition: 0.2s;
    opacity: 0;
  }
`;

const Name = styled.h2`
  font-weight: 500;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
  text-align: center;
  margin-top: 1rem;

  color: ${props => props.theme.fontColors.blackRgba(0.8)};
`;

const Role = styled.p`
  font-weight: 500;
  letter-spacing: 1px;
  margin: 0;
  font-size: 1.4rem;
  text-align: center;

  color: ${props => props.theme.fontColors.blackRgba(0.6)};
`;

const CounterRow = styled.div`
  display: flex;
  margin-top: 5rem;
  justify-content: center;

  & > div:not(:last-child) {
    margin-right: 6rem;
  }
`;

const CounterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Count = styled.h1`
  font-weight: 300;
  font-size: 3rem;
  margin-bottom: 0;

  right: 2rem;

  color: ${props => props.theme.fontColors.blackRgba(0.8)};
`;

const Assignment = styled.p`
  font-weight: 500;
  letter-spacing: 1px;
  margin: 0;
  font-size: 1.4rem;
  text-align: center;

  color: ${props => props.theme.fontColors.blackRgba(0.6)};
`;

interface IUserProfileModalProps {
  user: IUser;
  visible: boolean;
  setVisible: Function;
  me?: boolean;
}

const UserProfileModal: React.FunctionComponent<IUserProfileModalProps> = ({
  user,
  me,
  visible,
  setVisible
}) => {
  const [doneHomework, setDoneHomework] = useState(0);
  const [doneEvaluations, setDoneEvaluations] = useState(0);

  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    setDoneEvaluations(
      user.evaluations.filter(evaluation => evaluation.done).length
    );
    setDoneHomework(user.homework.filter(homework => homework.done).length);
  }, [user.evaluations, user.homework]);

  return (
    <StyledModal
      style={{
        position: "relative"
      }}
      visible={visible}
      footer={null}
      onCancel={handleClose}
    >
      <Background>&nbsp;</Background>
      <Wrapper>
        <UserBox>
          <Badge
            count={
              <StyledIcon
                type="edit"
                style={{ fontSize: 25, color: "black" }}
              />
            }
          >
            <UploadPicture />
          </Badge>
          <Name>{user.name}</Name>
          <Role>{user.role === "user" ? "Student" : "Administrator"}</Role>
          <CounterRow>
            <CounterWrapper>
              <Count>{doneHomework}</Count>
              <Assignment>Done Homework</Assignment>
            </CounterWrapper>
            <CounterWrapper>
              <Count>{doneEvaluations}</Count>
              <Assignment>Done Evaluations</Assignment>
            </CounterWrapper>
          </CounterRow>
        </UserBox>
      </Wrapper>
    </StyledModal>
  );
};

export default UserProfileModal;
