import React from 'react'
import styles from './BasicCard.module.scss'

interface Props {
  className?: string
  onClick?: () => void
  children?: React.ReactElement | string
}
const BasicCard = ({ className, children, onClick }: Props): JSX.Element => {
  return (
    <div className={`${styles.basicCard} ${className}`} onClick={onClick}>{children}</div>
  )
}
export default BasicCard
