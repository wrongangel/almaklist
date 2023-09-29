import React from 'react'
import styles from './BasicCard.module.scss'

interface Props {
  className?: string
  children?: React.ReactElement | string
}
const BasicCard = ({ className, children }: Props): JSX.Element => {
  return (
    <div className={`${styles.basicCard} ${className}`}>{children}</div>
  )
}
export default BasicCard
