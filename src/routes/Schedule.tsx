import React from "react";
import styled from "styled-components";
import { Empty } from "antd";
import { ReactComponent as EmptyBook } from "assets/education-books.svg";

const Schedule: React.FC = () => (
  <Wrapper>
    <ItemContainer>
      <Item>
        <Weekday>Monday</Weekday>
        <Card data-testid="mondayCard">
          <Empty
            description="Click here to add new courses"
            image={<EmptyBook width={80} />}
          />
        </Card>
      </Item>
      <Item>
        <Weekday>Tuesday</Weekday>
        <Card data-testid="tuesdayCard">
          <Empty
            description="Click here to add new courses"
            image={<EmptyBook width={80} />}
          />
        </Card>
      </Item>
      <Item>
        <Weekday>Wednesday</Weekday>
        <Card data-testid="wednesdayCard">
          <Empty
            description="Click here to add new courses"
            image={<EmptyBook width={80} />}
          />
        </Card>
      </Item>
      <Item>
        <Weekday>Thursday</Weekday>
        <Card>
          <Empty
            description="Click here to add new courses"
            image={<EmptyBook width={80} />}
          />
        </Card>
      </Item>
      <Item>
        <Weekday>Friday</Weekday>
        <Card>
          <Empty
            description="Click here to add new courses"
            image={<EmptyBook width={80} />}
          />
        </Card>
      </Item>
      <Item>
        <Weekday>Saturday</Weekday>
        <Card>
          <Empty
            description="Click here to add new courses"
            image={<EmptyBook width={80} />}
          />
        </Card>
      </Item>
    </ItemContainer>
  </Wrapper>
);

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
