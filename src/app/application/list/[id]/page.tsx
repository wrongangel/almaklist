import supabaseServer from '@/service/supabase'

const ListPage = async ({ params }: { params: { id: string } }): Promise<JSX.Element> => {
  const supabase = await supabaseServer()
  const { data: list } = await supabase
    .from('list')
    .select('name')
    .eq('id', params.id)
    .single()
  const { data, error } = await supabase
    .from('item_entries')
    .select(`
      id,
      created_at,
      completed,
      list (name),
      added_by,
      quantity,
      user_data (id, user_name),
      item_type (item_name),
      quantity_type (shortName)
      `)
    .eq('list_id', params.id)
  if (error !== null) console.log(error)

  if (data === null) return <div>Loading...</div>

  return (
    <div><h2>{list?.name}</h2>
      {data.length < 1
        ? <div>no items</div>
        : data.map(item => (
          <div key={item.id}>{item.item_type?.item_name} {item.quantity} {item.quantity_type?.shortName}</div>
        ))}
    </div>
  )
}
export default ListPage
