'use client'
import { supabaseClient } from '@/service/supabase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const IsAuth = (): JSX.Element => {
  const router = useRouter()
  const getUser = async (): Promise<void> => {
    const { data: { session } } = await supabaseClient.auth.getSession()
    if (session === null) {
      router.push('/')
    }
  }

  useEffect(() => {
    void getUser()
  })
  return <></>
}
export default IsAuth
