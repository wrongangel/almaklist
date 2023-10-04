'use client'

import AddItemCard from '@/components/Cards/AddItemCard/AddItemCard'
import { useItemTypeStore } from '@/stores/itemTypeStore'
import { useQuantityStore } from '@/stores/quantityStore'
import { useEffect, useMemo, useState } from 'react'
import styles from './AddItem.module.scss'

interface Props {
  list_id: string
}
const AddItem = ({ list_id }: Props): JSX.Element => {
  const itemTypeStore = useItemTypeStore()
  const quantityStore = useQuantityStore()
  const [init, setInit] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    if (!init) {
      void itemTypeStore.fetchItemTypes()
      void quantityStore.fetchQuantity()
      setInit(true)
    }
  }, [init, itemTypeStore, quantityStore])

  const cacheSearch = useMemo(
    () => {
      return itemTypeStore.itemTypes.filter((itemType) =>
        itemType.item_name.toLowerCase().includes(search.toLowerCase())
      )
    }, [itemTypeStore.itemTypes, search]
  )

  const handleSearch = (searchString: string): void => {
    setSearch(searchString)
    void itemTypeStore.fetchItemSearch(searchString)
  }

  return (
    <div className={styles.addItemForm}>
      <input type='search' autoComplete='off' value={search} onChange={(e) => { handleSearch(e.target.value) }} />
      {cacheSearch.slice(0, 5).map((item) => <div key={item.id}>
        <AddItemCard itemType={item} list_id={list_id} />
      </div>)}
      {search !== '' && cacheSearch.find((item) => item.item_name.toLowerCase() === search.toLocaleLowerCase()) === undefined &&
        <AddItemCard itemType={
          {
            id: 'new',
            default_quantity: '8943c50f-0789-4422-96a1-47466f245461',
            item_name: search
          }
        } list_id={list_id} />
      }
    </div>
  )
}
export default AddItem
