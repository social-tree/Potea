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
      balances: {
        Row: {
          balance: number | null
          created_at: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          balance?: number | null
          created_at?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          balance?: number | null
          created_at?: string | null
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "balances_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      carts: {
        Row: {
          created_at: string | null
          id: number
          products: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          products?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          products?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "carts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      genders: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      notification_types: {
        Row: {
          created_at: string | null
          desc: string | null
          icon_name: string | null
          id: number
          title: string | null
        }
        Insert: {
          created_at?: string | null
          desc?: string | null
          icon_name?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          created_at?: string | null
          desc?: string | null
          icon_name?: string | null
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: number
          scope: string
          type: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          scope?: string
          type?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          scope?: string
          type?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_type_fkey"
            columns: ["type"]
            referencedRelation: "notification_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          id: number
          product_id: number | null
          quantity: number
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          product_id?: number | null
          quantity?: number
          status?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          product_id?: number | null
          quantity?: number
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      paymentMethods: {
        Row: {
          color: string | null
          created_at: string | null
          icon_name: string | null
          id: number
          title: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          icon_name?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          icon_name?: string | null
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          image: string[] | null
          name: string | null
          offer_type: string
          price: number | null
          sold_amount: number | null
          type: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string[] | null
          name?: string | null
          offer_type?: string
          price?: number | null
          sold_amount?: number | null
          type?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string[] | null
          name?: string | null
          offer_type?: string
          price?: number | null
          sold_amount?: number | null
          type?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          product_id: number | null
          rating: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          product_id?: number | null
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          product_id?: number | null
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      shippingAddresses: {
        Row: {
          address: string | null
          created_at: string | null
          id: number
          latitude: number
          longitude: number
          title: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          id?: number
          latitude?: number
          longitude?: number
          title?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          id?: number
          latitude?: number
          longitude?: number
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shippingAddresses_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      shippingTypes: {
        Row: {
          created_at: string | null
          estimated_arrival_time: string | null
          icon_name: string | null
          id: number
          price: number | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          estimated_arrival_time?: string | null
          icon_name?: string | null
          id?: number
          price?: number | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          estimated_arrival_time?: string | null
          icon_name?: string | null
          id?: number
          price?: number | null
          title?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          icon: string | null
          id: number
          name: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number
          created_at?: string | null
          icon?: string | null
          id?: number
          name?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          icon?: string | null
          id?: number
          name?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          full_name: string | null
          gender: number | null
          id: string
          nickname: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name?: string | null
          gender?: number | null
          id?: string
          nickname?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name?: string | null
          gender?: number | null
          id?: string
          nickname?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_gender_fkey"
            columns: ["gender"]
            referencedRelation: "genders"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_to_balance: {
        Args: {
          amount: number
        }
        Returns: boolean
      }
      add_to_cart: {
        Args: {
          product_id: number
          quantity: number
        }
        Returns: undefined
      }
      delete_product_from_cart: {
        Args: {
          product_id: number
        }
        Returns: undefined
      }
      get_notifications: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
      get_product: {
        Args: {
          product_id: number
        }
        Returns: {
          id: number
          name: string
          description: string
          price: number
          image: string[]
          sold_amount: number
          offer_type: string
          type: string
          reviews_amount: number
          average_rating: number
        }[]
      }
      get_product_info: {
        Args: {
          product_id: number
        }
        Returns: undefined
      }
      get_products: {
        Args: {
          product_offer_type: string
          product_type: string
          product_rating: number
          product_search_text: string
          product_price_range: number[]
        }
        Returns: {
          id: number
          image: string[]
          name: string
          sold_amount: number
          price: number
          offer_type: string
          average_rating: number
          created_at: string
          description: string
          reviews_amount: number
          type: string
        }[]
      }
      get_user_cart_products: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      purchase_cart_items: {
        Args: {
          payment_id: number
        }
        Returns: boolean
      }
      update_product_quantity: {
        Args: {
          product_id: number
          type: string
        }
        Returns: Json
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
