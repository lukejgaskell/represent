import { formatDistance } from "date-fns"

export function sortByDate(a: { date: string }, b: { date: string }) {
  return new Date(b.date).getTime() - new Date(a.date).getTime()
}
export function getNumberOfDays(start: Date, end: Date) {
  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24

  // Calculating the time difference between two dates
  const diffInTime = end.getTime() - start.getTime()

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay)

  return diffInDays
}

export function displayDate(datetime: string) {
  const useRelative = getNumberOfDays(new Date(datetime), new Date()) < 4
  const dateDisp = useRelative
    ? formatDistance(new Date(datetime), new Date(), {
        addSuffix: true,
      })
    : new Date(datetime).toLocaleDateString().replaceAll("/", "-")
  return dateDisp
}
