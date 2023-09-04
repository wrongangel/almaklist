import { type Database } from '@/models/supabase'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

const IsAuth = async (): Promise<JSX.Element> => {
  const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/')
  }
  return <></>
}
export default IsAuth
