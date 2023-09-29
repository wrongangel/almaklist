import { type Invite } from '@/models/invite'
import BasicCard from '../BasicCard/BasicCard'

interface Props {
  invite: Invite
}
const InviteCard = ({ invite }: Props): JSX.Element => {
  return (
    <BasicCard><>
      To list {invite.list?.name}
    </>
    </BasicCard>
  )
}
export default InviteCard
