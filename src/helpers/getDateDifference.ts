export const getDateDifference = (targetDate: Date) => {
  const currentDate = new Date()
  const differenceInMilliseconds = currentDate.getTime() - targetDate.getTime()

  const millisecondsInSecond = 1000
  const millisecondsInMinute = 60 * millisecondsInSecond
  const millisecondsInHour = 60 * millisecondsInMinute
  const millisecondsInDay = 24 * millisecondsInHour
  const millisecondsInWeek = 7 * millisecondsInDay
  const millisecondsInMonth = 30 * millisecondsInDay
  const millisecondsInYear = 365 * millisecondsInDay

  const timeUnits = [
    { unit: 'year', duration: millisecondsInYear },
    { unit: 'month', duration: millisecondsInMonth },
    { unit: 'week', duration: millisecondsInWeek },
    { unit: 'day', duration: millisecondsInDay },
    { unit: 'hour', duration: millisecondsInHour },
  ]

  for (let i = 0; i < timeUnits.length; i++) {
    const { unit, duration } = timeUnits[i]
    const difference = Math.floor(differenceInMilliseconds / duration)

    if (difference >= 1) {
      return difference + ' ' + unit + (difference > 1 ? 's' : '') + ' ago'
    }
  }

  return 'few minutes ago'
}
