import { type Invite } from '@/models/invite'
import BasicCard from '../BasicCard/BasicCard'
import { useInvitesStore } from '@/stores/invitesStore'
import { useUserStore } from '@/stores/userStore'

interface Props {
  invite: Invite
}
const InviteCard = ({ invite }: Props): JSX.Element => {
  const invitesStore = useInvitesStore()
  const userStore = useUserStore()
  const handleAccept = (): void => {
    void invitesStore.acceptInvite(invite.id, invite.list?.id, userStore.id)
  }

  return (
    <BasicCard onClick={() => { handleAccept() }}><>
      To list {invite.list?.name}
    </></BasicCard>
  )
}
export default InviteCard
