'use client'
import { type BasicUser } from '@/models/user'
import { useRef } from 'react'
import { useUserStore } from './userStore'

const UserStoreInit = (props: BasicUser): React.ReactNode => {
  const init = useRef<boolean>(false)
  if (!init.current) {
    useUserStore.setState(props)
    init.current = true
  }

  return <></>
}
export default UserStoreInit
