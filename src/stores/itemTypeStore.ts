import { type ItemType } from '@/models/itemType'
import { supabaseClient } from '@/service/supabase'
import { create } from 'zustand'

interface ItemTypeStore {
  itemTypes: ItemType[]
  fetchItemTypes: () => Promise<void>
  fetchItemSearch: (search: string) => Promise<void>
}
export const useItemTypeStore = create<ItemTypeStore>((set) => ({
  itemTypes: [],

  fetchItemTypes: async () => {
    const { data, error } = await supabaseClient
      .from('item_type')
      .select('*')
      .limit(5)
    if (error !== null) console.log(error.message)
    if (data !== null && data.length > 0) {
      set(() => { return ({ itemTypes: data }) })
    }
  },

  fetchItemSearch: async (search) => {
    const { data, error } = await supabaseClient
      .from('item_type')
      .select('*')
      .ilike('item_name', '%' + search + '%')
      .limit(5)
    if (error !== null) console.log(error.message)
    if (data !== null && data.length > 0) {
      set((state) => {
        return ({
          itemTypes:
            [
              ...state.itemTypes,
              ...data.filter((item) => state.itemTypes.find((oldItem) => oldItem.id === item.id) === undefined)
            ]
        })
      })
    }
  }

}))
