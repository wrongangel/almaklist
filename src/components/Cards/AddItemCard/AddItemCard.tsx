'use client'
import { type ItemType } from '@/models/itemType'
import BasicCard from '../BasicCard/BasicCard'
import { useUserStore } from '@/stores/userStore'
import { useCollestionsStore } from '@/stores/collectionsStore'
import { useQuantityStore } from '@/stores/quantityStore'
import * as Select from '@radix-ui/react-select'
import { useState } from 'react'

interface Props {
  itemType: ItemType
  list_id: string
}
const AddItemCard = ({ itemType, list_id }: Props): JSX.Element => {
  const userStore = useUserStore()
  const collectionsStore = useCollestionsStore()
  const quantityStore = useQuantityStore()
  const [count, setCount] = useState<string>('1')
  const [quantityId, setQuantityId] = useState<string>(itemType.default_quantity)

  const handleAddItem = (item_type: string, quantity_type: string): void => {
    if (item_type !== 'new') {
      void collectionsStore.addItem(
        userStore.id,
        item_type,
        parseFloat(count),
        quantity_type,
        list_id
      )
    } else {
      void collectionsStore.addItemWithType(
        userStore.id,
        itemType.item_name,
        parseFloat(count),
        quantity_type,
        list_id
      )
    }
  }
  return (
    <BasicCard><div>
      {itemType.item_name}
      <input type='number' value={count} onChange={(e) => { setCount(e.target.value) }} />

      <Select.Root
        defaultValue={itemType.default_quantity}
        value={quantityId}
        onValueChange={(e) => { setQuantityId(e) }}>
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Portal>
          <Select.Group>
            <Select.Content>
              {quantityStore.quantity.map((q) =>
                <Select.Item value={q.id} key={q.id}>
                  <Select.ItemText>{q.name}</Select.ItemText>
                </Select.Item>
              )}
            </Select.Content>
          </Select.Group>
        </Select.Portal>
      </Select.Root>

      <button onClick={() => { handleAddItem(itemType.id, quantityId) }}>add</button>
    </div></BasicCard>
  )
}
export default AddItemCard
