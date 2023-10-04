'use client'
import Image from 'next/image'
import IconButton from '../IconButton/IconButton'
import BackArrow from '@/assets/icons/BackArrow.svg'
import { useRouter } from 'next/navigation'
import styles from './BackButton.module.scss'

const BackButton = (): JSX.Element => {
  const router = useRouter()
  return (
    <IconButton onClick={() => { router.back() }}><Image src={BackArrow} alt='go back' className={styles.icon} /></IconButton>
  )
}
export default BackButton
