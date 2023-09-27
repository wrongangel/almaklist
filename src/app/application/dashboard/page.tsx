import CollectionsList from '@/components/Lists/CollectionsList/CollectionsList'
import AddList from '@/components/forms/AddList/AddList'

const Dashboard = async (): Promise<JSX.Element> => {
  return (
    <>
      <CollectionsList />
      <AddList />
    </>
  )
}
export default Dashboard
