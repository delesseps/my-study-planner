import React, { useEffect, useState } from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { ApplicationState } from "store/types";
import { connect } from "react-redux";
import IEvaluation from "interfaces/IEvaluation";
import IScheduleEvent from "interfaces/IScheduleEvent";
import { toTitleCase } from "utils";
import EvaluationDescriptionModal from "components/modals/EvaluationDescriptionModal/EvaluationDescriptionModal";
import { Urgency } from "interfaces/IUser";
import IHomework from "interfaces/IHomework";
import HomeworkDescriptionModal from "components/modals/HomeworkDescriptionModal/HomeworkDescriptionModal";

const localizer = BigCalendar.momentLocalizer(moment);

function determineColor(urgency: Urgency) {
  switch (urgency) {
    case "chill":
      return "#52c41a";
    case "normal":
      return "#fadb14";
    case "important":
      return "#f5222d";
    default:
  }
}

interface IHomeSchedulePanelProps {
  evaluations: IEvaluation[];
  homework: IHomework[];
}

const HomeSchedulePanel: React.FC<IHomeSchedulePanelProps> = ({
  evaluations,
  homework
}) => {
  const [events, setEvents] = useState<IScheduleEvent[]>([]);

  useEffect(() => {
    //adds and normalizes evaluations which are not done to events
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

    //adds and normalizes homework which are not done to events
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
    <BigCalendar
      events={events}
      views={["week", "day", "agenda"]}
      localizer={localizer}
      defaultView={"week"}
      onSelectEvent={event => {
        if (event.evaluation) EvaluationDescriptionModal(event.evaluation);

        if (event.homework) HomeworkDescriptionModal(event.homework);
      }}
      eventPropGetter={event => ({
        style: { backgroundColor: determineColor(event.urgency) }
      })}
    />
  );
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    evaluations: state.reducer.user.evaluations,
    homework: state.reducer.user.homework
  };
};

export default connect(
  mapStateToProps,
  null
)(HomeSchedulePanel);
