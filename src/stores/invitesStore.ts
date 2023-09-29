import { Invite } from '@/models/invite'
import { supabaseClient } from '@/service/supabase'
import { create } from 'zustand'

interface InvitesStore {
  invites: Invite[]
  fetchInvitesByMail: (email: string) => Promise<void>
  fetchInvitesByList: (to_list: string) => Promise<void>
}
export const useItemTypeStore = create<InvitesStore>((set) => ({
  invites: [],

  fetchInvitesByMail: async (email) => {
    const { data, error } = await supabaseClient
      .from('invites')
      .select(`
      id,
      from,
      list (id, name),
      email
      `)
      .eq('email', email)
    if (error !== null) console.log(error.message)
    if (data !== null && data.length > 0) {
      set(() => { return ({ invites: data }) })
    }
  },
  
  fetchInvitesByList: async (to_list) => {
    const { data, error } = await supabaseClient
      .from('invites')
      .select(`
      id,
      from,
      list (id, name),
      email
      `)
      .eq('to_list', to_list)
    if (error !== null) console.log(error.message)
    if (data !== null && data.length > 0) {
      set(() => { return ({ invites: data }) })
    }
  },

}))
