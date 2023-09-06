'use client'
import { useEffect, useRef } from 'react'
import { useUserStore } from './userStore'
import { supabaseClient } from '@/service/supabase'

const UserStoreInit = (): React.ReactNode => {
  const init = useRef<boolean>(false)
  const userStore = useUserStore()

  const getUser = async (): Promise<void> => {
    const { data: user, error } = await supabaseClient.auth.getUser()
    if (error !== null) console.log(error)
    if (user.user !== null) {
      const { data, error } = await supabaseClient
        .from('user_data')
        .select('*')
        .eq('user_id', user.user?.id)
        .single()
      if (error !== null) console.log(error)
      if (data !== null) {
        userStore.setState({ id: data.id, email: user.user.email ?? '', role: 'user' })
      }
    }
  }

  useEffect(() => {
    if (!init.current) {
      void getUser()
      init.current = true
    }
  })

  return <></>
}
export default UserStoreInit
