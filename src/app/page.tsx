import Link from 'next/link'
import styles from './page.module.css'

export default function Home (): React.ReactNode {
  return (
    <main className={styles.main}>
      <h1>{'Let\'s start'}</h1>
      <Link href={'auth/login'}>log in</Link>
      <Link href={'auth/registration'}>register</Link>
    </main>
  )
}
