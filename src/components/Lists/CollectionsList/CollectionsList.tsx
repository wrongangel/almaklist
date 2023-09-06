'use client'
import type Collection from '@/models/collection'
import { supabaseClient } from '@/service/supabase'
import { useUserStore } from '@/stores/userStore'
import { useEffect, useState } from 'react'

const CollectionsList = (): JSX.Element => {
  const userStore = useUserStore()
  const [lists, setLists] = useState<Collection[]>([])

  useEffect(() => {
    const getLists = async (): Promise<void> => {
      const { data, error } = await supabaseClient
        .from('users_to_lists')
        .select('list (*)')
        .eq('user', userStore.id)
        .not('list', 'is', 'NULL')
      if (error !== null) console.log(error)

      if (data !== null && data.length > 0) {
        setLists(data.map((item) => item.list!))
      }
    }
    if (userStore.id !== '') void getLists()
  }, [userStore.id])

  return (
    <div>
      {lists.map((list) => (
        <div key={list.id}>{list.name}</div>
      ))}
    </div>
  )
}
export default CollectionsList
