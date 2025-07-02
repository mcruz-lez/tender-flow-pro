export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bids: {
        Row: {
          created_at: string
          description: string | null
          documents: Json | null
          evaluation_score: number | null
          id: string
          notes: string | null
          organization_id: string
          status: string
          submission_date: string | null
          tender_id: string
          title: string
          total_amount: number
          updated_at: string
          vendor_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          documents?: Json | null
          evaluation_score?: number | null
          id?: string
          notes?: string | null
          organization_id: string
          status?: string
          submission_date?: string | null
          tender_id: string
          title: string
          total_amount: number
          updated_at?: string
          vendor_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          documents?: Json | null
          evaluation_score?: number | null
          id?: string
          notes?: string | null
          organization_id?: string
          status?: string
          submission_date?: string | null
          tender_id?: string
          title?: string
          total_amount?: number
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bids_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bids_tender_id_fkey"
            columns: ["tender_id"]
            isOneToOne: false
            referencedRelation: "tenders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bids_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          contract_value: number
          created_at: string
          description: string | null
          documents: Json | null
          end_date: string
          id: string
          organization_id: string
          performance_metrics: Json | null
          property_id: string | null
          start_date: string
          status: string
          tender_id: string | null
          terms: Json | null
          title: string
          updated_at: string
          vendor_id: string
        }
        Insert: {
          contract_value: number
          created_at?: string
          description?: string | null
          documents?: Json | null
          end_date: string
          id?: string
          organization_id: string
          performance_metrics?: Json | null
          property_id?: string | null
          start_date: string
          status?: string
          tender_id?: string | null
          terms?: Json | null
          title: string
          updated_at?: string
          vendor_id: string
        }
        Update: {
          contract_value?: number
          created_at?: string
          description?: string | null
          documents?: Json | null
          end_date?: string
          id?: string
          organization_id?: string
          performance_metrics?: Json | null
          property_id?: string | null
          start_date?: string
          status?: string
          tender_id?: string | null
          terms?: Json | null
          title?: string
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_tender_id_fkey"
            columns: ["tender_id"]
            isOneToOne: false
            referencedRelation: "tenders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      emd_payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          status: string
          stripe_payment_intent_id: string | null
          tender_id: string
          updated_at: string
          vendor_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          status?: string
          stripe_payment_intent_id?: string | null
          tender_id: string
          updated_at?: string
          vendor_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          status?: string
          stripe_payment_intent_id?: string | null
          tender_id?: string
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "emd_payments_tender_id_fkey"
            columns: ["tender_id"]
            isOneToOne: false
            referencedRelation: "tenders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emd_payments_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          message_type: string
          sender_id: string
          thread_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          message_type?: string
          sender_id: string
          thread_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          message_type?: string
          sender_id?: string
          thread_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          address: string | null
          created_at: string | null
          description: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          registration_number: string | null
          tax_id: string | null
          type: Database["public"]["Enums"]["organization_type"]
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          registration_number?: string | null
          tax_id?: string | null
          type: Database["public"]["Enums"]["organization_type"]
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          registration_number?: string | null
          tax_id?: string | null
          type?: Database["public"]["Enums"]["organization_type"]
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          card_brand: string | null
          card_last_four: string | null
          created_at: string | null
          id: string
          is_default: boolean | null
          stripe_payment_method_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          card_brand?: string | null
          card_last_four?: string | null
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          stripe_payment_method_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          card_brand?: string | null
          card_last_four?: string | null
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          stripe_payment_method_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency: string
          id?: string
          status: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          department: string | null
          email: string | null
          first_name: string | null
          id: string
          job_title: string | null
          language_preference: string | null
          last_login_at: string | null
          last_name: string | null
          notification_preferences: Json | null
          organization_id: string | null
          phone: string | null
          profile_completion_percentage: number | null
          timezone: string | null
          two_factor_enabled: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          job_title?: string | null
          language_preference?: string | null
          last_login_at?: string | null
          last_name?: string | null
          notification_preferences?: Json | null
          organization_id?: string | null
          phone?: string | null
          profile_completion_percentage?: number | null
          timezone?: string | null
          two_factor_enabled?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          job_title?: string | null
          language_preference?: string | null
          last_login_at?: string | null
          last_name?: string | null
          notification_preferences?: Json | null
          organization_id?: string | null
          phone?: string | null
          profile_completion_percentage?: number | null
          timezone?: string | null
          two_factor_enabled?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          address: string
          budget_annual: number | null
          created_at: string
          description: string | null
          id: string
          manager_id: string | null
          name: string
          organization_id: string
          property_type: string
          size_sqft: number | null
          status: string
          units_count: number | null
          updated_at: string
          year_built: number | null
        }
        Insert: {
          address: string
          budget_annual?: number | null
          created_at?: string
          description?: string | null
          id?: string
          manager_id?: string | null
          name: string
          organization_id: string
          property_type: string
          size_sqft?: number | null
          status?: string
          units_count?: number | null
          updated_at?: string
          year_built?: number | null
        }
        Update: {
          address?: string
          budget_annual?: number | null
          created_at?: string
          description?: string | null
          id?: string
          manager_id?: string | null
          name?: string
          organization_id?: string
          property_type?: string
          size_sqft?: number | null
          status?: string
          units_count?: number | null
          updated_at?: string
          year_built?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      security_deposits: {
        Row: {
          amount: number
          contract_id: string
          created_at: string
          id: string
          status: string
          stripe_payment_intent_id: string | null
          updated_at: string
          vendor_id: string
        }
        Insert: {
          amount: number
          contract_id: string
          created_at?: string
          id?: string
          status?: string
          stripe_payment_intent_id?: string | null
          updated_at?: string
          vendor_id: string
        }
        Update: {
          amount?: number
          contract_id?: string
          created_at?: string
          id?: string
          status?: string
          stripe_payment_intent_id?: string | null
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "security_deposits_contract_id_fkey"
            columns: ["contract_id"]
            isOneToOne: false
            referencedRelation: "contracts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "security_deposits_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          user_id: string
          value: Json
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          user_id: string
          value: Json
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          user_id?: string
          value?: Json
        }
        Relationships: []
      }
      subscription_preferences: {
        Row: {
          created_at: string | null
          features: Json | null
          id: string
          plan_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          features?: Json | null
          id?: string
          plan_type?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          features?: Json | null
          id?: string
          plan_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      tenders: {
        Row: {
          budget_max: number | null
          budget_min: number | null
          category: string
          created_at: string
          created_by: string
          description: string | null
          evaluation_criteria: Json | null
          id: string
          organization_id: string
          property_id: string | null
          requirements: Json | null
          status: string
          submission_deadline: string | null
          tender_type: string
          title: string
          updated_at: string
        }
        Insert: {
          budget_max?: number | null
          budget_min?: number | null
          category: string
          created_at?: string
          created_by: string
          description?: string | null
          evaluation_criteria?: Json | null
          id?: string
          organization_id: string
          property_id?: string | null
          requirements?: Json | null
          status?: string
          submission_deadline?: string | null
          tender_type: string
          title: string
          updated_at?: string
        }
        Update: {
          budget_max?: number | null
          budget_min?: number | null
          category?: string
          created_at?: string
          created_by?: string
          description?: string | null
          evaluation_criteria?: Json | null
          id?: string
          organization_id?: string
          property_id?: string | null
          requirements?: Json | null
          status?: string
          submission_deadline?: string | null
          tender_type?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenders_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenders_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      threads: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          organization_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          organization_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          organization_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          address: string | null
          categories: string[] | null
          certifications: Json[] | null
          company_name: string
          contact_person: string | null
          created_at: string
          email: string
          id: string
          organization_id: string
          phone: string | null
          prequalification_status: string
          rating: number | null
          registration_number: string | null
          tax_id: string | null
          updated_at: string
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          address?: string | null
          categories?: string[] | null
          certifications?: Json[] | null
          company_name: string
          contact_person?: string | null
          created_at?: string
          email: string
          id?: string
          organization_id: string
          phone?: string | null
          prequalification_status?: string
          rating?: number | null
          registration_number?: string | null
          tax_id?: string | null
          updated_at?: string
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          address?: string | null
          categories?: string[] | null
          certifications?: Json[] | null
          company_name?: string
          contact_person?: string | null
          created_at?: string
          email?: string
          id?: string
          organization_id?: string
          phone?: string | null
          prequalification_status?: string
          rating?: number | null
          registration_number?: string | null
          tax_id?: string | null
          updated_at?: string
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "vendors_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_bid_on_tender: {
        Args: { _user_id: string }
        Returns: boolean
      }
      can_create_tender: {
        Args: { _user_id: string }
        Returns: boolean
      }
      can_evaluate_bids: {
        Args: { _user_id: string }
        Returns: boolean
      }
      get_user_organization: {
        Args: { _user_id: string }
        Returns: string
      }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "admin"
        | "property_manager"
        | "procurement_manager"
        | "contractor"
        | "vendor"
        | "finance_manager"
        | "evaluator"
      organization_type:
        | "property_management"
        | "contractor"
        | "vendor"
        | "service_provider"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "admin",
        "property_manager",
        "procurement_manager",
        "contractor",
        "vendor",
        "finance_manager",
        "evaluator",
      ],
      organization_type: [
        "property_management",
        "contractor",
        "vendor",
        "service_provider",
      ],
    },
  },
} as const
