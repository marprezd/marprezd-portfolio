/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable node/prefer-global/process */
import type { Database } from '@/types'
import type { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export function createClient(cookieStore: ReturnType<typeof cookies>) {
  return createServerClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set({ name, value, ...options }),
          )
        }
        catch (error) {}
      },
    },
  })
}
