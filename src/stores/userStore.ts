import { type BasicUser } from '@/models/user'
import { supabaseClient } from '@/service/supabase'
import { create } from 'zustand'

interface Actions {
  setState: (newState: BasicUser) => void
  getUser: () => Promise<void>
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
  },
  getUser: async () => {
    const { data: user, error } = await supabaseClient.auth.getUser()
    if (error !== null) console.log(error)
    if (user.user !== null) {
      const { data, error } = await supabaseClient
        .from('user_data')
        .select('*')
        .eq('id', user.user?.id)
        .single()
      if (error !== null) console.log(error)
      if (data !== null) {
        set(() => {
          return ({
            id: data.id,
            email: user.user.email,
            role: data.role
          })
        })
      }
    }
  }
}))
