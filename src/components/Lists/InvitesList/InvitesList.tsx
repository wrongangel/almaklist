'use client'

import InviteCard from '@/components/Cards/InviteCard/InviteCard'
import { useInvitesStore } from '@/stores/invitesStore'
import { useUserStore } from '@/stores/userStore'
import { useEffect, useState } from 'react'
import styles from './InvitesList.module.scss'

const InvitesList = (): JSX.Element => {
  const userStore = useUserStore()
  const invitesStore = useInvitesStore()
  const [init, setInit] = useState<boolean>(false)

  useEffect(() => {
    if (!init && userStore.email !== '') {
      void invitesStore.fetchInvitesByMail(userStore.email)
      setInit(true)
    }
  }, [init, invitesStore, userStore.email])

  return (
    <>
      {invitesStore.invites.length > 0 &&
        <div className={styles.invitesList}><h2>You have invites</h2>
          <div className={styles.invitesList__container}>
            {invitesStore.invites.map((invite) =>
              <InviteCard invite={invite} key={invite.id} />
            )}
          </div>
        </div>
      }
    </>
  )
}
export default InvitesList
