import type Collection from '@/models/collection'
import BasicCard from '../BasicCard/BasicCard'
import Link from 'next/link'
import { useCollestionsStore } from '@/stores/collectionsStore'
import styles from './CollectionCard.module.scss'

interface Props {
  list: Collection
}

const CollectionCard = ({ list }: Props): JSX.Element => {
  const collectionsStore = useCollestionsStore()
  return (
    <>
      <BasicCard className={styles.collectionCard}>
        <Link href={`/application/list/${list.id}`} key={list.id}>
          {list.name}
        </Link>
        <button onClick={() => { void collectionsStore.removeList(list.id) }}>Delete</button>
      </BasicCard>
    </>
  )
}
export default CollectionCard
