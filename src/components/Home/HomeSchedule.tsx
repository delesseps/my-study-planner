import React from "react";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = BigCalendar.momentLocalizer(moment);

const events = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1)
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10)
  }
];

const HomeSchedule: React.FC = props => {
  return (
    <BigCalendar
      selectable
      localizer={localizer}
      events={events}
      scrollToTime={new Date(1970, 1, 1, 6)}
      defaultView={"week"}
      defaultDate={new Date(2015, 3, 12)}
      onSelectEvent={event => alert(event.title)}
    />
  );
};

export default HomeSchedule;
