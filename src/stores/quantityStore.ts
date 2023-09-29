import { type Quantity } from '@/models/quantity'
import { supabaseClient } from '@/service/supabase'
import { create } from 'zustand'

interface QuantityStore {
  quantity: Quantity[]
  fetchQuantity: () => Promise<void>
}
export const useQuantityStore = create<QuantityStore>((set) => ({
  quantity: [],

  fetchQuantity: async () => {
    const { data, error } = await supabaseClient
      .from('quantity_type')
      .select('*')
    if (error !== null) console.log(error.message)
    if (data !== null && data.length > 0) {
      set(() => { return ({ quantity: data }) })
    }
  }

}))
