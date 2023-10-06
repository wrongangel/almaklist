'use client'

import DropdownMainMenu from '@/components/Navigation/DropdownMenu/DropdownMainMenu'
import { useUserStore } from '@/stores/userStore'
import Link from 'next/link'

const HeaderRightPart = (): JSX.Element => {
  const userStore = useUserStore()
  return (
    <>
      {
        userStore.id === '' &&
        <>
          <Link href='/login'>Log in</Link>
          <Link href='/registration'>Sign up</Link>
        </>
      }
      <DropdownMainMenu />
    </>
  )
}
export default HeaderRightPart
