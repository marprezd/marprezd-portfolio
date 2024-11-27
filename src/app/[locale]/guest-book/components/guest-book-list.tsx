import { createClient } from '@/lib/supabase/guest-book/server'
import { cookies } from 'next/headers'
import ListItems from './list-items'

export default async function GuestbookList() {
  const supabaseClient = createClient(cookies())
  const { data } = await supabaseClient.from('guestbook').select('*')

  return (
    <ul className="flex flex-col gap-y-2.5">
      {data
        ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        ?.map(message => (
          <ListItems key={message.id} message={message} />
        ))}
    </ul>
  )
}
