import supabaseServer from '@/service/supabase'
import './globals.css'
import '@/styles/GlobalColors.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { type BasicUser } from '@/models/user'
import { useUserStore } from '@/stores/userStore'
import UserStoreInit from '@/stores/userStoreInit'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Almaklist',
  description: 'Manage shopping lists together'
}

export default async function RootLayout ({
  children
}: {
  children: React.ReactNode
}): Promise<JSX.Element> {
  const supabase = await supabaseServer()
  const { data: user, error } = await supabase.auth.getUser()
  const userData: BasicUser = {
    id: '',
    role: 'user',
    email: ''
  }
  if (error !== null) console.log(error)
  if (user.user !== null) {
    const { data, error } = await supabase
      .from('user_data')
      .select('*')
      .eq('user_id', user.user.id)
      .single()
    if (error !== null) console.log(error)
    if (data !== null) {
      userData.id = data.id
      userData.email = user.user.email ?? ''
      useUserStore.setState({ id: data.id, email: user.user.email })
    }
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserStoreInit {...userData} />
        {children}
      </body>
    </html>
  )
}
