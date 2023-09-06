import { type BasicUser } from '@/models/user'
import { create } from 'zustand'

interface Actions {
  setState: (newState: BasicUser) => void
}

export const useUserStore = create<BasicUser & Actions>((set) => ({
  id: '',
  email: '',
  role: 'user',
  setState: (newState) => {
    set(() => {
      return ({
        id: newState.id,
        email: newState.email,
        role: newState.role
      })
    })
  }
}))
