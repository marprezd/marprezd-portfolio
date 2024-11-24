import { createClient } from '@/lib/supabase/guest-book/server'
import { Avatar } from '@nextui-org/avatar'
import { cookies } from 'next/headers'

export default async function GuestbookList() {
  const supabaseClient = createClient(cookies())
  const { data } = await supabaseClient.from('guestbook').select('*')

  return (
    <ul className="flex flex-col gap-6">
      {data
        ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        ?.map(message => (
          <li key={message.id} className="flex items-center gap-2">
            <Avatar
              src={`${message.avatar}`}
              fallback={`${message.username}`.substring(0, 2)}
              alt={`${message.username}`}
            />
            {message.username}
            :
            {message.message}
          </li>
        ))}
    </ul>
  )
}
