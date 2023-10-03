import type Collection from '@/models/collection'
import BasicCard from '../BasicCard/BasicCard'
import Link from 'next/link'
import { useCollestionsStore } from '@/stores/collectionsStore'
import styles from './CollectionCard.module.scss'
import OptionsIcon from '@/assets/icons/Options.svg'
import Image from 'next/image'
import IconButton from '@/components/Buttons/IconButton/IconButton'

interface Props {
  list: Collection
}

const CollectionCard = ({ list }: Props): JSX.Element => {
  const collectionsStore = useCollestionsStore()
  return (
    <>
      <BasicCard className={styles.collectionCard}>
        <Link href={`/application/list/${list.id}`} key={list.id} className={styles.collectionCard__content}>
          <p className={styles.collectionCard__content_name}>{list.name}</p>
          <p className={styles.collectionCard__content_comment}>x out of x pending</p>
        </Link>
        <IconButton onClick={() => { void collectionsStore.removeList(list.id) }}>
          <Image src={OptionsIcon} alt='list options' />
        </IconButton>
      </BasicCard>
    </>
  )
}
export default CollectionCard
