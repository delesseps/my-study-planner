import React, { useState, useCallback } from "react";
import styled, { keyframes, DefaultTheme } from "styled-components";
import QueueAnim from "rc-queue-anim";
import { Button } from "antd";
import { EnvironmentOutlined, PlusOutlined } from "@ant-design/icons";

import { Weekdays, ICourse } from "constants/interfaces/course";

const CourseDrawer = React.lazy(() =>
  import("components/drawers/CourseDrawer")
);

const mockData: Partial<ICourse>[] = [
  {
    _id: "1",
    name: "Calculo diferencial",
    schedule: {
      [Weekdays.monday]: {
        start: 900,
        end: 1080,
        classroom: "FR1-301",
      },
      [Weekdays.wednesday]: {
        start: 1080,
        end: 1200,
        classroom: "FR1-608",
      },
    },
  },
  {
    _id: "2",
    name: "Español II",
    schedule: {
      [Weekdays.monday]: {
        start: 1080,
        end: 1200,
        classroom: "FR1-301",
      },
      [Weekdays.wednesday]: {
        start: 900,
        end: 1080,
        classroom: "FR1-608",
      },
    },
  },
];

const addPadToTime = (number: number) => (number < 10 ? "0" + number : number);

const Schedule: React.FC = () => {
  const [openDrawer, toggleDrawer] = useState(false);
  const [currentDay, setCurrentDay] = useState<Weekdays>(Weekdays.monday);

  const WeekdayTab = useCallback(
    ({ day, children }: { day: Weekdays; children: string }) => {
      const changeDay = (day: Weekdays) => () => {
        setCurrentDay(day);
      };

      return (
        <Styles.Tab
          className={currentDay === day ? "active" : ""}
          onClick={changeDay(day)}
        >
          {children}
        </Styles.Tab>
      );
    },
    [currentDay]
  );

  return (
    <Styles.Wrapper>
      <CourseDrawer visible={openDrawer} setVisible={toggleDrawer} />
      <Styles.Tabs>
        <WeekdayTab day={Weekdays.monday}>Mon</WeekdayTab>
        <WeekdayTab day={Weekdays.tuesday}>Tus</WeekdayTab>
        <WeekdayTab day={Weekdays.wednesday}>Wed</WeekdayTab>
        <WeekdayTab day={Weekdays.thursday}>Thu</WeekdayTab>
        <WeekdayTab day={Weekdays.friday}>Fri</WeekdayTab>
        <WeekdayTab day={Weekdays.saturday}>Sat</WeekdayTab>
        <WeekdayTab day={Weekdays.sunday}>Sun</WeekdayTab>
      </Styles.Tabs>
      <Styles.Body>
        {mockData?.map(({ _id, name, schedule }: Partial<ICourse>) => {
          if (schedule && schedule[currentDay]) {
            const { start, end } = {
              start: schedule[currentDay]?.start,
              end: schedule[currentDay]?.end,
            };

            const startTime =
              start &&
              `${addPadToTime(start / 60)}:${addPadToTime(start % 60)}`;
            const endTime =
              end && `${addPadToTime(end / 60)}:${addPadToTime(end % 60)}`;

            return (
              <Card.Wrapper key={_id}>
                <Card.Schedule>
                  <span>{startTime}</span>
                  <span>-</span>
                  <span>{endTime}</span>
                </Card.Schedule>
                <Card.Content>
                  <Card.CourseName>{name}</Card.CourseName>
                  <CourseLocation.Wrapper>
                    <CourseLocation.Icon />
                    <CourseLocation.Classroom>
                      {schedule[currentDay]?.classroom}
                    </CourseLocation.Classroom>
                  </CourseLocation.Wrapper>
                </Card.Content>
              </Card.Wrapper>
            );
          }
        })}
      </Styles.Body>
      <Button
        key={"add-button"}
        type="primary"
        shape="circle"
        onClick={() => toggleDrawer(true)}
        icon={<PlusOutlined />}
        size="large"
      />
    </Styles.Wrapper>
  );
};

const animations = {
  active: (theme: DefaultTheme) => keyframes`
  from { 
    background-color: transparent;     
  }
  to { 
    background-color: ${theme.colors.main};   
  }
`,
};

const Styles = {
  Wrapper: styled.section`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    padding-top: 2rem;
  `,
  Tabs: styled.div`
    display: flex;

    & > *:not(:last-child) {
      margin-right: 7rem;
    }
  `,
  Tab: styled.div<{ active?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 6rem;

    padding: 1.3rem 0.7rem;

    border-radius: 4px;

    font-size: 2.2rem;
    font-weight: 500;
    color: ${({ theme }) => theme.fontColors.text};

    cursor: pointer;

    transition: 0.2s ease-out;

    &:not(.active):hover {
      background-color: ${({ theme }) => theme.colors.mainRgba(0.1)};
    }

    &.active {
      color: white;
      animation: ${({ theme }) => animations.active(theme)} 0.3s ease-out
        forwards;
    }
  `,
  Body: styled(QueueAnim)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: 4rem 0;
  `,
};

const Card = {
  Wrapper: styled.div`
    display: flex;

    border-radius: ${({ theme }) => theme.borderRadius};

    background-color: ${({ theme }) => theme.panelBackgroundColor};

    min-width: 47rem;
    max-width: 47rem;

    box-shadow: ${({ theme }) => theme.shadow1};

    &:not(:last-child) {
      margin-bottom: 2.5rem;
    }
  `,
  Schedule: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 2rem 3rem;

    color: white;
    font-weight: 500;
    font-size: 1.2rem;

    border-top-left-radius: ${({ theme }) => theme.borderRadius};
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius};

    background-color: ${({ theme }) => theme.colors.main};
  `,
  Content: styled.div`
    width: 100%;

    padding: 2.5rem 4rem;
  `,
  CourseName: styled.h1`
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: 0.6px;

    color: ${({ theme }) => theme.fontColors.text};
  `,
};

const CourseLocation = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;

    & > *:not(:last-child) {
      margin-right: 0.6rem;
    }
  `,
  Classroom: styled.span`
    font-size: 1.2rem;
    letter-spacing: 0.6px;
    font-weight: 600;
    text-transform: uppercase;
  `,
  Icon: styled(EnvironmentOutlined)`
    font-size: 1.8rem;
  `,
};

export default Schedule;
