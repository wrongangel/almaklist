import ItemsList from '@/components/Lists/ItemsList/ItemsList'
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
      <ItemsList listId={params.id} />
    </div>
  )
}
export default ListPage
