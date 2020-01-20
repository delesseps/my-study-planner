import React, { useState } from "react";
import styled from "styled-components";
import { Empty } from "antd";
import { ReactComponent as EmptyBook } from "assets/education-books.svg";
import { useToggle } from "react-use";
import { WeekdayCourses } from "components/modals";

const Schedule: React.FC = () => {
  const [showWeekdayModal, toggleWeekdayModal] = useToggle(false);
  const [modalWeekday, setModalWeekday] = useState("");

  const openModal = (weekday: string) => () => {
    setModalWeekday(weekday);
    toggleWeekdayModal(true);
  };

  return (
    <Wrapper>
      <WeekdayCourses
        visible={showWeekdayModal}
        setVisible={toggleWeekdayModal}
        weekday={modalWeekday}
      />
      <ItemContainer>
        <Item>
          <Weekday>Monday</Weekday>
          <Card data-testid="mondayCard" onClick={openModal("monday")}>
            <Empty
              description="Click here to add new courses"
              image={<EmptyBook width={80} />}
            />
          </Card>
        </Item>
        <Item>
          <Weekday>Tuesday</Weekday>
          <Card data-testid="tuesdayCard" onClick={openModal("tuesday")}>
            <Empty
              description="Click here to add new courses"
              image={<EmptyBook width={80} />}
            />
          </Card>
        </Item>
        <Item>
          <Weekday>Wednesday</Weekday>
          <Card data-testid="wednesdayCard" onClick={openModal("wednesday")}>
            <Empty
              description="Click here to add new courses"
              image={<EmptyBook width={80} />}
            />
          </Card>
        </Item>
        <Item>
          <Weekday>Thursday</Weekday>
          <Card onClick={openModal("thursday")}>
            <Empty
              description="Click here to add new courses"
              image={<EmptyBook width={80} />}
            />
          </Card>
        </Item>
        <Item>
          <Weekday>Friday</Weekday>
          <Card onClick={openModal("friday")}>
            <Empty
              description="Click here to add new courses"
              image={<EmptyBook width={80} />}
            />
          </Card>
        </Item>
        <Item>
          <Weekday>Saturday</Weekday>
          <Card onClick={openModal("saturday")}>
            <Empty
              description="Click here to add new courses"
              image={<EmptyBook width={80} />}
            />
          </Card>
        </Item>
      </ItemContainer>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 4rem;
`;

const ItemContainer = styled.div`
  align-self: center;

  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const Item = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;
`;

const Weekday = styled.h1`
  font-weight: 600;
  font-size: 2.6rem;

  color: ${props => props.theme.fontColors.textRgba(0.8)};
`;

const Card = styled.div`
  padding: 2rem 6rem;
  margin-left: 4rem;

  cursor: pointer;

  background-color: ${props => props.theme.panelBackgroundColor};

  box-shadow: ${({ theme }) => theme.shadow1};

  border-radius: ${({ theme }) => theme.borderRadius};
`;

export default Schedule;
