'use client'
import type Item from '@/models/item'
import BasicCard from '../BasicCard/BasicCard'
import { type HTMLAttributes } from 'react'
import { useCollestionsStore } from '@/stores/collectionsStore'

interface Props {
  item: Item
  from: string
  props?: HTMLAttributes<HTMLDivElement>
}

const ItemCard = ({ item, props, from }: Props): JSX.Element => {
  const collectionsStore = useCollestionsStore()

  const handleItemChange = (): void => {
    void collectionsStore.changeItemComplete(item.id, !item.completed, from)
  }

  return (
    <div onClick={() => { handleItemChange() }}>
      <BasicCard {...props}>
        <div>{item.item_type?.item_name} {item.completed ? 'true' : 'false'}</div>
      </BasicCard>
    </div>
  )
}
export default ItemCard
