"use server"

import { createServerClient } from "./supabase"
import { revalidatePath } from "next/cache"

export async function createProfile(formData: FormData) {
  const supabase = createServerClient()

  const email = formData.get("email") as string
  const persona = formData.get("persona") as string
  const goals = formData.getAll("goals") as string[]

  // First, sign up the user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password: Math.random().toString(36), // Temporary password for magic link
  })

  if (authError) {
    throw new Error(authError.message)
  }

  if (authData.user) {
    // Create profile
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      email,
      persona: persona as "newbie" | "developer" | "professional",
      goals,
      xp_points: 0,
      level: 1,
      streak_days: 0,
    })

    if (profileError) {
      throw new Error(profileError.message)
    }
  }

  return { success: true }
}

export async function updateUserProgress(
  userId: string,
  sectionId: number,
  moduleId: number,
  completed: boolean,
  score?: number,
) {
  const supabase = createServerClient()

  const { error } = await supabase.from("user_progress").upsert({
    user_id: userId,
    section_id: sectionId,
    module_id: moduleId,
    completed,
    score,
    completed_at: completed ? new Date().toISOString() : null,
  })

  if (error) {
    throw new Error(error.message)
  }

  // Update user XP if completed
  if (completed) {
    const { data: section } = await supabase.from("learning_sections").select("xp_reward").eq("id", sectionId).single()

    if (section) {
      await supabase.rpc("increment_user_xp", {
        user_id: userId,
        xp_amount: section.xp_reward,
      })
    }
  }

  revalidatePath("/dashboard")
  return { success: true }
}

export async function getUserProfile(userId: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getLearningModules(persona?: string) {
  const supabase = createServerClient()

  let query = supabase.from("learning_modules").select("*").eq("is_active", true).order("difficulty_level")

  if (persona) {
    query = query.or(`persona_target.eq.${persona},persona_target.eq.all`)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getModuleSections(moduleId: number) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("learning_sections")
    .select("*")
    .eq("module_id", moduleId)
    .order("order_index")

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getUserProgress(userId: string, moduleId?: number) {
  const supabase = createServerClient()

  let query = supabase
    .from("user_progress")
    .select(`
      *,
      learning_sections (
        title,
        module_id,
        xp_reward
      )
    `)
    .eq("user_id", userId)

  if (moduleId) {
    query = query.eq("module_id", moduleId)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getHardwareRecommendations(persona?: string) {
  const supabase = createServerClient()

  let query = supabase
    .from("hardware_recommendations")
    .select("*")
    .eq("is_active", true)
    .order("rating", { ascending: false })

  if (persona) {
    query = query.contains("target_personas", [persona])
  }

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  return data
}
