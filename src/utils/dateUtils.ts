import PersianDate from 'persian-date'

/**
 * Convert a date string to Persian date and time format.
 * @param dateString - The date string (e.g., "2025-02-16T15:34:27.000000Z").
 * @returns The formatted Persian date and time (e.g., "۱۴۰۳/۱۱/۲۷ ۱۵:۳۴").
 */
export function toPersianDate(dateString: string): string {
  const pd = new PersianDate(new Date(dateString))
  return pd.format('YYYY/MM/DD') // Format to Persian date and time
}

export function toPersianTime(dateString: string): string {
  const pd = new PersianDate(new Date(dateString))
  return pd.format('HH:mm') // Format to Persian date and time
}
