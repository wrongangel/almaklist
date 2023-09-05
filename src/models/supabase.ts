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
          short_name: string
        }
        Insert: {
          id?: string
          name: string
          short_name: string
        }
        Update: {
          id?: string
          name?: string
          short_name?: string
        }
        Relationships: []
      }
      user_data: {
        Row: {
          avatar: string | null
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_data_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_role: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_role_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      "users-to-lists": {
        Row: {
          id: number
          list: string
          user: string
        }
        Insert: {
          id?: number
          list: string
          user: string
        }
        Update: {
          id?: number
          list?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "users-to-lists_list_fkey"
            columns: ["list"]
            referencedRelation: "list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users-to-lists_user_fkey"
            columns: ["user"]
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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
