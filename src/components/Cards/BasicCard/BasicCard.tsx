import React, { type HTMLAttributes } from 'react'
import styles from './BasicCard.module.scss'

interface Props {
  props?: HTMLAttributes<HTMLDivElement>
  children?: React.ReactElement
}
const BasicCard = ({ props, children }: Props): JSX.Element => {
  return (
    <div className={styles.basicCard} {...props}>{children}</div>
  )
}
export default BasicCard
