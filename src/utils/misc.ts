import {Urgency} from 'constants/interfaces/IUser'

import moment, {Moment} from 'moment'

let REFERENCE = moment()

export function isToday(momentDate: Moment) {
  let TODAY = REFERENCE.clone().startOf('day')
  return momentDate.isSame(TODAY, 'd')
}

export function isYesterday(momentDate: Moment) {
  let YESTERDAY = REFERENCE.clone().subtract(1, 'days').startOf('day')
  return momentDate.isSame(YESTERDAY, 'd')
}

export function isPast(momentDate: Moment) {
  let TODAY = REFERENCE.clone().startOf('day')
  return momentDate.isBefore(TODAY, 'd')
}

export function isTomorrow(momentDate: Moment) {
  let TOMMORROW = REFERENCE.clone().add(1, 'days').startOf('day')
  return momentDate.isSame(TOMMORROW, 'd')
}

export function isSameMonth(momentDate: Moment) {
  return momentDate.isSame(REFERENCE, 'month')
}

export function isThisWeek(momentDate: Moment) {
  return momentDate.isBetween(
    REFERENCE.clone().startOf('week'),
    REFERENCE.clone().endOf('week'),
  )
}

export function setDate(momentDate: Moment) {
  if (isToday(momentDate)) {
    return 'Today'
  } else if (isYesterday(momentDate)) {
    return 'yesterday'
  } else if (isPast(momentDate)) {
    return 'Was ' + momentDate.format('dddd DD MMMM YYYY') // Returns date as 'Was Friday 1 February 2019'
  } else if (isTomorrow(momentDate)) {
    return 'Tomorrow'
  } else if (isThisWeek(momentDate)) {
    return 'This ' + momentDate.format('dddd') // Returns date as 'This Friday'
  } else {
    if (isSameMonth(momentDate)) {
      return momentDate.format('dddd DD') //Returns date as 'Friday 01'
    } else {
      return momentDate.format('dddd DD MMMM YYYY') //Returns date as 'Friday 1 February 2019'
    }
  }
}

export function determinePriorityNumber(urgency: Urgency) {
  switch (urgency) {
    case 'chill':
      return 1
    case 'normal':
      return 2
    case 'important':
      return 3
    default:
      return 0
  }
}

export function determinePriorityDateNumber(momentDate: Moment) {
  if (isPast(momentDate)) {
    return 0
  } else if (isToday(momentDate)) {
    return 10
  } else if (isTomorrow(momentDate)) {
    return 5
  } else if (isThisWeek(momentDate)) {
    return 4
  } else {
    if (isSameMonth(momentDate)) {
      return 2
    } else {
      return Math.exp(-REFERENCE.diff(momentDate, 'months', true) / 10)
    }
  }
}

export function toTitleCase(string: string) {
  string = string.toLowerCase()
  return string[0].toUpperCase() + string.slice(1)
}

export function determinePriority(urgency: Urgency) {
  switch (urgency) {
    case 'chill':
      return 'Low Priority'
    case 'normal':
      return 'Medium Priority'
    case 'important':
      return 'High Priority'
    default:
  }
}

export function determineColor(urgency: Urgency) {
  switch (urgency) {
    case 'chill':
      return 'green'
    case 'normal':
      return 'yellow'
    case 'important':
      return 'red'
    default:
  }
}

function pad(num: number) {
  return ('0' + num).slice(-2)
}

export function hhmmss(secs: number) {
  var minutes = Math.floor(secs / 60)
  var hours = Math.floor(minutes / 60)
  minutes = minutes % 60
  return `${pad(hours)}:${pad(minutes)}`
}
