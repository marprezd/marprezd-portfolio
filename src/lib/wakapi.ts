import { Buffer } from 'node:buffer'
import process from 'node:process'

const wakapi_api_key: string = process.env.WAKAPI_API_KEY || ''
const wakapi_user: string = process.env.WAKAPI_USER || ''

const WAKAPI_ENDPOINT_LAST_12_MONTHS = `https://wakapi.dev/api/compat/wakatime/v1/users/${wakapi_user}/stats/last_12_months`
const WAKAPI_ENDPOINT_SUMMARIES_LAST_7_DAYS = `https://wakapi.dev/api/compat/wakatime/v1/users/${wakapi_user}/summaries?range=last_7_days`
const WAKAPI_ENDPOINT_SUMMARIES_YESTERDAY = `https://wakapi.dev/api/compat/wakatime/v1/users/${wakapi_user}/summaries?range=yesterday`
const WAKAPI_ENDPOINT_SUMMARIES_TODAY = `https://wakapi.dev/api/compat/wakatime/v1/users/${wakapi_user}/summaries?range=today`

export async function getLast12MonthsStats() {
  return fetch(WAKAPI_ENDPOINT_LAST_12_MONTHS, {
    next: { revalidate: 60 * 60 * 1 },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(wakapi_api_key).toString('base64')}`,
    },
  })
}

export async function getSummariesLast7DaysStats() {
  return fetch(WAKAPI_ENDPOINT_SUMMARIES_LAST_7_DAYS, {
    next: { revalidate: 60 * 60 * 1 },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(wakapi_api_key).toString('base64')}`,
    },
  })
}

export async function getSummariesYesterday() {
  return fetch(WAKAPI_ENDPOINT_SUMMARIES_YESTERDAY, {
    next: { revalidate: 60 * 60 * 24 },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(wakapi_api_key).toString('base64')}`,
    },
  })
}

export async function getSummariesToday() {
  return fetch(WAKAPI_ENDPOINT_SUMMARIES_TODAY, {
    next: { revalidate: 60 * 60 * 1 },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(wakapi_api_key).toString('base64')}`,
    },
  })
}
