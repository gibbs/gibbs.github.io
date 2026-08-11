/**
 * Format a date as "d LLL, yyyy"
 */
export function formatDate(date: Date | string): string {
	const value = date instanceof Date ? date : new Date(date);

	const year = value.getUTCFullYear();
	const day = value.getUTCDate();
	const month = value.toLocaleDateString('en-GB', {
		month: 'short',
		timeZone: 'Europe/London',
	});

	return `${day} ${month}, ${year}`;
}
