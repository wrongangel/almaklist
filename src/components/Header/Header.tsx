import Link from 'next/link'
import styles from './Header.module.scss'
import Container from '@/components/Container/Container'
import supabaseServer from '@/service/supabase'
import { useUserStore } from '@/stores/userStore'
import UserStoreInit from '@/stores/userStoreInit'
import HeaderRightPart from './HeaderRightPart/HeaderRightPart'

const Header = async (): Promise<JSX.Element> => {
  const supabase = await supabaseServer()
  try {
    const { data: user, error } = await supabase.auth.getUser()
    if (error !== null) console.log(error)
    if (user.user !== null) {
      const { data, error } = await supabase
        .from('user_data')
        .select('*')
        .eq('user_id', user.user.id)
        .single()
      if (error !== null) console.log(error)
      if (data !== null) {
        useUserStore.setState({ id: data.id, email: user.user.email })
      }
    }
  } catch (error) {
    console.log(error)
  }

  return (
    <Container className={styles.header}>
      <UserStoreInit {...useUserStore.getState()} />
      <div className={styles.header__logo}><Link href='/'>Almaklist</Link></div>
      <nav className={styles.header__navigation}>
        <ul>
          <li><Link href='#'>changelog</Link></li>
          <li><Link href='#'>roadmap</Link></li>
          <li><Link href='https://github.com/wrongangel/almaklist' target='_blank'>github</Link></li>
        </ul>
      </nav>
      <div className={styles.header__authorization}>
        <HeaderRightPart />
      </div>
    </Container>
  )
}
export default Header
