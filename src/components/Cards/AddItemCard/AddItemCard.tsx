'use client'
import { type ItemType } from '@/models/itemType'
import BasicCard from '../BasicCard/BasicCard'
import { useUserStore } from '@/stores/userStore'
import { useCollestionsStore } from '@/stores/collectionsStore'
import { useState } from 'react'
import styles from './AddItemCard.module.scss'
import SelectQuantityType from '@/components/Select/SelectQuantityType/SelectQuantityType'
import IconButton from '@/components/Buttons/IconButton/IconButton'
import Image from 'next/image'
import PlusIcon from '@/assets/icons/Plus.svg'
import NumberInput from '@/components/Inputs/NumberInput/NumberInput'

interface Props {
  itemType: ItemType
  list_id: string
}
const AddItemCard = ({ itemType, list_id }: Props): JSX.Element => {
  const userStore = useUserStore()
  const collectionsStore = useCollestionsStore()
  const [count, setCount] = useState<number>(1)
  const [quantityId, setQuantityId] = useState<string>(itemType.default_quantity)

  const handleAddItem = (item_type: string, quantity_type: string): void => {
    if (item_type !== 'new') {
      void collectionsStore.addItem(
        userStore.id,
        item_type,
        count,
        quantity_type,
        list_id
      )
    } else {
      void collectionsStore.addItemWithType(
        userStore.id,
        itemType.item_name,
        count,
        quantity_type,
        list_id
      )
    }
  }
  return (
    <BasicCard className={`${styles.addItemCard} ${itemType.id === 'new' && styles.addItemCard_new}`}>
      <p>{itemType.item_name}</p>
      <NumberInput value={count} onChange={setCount} />

      <SelectQuantityType value={quantityId} onValueChange={setQuantityId} itemType={itemType} />

      <IconButton onClick={() => { handleAddItem(itemType.id, quantityId) }}><Image src={PlusIcon} alt='add item'/></IconButton>
    </BasicCard>
  )
}
export default AddItemCard
