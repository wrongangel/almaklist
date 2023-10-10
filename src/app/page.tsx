import Link from 'next/link'
import styles from './page.module.css'
import Header from '@/components/Header/Header'
import InvitesList from '@/components/Lists/InvitesList/InvitesList'
import CollectionsList from '@/components/Lists/CollectionsList/CollectionsList'

export default function Home (): React.ReactNode {
  return (<>
    <Header />
    <main className={styles.main}>
      <CollectionsList limit={3} />
      <InvitesList />
      <Link href='/application/dashboard'>Dashboard</Link>
    </main>
  </>
  )
}
