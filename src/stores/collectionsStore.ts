import type Collection from '@/models/collection'
import { supabaseClient } from '@/service/supabase'
import { create } from 'zustand'

interface CollectionsStore {
  collections: Collection[]
  setState: (newState: Collection[]) => void
  fetchCollections: (id: string) => Promise<void>
  addList: (user: string,name: string) => Promise<void>
}

export const useCollestionsStore = create<CollectionsStore>((set) => ({
  collections: [],

  setState: (newState) => {
    set(() => {
      return ({
        collections: newState
      })
    })
  },

  fetchCollections: async (id) => {
    const { data, error } = await supabaseClient
      .from('users_to_lists')
      .select('list (*)')
      .eq('user_id', id)
      .not('list', 'is', 'NULL')
    if (error !== null) console.log(error)

    if (data !== null && data.length > 0) {
      set(() => {
        return ({
          collections: data.flatMap((item) => item.list ?? [])
        })
      }
      )
    }
  },
  addList: async (user, name) => {
    set((state) => {
      return ({
        collections: [
          ...state.collections,
          {
            created_at: '',
            id: '',
            name
          }
        ]
      })
    })
  }
}))
