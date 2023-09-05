import styles from './Container.module.scss'

interface Props {
  children: React.ReactNode
  className?: string
}
const Container = ({ children, className }: Props): React.ReactNode => {
  return (
    <div className={`${styles.container} ${className}`}>{children}</div>
  )
}
export default Container
