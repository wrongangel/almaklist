import CollectionsList from '@/components/Lists/CollectionsList/CollectionsList'
import AddList from '@/components/forms/AddList/AddList'
import styles from './page.module.scss'

const Dashboard = async (): Promise<JSX.Element> => {
  return (
    <div className={styles.dashboard}>
      <h2>Your lists</h2>
      <CollectionsList />
      <AddList />
    </div>
  )
}
export default Dashboard
