'use client'
import type Item from '@/models/item'
import BasicCard from '../BasicCard/BasicCard'
import { useCollestionsStore } from '@/stores/collectionsStore'
import styles from './ItemCard.module.scss'
import DeleteIcon from '@/assets/icons/Delete.svg'
import CheckIcon from '@/assets/icons/Check.svg'
import IconButton from '@/components/Buttons/IconButton/IconButton'
import Image from 'next/image'

interface Props {
  item: Item
  from: string
}

const ItemCard = ({ item, from }: Props): JSX.Element => {
  const collectionsStore = useCollestionsStore()

  const handleItemChange = (): void => {
    void collectionsStore.changeItemComplete(item.id, !item.completed, from)
  }

  return (
    <>
      <BasicCard className={`${styles.itemCard} ${item.completed && styles.itemCard_completed}`}>
        <div onClick={() => { handleItemChange() }} className={styles.itemCard__content}>
          <Image src={CheckIcon} alt=''
            className={`${styles.itemCard__checkIcon} ${item.completed && styles.itemCard__checkIcon_completed}`} />
          <p><b>{item.item_type?.item_name}</b> {item.quantity} {item.quantity_type?.shortName}</p>
        </div>
        <IconButton onClick={() => { void collectionsStore.deleteItem(item.id, from) }}>
          <Image src={DeleteIcon} alt='delete item' />
        </IconButton>
      </BasicCard>
    </>
  )
}
export default ItemCard
