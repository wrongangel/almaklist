'use client'

import { useUserStore } from '@/stores/userStore'
import Link from 'next/link'

const HeaderRightPart = (): JSX.Element => {
  const userStore = useUserStore()
  return (
    <>
      {
        userStore.id !== ''
          ? <Link href='#'>{userStore.user_name}</Link>
          : <>
            <Link href='/login'>Log in</Link>
            <Link href='/registration'>Sign up</Link>
          </>
      }
    </>
  )
}
export default HeaderRightPart
