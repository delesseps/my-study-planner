import React, { useEffect, useState } from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { ApplicationState } from "store/types";
import { connect } from "react-redux";
import { toTitleCase } from "utils";
import { HomeworkDescription, EvaluationDescription } from "components/modals";
import styled from "styled-components";
import { breakpoints } from "theme";

import IEvaluation from "interfaces/IEvaluation";
import IScheduleEvent from "interfaces/IScheduleEvent";
import { Urgency } from "interfaces/IUser";
import IHomework from "interfaces/IHomework";

const localizer = BigCalendar.momentLocalizer(moment);

function determineColor(urgency: Urgency, alpha = 1) {
  switch (urgency) {
    case "chill":
      return `rgba(82, 196, 26, ${alpha})`;
    case "normal":
      return `rgba(250, 219, 20, ${alpha})`;
    case "important":
      return `rgba(245, 34, 45, ${alpha})`;
    default:
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    evaluations: state.reducer.user.evaluations,
    homework: state.reducer.user.homework
  };
};

interface IHomeSchedulePanelProps {
  evaluations?: IEvaluation[];
  homework?: IHomework[];
}

const HomeSchedulePanel: React.FC<IHomeSchedulePanelProps> = ({
  evaluations = [],
  homework = []
}) => {
  const [events, setEvents] = useState<IScheduleEvent[]>([]);

  useEffect(() => {
    //Adds and normalizes evaluations which are not done to events
    const filteredEvaluations: IScheduleEvent[] = evaluations
      .filter(evaluation => !evaluation.done)
      .map(evaluation => ({
        title: `${toTitleCase(evaluation.evaluationType)}: ${
          evaluation.subject
        }`,
        start: new Date(evaluation.date),
        end: new Date(evaluation.date),
        allDay: true,
        urgency: evaluation.urgency,
        type: "evaluation",
        evaluation
      }));

    //Adds and normalizes homework which are not done to events
    const filteredHomework: IScheduleEvent[] = homework
      .filter(currHomework => !currHomework.done)
      .map(currHomework => ({
        title: "HW: " + currHomework.subject,
        start: new Date(currHomework.date),
        end: new Date(currHomework.date),
        allDay: true,
        urgency: currHomework.urgency,
        type: "homework",
        homework: currHomework
      }));

    setEvents([...filteredEvaluations, ...filteredHomework]);
  }, [evaluations, homework]);

  return (
    <StyledBigCalendar
      events={events}
      views={
        window.innerWidth === 320
          ? ["day", "agenda"]
          : ["week", "day", "agenda"]
      }
      localizer={localizer}
      defaultView={window.innerWidth === 320 ? "day" : "week"}
      onSelectEvent={(event: any) => {
        if (event.evaluation) EvaluationDescription(event.evaluation);

        if (event.homework) HomeworkDescription(event.homework);
      }}
      eventPropGetter={(event: any) => ({
        style: {
          backgroundColor: determineColor(event.urgency, 0.8),
          border: `2px solid ${determineColor(event.urgency)}`
        }
      })}
    />
  );
};

const StyledBigCalendar = styled(BigCalendar)`
  @media only screen and (max-width: ${breakpoints.bpMobileL}) {
    .rbc-toolbar {
      flex-direction: column;

      & > *:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }
`;

export default connect(mapStateToProps, null)(HomeSchedulePanel);
