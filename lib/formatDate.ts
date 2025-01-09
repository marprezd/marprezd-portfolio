export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export function listYear(date: string) {
  return new Date(date).getFullYear().toString()
}

export function convertDate(date: string): string {
  return new Date(date).getFullYear().toString()
}
