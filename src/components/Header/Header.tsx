import Link from 'next/link'
import styles from './Header.module.scss'
import Container from '@/components/Container/Container'
import HeaderRightPart from './HeaderRightPart/HeaderRightPart'
import LogoIcon from '@/assets/Logo.svg'
import Image from 'next/image'

const Header = async (): Promise<JSX.Element> => {
  return (
    <Container className={styles.header}>
      <div className={styles.header__logo}><Link href='/'><Image src={LogoIcon} alt='logo' /></Link></div>
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
