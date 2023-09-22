'use client'
import type Collection from '@/models/collection'
import { supabaseClient } from '@/service/supabase'
import { useUserStore } from '@/stores/userStore'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './CollectionsList.module.scss'
import { useCollestionsStore } from '@/stores/collectionsStore'

const CollectionsList = (): JSX.Element => {
  const userStore = useUserStore()
  const collestionsStore = useCollestionsStore()

  useEffect(() => {
    collestionsStore.fetchCollections(userStore.id)
  }, [])

  return (
    <div className={styles.collections}>
      {collestionsStore.collections.map((list) => (
        <Link href={`/application/list/${list.id}`} key={list.id} className={styles.collections__item}>
          {list.name}
        </Link>
      ))}
    </div>
  )
}
export default CollectionsList
