import moment, { Moment } from "moment";

let REFERENCE = moment();

function isToday(momentDate: Moment) {
  let TODAY = REFERENCE.clone().startOf("day");
  return momentDate.isSame(TODAY, "d");
}

function isYesterday(momentDate: Moment) {
  let YESTERDAY = REFERENCE.clone()
    .subtract(1, "days")
    .startOf("day");
  return momentDate.isSame(YESTERDAY, "d");
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

function isSameWeek(momentDate: Moment) {
  return momentDate.isBetween(
    REFERENCE.clone().startOf("week"),
    REFERENCE.clone().endOf("week")
  );
}

function isSameMonth(momentDate: Moment) {
  return momentDate.isSame(REFERENCE, "month");
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
  } else if (isSameWeek(momentDate)) {
    return "This " + momentDate.format("dddd"); // Returns date as 'This Friday'
  } else {
    if (isSameMonth(momentDate)) {
      return momentDate.format("dddd DD"); //Returns date as 'Friday 01'
    } else {
      return momentDate.format("dddd DD MMMM YYYY"); //Returns date as 'Friday 1 February 2019'
    }
  }
}

/*export const sortByDate = (array, isHomework = false) => {
  let result;

  isHomework
    ? (result = array.sort(function(a, b) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }))
    : (result = array.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
      }));

  return result;
};*/
