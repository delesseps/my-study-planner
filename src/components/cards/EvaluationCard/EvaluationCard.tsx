import React from "react";
import styled from "styled-components";
import { Icon, Badge, Avatar } from "antd";
import { ApplicationState } from "store/types";
import { connect } from "react-redux";

const Wrapper = styled.div`
  padding: 0.8rem 2rem;
  border: 0.7px solid ${props => props.theme.fontColors.blackRgba(0.15)};
  border-radius: 5px;

  display: flex;
  flex-direction: column;

  height: 16rem;
  width: 100%;

  justify-content: space-between;
`;

const MainInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Assignment = styled.div`
  display: flex;
  flex-direction: column;
`;

const AssignmentTitle = styled.h3`
  letter-spacing: 0.5px;
  font-weight: 500;
  font-size: 1.7rem;
  color: ${props => props.theme.fontColors.blackRgba(0.8)};
`;

const AssignmentPriority = styled.h5`
  display: flex;
  align-items: center;
  color: ${props => props.theme.fontColors.blackRgba(0.5)};
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  & > *:first-child {
    margin-right: 1.5rem;
  }
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  font-size: 1.9rem;
`;

const OtherInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.h5`
  letter-spacing: 1px;
  display: flex;
  font-weight: bold;
  font-size: 1.2rem;
  align-items: center;
  color: ${props => props.theme.fontColors.blackRgba(0.6)};
  margin: 0;
  margin-left: 0.7rem;
`;

const Date = styled.h5`
  letter-spacing: 1px;
  display: flex;
  font-weight: 400;
  align-items: center;
  color: ${props => props.theme.fontColors.blackRgba(0.8)};
  margin: 0;
`;

const Clock = styled(Icon)`
  font-size: 2rem;
  margin-right: 0.7rem;
`;

interface IEvaluationCardProps {
  picture: string;
}

const EvaluationCard: React.FunctionComponent<IEvaluationCardProps> = ({
  picture
}) => {
  return (
    <Wrapper>
      <MainInfo>
        <Assignment>
          <AssignmentTitle>Quiz: Matemática Discreta</AssignmentTitle>
          <AssignmentPriority>
            <Badge color="red" />
            High Priority
          </AssignmentPriority>
        </Assignment>
        <Actions>
          <StyledIcon type="edit" />
          <StyledIcon type="delete" />
        </Actions>
      </MainInfo>
      <OtherInfo>
        <User>
          <Avatar size={30} icon="user" src={picture} />
          <UserName>José Félix</UserName>
        </User>
        <Date>
          <Clock type="clock-circle" />
          This Friday
        </Date>
      </OtherInfo>
    </Wrapper>
  );
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    picture: state.reducer.user.picture
  };
};

export default connect(
  mapStateToProps,
  null
)(EvaluationCard);
