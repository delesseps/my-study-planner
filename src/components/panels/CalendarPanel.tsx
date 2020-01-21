import React from "react";
import { Calendar, Badge, Popover } from "antd";
import { ApplicationState } from "store/types";
import { connect } from "react-redux";
import IEvaluation from "interfaces/IEvaluation";
import { Moment } from "moment";
import IHomework from "interfaces/IHomework";
import { toTitleCase } from "utils";
import styled from "styled-components";
interface ICalendarPanelProps {
  evaluations?: IEvaluation[];
  homework?: IHomework[];
}

const CalendarPanel: React.FC<ICalendarPanelProps> = ({
  evaluations = [],
  homework = []
}) => {
  const getListData = (value: Moment) => {
    //Get the evaluations of a specific day in a month
    const filteredEvaluations = evaluations.filter(evaluation => {
      let evaluationDate = new Date(evaluation.date);
      return (
        evaluationDate.getDate() === value.date() &&
        evaluationDate.getMonth() === value.month() &&
        !evaluation.done
      );
    });

    //Get the homework of a specific day in a month
    const filteredHomework = homework.filter(currHomework => {
      let homeworkDate = new Date(currHomework.date);
      return (
        homeworkDate.getDate() === value.date() &&
        homeworkDate.getMonth() === value.month() &&
        !currHomework.done
      );
    });

    const assignments: IEvaluation[] | IHomework[] = [
      ...filteredEvaluations,
      ...filteredHomework
    ];

    return assignments || [];
  };

  const dateFullCellRender = (value: Moment) => {
    const listData = getListData(value);

    const popoverContent = (
      <ul>
        {listData.map((item: any) => {
          let status:
            | "success"
            | "processing"
            | "default"
            | "error"
            | "warning" = "processing";

          const assignmentType = item.evaluationType
            ? toTitleCase(item.evaluationType)
            : "Homework";

          switch (item.urgency) {
            case "chill":
              status = "success";
              break;
            case "normal":
              status = "warning";
              break;
            case "important":
              status = "error";
              break;
            default:
          }

          return (
            <li
              className="events"
              style={{ listStyle: "none" }}
              key={item.subject}
            >
              <Badge
                status={status}
                text={
                  <BadgeTitle>
                    {assignmentType}: {item.subject}
                  </BadgeTitle>
                }
              />
            </li>
          );
        })}
      </ul>
    );

    if (listData.length > 0)
      return (
        <Popover content={popoverContent}>
          <div className="ant-fullcalendar-date">
            <div
              style={{
                boxShadow: "0 0 0 1px #f9ca24 inset"
              }}
              className="ant-picker-cell-inner ant-picker-calendar-date"
            >
              {value.date()}
            </div>
            <div className="ant-picker-calendar-date-content" />
          </div>
        </Popover>
      );

    return (
      <div className="ant-picker-cell-inner ant-picker-calendar-date">
        <div className="ant-picker-calendar-date-value">{value.date()}</div>
        <div className="ant-picker-calendar-date-content" />
      </div>
    );
  };

  return (
    <Wrapper>
      <Calendar dateFullCellRender={dateFullCellRender} fullscreen={false} />
    </Wrapper>
  );
};

const Wrapper = styled.span`
  .ant-picker-cell-in-view .ant-picker-calendar-date-value {
    color: ${props => props.theme.fontColors.text};
  }

  .ant-picker-cell-selected .ant-picker-calendar-date-value {
    color: white;
  }

  & i {
    color: ${props => props.theme.fontColors.text};
  }
`;

const Value = styled.div`
  /* && {
    
  } */
`;

const BadgeTitle = styled.span`
  color: ${props => props.theme.fontColors.textRgba(0.8)};
`;

const mapStateToProps = (state: ApplicationState) => ({
  evaluations: state.reducer.user.evaluations,
  homework: state.reducer.user.homework,
  config: state.reducer.user.configuration
});

export default connect(mapStateToProps, null)(CalendarPanel);
