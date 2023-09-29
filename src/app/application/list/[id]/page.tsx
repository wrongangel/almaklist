import ItemsList from '@/components/Lists/ItemsList/ItemsList'
import AddItem from '@/components/forms/AddItem/AddItem'
import InviteToList from '@/components/forms/InviteToList/InviteToList'
import supabaseServer from '@/service/supabase'

const ListPage = async ({ params }: { params: { id: string } }): Promise<JSX.Element> => {
  const supabase = await supabaseServer()
  const { data: list } = await supabase
    .from('list')
    .select('name')
    .eq('id', params.id)
    .single()

  return (
    <div><h2>{list?.name}</h2>
      <InviteToList to_list={params.id} />
      <ItemsList listId={params.id} />
      <AddItem list_id={params.id} />
    </div>
  )
}
export default ListPage
