'use client'

import { useInvitesStore } from '@/stores/invitesStore'
import { useUserStore } from '@/stores/userStore'
import { useState } from 'react'

interface Props {
  to_list: string
}

const InviteToList = ({ to_list }: Props): JSX.Element => {
  const inviteStore = useInvitesStore()
  const userStore = useUserStore()
  const [email, setEmail] = useState<string>('')

  return (
    <div>InviteToList
      <input type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
      <button onClick={() => { void inviteStore.inviteUser(userStore.id, to_list, email) }}>invite</button>
    </div>
  )
}
export default InviteToList
