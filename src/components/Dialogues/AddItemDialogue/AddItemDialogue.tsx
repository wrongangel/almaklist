'use client'
import AddItem from '@/components/forms/AddItem/AddItem'
import * as Dialog from '@radix-ui/react-dialog'
import styles from './AddItemDialogue.module.scss'

interface Props {
  listId: string
}
const AddItemDialogue = ({ listId }: Props): JSX.Element => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>add item</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content className={styles.dialogContent} >
          <AddItem list_id={listId} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
export default AddItemDialogue
