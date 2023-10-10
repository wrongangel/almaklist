import Link from 'next/link'
import styles from './page.module.css'
import Header from '@/components/Header/Header'
import InvitesList from '@/components/Lists/InvitesList/InvitesList'
import CollectionsList from '@/components/Lists/CollectionsList/CollectionsList'

export default function Home (): React.ReactNode {
  return (<>
    <Header />
    <main className={styles.main}>
      <InvitesList />
      <CollectionsList limit={3} />
      <Link href='/application/dashboard'>Dashboard</Link>
    </main>
  </>
  )
}
