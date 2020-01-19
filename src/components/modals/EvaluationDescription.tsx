import React from "react";
import styled from "styled-components";
import IEvaluation from "interfaces/IEvaluation";
import { Modal, Icon } from "antd";
import { setDate } from "utils";
import moment from "moment";

const EvaluationDescriptionModal = (evaluation: IEvaluation) => {
  if (!evaluation.description) evaluation.description = ""; //Check if description is null and reassign it as an empty string

  Modal.info({
    width: 470,
    title: (
      <ModalTitleWrapper>
        <ModalTitle data-testid="pizza">
          <Capitalize>{evaluation.evaluationType}</Capitalize>:{" "}
          {evaluation.subject}
        </ModalTitle>
        <ModalTime>
          <Clock type="clock-circle" />
          {setDate(moment(evaluation.date))}
        </ModalTime>
      </ModalTitleWrapper>
    ),
    content: (
      <ModalContent>
        Description: <br />
        {evaluation.description.length === 0 ? (
          <em>No Description</em>
        ) : (
          evaluation.description
        )}
      </ModalContent>
    ),
    onOk() {}
  });
};

const ModalTime = styled.h5`
  display: flex;
  font-weight: 400;
  align-items: center;
  color: rgba(27, 27, 27, 0.8);
  margin: 0;
`;

const ModalTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h3`
  letter-spacing: 0.5px;
  margin: 0;
  font-weight: 500;
  font-size: 1.7rem;
  color: rgba(27, 27, 27, 0.8);

  width: 26rem;
  word-wrap: break-word;
`;

const ModalContent = styled.p`
  margin-top: 1.3rem;
  line-height: 3rem;
`;

const Capitalize = styled.span`
  text-transform: capitalize;
`;

const Clock = styled(Icon)`
  font-size: 2rem;
  margin-right: 0.7rem;
`;

export default EvaluationDescriptionModal;
