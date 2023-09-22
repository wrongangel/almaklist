'use client'
import type Collection from '@/models/collection'
import { supabaseClient } from '@/service/supabase'
import { useUserStore } from '@/stores/userStore'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './CollectionsList.module.scss'

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
        setLists(data.flatMap((item) => item.list ?? []))
      }
    }
    if (userStore.id !== '') void getLists()
  }, [userStore.id])

  return (
    <div className={styles.collections}>
      {lists.map((list) => (
        <Link href={`/application/list/${list.id}`} key={list.id} className={styles.collections__item}>
          {list.name}
        </Link>
      ))}
    </div>
  )
}
export default CollectionsList
