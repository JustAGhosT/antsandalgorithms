export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          persona: "newbie" | "developer" | "professional" | null
          goals: string[] | null
          xp_points: number
          level: number
          streak_days: number
          last_activity: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          persona?: "newbie" | "developer" | "professional" | null
          goals?: string[] | null
          xp_points?: number
          level?: number
          streak_days?: number
          last_activity?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          persona?: "newbie" | "developer" | "professional" | null
          goals?: string[] | null
          xp_points?: number
          level?: number
          streak_days?: number
          last_activity?: string
          updated_at?: string
        }
      }
      learning_modules: {
        Row: {
          id: number
          title: string
          description: string | null
          persona_target: "newbie" | "developer" | "professional" | "all" | null
          difficulty_level: number
          xp_reward: number
          estimated_duration: number | null
          prerequisites: number[] | null
          is_active: boolean
          created_at: string
        }
      }
      learning_sections: {
        Row: {
          id: number
          module_id: number
          title: string
          content_type: "content" | "interactive" | "quiz"
          content: any
          order_index: number
          xp_reward: number
          created_at: string
        }
      }
      user_progress: {
        Row: {
          id: number
          user_id: string
          module_id: number
          section_id: number
          completed: boolean
          score: number | null
          completed_at: string | null
          created_at: string
        }
        Insert: {
          user_id: string
          module_id: number
          section_id: number
          completed?: boolean
          score?: number | null
          completed_at?: string | null
        }
        Update: {
          completed?: boolean
          score?: number | null
          completed_at?: string | null
        }
      }
      achievements: {
        Row: {
          id: number
          name: string
          description: string
          icon: string
          criteria: any
          xp_reward: number
          is_active: boolean
          created_at: string
        }
      }
      user_achievements: {
        Row: {
          id: number
          user_id: string
          achievement_id: number
          earned_at: string
        }
        Insert: {
          user_id: string
          achievement_id: number
          earned_at?: string
        }
      }
      hardware_recommendations: {
        Row: {
          id: number
          name: string
          type: "GPU" | "CPU" | "RAM" | "Storage"
          price_usd: number | null
          rating: number | null
          specifications: any | null
          target_personas: string[] | null
          use_cases: string[] | null
          pros: string[] | null
          cons: string[] | null
          is_active: boolean
          created_at: string
        }
      }
    }
  }
}
