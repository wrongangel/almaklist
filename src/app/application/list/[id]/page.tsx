import ItemsList from '@/components/Lists/ItemsList/ItemsList'
import InviteToList from '@/components/forms/InviteToList/InviteToList'
import supabaseServer from '@/service/supabase'
import styles from './page.module.scss'
import BackButton from '@/components/Buttons/BackButton/BackButton'
import AddItemDialogue from '@/components/Dialogues/AddItemDialogue/AddItemDialogue'

const ListPage = async ({ params }: { params: { id: string } }): Promise<JSX.Element> => {
  const supabase = await supabaseServer()
  const { data: list } = await supabase
    .from('list')
    .select('name')
    .eq('id', params.id)
    .single()

  return (
    <div className={styles.listPage}>
      <div className={styles.listPage__header}>
        <BackButton />
        <h2>{list?.name}</h2>
      </div>
      <ItemsList listId={params.id} />
      <AddItemDialogue listId={params.id} />
      <InviteToList to_list={params.id} />
    </div>
  )
}
export default ListPage
