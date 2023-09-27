'use client'

import { useCollestionsStore } from '@/stores/collectionsStore'
import { useUserStore } from '@/stores/userStore'
import * as Form from '@radix-ui/react-form'
import { type FormEvent, useState } from 'react'

const AddList = (): JSX.Element => {
  const [name, setName] = useState<string>('')
  const collectionsStore = useCollestionsStore()
  const userStore = useUserStore()
  const handleAddList = (e: FormEvent): void => {
    e.preventDefault()
    void collectionsStore.addList(userStore.id, name)
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
