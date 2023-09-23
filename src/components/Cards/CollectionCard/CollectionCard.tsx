import type Collection from '@/models/collection'
import BasicCard from '../BasicCard/BasicCard'
import Link from 'next/link'

interface Props {
  list: Collection
}

const CollectionCard = ({ list }: Props): JSX.Element => {
  return (
    <Link href={`/application/list/${list.id}`} key={list.id}>
      <BasicCard>{list.name}</BasicCard>
    </Link>
  )
}
export default CollectionCard
