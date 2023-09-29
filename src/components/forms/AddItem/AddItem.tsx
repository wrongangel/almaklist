'use client'

import { useCollestionsStore } from '@/stores/collectionsStore'
import { useItemTypeStore } from '@/stores/itemTypeStore'
import { useQuantityStore } from '@/stores/quantityStore'
import { useUserStore } from '@/stores/userStore'
import { useEffect, useState } from 'react'

interface Props {
  list_id: string
}
const AddItem = ({ list_id }: Props): JSX.Element => {
  const userStore = useUserStore()
  const collectionsStore = useCollestionsStore()
  const itemTypeStore = useItemTypeStore()
  const quantityStore = useQuantityStore()
  const [init, setInit] = useState<boolean>(false)

  useEffect(() => {
    if (!init) {
      void itemTypeStore.fetchItemTypes()
      void quantityStore.fetchQuantity()
      setInit(true)
    }
  }, [init, itemTypeStore, quantityStore])

  const handleAddItem = (item_type: string, quantity_type: string): void => {
    void collectionsStore.addItem(
      userStore.id,
      item_type,
      10,
      quantity_type,
      list_id
    )
  }

  return (
    <div>
      {itemTypeStore.itemTypes.map((item) => <div key={item.id}>
        <button onClick={() => { handleAddItem(item.id, item.default_quantity) }}>Add {item.item_name}</button>
      </div>)}
      {quantityStore.quantity.map((q) =>
        <div key={q.id}>{q.name}</div>
      )}
    </div>
  )
}
export default AddItem
