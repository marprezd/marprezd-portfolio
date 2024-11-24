/* eslint-disable node/prefer-global/process */
import type { Database } from '@/types'
import type { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export function createClient(cookieStore: ReturnType<typeof cookies>) {
  const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env

  return createServerClient<Database>(NEXT_PUBLIC_SUPABASE_URL!, NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        }
        catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
