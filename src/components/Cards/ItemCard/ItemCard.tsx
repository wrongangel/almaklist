import type Item from '@/models/item'
import BasicCard from '../BasicCard/BasicCard'
import { type HTMLAttributes } from 'react'

interface Props {
  item: Item
  props?: HTMLAttributes<HTMLDivElement>
}
const ItemCard = ({ item, props }: Props): JSX.Element => {
  return (
    <BasicCard {...props}>{item.item_type?.item_name}</BasicCard>
  )
}
export default ItemCard
