import moment, { Moment } from "moment";

let REFERENCE = moment();

function isToday(momentDate: Moment) {
  let TODAY = REFERENCE.clone().startOf("day");
  return momentDate.isSame(TODAY, "d");
}

function isYesterday(momentDate: Moment) {
  let YESTERDAY = REFERENCE.clone().subtract(1, "days").startOf("day");
  return momentDate.isSame(YESTERDAY, "d");
}

function isPast(momentDate: Moment) {
  let TODAY = REFERENCE.clone().startOf("day");
  return momentDate.isBefore(TODAY, "d");
}

function isTomorrow(momentDate: Moment) {
  let TOMMORROW = REFERENCE.clone().add(1, "days").startOf("day");
  return momentDate.isSame(TOMMORROW, "d");
}

function isSameMonth(momentDate: Moment) {
  return momentDate.isSame(REFERENCE, "month");
}

export function isThisWeek(momentDate: Moment) {
  return momentDate.isBetween(
    REFERENCE.clone().startOf("week"),
    REFERENCE.clone().endOf("week")
  );
}

export default function setDate(momentDate: Moment) {
  if (isToday(momentDate)) {
    return "Today";
  } else if (isYesterday(momentDate)) {
    return "yesterday";
  } else if (isPast(momentDate)) {
    return "Was " + momentDate.format("dddd DD MMMM YYYY"); // Returns date as 'Was Friday 1 February 2019'
  } else if (isTomorrow(momentDate)) {
    return "Tomorrow";
  } else if (isThisWeek(momentDate)) {
    return "This " + momentDate.format("dddd"); // Returns date as 'This Friday'
  } else {
    if (isSameMonth(momentDate)) {
      return momentDate.format("dddd DD"); //Returns date as 'Friday 01'
    } else {
      return momentDate.format("dddd DD MMMM YYYY"); //Returns date as 'Friday 1 February 2019'
    }
  }
}
