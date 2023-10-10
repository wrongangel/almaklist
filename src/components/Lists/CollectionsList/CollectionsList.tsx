'use client'
import { useUserStore } from '@/stores/userStore'
import { useEffect } from 'react'
import styles from './CollectionsList.module.scss'
import { useCollestionsStore } from '@/stores/collectionsStore'
import CollectionCard from '@/components/Cards/CollectionCard/CollectionCard'

interface Props {
  limit?: number
}

const CollectionsList = ({ limit }: Props): JSX.Element => {
  const userStore = useUserStore()
  const { collections, fetchCollections } = useCollestionsStore()

  useEffect(() => {
    if (userStore.id !== '') {
      void fetchCollections(userStore.id, limit)
    }
  }, [userStore.id, fetchCollections, limit])

  return (
    <div className={styles.collections}>
      {userStore.id !== '' &&
        collections.map((list) => (
          <CollectionCard list={list} key={list.id} />
        ))
      }
    </div>
  )
}
export default CollectionsList
