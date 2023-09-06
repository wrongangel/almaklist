import supabaseServer from '@/service/supabase'
import { useUserStore } from '@/stores/userStore'
import Link from 'next/link'

const Dashboard = async (): Promise<JSX.Element> => {
  const supabase = await supabaseServer()
  const { data, error } = await supabase
    .from('users_to_lists')
    .select(`
    list (*)
    `)
    .eq('user', useUserStore.getState().id)
  if (error !== null) { console.log(error) }

  return (
    <div>
      {data === null
        ? <div>loading</div>
        : data.map(item => (
          <Link href={`/application/list/${item.list?.id}`} key={item.list?.id}>{item.list?.id} {item.list?.name}</Link>
        ))
    }
    </div>
  )
}
export default Dashboard
