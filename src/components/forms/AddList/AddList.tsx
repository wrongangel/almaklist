'use client'

import { useCollestionsStore } from '@/stores/collectionsStore'
import * as Form from '@radix-ui/react-form'
import { type FormEvent, useState } from 'react'

interface Props {
  reload?: () => Promise<void>
}

const AddList = (props: Props): JSX.Element => {
  const [name, setName] = useState<string>('')
  const collectionsStore = useCollestionsStore()
  const handleAddList = (e: FormEvent): void => {
    e.preventDefault()
    collectionsStore.addList(name)
  }

  return (
    <div>
      <Form.Root onSubmit={(e) => { handleAddList(e) }}>
        <Form.Field name='ListName'>
          <Form.Label>List name</Form.Label>
          <Form.Control asChild>
            <input
              type='text'
              value={name}
              onChange={(e) => { setName(e.target.value) }}
              minLength={2}
              required />
          </Form.Control>
          <Form.Message match='tooShort'>
            Name is minimum of 2 characters
          </Form.Message>
        </Form.Field>
        <Form.Submit asChild>
          <button>Add List</button>
        </Form.Submit>
      </Form.Root>
    </div>
  )
}
export default AddList
