import type Collection from '@/models/collection'
import BasicCard from '../BasicCard/BasicCard'
import Link from 'next/link'
import { useCollestionsStore } from '@/stores/collectionsStore'

interface Props {
  list: Collection
}

const CollectionCard = ({ list }: Props): JSX.Element => {
  const collectionsStore = useCollestionsStore()
  return (
    <>
      <Link href={`/application/list/${list.id}`} key={list.id}>
        <BasicCard>
          <>
            {list.name}
          </>
        </BasicCard>
      </Link>
      <button onClick={() => { void collectionsStore.removeList(list.id) }}>Delete</button>
    </>
  )
}
export default CollectionCard
