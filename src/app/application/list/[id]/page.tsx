import supabaseServer from '@/service/supabase'

const ListPage = async ({ params }: { params: { id: string } }): Promise<JSX.Element> => {
  const supabase = await supabaseServer()
  const { data, error } = await supabase
    .from('item_entries')
    .select(`
      id,
      created_at,
      completed,
      list (name),
      added_by,
      quantity,
      user_data (id, userName),
      item_type (item_name),
      quantity_type (short_name)
      `)
    .eq('list_id', params.id)
  if (error !== null) console.log(error)

  if (data === null || data.length < 1) return <div>Loading...</div>

  return (
    <div>{data[0].list?.name}
      {data.map(item => (
        <div key={item.id}>{item.item_type?.item_name} {item.quantity} {item.quantity_type?.short_name}</div>
      ))}
    </div>
  )
}
export default ListPage
