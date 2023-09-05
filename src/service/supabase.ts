import { type Database } from '@/models/supabase'
import { type SupabaseClient, createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/dist/client/components/headers'

async function supabaseServer (): Promise<SupabaseClient<Database>> {
  return createServerComponentClient<Database>({ cookies })
}

export const supabaseClient = createClientComponentClient<Database>()

export default supabaseServer
