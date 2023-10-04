import IconButton from '@/components/Buttons/IconButton/IconButton'
import styles from './NumberInput.module.scss'
import PlusIcon from '@/assets/icons/Plus.svg'
import MinusIcon from '@/assets/icons/Minus.svg'
import Image from 'next/image'

interface Props {
  value: number
  onChange: (e: number) => void
}
const NumberInput = ({ value, onChange }: Props): JSX.Element => {
  return (
    <div className={styles.numberInput}>
      <IconButton onClick={() => { onChange(value - 1) }}>
        <Image src={MinusIcon} alt='decrease' className={styles.numberInput__icon} />
      </IconButton>
      <input
        className={styles.numberInput__input}
        maxLength={4}
        value={value}
        onChange={(e) => { onChange(parseFloat(e.target.value)) }}
        type='number' />
      <IconButton onClick={() => { onChange(value + 1) }} >
        <Image src={PlusIcon} alt='increase' className={styles.numberInput__icon} />
      </IconButton>
    </div>
  )
}
export default NumberInput
