import type Collection from '@/models/collection'
import { supabaseClient } from '@/service/supabase'
import { create } from 'zustand'

interface CollectionsStore {
  collections: Collection[]
  setState: (newState: Collection[]) => void
  fetchCollections: (id: string) => Promise<void>
  addList: (user: string, name: string) => Promise<void>
  removeList: (list_id: string) => Promise<void>
  getCollectionItems: (list_id: string) => Promise<void>
  addItem: (author_id: string, item_type: string, quantity: number, quantity_type: string, list_id: string) => Promise<void>
  addItemWithType: (author_id: string, item_name: string, quantity: number, quantity_type: string, list_id: string) => Promise<void>
  changeItemComplete: (item_id: string, isComplete: boolean, list_id: string) => Promise<void>
  deleteItem: (item_id: string, list_id: string) => Promise<void>
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
    if (error !== null) console.log(error)

    if (data !== null && data.length > 0) {
      set((state) => {
        return ({
          collections: data.flatMap((item) => {
            if (item.list !== null) {
              const haveCollection = state.collections.find((collection) => collection.id === item.list?.id)
              if (haveCollection !== undefined) {
                return { ...item.list, items: haveCollection.items }
              }
              return item.list
            } else return []
          })
        })
      }
      )
    }
  },

  addList: async (user, name) => {
    const { data, error } = await supabaseClient
      .rpc('add_list', {
        list_name: name,
        user_id: user
      }).single()
    if (error !== null) console.log(error)
    if (data !== null) {
      set((state) => {
        return ({
          collections: [
            ...state.collections,
            {
              created_at: data.created_at,
              id: data.id,
              name: data.name
            }
          ]
        })
      }
      )
    }
  },

  removeList: async (list_id) => {
    const { error } = await supabaseClient
      .from('list')
      .delete()
      .eq('id', list_id)
    if (error !== null) {
      console.log(error.message)
    } else {
      set((state) => {
        return ({
          collections: state.collections.filter((collection) => collection.id !== list_id)
        })
      })
    }
  },

  getCollectionItems: async (list_id) => {
    const { data, error } = await supabaseClient
      .from('item_entries')
      .select(`
      id,
      created_at,
      completed,
      added_by,
      quantity,
      user_data (id, user_name),
      item_type (item_name),
      quantity_type (shortName)
      `)
      .eq('list_id', list_id)
    if (error !== null) console.log(error)
    if (data !== null && data.length > 0) {
      set((state) => {
        return ({
          collections: state.collections.map((collection) => {
            if (collection.id === list_id) {
              return { ...collection, items: data }
            }
            return collection
          })
        })
      })
    }
  },

  changeItemComplete: async (item_id, isComplete, list_id) => {
    const { data, error } = await supabaseClient
      .from('item_entries')
      .update({ completed: isComplete })
      .eq('id', item_id)
      .select()
    if (error !== null) console.log(error)
    if (data !== null) {
      set((state) => {
        return ({
          collections: state.collections.map((collection) => {
            if (collection.id === list_id) {
              return {
                ...collection,
                items: collection.items?.map((item) => {
                  if (item.id === item_id) {
                    return { ...item, completed: isComplete }
                  }
                  return item
                })
              }
            }
            return collection
          })
        })
      })
    }
  },

  deleteItem: async (item_id, list_id) => {
    const { error } = await supabaseClient
      .from('item_entries')
      .delete()
      .eq('id', item_id)
    if (error !== null) {
      console.log(error)
    } else {
      set((state) => {
        return ({
          collections: state.collections.map((collection) => {
            if (collection.id === list_id) {
              return { ...collection, items: collection.items?.filter((item) => item.id !== item_id) }
            }
            return collection
          })
        })
      })
    }
  },

  addItem: async (author_id, item_type, quantity, quantity_type, list_id) => {
    const { data, error } = await supabaseClient
      .from('item_entries')
      .insert([
        {
          added_by: author_id,
          item_type,
          quantity,
          quantity_type,
          list_id
        }
      ])
      .select(`
      id,
      created_at,
      completed,
      added_by,
      quantity,
      user_data (id, user_name),
      item_type (item_name),
      quantity_type (shortName)
      `)
      .single()
    if (error !== null) console.log(error)
    if (data !== null) {
      set((state) => {
        return ({
          collections: state.collections.map((collection) => {
            if (collection.id === list_id) {
              if (collection.items !== undefined) {
                return { ...collection, items: [...collection.items, data] }
              } else {
                return { ...collection, items: [data] }
              }
            }
            return collection
          })
        })
      })
    }
  },

  addItemWithType: async (author_id, item_name, quantity, quantity_type, list_id) => {
    const { data, error } = await supabaseClient
      .rpc('add_item_with_type', {
        list_id,
        new_item_name: item_name,
        quantity,
        quantity_type,
        user_id: author_id
      })
      .select()
      .single()
    if (error !== null) {
      console.log(error)
    } else if (data !== null) {
      const { data: newData, error: newError } = await supabaseClient
        .from('item_entries')
        .select(`
        id,
        created_at,
        completed,
        added_by,
        quantity,
        user_data (id, user_name),
        item_type (item_name),
        quantity_type (shortName)
        `)
        .eq('id', data.id)
        .single()
      if (newError !== null) console.log(newError.message)
      if (newData !== null) {
        set((state) => {
          return ({
            collections: state.collections.map((collection) => {
              if (collection.id === list_id) {
                if (collection.items !== undefined) {
                  return { ...collection, items: [...collection.items, newData] }
                } else {
                  return { ...collection, items: [newData] }
                }
              }
              return collection
            })
          })
        })
      }
    }
  }
}))
