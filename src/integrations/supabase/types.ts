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
      achievements: {
        Row: {
          builder_id: string | null
          date_earned: string | null
          description: string | null
          id: string
          title: string | null
        }
        Insert: {
          builder_id?: string | null
          date_earned?: string | null
          description?: string | null
          id?: string
          title?: string | null
        }
        Update: {
          builder_id?: string | null
          date_earned?: string | null
          description?: string | null
          id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "achievements_builder_id_fkey"
            columns: ["builder_id"]
            isOneToOne: false
            referencedRelation: "builders"
            referencedColumns: ["id"]
          },
        ]
      }
      badges: {
        Row: {
          description: string | null
          icon_url: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          icon_url?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          icon_url?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      builder_badges: {
        Row: {
          badge_id: string | null
          builder_id: string | null
          earned_at: string | null
          id: string
        }
        Insert: {
          badge_id?: string | null
          builder_id?: string | null
          earned_at?: string | null
          id?: string
        }
        Update: {
          badge_id?: string | null
          builder_id?: string | null
          earned_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "builder_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "builder_badges_builder_id_fkey"
            columns: ["builder_id"]
            isOneToOne: false
            referencedRelation: "builders"
            referencedColumns: ["id"]
          },
        ]
      }
      builders: {
        Row: {
          created_at: string | null
          email: string
          github_url: string | null
          id: string
          linkedin_url: string | null
          name: string
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          name: string
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          name?: string
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      challenges: {
        Row: {
          closed_at: string | null
          created_at: string | null
          data_pack_url: string | null
          deadline: string | null
          description: string | null
          id: string
          industry: string | null
          logo_url: string | null
          reward_structure: string | null
          rubric: string | null
          skill_level: Database["public"]["Enums"]["skill_level_enum"] | null
          sponsor_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          closed_at?: string | null
          created_at?: string | null
          data_pack_url?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          reward_structure?: string | null
          rubric?: string | null
          skill_level?: Database["public"]["Enums"]["skill_level_enum"] | null
          sponsor_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          closed_at?: string | null
          created_at?: string | null
          data_pack_url?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          reward_structure?: string | null
          rubric?: string | null
          skill_level?: Database["public"]["Enums"]["skill_level_enum"] | null
          sponsor_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "challenges_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "sponsors"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsors: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          notify_candidate_updates: boolean | null
          notify_deadlines: boolean | null
          notify_new_submissions: boolean | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          notify_candidate_updates?: boolean | null
          notify_deadlines?: boolean | null
          notify_new_submissions?: boolean | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          notify_candidate_updates?: boolean | null
          notify_deadlines?: boolean | null
          notify_new_submissions?: boolean | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      submissions: {
        Row: {
          ai_feedback: string | null
          builder_id: string | null
          challenge_id: string | null
          created_at: string | null
          demo_video_link: string | null
          github_repo_link: string
          id: string
          pitch_deck_link: string | null
          provisional_score: number | null
          submission_time: string | null
          test_passed: boolean | null
        }
        Insert: {
          ai_feedback?: string | null
          builder_id?: string | null
          challenge_id?: string | null
          created_at?: string | null
          demo_video_link?: string | null
          github_repo_link: string
          id?: string
          pitch_deck_link?: string | null
          provisional_score?: number | null
          submission_time?: string | null
          test_passed?: boolean | null
        }
        Update: {
          ai_feedback?: string | null
          builder_id?: string | null
          challenge_id?: string | null
          created_at?: string | null
          demo_video_link?: string | null
          github_repo_link?: string
          id?: string
          pitch_deck_link?: string | null
          provisional_score?: number | null
          submission_time?: string | null
          test_passed?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_builder_id_fkey"
            columns: ["builder_id"]
            isOneToOne: false
            referencedRelation: "builders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
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
      skill_level_enum: "beginner" | "intermediate" | "advanced"
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
      skill_level_enum: ["beginner", "intermediate", "advanced"],
    },
  },
} as const
