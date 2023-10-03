import { type Invite } from '@/models/invite'
import BasicCard from '../BasicCard/BasicCard'
import { useInvitesStore } from '@/stores/invitesStore'
import { useUserStore } from '@/stores/userStore'
import styles from './InviteCard.module.scss'
import CheckIcon from '@/assets/icons/Check.svg'
import DeleteIcon from '@/assets/icons/Delete.svg'

import Image from 'next/image'

interface Props {
  invite: Invite
}
const InviteCard = ({ invite }: Props): JSX.Element => {
  const invitesStore = useInvitesStore()
  const userStore = useUserStore()
  const handleAccept = (): void => {
    void invitesStore.acceptInvite(invite.id, invite.list?.id, userStore.id)
  }
  const handleDecline = (): void => {
    void invitesStore.deleteInvite(invite.id)
  }

  return (
    <BasicCard className={styles.inviteCard}><>
      <div className={styles.inviteCard__content}>
        <p>From <span>{invite.user_data.user_name}</span></p>
        <p>To list <span>{invite.list?.name}</span></p>
      </div>
      <div className={styles.inviteCard__actions}>
        <button onClick={handleAccept}><Image src={CheckIcon} alt='accept invite' /></button>
        <button onClick={handleDecline}><Image src={DeleteIcon} alt='decline invite' /></button>
      </div>
    </></BasicCard>
  )
}
export default InviteCard
