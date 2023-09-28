'use client'

import { useCollestionsStore } from '@/stores/collectionsStore'
import { useItemTypeStore } from '@/stores/itemTypeStore'
import { useUserStore } from '@/stores/userStore'
import { useEffect, useState } from 'react'

interface Props {
  list_id: string
}
const AddItem = ({ list_id }: Props): JSX.Element => {
  const userStore = useUserStore()
  const collectionsStore = useCollestionsStore()
  const itemTypeStore = useItemTypeStore()
  const [init, setInit] = useState<boolean>(false)

  useEffect(() => {
    if (!init) {
      void itemTypeStore.fetchItemTypes()
      setInit(true)
    }
  }, [init, itemTypeStore])

  const handleAddItem = (item_type: string): void => {
    void collectionsStore.addItem(
      userStore.id,
      item_type,
      10,
      '4e99583d-2f47-4994-a04a-52499a31b0cf',
      list_id
    )
  }

  return (
    <div>
      {itemTypeStore.itemTypes.map((item) => <div key={item.id}>
        <button onClick={() => { handleAddItem(item.id) }}>Add {item.item_name}</button>
      </div>)}
    </div>
  )
}
export default AddItem
