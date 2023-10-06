'use client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import MenuIcon from '@/assets/icons/Menu.svg'
import Image from 'next/image'
import styles from './DropdownMainMenu.module.scss'

const DropdownMainMenu = (): JSX.Element => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={styles.menuButton}>
        <Image src={MenuIcon} alt='menu' />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.menuContent}>
          <DropdownMenu.Item asChild>
            <a href='#'>changelog</a>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <a href='#'>roadmap</a>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <a href='https://github.com/wrongangel/almaklist' target='_blank'>gitthub</a>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <button>logout</button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
export default DropdownMainMenu
