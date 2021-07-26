export function getNumberOfDays(start: Date, end: Date) {
	// One day in milliseconds
	const oneDay = 1000 * 60 * 60 * 24

	// Calculating the time difference between two dates
	const diffInTime = end.getTime() - start.getTime()

	// Calculating the no. of days between two dates
	const diffInDays = Math.round(diffInTime / oneDay)

	return diffInDays
}
