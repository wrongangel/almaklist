import { type ItemType } from '@/models/itemType'
import { supabaseClient } from '@/service/supabase'
import { create } from 'zustand'

interface ItemTypeStore {
  itemTypes: ItemType[]
  fetchItemTypes: () => Promise<void>
}
export const useItemTypeStore = create<ItemTypeStore>((set) => ({
  itemTypes: [],

  fetchItemTypes: async () => {
    const { data, error } = await supabaseClient
      .from('item_type')
      .select('*')
    if (error !== null) console.log(error.message)
    if (data !== null && data.length > 0) {
      set(() => { return ({ itemTypes: data }) })
    }
  }

}))
