'use client'
import { useUserStore } from '@/stores/userStore'
import { useEffect } from 'react'
import styles from './CollectionsList.module.scss'
import { useCollestionsStore } from '@/stores/collectionsStore'
import CollectionCard from '@/components/Cards/CollectionCard/CollectionCard'

const CollectionsList = (): JSX.Element => {
  const userStore = useUserStore()
  const { collections, fetchCollections } = useCollestionsStore()

  useEffect(() => {
    if (userStore.id !== '') {
      void fetchCollections(userStore.id)
    }
  }, [userStore.id, fetchCollections])

  return (
    <div className={styles.collections}>
      {collections.map((list) => (
        <CollectionCard list={list} key={list.id} />
      ))}
    </div>
  )
}
export default CollectionsList
