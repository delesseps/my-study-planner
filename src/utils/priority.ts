import { Urgency } from "constants/interfaces/IUser";
import moment, { Moment } from "moment";
import { isPast, isToday, isTomorrow, isThisWeek, isSameMonth } from "./date";

let REFERENCE = moment();

export default function determinePriorityNumber(urgency: Urgency) {
  switch (urgency) {
    case "chill":
      return 1;
    case "normal":
      return 2;
    case "important":
      return 3;
    default:
      return 0;
  }
}

export function determinePriorityDateNumber(momentDate: Moment) {
  if (isPast(momentDate)) {
    return 0;
  } else if (isToday(momentDate)) {
    return 10;
  } else if (isTomorrow(momentDate)) {
    return 5;
  } else if (isThisWeek(momentDate)) {
    return 4;
  } else {
    if (isSameMonth(momentDate)) {
      return 2;
    } else {
      return Math.exp(-REFERENCE.diff(momentDate, "months", true) / 10);
    }
  }
}
