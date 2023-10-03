import { type Invite } from '@/models/invite'
import { supabaseClient } from '@/service/supabase'
import { create } from 'zustand'

interface InvitesStore {
  invites: Invite[]
  fetchInvitesByMail: (email: string) => Promise<void>
  fetchInvitesByList: (to_list: string) => Promise<void>
  acceptInvite: (invite_id: string, to_list: string, user_id: string) => Promise<void>
  inviteUser: (user_id: string, to_list: string, email: string) => Promise<void>
  deleteInvite: (invite_id: string) => Promise<void>
}

export const useInvitesStore = create<InvitesStore>((set) => ({
  invites: [],

  fetchInvitesByMail: async (email) => {
    const { data, error } = await supabaseClient
      .from('invites')
      .select(`
      id,
      user_data (user_name),
      list (id, name),
      email
      `)
      .eq('email', email)
      .returns<Invite[]>()
    if (error !== null) console.log(error.message)
    if (data !== null && data.length > 0) {
      set(() => {
        return ({
          invites: data
        })
      })
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
      .returns<Invite[]>()
    if (error !== null) console.log(error.message)
    if (data !== null && data.length > 0) {
      set(() => { return ({ invites: data }) })
    }
  },

  acceptInvite: async (invite_id, to_list, user_id) => {
    const { data, error } = await supabaseClient
      .rpc('accept_invite', {
        invite_id,
        to_list,
        user_id
      })
    if (error !== null) {
      console.log(error.message)
    } else if (data) {
      set((state) => {
        return ({
          invites: state.invites.filter((invite) => invite.id !== invite_id)
        })
      })
    }
  },

  inviteUser: async (user_id, to_list, email) => {
    const { error } = await supabaseClient
      .from('invites')
      .insert([
        {
          from: user_id,
          to_list,
          email
        }
      ])
    if (error !== null) console.log(error.message)
  },

  deleteInvite: async (invite_id) => {
    const { error } = await supabaseClient
      .from('invites')
      .delete()
      .eq('id', invite_id)
    if (error !== null) {
      console.log(error.message)
    } else {
      set((state) => {
        return ({
          invites: state.invites.filter((invite) => invite.id !== invite_id)
        })
      })
    }
  }

}))
