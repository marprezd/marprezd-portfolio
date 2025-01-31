/* eslint-disable node/prefer-global/process */
'use server'

import { neon } from '@neondatabase/serverless'
import { auth } from 'auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function saveGuestbookEntry(formData: FormData) {
  const session = await auth()
  if (!session) {
    throw new Error('Unauthorized')
  }

  // Create an instance of Neon's TS/JS driver
  const sql = neon(`${process.env.NEON_DATABASE_URL}`)
  // Create the guestbook table if it does not exist
  await sql(`
      CREATE TABLE IF NOT EXISTS "Guestbook" (
        id SERIAL PRIMARY KEY,
        created_by TEXT,
        image TEXT,
        email TEXT,
        message TEXT,
        created_at TIMESTAMP
      );
    `)

  const created_by = session.user?.name as string
  const image = session.user?.image as string
  const email = session.user?.email as string
  const entry = formData.get('entry')?.toString() || ''
  const message = entry.slice(0, 500)

  // Insert the comment from the form into the Postgres (powered by Neon)
  await sql(`
      INSERT INTO "Guestbook" (image, email, created_by, message, created_at)
      VALUES (${created_by}, ${image}, ${email}, ${message}, ${new Date().toISOString()});
    `)
  revalidatePath('/guest-book')
  redirect('/guest-book?submitted=true')
}
