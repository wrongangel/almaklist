'use client'
import { type ItemType } from '@/models/itemType'
import { useQuantityStore } from '@/stores/quantityStore'
import * as Select from '@radix-ui/react-select'
import styles from './SelectQuantityType.module.scss'
import DownArrow from '@/assets/icons/DownArrow.svg'
import Image from 'next/image'

interface Props {
  itemType: ItemType
  value: string
  onValueChange: (value: string) => void
}
const SelectQuantityType = ({ itemType, value, onValueChange }: Props): JSX.Element => {
  const quantityStore = useQuantityStore()
  return (
    <Select.Root
      defaultValue={itemType.default_quantity}
      value={value}
      onValueChange={(e) => { onValueChange(e) }}>
      <Select.Trigger className={styles.selectTrigger}>
        <Select.Value />
        <Select.Icon><Image src={DownArrow} alt='select quantity type' height={16}/></Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Group>
          <Select.Content className={styles.selectContent}>
            <Select.Viewport className={styles.selectViewport}>
              {quantityStore.quantity.map((q) =>
                <Select.Item value={q.id} key={q.id} className={styles.selectItem}>
                  <p>{q.name}</p>
                  <Select.ItemText>{q.shortName}</Select.ItemText>
                </Select.Item>
              )}
            </Select.Viewport>
          </Select.Content>
        </Select.Group>
      </Select.Portal>
    </Select.Root>
  )
}
export default SelectQuantityType
