'use client'
import styles from './ListMenu.module.scss'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import OptionsIcon from '@/assets/icons/Options.svg'
import type Collection from '@/models/collection'
import { useCollestionsStore } from '@/stores/collectionsStore'

interface Props {
  list: Collection
}
const ListMenu = ({ list }: Props): JSX.Element => {
  const collectiosStore = useCollestionsStore()
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={styles.menuButton}>
        <Image src={OptionsIcon} alt='menu' />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.menuContent}>
          <DropdownMenu.Item asChild>
            <a href={`/application/list/${list.id}`}>open</a>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <button onClick={() => { void collectiosStore.removeList(list.id) }}>delete</button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
export default ListMenu
