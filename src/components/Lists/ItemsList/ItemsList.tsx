'use client'

import ItemCard from '@/components/Cards/ItemCard/ItemCard'
import { useCollestionsStore } from '@/stores/collectionsStore'
import { useUserStore } from '@/stores/userStore'
import { useEffect, useState } from 'react'
import styles from './ItemsList.module.scss'

interface Props {
  listId: string
}
const ItemsList = ({ listId }: Props): JSX.Element => {
  const collectionsStore = useCollestionsStore()
  const [init, setInit] = useState<boolean>(false)
  const userStore = useUserStore()

  useEffect(() => {
    if (collectionsStore.collections.length === 0 && userStore.id !== '') {
      void collectionsStore.fetchCollections(userStore.id)
    }
    if (!init && collectionsStore.collections.length > 0) {
      setInit(true)
      void collectionsStore.getCollectionItems(listId)
    }
  }, [collectionsStore, listId, init, userStore])

  return (
    <div className={styles.itemsList}>
      {collectionsStore.collections.map((collection) =>
        collection.id === listId && collection.items !== undefined &&
        collection.items.map((item) =>
          <ItemCard key={item.id} item={item} from={collection.id} />
        )
      )
      }
    </div>
  )
}
export default ItemsList
