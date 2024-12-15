import { getSummariesToday } from '@/lib/wakapi'
import { NextResponse } from 'next/server'

export async function GET() {
  const res = await getSummariesToday()

  if (!res.ok) {
    throw new Error('failed to fetch wakatime data')
  }

  const data = await res.json()

  return NextResponse.json({ data })
}
