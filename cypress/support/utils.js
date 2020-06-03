export function decodeQuotedPrintable(str) {
  var RFC2045Decode1 = /=\r\n/gm

  var RFC2045Decode2IN = /=([0-9A-F]{2})/gim

  var RFC2045Decode2OUT = function (sMatch, sHex) {
    return String.fromCharCode(parseInt(sHex, 16))
  }

  return str
    .replace(RFC2045Decode1, '')
    .replace(RFC2045Decode2IN, RFC2045Decode2OUT)
}

export function yyyymmdd(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

export function determinePriority(urgency) {
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

export function toTitleCase(string) {
  string = string.toLowerCase()
  return string[0].toUpperCase() + string.slice(1)
}
