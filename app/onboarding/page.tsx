"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { createProfile } from "@/lib/actions"

const personas = [
  {
    id: "newbie",
    title: "Curious Newbie",
    icon: "🌱",
    description: "I'm new to AI and hardware. I want a gentle, fun introduction.",
    features: ["Metaphor-driven learning", "Interactive diagrams", "Basic concepts", "No prerequisites"],
    color: "green",
  },
  {
    id: "developer",
    title: "Self-Taught Dev",
    icon: "⚡",
    description: "I'm building AI skills for work or personal projects.",
    features: ["Hands-on simulations", "Hardware recommendations", "Performance tips", "Practical examples"],
    color: "blue",
  },
  {
    id: "professional",
    title: "AI Professional",
    icon: "🚀",
    description: "I need rapid upskilling and data-driven recommendations.",
    features: ["Advanced benchmarking", "ROI calculations", "Enterprise scenarios", "Expert insights"],
    color: "purple",
  },
]

const goals = [
  { id: "learning", title: "Learn AI Fundamentals", icon: "📚" },
  { id: "hardware", title: "Choose Hardware", icon: "🖥️" },
  { id: "optimization", title: "Optimize Performance", icon: "⚡" },
  { id: "career", title: "Advance Career", icon: "🎯" },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selectedPersona, setSelectedPersona] = useState("")
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const router = useRouter()

  const progress = (step / 3) * 100

  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersona(personaId)
  }

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals((prev) => (prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId]))
  }

  const handleComplete = async () => {
    try {
      const formData = new FormData()
      formData.append("email", "user@example.com") // In real app, get from auth
      formData.append("persona", selectedPersona)
      selectedGoals.forEach((goal) => formData.append("goals", goal))

      await createProfile(formData)
      router.push("/dashboard")
    } catch (error) {
      console.error("Error creating profile:", error)
      // Handle error appropriately
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🐜</span>
            </div>
            <span className="font-bold text-xl">Of Ants & Algorithms</span>
          </div>
          <Badge variant="outline">Getting Started</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {step} of 3</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🐜</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Welcome to Your AI Journey!</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's personalize your learning experience. Think of this as assembling your ant army - we need to know
              what kind of colony you want to build!
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {personas.map((persona) => (
                <Card
                  key={persona.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedPersona === persona.id
                      ? `border-2 border-${persona.color}-500 bg-${persona.color}-50`
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handlePersonaSelect(persona.id)}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">{persona.icon}</span>
                    </div>
                    <CardTitle className="flex items-center justify-center gap-2">
                      {persona.title}
                      {selectedPersona === persona.id && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </CardTitle>
                    <CardDescription>{persona.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      {persona.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end mt-8">
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedPersona}
                className="bg-gradient-to-r from-orange-500 to-amber-500"
              >
                Next: Set Your Goals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Goals */}
        {step === 2 && (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">What Are Your Goals?</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Select all that apply. This helps us customize your learning path and recommendations.
            </p>

            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {goals.map((goal) => (
                <Card
                  key={goal.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedGoals.includes(goal.id)
                      ? "border-2 border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleGoalToggle(goal.id)}
                >
                  <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl">{goal.icon}</span>
                      <CardTitle className="flex items-center gap-2">
                        {goal.title}
                        {selectedGoals.includes(goal.id) && <CheckCircle className="h-5 w-5 text-green-500" />}
                      </CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={selectedGoals.length === 0}
                className="bg-gradient-to-r from-orange-500 to-amber-500"
              >
                Next: Review & Start
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Summary */}
        {step === 3 && (
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Perfect! Your Colony is Ready</h1>
            <p className="text-xl text-gray-600 mb-8">
              We've customized your learning experience based on your preferences.
            </p>

            <Card className="max-w-2xl mx-auto text-left">
              <CardHeader>
                <CardTitle>Your Personalized Learning Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Learning Path:</h4>
                  <Badge className="bg-orange-100 text-orange-800">
                    {personas.find((p) => p.id === selectedPersona)?.title}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Your Goals:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedGoals.map((goalId) => {
                      const goal = goals.find((g) => g.id === goalId)
                      return (
                        <Badge key={goalId} variant="outline">
                          {goal?.icon} {goal?.title}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What's Next:</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Access your personalized dashboard</li>
                    <li>• Start with recommended learning modules</li>
                    <li>• Get hardware recommendations tailored to your goals</li>
                    <li>• Track your progress and earn achievements</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handleComplete} className="bg-gradient-to-r from-green-500 to-emerald-500">
                Start Learning Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
