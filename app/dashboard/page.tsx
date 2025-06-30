"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Cpu, Trophy, Zap, TrendingUp, Play, Star, Clock, Target, ChevronRight } from "lucide-react"

import { getUserProfile, getLearningModules, getUserProgress, getHardwareRecommendations } from "@/lib/actions"
import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const [profile, setProfile] = useState(null)
  const [modules, setModules] = useState([])
  const [progress, setProgress] = useState([])
  const [hardware, setHardware] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

        // Fetch all data
        const [profileData, modulesData, progressData, hardwareData] = await Promise.all([
          getUserProfile(user.id),
          getLearningModules(),
          getUserProgress(user.id),
          getHardwareRecommendations(),
        ])

        setProfile(profileData)
        setModules(modulesData)
        setProgress(progressData)
        setHardware(hardwareData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🐜</span>
            </div>
            <span className="font-bold text-xl">Of Ants & Algorithms</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-100 text-green-800">Level 3 Colony</Badge>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {profile?.full_name || "Learner"}! 🐜</h1>
          <p className="text-gray-600">
            Your ant army is growing stronger. Ready to continue your AI hardware journey?
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <Progress value={68} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">12 of 18 modules completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">XP Points</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.xp_points || 0}</div>
              <p className="text-xs text-muted-foreground">+125 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.level || 1}</div>
              <p className="text-xs text-muted-foreground">2 new badges earned</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{profile?.streak_days || 0} days</div>
              <p className="text-xs text-muted-foreground">Keep it up! 🔥</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="learning" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="learning">Learning Path</TabsTrigger>
            <TabsTrigger value="hardware">Hardware Hub</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Learning Path Tab */}
          <TabsContent value="learning" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Current Module */}
              <div className="lg:col-span-2">
                <Card className="border-orange-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Continue Learning</CardTitle>
                        <CardDescription>GPU Architecture: The Worker Ants</CardDescription>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">In Progress</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                          <Cpu className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">Understanding GPU Cores</h4>
                          <p className="text-sm text-gray-600">
                            Learn how thousands of GPU cores work together like an organized ant colony
                          </p>
                          <Progress value={75} className="mt-2" />
                          <p className="text-xs text-gray-500 mt-1">3 of 4 sections completed</p>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500">
                        <Play className="mr-2 h-4 w-4" />
                        Continue Module
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommended Next */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Up Next</CardTitle>
                    <CardDescription>Recommended based on your learning path</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Memory Hierarchy",
                          description: "How GPUs manage data like ant food storage",
                          progress: 0,
                          icon: "💾",
                        },
                        {
                          title: "Parallel Processing",
                          description: "Coordinating thousands of worker ants",
                          progress: 0,
                          icon: "⚡",
                        },
                        {
                          title: "Hardware Benchmarking",
                          description: "Measuring your colony's performance",
                          progress: 0,
                          icon: "📊",
                        },
                      ].map((module, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <span className="text-2xl">{module.icon}</span>
                          <div className="flex-1">
                            <h5 className="font-medium">{module.title}</h5>
                            <p className="text-sm text-gray-600">{module.description}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Colony Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Colony Level</span>
                      <Badge>Level 3</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Worker Ants</span>
                      <span className="font-semibold">2,847</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Efficiency</span>
                      <span className="font-semibold text-green-600">92%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Next Level</span>
                      <span className="text-sm text-gray-600">153 XP to go</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Achievements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: "GPU Expert", icon: "🏆", date: "2 days ago" },
                      { name: "Quiz Master", icon: "🧠", date: "1 week ago" },
                      { name: "Hardware Hunter", icon: "🔍", date: "2 weeks ago" },
                    ].map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-xl">{achievement.icon}</span>
                        <div>
                          <p className="font-medium text-sm">{achievement.name}</p>
                          <p className="text-xs text-gray-500">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Hardware Hub Tab */}
          <TabsContent value="hardware" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Hardware</CardTitle>
                  <CardDescription>Based on your learning goals and budget</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "NVIDIA RTX 4070",
                      type: "GPU",
                      price: "$599",
                      rating: 4.8,
                      match: "95% match",
                      reason: "Perfect for your AI learning projects",
                    },
                    {
                      name: "AMD Ryzen 7 7700X",
                      type: "CPU",
                      price: "$329",
                      rating: 4.6,
                      match: "88% match",
                      reason: "Great balance of performance and value",
                    },
                    {
                      name: "32GB DDR5-5600",
                      type: "RAM",
                      price: "$189",
                      rating: 4.7,
                      match: "92% match",
                      reason: "Sufficient for most AI workloads",
                    },
                  ].map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{item.price}</p>
                          <Badge variant="outline" className="text-xs">
                            {item.match}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{item.reason}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{item.rating}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Simulator</CardTitle>
                  <CardDescription>Test different hardware configurations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Current Setup Simulation</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Training Speed:</span>
                          <span className="font-semibold">2.3x baseline</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Memory Usage:</span>
                          <span className="font-semibold">18GB / 24GB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Power Draw:</span>
                          <span className="font-semibold">285W</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Run New Simulation
                    </Button>

                    <div className="text-center">
                      <p className="text-sm text-gray-600">Compare up to 3 configurations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>Your journey through AI hardware mastery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { module: "AI Fundamentals", progress: 100, status: "completed", lessons: 8 },
                      { module: "Hardware Basics", progress: 100, status: "completed", lessons: 6 },
                      { module: "GPU Architecture", progress: 75, status: "in-progress", lessons: 4 },
                      { module: "Memory Systems", progress: 0, status: "locked", lessons: 5 },
                      { module: "Performance Optimization", progress: 0, status: "locked", lessons: 7 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            item.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : item.status === "in-progress"
                                ? "bg-orange-100 text-orange-600"
                                : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {item.status === "completed" ? (
                            <Trophy className="h-5 w-5" />
                          ) : item.status === "in-progress" ? (
                            <Clock className="h-5 w-5" />
                          ) : (
                            <Target className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold">{item.module}</h4>
                            <span className="text-sm text-gray-600">{item.lessons} lessons</span>
                          </div>
                          <Progress value={item.progress} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">{item.progress}% complete</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Goals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { goal: "Complete 2 modules", progress: 50, current: 1, target: 2 },
                    { goal: "Earn 500 XP", progress: 80, current: 400, target: 500 },
                    { goal: "Take 3 quizzes", progress: 100, current: 3, target: 3 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{item.goal}</span>
                        <span>
                          {item.current}/{item.target}
                        </span>
                      </div>
                      <Progress value={item.progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "First Steps",
                  description: "Complete your first module",
                  icon: "👶",
                  earned: true,
                  date: "3 weeks ago",
                },
                {
                  name: "Quiz Master",
                  description: "Score 100% on 5 quizzes",
                  icon: "🧠",
                  earned: true,
                  date: "1 week ago",
                },
                {
                  name: "Hardware Expert",
                  description: "Complete GPU Architecture module",
                  icon: "🏆",
                  earned: true,
                  date: "2 days ago",
                },
                {
                  name: "Speed Learner",
                  description: "Complete 3 modules in one week",
                  icon: "⚡",
                  earned: false,
                  progress: 67,
                },
                {
                  name: "Perfectionist",
                  description: "Score 100% on 10 quizzes",
                  icon: "💯",
                  earned: false,
                  progress: 50,
                },
                { name: "Colony Master", description: "Reach Level 5", icon: "👑", earned: false, progress: 60 },
              ].map((achievement, index) => (
                <Card key={index} className={achievement.earned ? "border-green-200 bg-green-50" : "border-gray-200"}>
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        achievement.earned ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      <span className="text-2xl">{achievement.icon}</span>
                    </div>
                    <CardTitle className="text-lg">{achievement.name}</CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    {achievement.earned ? (
                      <div>
                        <Badge className="bg-green-100 text-green-800 mb-2">Earned</Badge>
                        <p className="text-xs text-gray-500">{achievement.date}</p>
                      </div>
                    ) : (
                      <div>
                        <Progress value={achievement.progress} className="mb-2" />
                        <p className="text-xs text-gray-500">{achievement.progress}% complete</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
