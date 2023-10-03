import styles from './IconButton.module.scss'

interface Props {
  className?: string
  onClick?: () => void
  children?: React.ReactNode
}
const IconButton = ({ className, onClick, children }: Props): JSX.Element => {
  return (
    <button onClick={onClick} className={`${styles.iconButton} ${className}`}>
      {children}
    </button>
  )
}
export default IconButton
