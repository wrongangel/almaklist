import { useUserStore } from '@/stores/userStore'

import supabaseServer from '@/service/supabase'

const Dashboard = async (): Promise<JSX.Element> => {
  const supabase = await supabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (user !== null) {
    const { data } = await supabase.from('user_role').select('role').eq('user_id', user.id).single()
    useUserStore.setState({
      email: user.email,
      id: user.id,
      role: data?.role ?? 'user'
    })
  }

  return (
    <div>Role: {useUserStore.getState().role}
    </div>
  )
}
export default Dashboard
