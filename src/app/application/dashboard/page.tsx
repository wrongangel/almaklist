import CollectionsList from '@/components/Lists/CollectionsList/CollectionsList'
import AddList from '@/components/forms/AddList/AddList'
import styles from './page.module.scss'

const Dashboard = async (): Promise<JSX.Element> => {
  return (
    <div className={styles.dashboard}>
      <CollectionsList />
      <AddList />
    </div>
  )
}
export default Dashboard
