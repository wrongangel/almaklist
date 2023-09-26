'use client'
import { useEffect, useRef } from 'react'
import { useUserStore } from './userStore'

const UserStoreInit = (): React.ReactNode => {
  const init = useRef<boolean>(false)
  const userStore = useUserStore()

  useEffect(() => {
    if (!init.current) {
      void userStore.getUser()
      init.current = true
    }
  }, [userStore])

  return <></>
}
export default UserStoreInit
