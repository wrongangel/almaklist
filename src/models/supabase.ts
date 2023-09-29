export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      invites: {
        Row: {
          created_at: string
          email: string
          from: string
          id: string
          to_list: string
        }
        Insert: {
          created_at?: string
          email: string
          from: string
          id?: string
          to_list: string
        }
        Update: {
          created_at?: string
          email?: string
          from?: string
          id?: string
          to_list?: string
        }
        Relationships: [
          {
            foreignKeyName: "invites_from_fkey"
            columns: ["from"]
            referencedRelation: "user_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invites_to_list_fkey"
            columns: ["to_list"]
            referencedRelation: "list"
            referencedColumns: ["id"]
          }
        ]
      }
      item_entries: {
        Row: {
          added_by: string
          completed: boolean
          created_at: string
          id: string
          item_type: string
          list_id: string
          quantity: number
          quantity_type: string
        }
        Insert: {
          added_by: string
          completed?: boolean
          created_at?: string
          id?: string
          item_type: string
          list_id: string
          quantity: number
          quantity_type: string
        }
        Update: {
          added_by?: string
          completed?: boolean
          created_at?: string
          id?: string
          item_type?: string
          list_id?: string
          quantity?: number
          quantity_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "item_entries_added_by_fkey"
            columns: ["added_by"]
            referencedRelation: "user_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_entries_item_type_fkey"
            columns: ["item_type"]
            referencedRelation: "item_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_entries_list_id_fkey"
            columns: ["list_id"]
            referencedRelation: "list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_entries_quantity_type_fkey"
            columns: ["quantity_type"]
            referencedRelation: "quantity_type"
            referencedColumns: ["id"]
          }
        ]
      }
      item_type: {
        Row: {
          default_quantity: string
          id: string
          item_name: string
        }
        Insert: {
          default_quantity: string
          id?: string
          item_name: string
        }
        Update: {
          default_quantity?: string
          id?: string
          item_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "item_type_default_quantity_fkey"
            columns: ["default_quantity"]
            referencedRelation: "quantity_type"
            referencedColumns: ["id"]
          }
        ]
      }
      list: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      quantity_type: {
        Row: {
          id: string
          name: string
          shortName: string
        }
        Insert: {
          id?: string
          name: string
          shortName: string
        }
        Update: {
          id?: string
          name?: string
          shortName?: string
        }
        Relationships: []
      }
      user_data: {
        Row: {
          avatar: string | null
          created_at: string
          id: string
          role: string
          user_name: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          id: string
          role?: string
          user_name?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string
          id?: string
          role?: string
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_data_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users_to_lists: {
        Row: {
          id: number
          list: string
          user_id: string
        }
        Insert: {
          id?: number
          list: string
          user_id: string
        }
        Update: {
          id?: number
          list?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_to_lists_list_fkey"
            columns: ["list"]
            referencedRelation: "list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_to_lists_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "user_data"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_item_with_type: {
        Args: {
          user_id: string
          new_item_name: string
          quantity: number
          quantity_type: string
          list_id: string
        }
        Returns: {
          added_by: string
          completed: boolean
          created_at: string
          id: string
          item_type: string
          list_id: string
          quantity: number
          quantity_type: string
        }[]
      }
      add_list: {
        Args: {
          user_id: string
          list_name: string
        }
        Returns: {
          created_at: string
          id: string
          name: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
