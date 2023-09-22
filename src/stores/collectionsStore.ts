import Collection from '@/models/collection'
import { supabaseClient } from '@/service/supabase'
import { create } from 'zustand'

interface CollectionsStore {
  collections: Collection[]
  setState: (newState: Collection[]) => void
  fetchCollections: (id: string) => void
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
      .eq('user', id)
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

  }
}))
