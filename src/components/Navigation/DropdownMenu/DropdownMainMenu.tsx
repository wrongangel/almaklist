'use client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import MenuIcon from '@/assets/icons/Menu.svg'
import Image from 'next/image'
import styles from './DropdownMainMenu.module.scss'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'next/navigation'

const DropdownMainMenu = (): JSX.Element => {
  const userStore = useUserStore()
  const router = useRouter()
  const handleLogout = async (): Promise<void> => {
    await userStore.logOut()
    router.push('/')
    router.refresh()
  }
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
            <button onClick={() => { void handleLogout() }}>logout</button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
export default DropdownMainMenu
