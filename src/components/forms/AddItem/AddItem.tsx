'use client'

import AddItemCard from '@/components/Cards/AddItemCard/AddItemCard'
import { type ItemType } from '@/models/itemType'
import { useItemTypeStore } from '@/stores/itemTypeStore'
import { useQuantityStore } from '@/stores/quantityStore'
import { useEffect, useState } from 'react'

interface Props {
  list_id: string
}
const AddItem = ({ list_id }: Props): JSX.Element => {
  const itemTypeStore = useItemTypeStore()
  const quantityStore = useQuantityStore()
  const [init, setInit] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [itemTypeList, setItemTypeList] = useState<ItemType[]>(itemTypeStore.itemTypes)

  useEffect(() => {
    if (!init) {
      void itemTypeStore.fetchItemTypes()
      void quantityStore.fetchQuantity()
      setInit(true)
    }
  }, [init, itemTypeStore, quantityStore])

  useEffect(() => {
    setItemTypeList(
      itemTypeStore.itemTypes.filter((itemType) =>
        itemType.item_name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, itemTypeStore.itemTypes])

  return (
    <div>
      <input type='text' value={search} onChange={(e) => { setSearch(e.target.value) }} />
      {itemTypeList.map((item) => <div key={item.id}>
        <AddItemCard itemType={item} list_id={list_id} />
      </div>)}
      {search !== '' && itemTypeList.find((item) => item.item_name.toLowerCase() === search.toLocaleLowerCase()) === undefined &&
        <>
          <AddItemCard itemType={
            {
              id: 'new',
              default_quantity: '8943c50f-0789-4422-96a1-47466f245461',
              item_name: search
            }
          } list_id={list_id} />
        </>
      }
    </div>
  )
}
export default AddItem
