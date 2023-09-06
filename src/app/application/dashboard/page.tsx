import supabaseServer from '@/service/supabase'
import { useUserStore } from '@/stores/userStore'

interface List {
  created_at: string
  id: string
  name: string
}

const Dashboard = async (): Promise<JSX.Element> => {
  const supabase = await supabaseServer()
  let lists: List[] = []
  try {
    const { data: users_to_lists, error } = await supabase
      .from('users_to_lists')
      .select('list')
      .eq('user', useUserStore.getState().id)
    if (error !== null) { console.log(error) }
    if (users_to_lists !== null && users_to_lists.length > 0) {
      const { data: list, error } = await supabase
        .from('list')
        .select('*')
        .in('id', users_to_lists.map(item => item.list))
      if (error !== null) { console.log(error) }
      if (list !== null) {
        lists = list
      }
    }
  } catch (error) {
    console.log(error)
  }

  return (
    <div>
      {lists.map(item => (
        <div key={item.id}>{item.id} {item.name}</div>
      ))}
    </div>
  )
}
export default Dashboard
