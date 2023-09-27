'use client'

import type Item from '@/models/item'
import { useCollestionsStore } from '@/stores/collectionsStore'
import { useEffect, useState } from 'react'

interface Props {
  listId: string
}
const ItemsList = ({ listId }: Props): JSX.Element => {
  const collectionsStore = useCollestionsStore()
  const [init, setInit] = useState<boolean>(false)
  const [items, setItems] = useState<Item[]>([])
  useEffect(() => {
    if (!init) {
      setInit(true)
      void collectionsStore.getCollectionItems(listId)
    }
    const newItems: Item[] | undefined = collectionsStore.collections.find((collection) => {
      return collection.id === listId
    })?.items
    if (newItems !== undefined) setItems(newItems)
  }, [collectionsStore, listId, init])

  return (
    <div>
      {collectionsStore.collections.find((collection) => {
        return collection.id === listId
      })?.items?.map((item) => <div key={item.id}>
        {item.item_type?.item_name}
      </div>)}
    </div>
  )
}
export default ItemsList
