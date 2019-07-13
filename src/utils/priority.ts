import { Urgency } from "interfaces/IUser";
import moment, { Moment } from "moment";
import { isThisWeek } from "utils";

let REFERENCE = moment();

function isToday(momentDate: Moment) {
  let TODAY = REFERENCE.clone().startOf("day");
  return momentDate.isSame(TODAY, "d");
}

function isPast(momentDate: Moment) {
  let TODAY = REFERENCE.clone().startOf("day");
  return momentDate.isBefore(TODAY, "d");
}

function isTomorrow(momentDate: Moment) {
  let TOMMORROW = REFERENCE.clone()
    .add(1, "days")
    .startOf("day");
  return momentDate.isSame(TOMMORROW, "d");
}

function isSameMonth(momentDate: Moment) {
  return momentDate.isSame(REFERENCE, "month");
}

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
