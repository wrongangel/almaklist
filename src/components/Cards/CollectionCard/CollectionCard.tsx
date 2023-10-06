import type Collection from '@/models/collection'
import BasicCard from '../BasicCard/BasicCard'
import Link from 'next/link'
import styles from './CollectionCard.module.scss'
import ListMenu from '@/components/Navigation/ListMenu/ListMenu'

interface Props {
  list: Collection
}

const CollectionCard = ({ list }: Props): JSX.Element => {
  return (
    <>
      <BasicCard className={styles.collectionCard}>
        <Link href={`/application/list/${list.id}`} key={list.id} className={styles.collectionCard__content}>
          <p className={styles.collectionCard__content_name}>{list.name}</p>
          <p className={styles.collectionCard__content_comment}>x out of x pending</p>
        </Link>
        <ListMenu list={list}/>
      </BasicCard>
    </>
  )
}
export default CollectionCard
