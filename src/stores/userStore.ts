import { type BasicUser } from '@/models/user'
import { create } from 'zustand'

export const useUserStore = create<BasicUser>((set) => ({
  id: '',
  email: '',
  role: 'user'
}))
