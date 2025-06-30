"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, CheckCircle, Play, Pause, RotateCcw, Lightbulb, Cpu, Zap } from "lucide-react"
import { getModuleSections, updateUserProgress } from "@/lib/actions"
import { supabase } from "@/lib/supabase"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function LearningPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswer, setQuizAnswer] = useState("")
  const [showQuizResult, setShowQuizResult] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const moduleId = searchParams.get("module") || "3" // Default to GPU Architecture

  useEffect(() => {
    async function fetchSections() {
      try {
        const sectionsData = await getModuleSections(Number.parseInt(moduleId))
        setSections(sectionsData)
      } catch (error) {
        console.error("Error fetching sections:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSections()
  }, [moduleId])

  const handleNext = async () => {
    if (currentSection < sections.length - 1) {
      // Save progress for current section
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (user && sections[currentSection]) {
          await updateUserProgress(
            user.id,
            sections[currentSection].id,
            Number.parseInt(moduleId),
            true,
            currentSectionData.type === "quiz"
              ? Number.parseInt(quizAnswer) === currentSectionData.content.correct
                ? 100
                : 0
              : undefined,
          )
        }
      } catch (error) {
        console.error("Error saving progress:", error)
      }

      setCurrentSection(currentSection + 1)
      setQuizAnswer("")
      setShowQuizResult(false)
    }
  }

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
      setQuizAnswer("")
      setShowQuizResult(false)
    }
  }

  const currentSectionData = sections[currentSection]
  if (!currentSectionData) return <div>Loading...</div>
  const progress = ((currentSection + 1) / sections.length) * 100

  const handleQuizSubmit = () => {
    setShowQuizResult(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🐜</span>
              </div>
              <span className="font-bold text-xl">GPU Architecture: The Worker Ants</span>
            </div>
          </div>
          <Badge className="bg-orange-100 text-orange-800">Module 3</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Section {currentSection + 1} of {sections.length}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Content Area */}
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                    {currentSectionData.type === "quiz" ? (
                      <Lightbulb className="h-6 w-6 text-white" />
                    ) : currentSectionData.type === "interactive" ? (
                      <Zap className="h-6 w-6 text-white" />
                    ) : (
                      <Cpu className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <div>
                    <CardTitle>{currentSectionData.title}</CardTitle>
                    <CardDescription>
                      {currentSectionData.type === "quiz"
                        ? "Test Your Knowledge"
                        : currentSectionData.type === "interactive"
                          ? "Interactive Learning"
                          : "Core Concepts"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Content Section */}
                {currentSectionData.type === "content" && (
                  <div className="space-y-6">
                    <p className="text-lg leading-relaxed">{currentSectionData.content.text}</p>

                    {currentSectionData.content.visual && (
                      <div className="bg-gray-100 p-6 rounded-lg text-center">
                        <pre className="text-2xl font-mono">{currentSectionData.content.visual}</pre>
                      </div>
                    )}

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Key Takeaways
                      </h4>
                      <ul className="space-y-2">
                        {currentSectionData.content.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Interactive Section */}
                {currentSectionData.type === "interactive" && (
                  <div className="space-y-6">
                    <p className="text-lg leading-relaxed">{currentSectionData.content.text}</p>

                    {/* Simulation */}
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-lg">Interactive Simulation</CardTitle>
                        <CardDescription>Watch how parallel processing works</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center space-y-4">
                          <div className="grid grid-cols-8 gap-2 max-w-md mx-auto">
                            {Array.from({ length: 32 }, (_, i) => (
                              <div
                                key={i}
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                                  isPlaying ? "bg-green-400 animate-pulse" : "bg-gray-300"
                                }`}
                              >
                                🐜
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-center gap-2">
                            <Button onClick={() => setIsPlaying(!isPlaying)} variant="outline">
                              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                              {isPlaying ? "Pause" : "Start"} Simulation
                            </Button>
                            <Button onClick={() => setIsPlaying(false)} variant="outline">
                              <RotateCcw className="h-4 w-4" />
                              Reset
                            </Button>
                          </div>
                          <p className="text-sm text-gray-600">
                            {isPlaying
                              ? "All 32 cores working in parallel!"
                              : "Click Start to see parallel processing in action"}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Key Concepts
                      </h4>
                      <ul className="space-y-2">
                        {currentSectionData.content.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Quiz Section */}
                {currentSectionData.type === "quiz" && (
                  <div className="space-y-6">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold text-lg mb-4">{currentSectionData.question}</h4>

                      <RadioGroup value={quizAnswer} onValueChange={setQuizAnswer}>
                        {currentSectionData.options.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-yellow-100">
                            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>

                      {!showQuizResult && (
                        <Button onClick={handleQuizSubmit} disabled={!quizAnswer} className="mt-4 w-full">
                          Submit Answer
                        </Button>
                      )}

                      {showQuizResult && (
                        <div
                          className={`mt-4 p-4 rounded-lg ${
                            Number.parseInt(quizAnswer) === currentSectionData.content.correct
                              ? "bg-green-100 border border-green-200"
                              : "bg-red-100 border border-red-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle
                              className={`h-5 w-5 ${
                                Number.parseInt(quizAnswer) === currentSectionData.content.correct
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            />
                            <span className="font-semibold">
                              {Number.parseInt(quizAnswer) === currentSectionData.correct
                                ? "Correct!"
                                : "Not quite right"}
                            </span>
                          </div>
                          <p className="text-sm">{currentSectionData.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={currentSection === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={
                  currentSection === sections.length - 1 || (currentSectionData.type === "quiz" && !showQuizResult)
                }
                className="bg-gradient-to-r from-orange-500 to-amber-500"
              >
                {currentSection === sections.length - 1 ? "Complete Module" : "Next"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Module Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      index === currentSection
                        ? "bg-orange-100 border border-orange-200"
                        : index < currentSection
                          ? "bg-green-50 border border-green-200"
                          : "bg-gray-50 border border-gray-200"
                    }`}
                    onClick={() => {
                      if (index <= currentSection) {
                        setCurrentSection(index)
                        setQuizAnswer("")
                        setShowQuizResult(false)
                      }
                    }}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        index === currentSection
                          ? "bg-orange-500 text-white"
                          : index < currentSection
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {index < currentSection ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{section.title}</p>
                      <p className="text-xs text-gray-500 capitalize">{section.type}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* XP Tracker */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">XP Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">+{(currentSection + 1) * 25}</div>
                  <p className="text-sm text-gray-600">Points earned this module</p>
                  <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs text-orange-700">
                      Complete this module to earn 100 XP and unlock the next level!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
